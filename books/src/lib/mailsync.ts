import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { putObject } from './storage'
import { isAcceptedMime, MIN_ATTACHMENT_BYTES } from './constants'
import { isBlockedSender, extractAddress } from './inbound'
import {
  readMailboxes,
  cursorKey,
  isCursor,
  pickAllMailFolder,
  type MailboxConfig,
  type MailboxCursor,
} from './mailbox'

// ============================================================
//  משיכת מסמכים מתיבת מייל ב-IMAP.
//
//  החיבור נפתח, מושך, ונסגר. אין האזנה מתמשכת — היא לא שורדת
//  ב-serverless, וגם לא צריך אותה: cron כל עשר דקות מספיק
//  לחשבוניות.
//
//  נקודת החידוש היא UIDVALIDITY + ה-UID האחרון, ולא הדגל
//  "נקרא". הדגל שייך לבן אדם: מישהו שיפתח חשבונית בטלפון היה
//  גורם לנו לדלג עליה.
// ============================================================

const MAX_PER_RUN = 40

export interface SyncResult {
  mailbox: string
  scanned: number
  stored: number
  skipped: number
  documentIds: string[]
  error?: string
}

export async function syncAllMailboxes(): Promise<SyncResult[]> {
  const boxes = readMailboxes()
  const results: SyncResult[] = []
  for (const box of boxes) {
    try {
      results.push(await syncMailbox(box))
    } catch (err) {
      console.error('[mailsync] תיבה נכשלה', box.user, err)
      results.push({
        mailbox: box.user,
        scanned: 0,
        stored: 0,
        skipped: 0,
        documentIds: [],
        error: err instanceof Error ? err.message : 'unknown',
      })
    }
  }
  return results
}

export async function syncMailbox(box: MailboxConfig): Promise<SyncResult> {
  const { ImapFlow } = await import('imapflow')
  const { simpleParser } = await import('mailparser')

  const db = await getDb()

  const client = new ImapFlow({
    host: box.host,
    port: box.port,
    secure: true,
    auth: { user: box.user, pass: box.password },
    logger: false,
  })

  const result: SyncResult = {
    mailbox: box.user,
    scanned: 0,
    stored: 0,
    skipped: 0,
    documentIds: [],
  }

  await client.connect()

  // התיקייה נבחרת לפי הסימון \\All של השרת ולא לפי שם, כי
  // Gmail מתרגם את שמות התיקיות לשפת החשבון.
  const folder =
    box.folder ?? pickAllMailFolder((await client.list()) as { path: string; specialUse?: string }[])

  const key = cursorKey(box.user, folder)
  const saved = await db
    .select()
    .from(schema.ingestState)
    .where(eq(schema.ingestState.key, key))
    .limit(1)
  const cursor = isCursor(saved[0]?.value) ? saved[0].value : null

  const lock = await client.getMailboxLock(folder)

  try {
    const mailbox = client.mailbox
    if (typeof mailbox === 'boolean') throw new Error('mailbox_unavailable')
    const uidValidity = String(mailbox.uidValidity)

    // דור חדש של התיבה פוסל את ה-UID הישנים. בלי הבדיקה הזו
    // היינו מדלגים על הודעות או מושכים אותן שוב.
    const fresh = !cursor || cursor.uidValidity !== uidValidity
    const since = fresh ? 1 : cursor.lastUid + 1

    let highest = fresh ? 0 : cursor.lastUid

    // סריקה ראשונה של תיבה ותיקה יכולה להיות אלפי הודעות.
    // מגבילים למנה אחת בכל הרצה, וה-cron מתקדם בהדרגה.
    const messages = client.fetch(
      { uid: `${since}:*` },
      { uid: true, envelope: true, bodyStructure: true },
      { uid: true },
    )

    const candidates: { uid: number; from: string }[] = []
    for await (const msg of messages) {
      if (msg.uid > highest) highest = msg.uid
      result.scanned++

      const from = extractAddress(msg.envelope?.from?.[0]?.address ?? '')
      if (isBlockedSender(from)) {
        result.skipped++
        continue
      }
      if (!hasUsefulAttachment(msg.bodyStructure)) {
        result.skipped++
        continue
      }
      candidates.push({ uid: msg.uid, from })
      if (candidates.length >= MAX_PER_RUN) break
    }

    for (const candidate of candidates) {
      const { content } = await client.download(String(candidate.uid), undefined, { uid: true })
      const parsed = await simpleParser(content)

      for (const att of parsed.attachments ?? []) {
        const mime = att.contentType ?? 'application/octet-stream'
        const bytes = new Uint8Array(att.content)

        // לוגו מחתימת מייל: חלק inline עם Content-ID, או קובץ
        // קטן מכדי להיות מסמך.
        if (att.contentDisposition === 'inline' && att.cid) {
          result.skipped++
          continue
        }
        if (!isAcceptedMime(mime) || bytes.byteLength < MIN_ATTACHMENT_BYTES) {
          result.skipped++
          continue
        }

        const stored = await putObject(bytes, mime)

        const existing = await db
          .select({ id: schema.documents.id })
          .from(schema.documents)
          .where(eq(schema.documents.sha256, stored.sha256))
          .limit(1)
        if (existing[0]) {
          result.skipped++
          continue
        }

        const inserted = await db
          .insert(schema.documents)
          .values({
            sha256: stored.sha256,
            blobPath: stored.path,
            mime,
            sizeBytes: stored.sizeBytes,
            originalFilename: att.filename ?? null,
            source: 'email',
            sourceRef: `${box.user}#${candidate.uid}`,
            sourceSender: candidate.from,
            status: 'pending',
          })
          .returning({ id: schema.documents.id })

        const id = inserted[0]?.id
        if (id) {
          result.documentIds.push(id)
          result.stored++
        }
      }
    }

    // נקודת החידוש נשמרת רק אחרי שהמנה הזו עובדה. נפילה באמצע
    // תגרום לסריקה חוזרת, ו-dedupe לפי תוכן יקלוט את זה.
    const lastProcessed = candidates.length > 0 ? candidates[candidates.length - 1]!.uid : highest
    await saveCursor(key, { uidValidity, lastUid: lastProcessed })
  } finally {
    lock.release()
    await client.logout().catch(() => {})
  }

  return result
}

/**
 * בדיקה זולה על מבנה ההודעה, לפני שמורידים אותה. הודעה בלי
 * קובץ מצורף מתאים כלל לא נמשכת מהשרת.
 */
function hasUsefulAttachment(node: unknown): boolean {
  if (!node || typeof node !== 'object') return false
  const part = node as {
    type?: string
    disposition?: string
    id?: string
    size?: number
    childNodes?: unknown[]
  }

  const type = (part.type ?? '').toLowerCase()
  if (isAcceptedMime(type)) {
    const inlineLogo = part.disposition === 'inline' && Boolean(part.id)
    const bigEnough = (part.size ?? 0) >= MIN_ATTACHMENT_BYTES
    if (!inlineLogo && bigEnough) return true
  }

  return (part.childNodes ?? []).some(hasUsefulAttachment)
}

async function saveCursor(key: string, cursor: MailboxCursor): Promise<void> {
  const db = await getDb()
  await db
    .insert(schema.ingestState)
    .values({ key, value: cursor })
    .onConflictDoUpdate({
      target: schema.ingestState.key,
      set: { value: cursor, updatedAt: new Date() },
    })
}

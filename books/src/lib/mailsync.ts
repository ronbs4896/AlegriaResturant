import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { putObject } from './storage'
import { isAcceptedMime, MIN_ATTACHMENT_BYTES } from './constants'
import { extractAddress } from './inbound'
import { triageAttachment } from './triage'
import { logIngestBatch, FILTER_REASONS, type IngestEntry } from './ingestlog'
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
  /** קבצים מצורפים שנבדקו, ומתוכם כמה עברו את הסינון הטכני. */
  attachments: number
  passed: number
  /** פירוט הסינון לפי סיבה, להצגה למשתמש. */
  filtered: Record<string, number>
  documentIds: string[]
  /** במצב תצוגה מקדימה לא נשמר דבר. */
  preview: boolean
  error?: string
}

export interface SyncOptions {
  /** סורק ומדווח בלי לשמור מסמכים ובלי לקדם את הסמן. */
  preview?: boolean
}

export async function syncAllMailboxes(opts: SyncOptions = {}): Promise<SyncResult[]> {
  const boxes = readMailboxes()
  const results: SyncResult[] = []
  for (const box of boxes) {
    try {
      results.push(await syncMailbox(box, opts))
    } catch (err) {
      console.error('[mailsync] תיבה נכשלה', box.user, err)
      results.push({
        mailbox: box.user,
        scanned: 0,
        stored: 0,
        skipped: 0,
        attachments: 0,
        passed: 0,
        filtered: {},
        documentIds: [],
        preview: Boolean(opts.preview),
        error: err instanceof Error ? err.message : 'unknown',
      })
    }
  }
  return results
}

export async function syncMailbox(
  box: MailboxConfig,
  opts: SyncOptions = {},
): Promise<SyncResult> {
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

  const preview = Boolean(opts.preview)
  const result: SyncResult = {
    mailbox: box.user,
    scanned: 0,
    stored: 0,
    skipped: 0,
    attachments: 0,
    passed: 0,
    filtered: {},
    documentIds: [],
    preview,
  }

  // כל החלטה נאספת ונרשמת ביומן בסוף — גם, ובעיקר, סינון.
  const journal: IngestEntry[] = []
  const note = (code: string) => {
    result.filtered[code] = (result.filtered[code] ?? 0) + 1
    result.skipped++
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
    // since גודר את חלון הזמן: תיבה אישית מחזיקה שנים של קבצים
    // שאין להם שום קשר להוצאות, ואין סיבה לגעת בהם.
    const messages = client.fetch(
      { uid: `${since}:*`, since: box.since },
      { uid: true, envelope: true, bodyStructure: true },
      { uid: true },
    )

    const candidates: { uid: number; from: string; subject: string }[] = []
    for await (const msg of messages) {
      if (msg.uid > highest) highest = msg.uid
      result.scanned++

      const from = extractAddress(msg.envelope?.from?.[0]?.address ?? '')
      const subject = msg.envelope?.subject ?? ''
      // "כל הדואר" כולל גם דואר יוצא. מה שהתיבה עצמה שלחה מדולג;
      // חשבוניות שמערכת ההנפקה שלחה דווקא נקלטות — אלה ההכנסות.
      if (from === box.user.toLowerCase()) {
        note('self_sent')
        continue
      }
      if (!hasUsefulAttachment(msg.bodyStructure, box.images)) {
        note('no_attachment')
        continue
      }
      candidates.push({ uid: msg.uid, from, subject })
      if (candidates.length >= MAX_PER_RUN) break
    }

    for (const candidate of candidates) {
      const { content } = await client.download(String(candidate.uid), undefined, { uid: true })
      const parsed = await simpleParser(content)

      for (const att of parsed.attachments ?? []) {
        const mime = att.contentType ?? 'application/octet-stream'
        const bytes = new Uint8Array(att.content)
        const filename = att.filename ?? null
        result.attachments++

        const base = {
          source: 'email' as const,
          mailbox: box.user,
          messageRef: String(candidate.uid),
          sender: candidate.from,
          subject: candidate.subject,
          filename,
          mime,
          sizeBytes: bytes.byteLength,
        }

        // שכבה ראשונה: סינון טכני משותף לשני מסלולי הקליטה.
        const verdict = triageAttachment(
          {
            filename,
            mime,
            sizeBytes: bytes.byteLength,
            inlineWithCid: att.contentDisposition === 'inline' && Boolean(att.cid),
          },
          box.images,
        )
        if (!verdict.ok) {
          note(verdict.code)
          journal.push({
            ...base,
            decision: 'filtered',
            reasonCode: verdict.code,
            reason: verdict.message,
          })
          continue
        }
        result.passed++

        // בתצוגה מקדימה עוצרים כאן: לא נשמר קובץ, לא נוצר מסמך.
        if (preview) continue

        const stored = await putObject(bytes, mime)

        const existing = await db
          .select({ id: schema.documents.id })
          .from(schema.documents)
          .where(eq(schema.documents.sha256, stored.sha256))
          .limit(1)
        if (existing[0]) {
          note('duplicate_content')
          journal.push({
            ...base,
            decision: 'duplicate',
            reasonCode: 'duplicate_content',
            reason: FILTER_REASONS.duplicate_content,
            documentId: existing[0].id,
          })
          continue
        }

        const inserted = await db
          .insert(schema.documents)
          .values({
            sha256: stored.sha256,
            blobPath: stored.path,
            mime,
            sizeBytes: stored.sizeBytes,
            originalFilename: filename,
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
          journal.push({
            ...base,
            decision: 'imported',
            reasonCode: 'accepted',
            reason: 'עבר את הסינון הטכני, ממתין לזיהוי',
            documentId: id,
          })
        }
      }
    }

    // תצוגה מקדימה לא מקדמת את הסמן — אחרת הייבוא שאחריה היה
    // מדלג בדיוק על מה שהיא הראתה.
    if (!preview) {
      // נקודת החידוש נשמרת רק אחרי שהמנה הזו עובדה. נפילה באמצע
      // תגרום לסריקה חוזרת, ו-dedupe לפי תוכן יקלוט את זה.
      const lastProcessed = candidates.length > 0 ? candidates[candidates.length - 1]!.uid : highest
      await saveCursor(key, { uidValidity, lastUid: lastProcessed })
    }
  } finally {
    lock.release()
    await client.logout().catch(() => {})
  }

  await logIngestBatch(journal)
  return result
}

/**
 * ממייל מושכים PDF בלבד, אלא אם התיבה הוגדרה אחרת במפורש:
 * חשבונית שנשלחת במייל היא כמעט תמיד PDF, ותמונה בתיבה אישית
 * היא כמעט תמיד תמונה פרטית. צילומי קבלות עולים מהטלפון.
 */
export function mimeAllowed(mime: string, images: boolean): boolean {
  if (!isAcceptedMime(mime)) return false
  if (images) return true
  return mime === 'application/pdf'
}

/**
 * בדיקה זולה על מבנה ההודעה, לפני שמורידים אותה. הודעה בלי
 * קובץ מצורף מתאים כלל לא נמשכת מהשרת.
 */
export function hasUsefulAttachment(node: unknown, images: boolean): boolean {
  if (!node || typeof node !== 'object') return false
  const part = node as {
    type?: string
    disposition?: string
    id?: string
    size?: number
    childNodes?: unknown[]
  }

  const type = (part.type ?? '').toLowerCase()
  if (mimeAllowed(type, images)) {
    const inlineLogo = part.disposition === 'inline' && Boolean(part.id)
    const bigEnough = (part.size ?? 0) >= MIN_ATTACHMENT_BYTES
    if (!inlineLogo && bigEnough) return true
  }

  return (part.childNodes ?? []).some((child) => hasUsefulAttachment(child, images))
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

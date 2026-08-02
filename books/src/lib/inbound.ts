import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { putObject } from './storage'
import { isAcceptedMime, MIN_ATTACHMENT_BYTES } from './constants'

// ============================================================
//  קליטת מסמכים מהמייל.
//
//  ה-webhook מביא מטא-דאטה בלבד. את הקבצים מושכים דרך
//  Attachments API עם קישור שפג אחרי שעה — כך Resend תומך
//  בקבצים גדולים בלי לחרוג ממגבלת גוף הבקשה של פונקציה.
//
//  אין כאן סינון לפי שולח: חשבונית שאלגריה הנפיקה היא הכנסה
//  שנקלטת, וההבחנה הכנסה/הוצאה נעשית על המסמך עצמו — השוואת
//  ח.פ. ב-classifyDirection, שעובדת גם על שולח לא מוכר.
// ============================================================

const ATTACHMENTS_ENDPOINT = (emailId: string) =>
  `https://api.resend.com/emails/receiving/${emailId}/attachments`

export interface InboundAttachment {
  id: string
  filename: string | null
  contentType: string | null
  contentDisposition: string | null
  contentId: string | null
}

export interface InboundEmail {
  emailId: string
  from: string
  to: string[]
  subject: string
  attachments: InboundAttachment[]
}

// ── פענוח המטען ───────────────────────────────────────────────

/** מחלץ כתובת מתוך "שם <a@b.com>" או מתוך כתובת חשופה. */
export function extractAddress(raw: string | null | undefined): string {
  if (!raw) return ''
  const match = raw.match(/<([^>]+)>/)
  return (match?.[1] ?? raw).trim().toLowerCase()
}

export function parseInbound(payload: unknown): InboundEmail | null {
  if (typeof payload !== 'object' || payload === null) return null
  const root = payload as Record<string, unknown>
  if (root.type !== 'email.received') return null

  const data = root.data as Record<string, unknown> | undefined
  const emailId = typeof data?.email_id === 'string' ? data.email_id : null
  if (!emailId) return null

  const rawAttachments = Array.isArray(data?.attachments) ? data.attachments : []

  return {
    emailId,
    from: extractAddress(typeof data?.from === 'string' ? data.from : ''),
    to: Array.isArray(data?.to) ? data.to.map((t) => extractAddress(String(t))) : [],
    subject: typeof data?.subject === 'string' ? data.subject : '',
    attachments: rawAttachments.map((a) => {
      const att = a as Record<string, unknown>
      return {
        id: String(att.id ?? ''),
        filename: typeof att.filename === 'string' ? att.filename : null,
        contentType: typeof att.content_type === 'string' ? att.content_type : null,
        contentDisposition:
          typeof att.content_disposition === 'string' ? att.content_disposition : null,
        contentId: typeof att.content_id === 'string' ? att.content_id : null,
      }
    }),
  }
}

// ── סינון ─────────────────────────────────────────────────────

/**
 * חלק inline עם Content-ID הוא כמעט תמיד לוגו מחתימת מייל.
 * קובץ מתחת ל-20KB הוא באותה משפחה. סוג שאינו PDF או תמונה
 * לא ייקרא ממילא.
 *
 * מה שבמכוון **לא** מסנן: מילות מפתח בנושא או בשם הקובץ.
 * ספק ששולח "doc.pdf" בלי נושא שולח מסמך אמיתי, ואיבוד חשבונית
 * גרוע בהרבה מקריאת API מיותרת.
 */
export function shouldFetch(att: InboundAttachment): boolean {
  if (!att.id) return false
  if (att.contentDisposition === 'inline' && att.contentId) return false
  return isAcceptedMime(att.contentType ?? '')
}

// ── משיכת הקבצים ──────────────────────────────────────────────

interface RemoteAttachment {
  id: string
  downloadUrl: string
  contentType: string | null
  filename: string | null
}

/**
 * התשובה נקראת בהגנה: הרשימה מגיעה תחת data או attachments
 * בהתאם לגרסה, וכתובת ההורדה תחת download_url או url.
 */
export async function listRemoteAttachments(
  emailId: string,
  apiKey: string,
): Promise<RemoteAttachment[]> {
  const res = await fetch(ATTACHMENTS_ENDPOINT(emailId), {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`resend_attachments_${res.status}: ${body.slice(0, 200)}`)
  }

  const json = (await res.json()) as Record<string, unknown>
  const list = Array.isArray(json.data)
    ? json.data
    : Array.isArray(json.attachments)
      ? json.attachments
      : []

  return list
    .map((item) => {
      const a = item as Record<string, unknown>
      const url = a.download_url ?? a.downloadUrl ?? a.url
      return {
        id: String(a.id ?? ''),
        downloadUrl: typeof url === 'string' ? url : '',
        contentType: typeof a.content_type === 'string' ? a.content_type : null,
        filename: typeof a.filename === 'string' ? a.filename : null,
      }
    })
    .filter((a) => a.downloadUrl)
}

// ── קליטה ─────────────────────────────────────────────────────

export interface IngestOutcome {
  status: 'stored' | 'already_processed' | 'no_documents'
  documentIds: string[]
  skipped: number
}

const seenKey = (emailId: string) => `inbound:${emailId}`

export async function ingestEmail(email: InboundEmail): Promise<IngestOutcome> {
  const db = await getDb()

  // ספק webhook חוזר על עצמו בכישלון זמני. בלי הסימון הזה אותו
  // מייל היה נמשך שוב, וגם אם ה-sha256 מונע כפילות ברשומות,
  // אין סיבה לשלם על ההורדה פעמיים.
  const key = seenKey(email.emailId)
  const seen = await db
    .select({ key: schema.ingestState.key })
    .from(schema.ingestState)
    .where(eq(schema.ingestState.key, key))
    .limit(1)
  if (seen[0]) return { status: 'already_processed', documentIds: [], skipped: 0 }

  const wanted = email.attachments.filter(shouldFetch)
  if (wanted.length === 0) {
    await markSeen(key, email, 0)
    return { status: 'no_documents', documentIds: [], skipped: email.attachments.length }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY חסר — אי אפשר למשוך קבצים מצורפים')

  const remote = await listRemoteAttachments(email.emailId, apiKey)
  const byId = new Map(remote.map((r) => [r.id, r]))

  const documentIds: string[] = []
  let skipped = email.attachments.length - wanted.length

  for (const att of wanted) {
    const source = byId.get(att.id)
    if (!source) {
      skipped++
      continue
    }

    const res = await fetch(source.downloadUrl)
    if (!res.ok) {
      console.error('[inbound] הורדת קובץ נכשלה', att.id, res.status)
      skipped++
      continue
    }
    const bytes = new Uint8Array(await res.arrayBuffer())

    const mime = source.contentType ?? att.contentType ?? 'application/octet-stream'
    if (!isAcceptedMime(mime) || bytes.byteLength < MIN_ATTACHMENT_BYTES) {
      skipped++
      continue
    }

    const stored = await putObject(bytes, mime)

    // אותו קובץ בדיוק שכבר קיים — מהעלאה ידנית או ממייל קודם —
    // נספר פעם אחת. זו אותה הגנה שמאפשרת לצלם בלי לחשוב.
    const existing = await db
      .select({ id: schema.documents.id })
      .from(schema.documents)
      .where(eq(schema.documents.sha256, stored.sha256))
      .limit(1)
    if (existing[0]) {
      skipped++
      continue
    }

    const inserted = await db
      .insert(schema.documents)
      .values({
        sha256: stored.sha256,
        blobPath: stored.path,
        mime,
        sizeBytes: stored.sizeBytes,
        originalFilename: source.filename ?? att.filename ?? null,
        source: 'email',
        sourceRef: email.emailId,
        sourceSender: email.from,
        status: 'pending',
      })
      .returning({ id: schema.documents.id })

    const id = inserted[0]?.id
    if (id) documentIds.push(id)
  }

  await markSeen(key, email, documentIds.length)
  return {
    status: documentIds.length > 0 ? 'stored' : 'no_documents',
    documentIds,
    skipped,
  }
}

async function markSeen(key: string, email: InboundEmail, stored: number): Promise<void> {
  const db = await getDb()
  await db
    .insert(schema.ingestState)
    .values({ key, value: { from: email.from, subject: email.subject, stored } })
    .onConflictDoNothing()
}

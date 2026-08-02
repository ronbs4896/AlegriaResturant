import { desc } from 'drizzle-orm'
import { getDb, schema } from '@/db'

// ============================================================
//  יומן הקליטה.
//
//  כל קובץ שנראה נרשם — גם, ובעיקר, כזה שסוננו. בלי זה השאלה
//  "למה החשבונית שלי לא נמשכה" נענית רק בניחוש, ו"למה הזבל הזה
//  נכנס" בכלל לא נענית.
// ============================================================

export type IngestDecision = 'imported' | 'filtered' | 'duplicate' | 'error'

/** קודי הסינון. הקוד יציב, ההודעה לבני אדם. */
export const FILTER_REASONS = {
  mime_not_accepted: 'סוג קובץ שאינו מסמך',
  images_disabled: 'תמונה, והתיבה מוגדרת ל-PDF בלבד',
  too_small: 'קטן מדי מכדי להיות מסמך',
  inline_logo: 'תמונה משובצת — לוגו או חתימת מייל',
  blocked_filename: 'שם הקובץ מזוהה כחתימה, לוגו או קובץ מערכת',
  self_sent: 'הודעה שהתיבה עצמה שלחה',
  no_attachment: 'אין בהודעה קובץ מצורף מתאים',
  duplicate_content: 'אותו קובץ כבר קיים במערכת',
  not_financial: 'המסמך אינו חשבונית או קבלה',
} as const

export type FilterReason = keyof typeof FILTER_REASONS

export interface IngestEntry {
  source: 'email' | 'upload' | 'webhook'
  mailbox?: string | null
  messageRef?: string | null
  sender?: string | null
  subject?: string | null
  filename?: string | null
  mime?: string | null
  sizeBytes?: number | null
  decision: IngestDecision
  reasonCode: string
  reason: string
  documentId?: string | null
}

/** רישום בודד. לעולם לא מפיל את הקליטה — יומן שנכשל אינו סיבה לאבד מסמך. */
export async function logIngest(entry: IngestEntry): Promise<void> {
  try {
    const db = await getDb()
    await db.insert(schema.ingestLog).values({
      source: entry.source,
      mailbox: entry.mailbox ?? null,
      messageRef: entry.messageRef ?? null,
      sender: entry.sender ?? null,
      subject: entry.subject?.slice(0, 300) ?? null,
      filename: entry.filename?.slice(0, 300) ?? null,
      mime: entry.mime ?? null,
      sizeBytes: entry.sizeBytes ?? null,
      decision: entry.decision,
      reasonCode: entry.reasonCode,
      reason: entry.reason.slice(0, 500),
      documentId: entry.documentId ?? null,
    })
  } catch (err) {
    console.error('[ingestlog] רישום נכשל', err)
  }
}

/** רישום מרוכז, כדי לא לפתוח חיבור לכל קובץ בסריקה של מאות. */
export async function logIngestBatch(entries: IngestEntry[]): Promise<void> {
  if (entries.length === 0) return
  try {
    const db = await getDb()
    await db.insert(schema.ingestLog).values(
      entries.map((entry) => ({
        source: entry.source,
        mailbox: entry.mailbox ?? null,
        messageRef: entry.messageRef ?? null,
        sender: entry.sender ?? null,
        subject: entry.subject?.slice(0, 300) ?? null,
        filename: entry.filename?.slice(0, 300) ?? null,
        mime: entry.mime ?? null,
        sizeBytes: entry.sizeBytes ?? null,
        decision: entry.decision,
        reasonCode: entry.reasonCode,
        reason: entry.reason.slice(0, 500),
        documentId: entry.documentId ?? null,
      })),
    )
  } catch (err) {
    console.error('[ingestlog] רישום מרוכז נכשל', err)
  }
}

export async function recentIngestLog(limit = 200) {
  const db = await getDb()
  return db.select().from(schema.ingestLog).orderBy(desc(schema.ingestLog.at)).limit(limit)
}

// ============================================================
//  תיבות המייל שמהן המערכת מושכת מסמכים.
//
//  ההגדרה ב-env ולא במסד, מאותה סיבה שרשימת המורשים שם: מי
//  שיקבל גישה למסד לא יוכל להוסיף תיבה ולהתחיל למשוך ממנה.
//
//  פורמט, ממוספר כדי לתמוך בכמה תיבות:
//    MAILBOX_1_USER=name@gmail.com
//    MAILBOX_1_PASSWORD=<סיסמת אפליקציה>
//    MAILBOX_1_HOST=imap.gmail.com   (רשות; נגזר מהדומיין)
// ============================================================

export interface MailboxConfig {
  index: number
  user: string
  password: string
  host: string
  port: number
  /**
   * תיבת הדואר בשרת. null פירושו "תגלה לבד" — מחפשים את
   * התיקייה שהשרת מסמן כ-\All, ונופלים ל-INBOX אם אין כזו.
   */
  folder: string | null
  /** לא מושכים הודעות ישנות מזה. ברירת מחדל: שנה אחורה. */
  since: Date
  /**
   * האם למשוך גם תמונות. ברירת מחדל לא: חשבונית שמגיעה במייל
   * היא כמעט תמיד PDF, ותמונה בתיבה אישית היא כמעט תמיד תמונה
   * פרטית. צילומי קבלות נייר עולים מהטלפון, לא מהמייל.
   */
  images: boolean
}

const DEFAULT_LOOKBACK_DAYS = 365

/** שרתי IMAP של הספקים הנפוצים בישראל, כדי לחסוך שדה. */
const HOST_BY_DOMAIN: Record<string, string> = {
  'gmail.com': 'imap.gmail.com',
  'googlemail.com': 'imap.gmail.com',
  'outlook.com': 'outlook.office365.com',
  'hotmail.com': 'outlook.office365.com',
  'live.com': 'outlook.office365.com',
  'walla.com': 'imap.walla.co.il',
  'walla.co.il': 'imap.walla.co.il',
}

export function hostForAddress(user: string): string | null {
  const domain = user.split('@')[1]?.toLowerCase() ?? ''
  return HOST_BY_DOMAIN[domain] ?? null
}

/**
 * מוצא את התיקייה שמכילה את כל הדואר, כולל מה שאורכב. ב-Gmail
 * תיקיית INBOX לא מכילה הודעות שאורכבו, ותיבה של מישהו שמסדר
 * את הדואר תפספס בדיוק את החשבוניות הישנות.
 *
 * לא לפי שם: Gmail מתרגם את שמות התיקיות לשפת החשבון, ובחשבון
 * בעברית "All Mail" נקרא "כל הדואר". השרת מסמן אותה ב-\All
 * לפי RFC 6154, וזה סימון שאינו תלוי שפה.
 */
export function pickAllMailFolder(
  list: { path: string; specialUse?: string }[],
): string {
  const all = list.find((m) => m.specialUse === '\\All')
  return all?.path ?? 'INBOX'
}

export function readMailboxes(
  env: NodeJS.ProcessEnv = process.env,
  now: Date = new Date(),
): MailboxConfig[] {
  const boxes: MailboxConfig[] = []

  for (let i = 1; i <= 10; i++) {
    const user = env[`MAILBOX_${i}_USER`]?.trim()
    // Google מציג את הסיסמה בארבע קבוצות מופרדות ברווח, ורוב
    // האנשים מעתיקים אותה ככה. השרת דוחה רווחים, אז מסירים.
    const password = env[`MAILBOX_${i}_PASSWORD`]?.replace(/\s+/g, '')
    if (!user || !password) continue

    const host = env[`MAILBOX_${i}_HOST`]?.trim() || hostForAddress(user)
    if (!host) continue

    boxes.push({
      index: i,
      user,
      password,
      host,
      port: Number(env[`MAILBOX_${i}_PORT`] ?? 993),
      folder: env[`MAILBOX_${i}_FOLDER`]?.trim() || null,
      since: parseSince(env[`MAILBOX_${i}_SINCE`], now),
      images: env[`MAILBOX_${i}_IMAGES`] === 'true',
    })
  }

  return boxes
}

/** תאריך תחילת הסריקה. ערך לא תקין נופל לברירת המחדל, לא לאפס. */
function parseSince(raw: string | undefined, now: Date): Date {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw.trim())) {
    const d = new Date(raw.trim() + 'T00:00:00Z')
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date(now.getTime() - DEFAULT_LOOKBACK_DAYS * 86_400_000)
}

/** מפתח נקודת החידוש ב-ingest_state, לכל תיבה ותיקייה בנפרד. */
export const cursorKey = (user: string, folder: string) => `mailbox:${user}:${folder}`

export interface MailboxCursor {
  /** מזהה הדור של התיבה. שינוי שלו פוסל את כל ה-UID שנשמרו. */
  uidValidity: string
  lastUid: number
}

export function isCursor(v: unknown): v is MailboxCursor {
  if (typeof v !== 'object' || v === null) return false
  const c = v as Record<string, unknown>
  return typeof c.uidValidity === 'string' && typeof c.lastUid === 'number'
}

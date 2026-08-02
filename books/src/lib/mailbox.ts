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
  /** תיבת הדואר בשרת. ב-Gmail "All Mail" מכיל גם ארכיון. */
  folder: string
}

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
 * ב-Gmail תיקיית INBOX לא מכילה הודעות שאורכבו, ותיבה של מישהו
 * שמסדר את הדואר תפספס בדיוק את החשבוניות הישנות. "All Mail"
 * מכיל הכול.
 */
function defaultFolder(host: string): string {
  return host === 'imap.gmail.com' ? '[Gmail]/All Mail' : 'INBOX'
}

export function readMailboxes(env: NodeJS.ProcessEnv = process.env): MailboxConfig[] {
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
      folder: env[`MAILBOX_${i}_FOLDER`]?.trim() || defaultFolder(host),
    })
  }

  return boxes
}

/** מפתח נקודת החידוש ב-ingest_state, לכל תיבה בנפרד. */
export const cursorKey = (box: MailboxConfig) => `mailbox:${box.user}:${box.folder}`

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

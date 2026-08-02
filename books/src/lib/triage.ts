import { isAcceptedMime, MIN_ATTACHMENT_BYTES } from './constants'
import { FILTER_REASONS, type FilterReason } from './ingestlog'

// ============================================================
//  שכבה ראשונה: סינון טכני, בלי קריאת API.
//
//  זו לא השכבה שמחליטה אם משהו הוא חשבונית — לזה יש את החילוץ.
//  זו השכבה שחוסכת קריאה על מה שברור שאינו מסמך: לוגו בחתימה,
//  הזמנת יומן, קובץ מוזיקה, ארכיון.
//
//  שני מסלולי הקליטה — IMAP ו-webhook — עוברים דרך אותה
//  פונקציה, כדי שלא יהיו שני סטים של כללים שנפרדים עם הזמן.
// ============================================================

export interface Candidate {
  filename?: string | null
  mime?: string | null
  sizeBytes?: number | null
  /** חלק משובץ בגוף ההודעה (Content-ID) — כמעט תמיד לוגו. */
  inlineWithCid?: boolean
}

export type TriageVerdict =
  | { ok: true }
  | { ok: false; code: FilterReason; message: string }

/** סיומות שלא נבדוק בכלל: לא מסמכים, ולפעמים מסוכנות. */
const BLOCKED_EXTENSIONS = [
  '.ics', '.vcf', '.zip', '.rar', '.7z', '.gz', '.tar',
  '.exe', '.msi', '.bat', '.sh', '.js', '.html', '.htm',
  '.mp3', '.wav', '.m4a', '.mp4', '.mov', '.avi', '.webm',
  '.xlsx', '.xls', '.docx', '.doc', '.pptx', '.csv',
]

/**
 * שמות שחוזרים בכל מייל של אותו שולח. חתימות ולוגואים נשלחים
 * לרוב כקובץ מצורף רגיל ולא כ-inline, ולכן בדיקת ה-CID לבדה
 * לא תופסת אותם.
 */
const BLOCKED_NAME_PATTERNS = [
  /^signature/i,
  /^logo/i,
  /^image0*\d+\.(png|jpe?g|gif)$/i,
  /^untitled/i,
  /^(footer|header|banner|icon|avatar)/i,
  /^oledata/i,
  /^winmail\.dat$/i,
]

const extensionOf = (filename: string): string => {
  const i = filename.lastIndexOf('.')
  return i === -1 ? '' : filename.slice(i).toLowerCase()
}

/**
 * `images=false` — ברירת המחדל לתיבת מייל: חשבונית שנשלחת במייל
 * היא כמעט תמיד PDF, ותמונה בתיבה אישית היא כמעט תמיד תמונה
 * פרטית. צילומי קבלות מגיעים מהטלפון, לא מהמייל.
 */
export function triageAttachment(c: Candidate, images: boolean): TriageVerdict {
  const reject = (code: FilterReason, extra?: string): TriageVerdict => ({
    ok: false,
    code,
    message: extra ? `${FILTER_REASONS[code]} (${extra})` : FILTER_REASONS[code],
  })

  const name = (c.filename ?? '').trim()
  if (name) {
    const ext = extensionOf(name)
    if (BLOCKED_EXTENSIONS.includes(ext)) return reject('blocked_filename', ext)
    if (BLOCKED_NAME_PATTERNS.some((re) => re.test(name))) {
      return reject('blocked_filename', name.slice(0, 40))
    }
  }

  const mime = (c.mime ?? '').toLowerCase()
  if (!isAcceptedMime(mime)) return reject('mime_not_accepted', mime || 'לא ידוע')
  if (!images && mime !== 'application/pdf') return reject('images_disabled', mime)

  if (c.inlineWithCid) return reject('inline_logo')

  const size = c.sizeBytes ?? 0
  if (size > 0 && size < MIN_ATTACHMENT_BYTES) {
    return reject('too_small', `${Math.round(size / 1024)}KB`)
  }

  return { ok: true }
}

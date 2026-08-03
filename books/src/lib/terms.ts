// ============================================================
//  תנאי תשלום ותאריך לתשלום.
//
//  "שוטף+30" אינו תאריך החשבונית ועוד 30 יום. הוא סוף החודש
//  שבו הוצאה החשבונית, ועוד 30 יום. ההפרש בין שתי הקריאות הוא
//  עד 29 יום, וזה בדיוק ההבדל בין תזרים נכון לתזרים שמראה כסף
//  שעוד לא הגיע.
//
//  המודל לעולם לא מחשב את התאריך. הוא מחזיר את הטקסט המילולי
//  מהמסמך, כאן הוא מתורגם לבסיס ולמספר ימים, והחישוב עצמו
//  דטרמיניסטי וניתן לבדיקה.
// ============================================================

export type TermsBasis =
  /** מיידי — התשלום במעמד המסמך */
  | 'immediate'
  /** נטו — מתאריך המסמך ועוד N ימים */
  | 'net'
  /** שוטף — מסוף חודש המסמך ועוד N ימים */
  | 'eom'

export interface PaymentTerms {
  basis: TermsBasis
  days: number
  /** הטקסט שממנו נגזרו התנאים, לתצוגה */
  label: string
}

const IMMEDIATE_WORDS =
  /(מזומן|מיידי|במעמד|עם קבלת|תשלום מראש|מראף|cash|immediate|on receipt|due on receipt|prepaid|cod)/i

/** "שוטף", "שוטף פלוס", "eom", "end of month" — הבסיס הוא סוף החודש. */
const EOM_WORDS = /(שוטף|שו״ף|שו"ף|שוט'|eom|end of month|end-of-month)/i

/** "נטו", "net", "תוך" — הבסיס הוא תאריך המסמך. */
const NET_WORDS = /(נטו|net|תוך|בתוך|within)/i

/**
 * מחלץ תנאי תשלום מטקסט חופשי כפי שהוא מופיע על המסמך.
 * מחזיר null כשאין במחרוזת מידע שאפשר להישען עליו — ואז אין
 * תאריך לתשלום, וזה מצב לגיטימי שהתזרים יודע להציג.
 */
export function parsePaymentTerms(raw: string | null | undefined): PaymentTerms | null {
  if (!raw) return null
  const text = raw.trim()
  if (!text) return null

  // מספר הימים: המספר הראשון בטווח סביר. "שוטף+30" ו-"שוטף + 30
  // יום" ו-"net 45" נקראים אותו דבר.
  const match = text.match(/(\d{1,3})/)
  const days = match ? Number(match[1]) : 0

  if (days > 0 && days <= 365) {
    // בעברית "שוטף" הוא ברירת המחדל המסחרית. כשכתוב מספר ימים
    // בלי מילת בסיס מפורשת — למשל "+30" — הכוונה שוטף.
    if (EOM_WORDS.test(text)) return { basis: 'eom', days, label: text }
    if (NET_WORDS.test(text)) return { basis: 'net', days, label: text }
    if (/^[+\s]*\d{1,3}\s*(יום|ימים|days?)?$/i.test(text)) {
      return { basis: 'eom', days, label: text }
    }
    return { basis: 'net', days, label: text }
  }

  if (IMMEDIATE_WORDS.test(text)) return { basis: 'immediate', days: 0, label: text }
  // "שוטף" לבדו, בלי מספר, פירושו סוף החודש.
  if (EOM_WORDS.test(text)) return { basis: 'eom', days: 0, label: text }

  return null
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/

/** היום האחרון בחודש של התאריך הנתון, כ-ISO. */
export function endOfMonth(iso: string): string | null {
  const m = ISO.exec(iso)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  if (mo < 1 || mo > 12) return null
  // יום 0 של החודש הבא הוא היום האחרון של החודש הזה.
  return toIso(new Date(Date.UTC(y, mo, 0)))
}

export function addDays(iso: string, days: number): string | null {
  const m = ISO.exec(iso)
  if (!m) return null
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])))
  if (Number.isNaN(d.getTime())) return null
  d.setUTCDate(d.getUTCDate() + days)
  return toIso(d)
}

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/**
 * תאריך התשלום בפועל.
 *
 * `explicit` — תאריך שכתוב על המסמך עצמו. הוא גובר תמיד: אם
 * הספק כתב "לתשלום עד 15.9", אין מה לחשב.
 * `terms` — תנאי התשלום מהמסמך; `fallbackTerms` — ברירת המחדל
 * שנקבעה לספק בידי אדם, ומשמשת כשהמסמך שותק.
 *
 * מחזיר null כשאין ממה לגזור. **null אינו "היום"** — מסמך בלי
 * תאריך תשלום הוא מצב אמיתי שצריך להופיע ככזה בתזרים, ולא
 * להסתתר מאחורי ניחוש.
 */
export function computeDueDate(
  docDate: string | null | undefined,
  opts: {
    explicit?: string | null
    terms?: string | null
    fallbackTerms?: string | null
  } = {},
): string | null {
  if (opts.explicit && ISO.test(opts.explicit)) return opts.explicit
  if (!docDate || !ISO.test(docDate)) return null

  const parsed = parsePaymentTerms(opts.terms) ?? parsePaymentTerms(opts.fallbackTerms)
  if (!parsed) return null

  if (parsed.basis === 'immediate') return docDate
  if (parsed.basis === 'net') return addDays(docDate, parsed.days)

  const eom = endOfMonth(docDate)
  return eom ? addDays(eom, parsed.days) : null
}

/** תיאור התנאים בעברית קצרה, לתצוגה בטבלה. */
export function describeTerms(raw: string | null | undefined): string | null {
  const t = parsePaymentTerms(raw)
  if (!t) return raw?.trim() || null
  if (t.basis === 'immediate') return 'מיידי'
  if (t.basis === 'net') return `נטו ${t.days}`
  return t.days > 0 ? `שוטף+${t.days}` : 'שוטף'
}

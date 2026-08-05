import { isDocKind, type DocKind } from './constants'
import { computeDueDate } from './terms'

// ============================================================
//  תשלומים — הלוגיקה הטהורה.
//
//  תשלום אינו סטטוס של מסמך. "אושר" ו"שולם" הם שני צירים
//  נפרדים: אפשר לאשר חשבונית שטרם שולמה, ואפשר לשלם מסמך
//  שעדיין ממתין לבדיקה. לכן הכסף יושב בטבלה משלו, ומצב
//  התשלום על המסמך הוא סיכום נגזר ולא מקור אמת.
//
//  הקובץ הזה לא נוגע במסד, ולכן הוא נטען גם בצד הלקוח.
//  הכתיבה עצמה ב-`payments-db.ts`.
// ============================================================

export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'n/a'

/**
 * שלושה מקורות לתשלום:
 *   implied — משתמע מסוג המסמך. קבלה כבר שולמה בהגדרה.
 *   manual  — אדם סימן "שולם", למשל מזומן שלא עובר בבנק.
 *   auto    — התאמה מול תנועת בנק.
 */
export type PaymentSource = 'implied' | 'manual' | 'auto'

export const PAYMENT_STATUS_HE: Record<PaymentStatus, string> = {
  unpaid: 'לא שולם',
  partial: 'שולם חלקית',
  paid: 'שולם',
  'n/a': 'לא רלוונטי',
}

export const PAYMENT_SOURCE_HE: Record<PaymentSource, string> = {
  implied: 'משתמע מסוג המסמך',
  manual: 'סומן ידנית',
  auto: 'התאמה מול תנועת בנק',
}

export const isPaymentStatus = (v: unknown): v is PaymentStatus =>
  typeof v === 'string' && v in PAYMENT_STATUS_HE

/**
 * מסמכים ששולמו בעצם הנפקתם.
 *
 * בקבלה ובחשבונית מס-קבלה הכסף כבר עבר — זה מה שהמסמך מעיד
 * עליו. בלי הכלל הזה דוח ההתחייבויות היה מציג ביום הראשון את
 * כל הקבלות של השנה כחוב פתוח, ובעסק הסעדה רוב המסמכים הם
 * קבלות.
 */
export function impliesPaid(kind: string | null | undefined): boolean {
  return kind === 'receipt' || kind === 'tax_invoice_receipt'
}

/**
 * מצב התשלום ההתחלתי לפי סוג המסמך.
 *
 * זיכוי אינו חוב ואינו זכות שממתינה לתשלום — הוא קיזוז מול
 * מסמך אחר, ולכן יוצא מחוץ למשוואת התזרים במקום להיספר כחוב
 * שלילי.
 */
export function initialPaymentStatus(kind: string | null | undefined): PaymentStatus {
  if (impliesPaid(kind)) return 'paid'
  if (kind === 'credit_note') return 'n/a'
  return 'unpaid'
}

/** סבילות של אגורה: עיגולים לא הופכים חשבונית משולמת ל"חלקית". */
export const PAYMENT_EPSILON = 0.01

export function derivePaymentStatus(
  total: number | null,
  paid: number,
  current: PaymentStatus = 'unpaid',
): PaymentStatus {
  // "לא רלוונטי" נקבע לפי סוג המסמך, ותשלום בודד לא משנה אותו.
  if (current === 'n/a') return 'n/a'
  if (paid <= PAYMENT_EPSILON) return 'unpaid'
  // בלי סכום כולל אי אפשר לדעת אם התשלום מלא. עדיף להצהיר
  // "שולם" מאשר להשאיר מסמך תלוי ב"חלקית" לנצח בלי דרך לסגור.
  if (total == null || total <= 0) return 'paid'
  if (paid >= total - PAYMENT_EPSILON) return 'paid'
  return 'partial'
}

/**
 * שדות התשלום של מסמך אחרי חילוץ.
 *
 * רץ בתוך הצנרת, ולכן הוא מחזיר ערכים במקום לכתוב: העדכון
 * נעשה באותה פקודת UPDATE של שאר השדות, ולא בכתיבה שנייה
 * שעלולה להיכשל בנפרד.
 */
export function paymentFieldsFor(input: {
  kind: string | null
  docDate: string | null
  dueDate?: string | null
  terms?: string | null
  partyTerms?: string | null
}): {
  paymentStatus: PaymentStatus
  dueDate: string | null
  paidAt: string | null
} {
  const kind: DocKind | null = isDocKind(input.kind) ? input.kind : null
  const status = initialPaymentStatus(kind)

  // מסמך ששולם בעצם הנפקתו: תאריך התשלום הוא תאריך המסמך, ואין
  // לו תאריך יעד — אין למה לחכות.
  if (status === 'paid') {
    return { paymentStatus: 'paid', dueDate: null, paidAt: input.docDate ?? null }
  }

  return {
    paymentStatus: status,
    dueDate: computeDueDate(input.docDate, {
      explicit: input.dueDate,
      terms: input.terms,
      fallbackTerms: input.partyTerms,
    }),
    paidAt: null,
  }
}

/** הסכום שנותר לתשלום. 0 כשאין סכום כולל — אין ממה לגזור חוב. */
export function remainingAmount(
  total: number | string | null,
  paid: number | string | null,
): number {
  const t = Number(total ?? 0)
  const p = Number(paid ?? 0)
  if (!Number.isFinite(t) || t <= 0) return 0
  return Math.max(0, t - (Number.isFinite(p) ? p : 0))
}

/**
 * האם החוב עבר את מועדו.
 *
 * מסמך בלי תאריך לתשלום אינו באיחור — הוא במצב אחר לגמרי,
 * "אין תאריך", והתזרים מציג אותו ככזה במקום להאשים אותו.
 * הגבול הוא סוף היום: מסמך שתאריכו היום עדיין בזמן.
 */
export function isOverdue(
  doc: { paymentStatus?: string | null; dueDate?: string | null },
  today: string,
): boolean {
  if (doc.paymentStatus === 'paid' || doc.paymentStatus === 'n/a') return false
  if (!doc.dueDate) return false
  return doc.dueDate < today
}

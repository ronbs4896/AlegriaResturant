// ============================================================
//  שכבת הוולידציה הדטרמיניסטית.
//
//  זו השכבה שמונעת טעות שקטה. מודל שפה יכול להחזיר סכום שגוי
//  בביטחון מלא; חשבון אריתמטי לא. כל בדיקה כאן היא כלל שאפשר
//  לאמת בלי לשאול אף אחד, ולכן היא גוברת על החילוץ.
// ============================================================
import {
  allocationThresholdOn,
  vatRateOn,
  DOC_TYPES,
  type DocType,
} from './constants'

export type FlagLevel = 'error' | 'warn' | 'info'

export interface ValidationFlag {
  code: string
  level: FlagLevel
  /** מנוסח כדי שיופיע כמו שהוא במסך הבדיקה. */
  message: string
}

/**
 * ספרת ביקורת של ח.פ. / ע.מ. / ת.ז. ישראליים.
 * משקלים 1,2,1,2… ; מכפלה דו-ספרתית מוחלפת בסכום ספרותיה;
 * המספר תקין אם הסכום מתחלק ב-10.
 */
export function isValidIsraeliTaxId(raw: string | null | undefined): boolean {
  if (!raw) return false
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 0 || digits.length > 9) return false
  const padded = digits.padStart(9, '0')

  let sum = 0
  for (let i = 0; i < 9; i++) {
    const digit = Number(padded[i])
    const product = digit * ((i % 2) + 1)
    sum += product > 9 ? product - 9 : product
  }
  return sum % 10 === 0
}

/** משווה מזהי עוסק תוך התעלמות ממקפים, רווחים ואפסים מובילים. */
export function sameTaxId(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false
  const norm = (s: string) => s.replace(/\D/g, '').replace(/^0+/, '')
  const na = norm(a)
  const nb = norm(b)
  return na.length > 0 && na === nb
}

export interface DocumentFacts {
  docType: DocType | null
  docDate: string | null // ISO yyyy-mm-dd
  supplierTaxId: string | null
  recipientTaxId: string | null
  netAmount: number | null
  vatAmount: number | null
  totalAmount: number | null
  currency: string | null
  allocationNumber: string | null
}

export type Direction = 'expense' | 'income'

export interface ValidationContext {
  /** ח.פ. של אלגריה — מכריע הוצאה מול הכנסה. */
  businessTaxId: string
  /** תאריך הבדיקה, להשוואת "תאריך בעתיד". ברירת מחדל: היום. */
  today?: string
  /**
   * צד הספר. קובע אילו בדיקות רלוונטיות: בהוצאה מספר הקצאה חסר
   * חוסם (הניכוי שלנו בסכנה); בהכנסה זו בעיה של מערכת ההנפקה,
   * ולכן רק אזהרה. ברירת מחדל: הוצאה — הצד השמרני.
   */
  direction?: Direction
}

const money = (n: number) => n.toFixed(2)

/**
 * מריץ את כל הבדיקות ומחזיר רשימת דגלים.
 * `error` חוסם אישור אוטומטי. `warn` מסמן ולא חוסם.
 */
export function validateDocument(
  d: DocumentFacts,
  ctx: ValidationContext,
): ValidationFlag[] {
  const flags: ValidationFlag[] = []
  const today = ctx.today ?? new Date().toISOString().slice(0, 10)
  const direction = ctx.direction ?? 'expense'

  // ── שדות חובה ────────────────────────────────────────────
  if (!d.docDate) {
    flags.push({ code: 'missing_date', level: 'error', message: 'חסר תאריך מסמך' })
  }
  if (direction === 'expense' && !d.supplierTaxId) {
    flags.push({ code: 'missing_supplier_taxid', level: 'error', message: 'חסר ח.פ. של הספק' })
  }
  if (d.totalAmount == null) {
    flags.push({ code: 'missing_total', level: 'error', message: 'חסר סכום כולל' })
  }
  if (!d.docType) {
    flags.push({ code: 'missing_doc_type', level: 'error', message: 'לא זוהה סוג המסמך' })
  }

  // ── ח.פ. תקין ────────────────────────────────────────────
  if (d.supplierTaxId && !isValidIsraeliTaxId(d.supplierTaxId)) {
    flags.push({
      code: 'invalid_supplier_taxid',
      level: 'error',
      message: `ח.פ. הספק ${d.supplierTaxId} נכשל בבדיקת ספרת ביקורת`,
    })
  }
  if (d.recipientTaxId && !isValidIsraeliTaxId(d.recipientTaxId)) {
    flags.push({
      code: 'invalid_recipient_taxid',
      level: 'warn',
      message: `ח.פ. הנמען ${d.recipientTaxId} נכשל בבדיקת ספרת ביקורת`,
    })
  }

  // ── תאריך הגיוני ─────────────────────────────────────────
  if (d.docDate && d.docDate > today) {
    flags.push({
      code: 'future_date',
      level: 'error',
      message: `תאריך המסמך (${d.docDate}) בעתיד`,
    })
  }

  // ── אריתמטיקה: נטו + מע״מ = ברוטו ────────────────────────
  if (d.netAmount != null && d.vatAmount != null && d.totalAmount != null) {
    const diff = Math.abs(d.netAmount + d.vatAmount - d.totalAmount)
    if (diff > 0.02) {
      flags.push({
        code: 'sum_mismatch',
        level: 'error',
        message: `הסכומים לא מסתדרים: ${money(d.netAmount)} + ${money(d.vatAmount)} ≠ ${money(d.totalAmount)}`,
      })
    }
  }

  // ── שיעור מע״מ סביר לתאריך המסמך ─────────────────────────
  if (d.docDate && d.netAmount != null && d.vatAmount != null && d.netAmount > 0) {
    const expected = vatRateOn(d.docDate)
    const actual = d.vatAmount / d.netAmount
    // מסמך יכול לכלול פטור או אפס אחוז, ולכן מע״מ אפס אינו שגיאה.
    if (d.vatAmount > 0 && Math.abs(actual - expected) > 0.01) {
      flags.push({
        code: 'vat_rate_unexpected',
        level: 'warn',
        message: `שיעור המע״מ במסמך ${(actual * 100).toFixed(1)}% במקום ${(expected * 100).toFixed(0)}%`,
      })
    }
  }

  // ── מספר הקצאה: הבדיקה ששווה כסף ─────────────────────────
  // הסף חל על סכום ללא מע״מ. אם אין נטו, ניפול לברוטו — עדיף
  // להתריע מיותר מאשר לפספס חשבונית שלא תזכה בניכוי.
  // בהוצאה זו שגיאה חוסמת: הניכוי שלנו על הכף. בהכנסה אנחנו
  // המנפיקים — מספר חסר הוא תקלה במערכת ההנפקה וסיכון של הלקוח,
  // ולכן מוצג ולא חוסם.
  if (d.docDate && d.docType && DOC_TYPES[d.docType].deductible) {
    const threshold = allocationThresholdOn(d.docDate)
    const base = d.netAmount ?? d.totalAmount
    if (threshold != null && base != null && base >= threshold) {
      if (!d.allocationNumber) {
        flags.push(
          direction === 'expense'
            ? {
                code: 'missing_allocation_number',
                level: 'error',
                message: `חשבונית על ${money(base)} ₪ מעל סף ${threshold.toLocaleString('he-IL')} ₪ ללא מספר הקצאה — לא תזכה בניכוי מס תשומות`,
              }
            : {
                code: 'missing_allocation_number_income',
                level: 'warn',
                message: `חשבונית שהנפקנו על ${money(base)} ₪ מעל הסף ללא מספר הקצאה — הלקוח לא יוכל לנכות. לבדוק במערכת ההנפקה`,
              },
        )
      } else if (!/^\d{9}$/.test(d.allocationNumber.replace(/\D/g, ''))) {
        flags.push({
          code: 'malformed_allocation_number',
          level: 'warn',
          message: `מספר ההקצאה ${d.allocationNumber} אינו בן 9 ספרות`,
        })
      }
    }
  }

  if (direction === 'expense') {
    // ── החשבונית חייבת להיות על שם העסק (סעיף 38) ──────────
    if (d.recipientTaxId && !sameTaxId(d.recipientTaxId, ctx.businessTaxId)) {
      flags.push({
        code: 'recipient_not_business',
        level: 'warn',
        message: 'המסמך אינו על שם העסק — ניכוי מס התשומות עלול להיפסל',
      })
    }

    // ── סוג מסמך שאינו מזכה בניכוי ─────────────────────────
    if (d.docType && !DOC_TYPES[d.docType].deductible) {
      flags.push({
        code: 'doc_type_not_deductible',
        level: 'info',
        message: `${DOC_TYPES[d.docType].he} אינה מזכה בניכוי מס תשומות בפני עצמה`,
      })
    }
  } else {
    // ── הכנסה: המנפיק חייב להיות העסק ──────────────────────
    if (d.supplierTaxId && !sameTaxId(d.supplierTaxId, ctx.businessTaxId)) {
      flags.push({
        code: 'issuer_not_business',
        level: 'error',
        message: 'המנפיק במסמך אינו העסק — זו אינה הכנסה שלנו',
      })
    }
    if (!d.supplierTaxId) {
      flags.push({ code: 'missing_issuer_taxid', level: 'warn', message: 'חסר ח.פ. המנפיק' })
    }
    // ח.פ. לקוח חסר אינו חוסם: קבלה ללקוח פרטי לגיטימית בלעדיו.
    if (!d.recipientTaxId) {
      flags.push({
        code: 'missing_customer_taxid',
        level: 'warn',
        message: 'חסר ח.פ. הלקוח. תקין ללקוח פרטי',
      })
    }
    if (d.docType === 'receipt') {
      flags.push({
        code: 'receipt_only_income',
        level: 'info',
        message: 'קבלה בלבד. תיעוד תשלום, לא חשבונית מס',
      })
    }
  }

  // ── מטבע ─────────────────────────────────────────────────
  if (d.currency && d.currency !== 'ILS') {
    flags.push({
      code: 'foreign_currency',
      level: 'info',
      message: `מסמך במטבע ${d.currency} — דורש טיפול נפרד`,
    })
  }

  return flags
}

export type DirectionVerdict = Direction | 'unclear'

/**
 * ההכרעה היחידה שלא ניתנת להטעיה: מי מופיע במסמך כמנפיק ומי כנמען.
 * שולח המייל לא נחשב כאן — רק ההשוואה לח.פ. של העסק.
 */
export function classifyDirection(
  d: Pick<DocumentFacts, 'supplierTaxId' | 'recipientTaxId'>,
  businessTaxId: string,
): { verdict: DirectionVerdict; reason: string } {
  const issuerIsUs = sameTaxId(d.supplierTaxId, businessTaxId)
  const recipientIsUs = sameTaxId(d.recipientTaxId, businessTaxId)

  if (issuerIsUs && !recipientIsUs) {
    return { verdict: 'income', reason: 'אנחנו המנפיקים — הכנסה' }
  }
  if (recipientIsUs && !issuerIsUs) {
    return { verdict: 'expense', reason: 'המסמך על שמנו וספק אחר הנפיק אותו' }
  }
  if (issuerIsUs && recipientIsUs) {
    return { verdict: 'unclear', reason: 'גם המנפיק וגם הנמען זוהו כאלגריה' }
  }
  return { verdict: 'unclear', reason: 'ח.פ. של אלגריה לא זוהה באף צד של המסמך' }
}

export const hasBlockingFlag = (flags: ValidationFlag[]): boolean =>
  flags.some((f) => f.level === 'error')

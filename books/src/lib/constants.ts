// ============================================================
//  קבועים רגולטוריים.
//  כל ערך כאן משתנה בחקיקה, ולכן הכל מתוארך: מסמך מ-2025 נבדק
//  מול הכללים שהיו בתוקף ב-2025, לא מול אלה של היום.
// ============================================================

/** שיעורי מע״מ לפי תאריך תחילה. ממוין מהחדש לישן. */
export const VAT_RATES: ReadonlyArray<{ from: string; rate: number }> = [
  { from: '2025-01-01', rate: 0.18 },
  { from: '2000-01-01', rate: 0.17 },
]

export function vatRateOn(isoDate: string): number {
  const hit = VAT_RATES.find((r) => isoDate >= r.from)
  return hit ? hit.rate : 0.18
}

// ============================================================
//  מודל "חשבוניות ישראל" — סף מספר הקצאה, בשקלים ללא מע״מ.
//  לוח הזמנים הואץ בחוק ההסדרים 2026: הסף ירד ל-10,000 בינואר
//  2026 ול-5,000 ביוני 2026. אתרים רבים עדיין מציגים 15,000
//  לשנת 2026 — זה הלוח המקורי, לפני התיקון.
//
//  חשבונית ספק מעל הסף בלי מספר הקצאה תקף אינה מזכה בניכוי
//  מס תשומות, גם אם היא תקינה מכל בחינה אחרת.
// ============================================================
export const ALLOCATION_THRESHOLDS: ReadonlyArray<{ from: string; amount: number }> = [
  { from: '2026-06-01', amount: 5_000 },
  { from: '2026-01-01', amount: 10_000 },
  { from: '2025-01-01', amount: 20_000 },
  { from: '2024-05-05', amount: 25_000 },
]

/** הסף בתוקף בתאריך המסמך. null = לפני שהמודל נכנס לתוקף. */
export function allocationThresholdOn(isoDate: string): number | null {
  const hit = ALLOCATION_THRESHOLDS.find((t) => isoDate >= t.from)
  return hit ? hit.amount : null
}

// ============================================================
//  סוגי מסמכים. רק חשבונית מס וחשבונית מס-קבלה מזכות בניכוי
//  מס תשומות — חשבונית עסקה וקבלה בפני עצמן לא.
// ============================================================
export const DOC_TYPES = {
  tax_invoice: { he: 'חשבונית מס', deductible: true },
  tax_invoice_receipt: { he: 'חשבונית מס-קבלה', deductible: true },
  receipt: { he: 'קבלה', deductible: false },
  proforma: { he: 'חשבונית עסקה', deductible: false },
  credit_note: { he: 'חשבונית זיכוי', deductible: true },
  delivery_note: { he: 'תעודת משלוח', deductible: false },
  other: { he: 'אחר', deductible: false },
} as const

export type DocType = keyof typeof DOC_TYPES

export const isDocType = (v: unknown): v is DocType =>
  typeof v === 'string' && v in DOC_TYPES

// ============================================================
//  מה המסמך הזה בכלל.
//
//  DOC_TYPES למעלה מתאר סוגי מס. הטקסונומיה כאן רחבה יותר
//  ומכסה גם את מה שאינו מסמך פיננסי — כי הכשל שהמערכת נועדה
//  למנוע הוא בדיוק זה: הצעת מחיר או תעודת משלוח שנרשמות
//  כהוצאה.
//
//  family:
//    tax      — מסמך מס סופי. ממשיך במסלול הרגיל.
//    interim  — פיננסי אך לא סופי. נשמר, לא נספר בדוחות.
//    other    — אינו מסמך פיננסי. נדחה עם סיבה, לא נמחק.
//
//  docType: המיפוי לסוג המס, למסמכים מהמשפחה הראשונה בלבד.
// ============================================================
export const DOC_KINDS = {
  // ── מסמכי מס סופיים ──────────────────────────────────────
  tax_invoice: { he: 'חשבונית מס', family: 'tax', docType: 'tax_invoice' },
  tax_invoice_receipt: { he: 'חשבונית מס-קבלה', family: 'tax', docType: 'tax_invoice_receipt' },
  receipt: { he: 'קבלה', family: 'tax', docType: 'receipt' },
  credit_note: { he: 'חשבונית זיכוי', family: 'tax', docType: 'credit_note' },
  foreign_invoice: { he: 'חשבונית מחו״ל', family: 'tax', docType: 'tax_invoice' },

  // ── פיננסי, אך לא מסמך מס סופי ───────────────────────────
  proforma: { he: 'חשבון עסקה', family: 'interim', docType: 'proforma' },
  payment_demand: { he: 'דרישת תשלום', family: 'interim', docType: 'proforma' },
  invoice_for_payment: { he: 'חשבון לתשלום', family: 'interim', docType: 'proforma' },

  // ── אינו מסמך פיננסי ─────────────────────────────────────
  quote: { he: 'הצעת מחיר', family: 'other', docType: null },
  purchase_order: { he: 'הזמנת רכש', family: 'other', docType: null },
  order_confirmation: { he: 'אישור הזמנה', family: 'other', docType: null },
  delivery_note: { he: 'תעודת משלוח', family: 'other', docType: 'delivery_note' },
  packing_list: { he: 'תעודת אריזה', family: 'other', docType: null },
  contract: { he: 'חוזה או הסכם', family: 'other', docType: null },
  report: { he: 'דוח', family: 'other', docType: null },
  bank_statement: { he: 'דף חשבון בנק', family: 'other', docType: null },
  marketing: { he: 'חומר שיווקי', family: 'other', docType: null },
  catalog: { he: 'קטלוג', family: 'other', docType: null },
  menu: { he: 'תפריט', family: 'other', docType: null },
  travel_document: { he: 'כרטיס טיסה או שובר', family: 'other', docType: null },
  screenshot: { he: 'צילום מסך', family: 'other', docType: null },
  signature_or_logo: { he: 'לוגו או חתימת מייל', family: 'other', docType: null },
  unknown: { he: 'לא זוהה', family: 'other', docType: null },
} as const

export type DocKind = keyof typeof DOC_KINDS
export type DocFamily = (typeof DOC_KINDS)[DocKind]['family']

export const isDocKind = (v: unknown): v is DocKind =>
  typeof v === 'string' && v in DOC_KINDS

export const familyOf = (kind: string | null): DocFamily | null =>
  isDocKind(kind) ? DOC_KINDS[kind].family : null

/** סוג המס הנגזר מהזיהוי. null לכל מה שאינו מסמך מס. */
export const docTypeForKind = (kind: string | null): DocType | null => {
  if (!isDocKind(kind)) return null
  const mapped = DOC_KINDS[kind].docType
  return mapped && isDocType(mapped) ? mapped : null
}

// ============================================================
//  קטגוריות הוצאה, עם כללי הניכוי הרלוונטיים לעסק הסעדה.
//  vatDeductible=false פירושו שגם אם המסמך תקין, אין לנכות
//  את מס התשומות שלו.
// ============================================================
export const EXPENSE_CATEGORIES = {
  food_raw: { he: 'חומרי גלם ומזון', vatDeductible: true },
  packaging: { he: 'אריזות וחד-פעמי', vatDeductible: true },
  kitchen_equipment: { he: 'ציוד מטבח', vatDeductible: true },
  rent: { he: 'שכירות', vatDeductible: true },
  utilities: { he: 'חשמל, מים, גז', vatDeductible: true },
  vehicle: { he: 'רכב והובלה', vatDeductible: true, note: 'תקנה 18 — ניכוי חלקי לפי שימוש עסקי' },
  salaries_services: { he: 'שכר ושירותים', vatDeductible: true },
  marketing: { he: 'שיווק ופרסום', vatDeductible: true },
  professional: { he: 'שירותים מקצועיים', vatDeductible: true },
  hospitality: { he: 'אירוח', vatDeductible: false, note: 'תקנה 16 — אין ניכוי' },
  meals: { he: 'ארוחות ומסעדות', vatDeductible: false, note: 'תקנה 15א — אין ניכוי' },
  other: { he: 'אחר', vatDeductible: true },
} as const

export type ExpenseCategory = keyof typeof EXPENSE_CATEGORIES

export const isExpenseCategory = (v: unknown): v is ExpenseCategory =>
  typeof v === 'string' && v in EXPENSE_CATEGORIES

// ============================================================
//  שמירה: 7 שנים מתום שנת המס, או 6 שנים מהגשת הדוח — המאוחר
//  מביניהם (סעיף 25 להוראות ניהול פנקסי חשבונות). המערכת לא
//  מוחקת דבר אוטומטית; הקבוע כאן משמש להצגה בלבד.
// ============================================================
export const RETENTION_YEARS_FROM_TAX_YEAR_END = 7

/** גודל מינימלי לקובץ מצורף. מתחת לזה — לוגו בחתימה, לא מסמך. */
export const MIN_ATTACHMENT_BYTES = 20 * 1024

export const ACCEPTED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
  'image/webp',
] as const

export const isAcceptedMime = (m: string): boolean =>
  (ACCEPTED_MIME as readonly string[]).includes(m)

export const EXT_BY_MIME: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'image/webp': 'webp',
}

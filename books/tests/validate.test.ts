import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  isValidIsraeliTaxId,
  sameTaxId,
  validateDocument,
  classifyDirection,
  hasBlockingFlag,
  type DocumentFacts,
} from '../src/lib/validate'
import { vatRateOn, allocationThresholdOn } from '../src/lib/constants'

const ALEGRIA = '514999994' // ח.פ. בדיקה תקין, משמש כעסק שלנו בטסטים
const has = (flags: { code: string }[], code: string) => flags.some((f) => f.code === code)

describe('ספרת ביקורת של ח.פ.', () => {
  test('מקבל מספרי חברות אמיתיים', () => {
    // שני מספרים ציבוריים ומוכרים, כדי לאמת את האלגוריתם מול המציאות
    assert.ok(isValidIsraeliTaxId('520000118'), 'בנק הפועלים')
    assert.ok(isValidIsraeliTaxId('520013954'), 'טבע')
    assert.ok(isValidIsraeliTaxId(ALEGRIA))
  })

  test('פוסל מספר עם ספרה אחת שונה', () => {
    assert.equal(isValidIsraeliTaxId('520000119'), false)
    assert.equal(isValidIsraeliTaxId('520013955'), false)
  })

  test('מתעלם ממקפים, רווחים ואפסים מובילים', () => {
    assert.ok(isValidIsraeliTaxId('52-000-0118'))
    assert.ok(isValidIsraeliTaxId(' 520000118 '))
    assert.ok(isValidIsraeliTaxId('0520000118'.slice(1)))
  })

  test('פוסל קלט ריק, לא-מספרי או ארוך מדי', () => {
    assert.equal(isValidIsraeliTaxId(''), false)
    assert.equal(isValidIsraeliTaxId(null), false)
    assert.equal(isValidIsraeliTaxId('abc'), false)
    assert.equal(isValidIsraeliTaxId('1234567890'), false)
  })
})

describe('השוואת מזהי עוסק', () => {
  test('מנרמל מקפים ואפסים מובילים', () => {
    assert.ok(sameTaxId('514999994', '5-1499-9994'))
    assert.ok(sameTaxId('0514999994', '514999994'))
  })
  test('לא מזהה ריק כשווה', () => {
    assert.equal(sameTaxId('', ''), false)
    assert.equal(sameTaxId(null, '514999995'), false)
  })
})

describe('קבועים מתוארכים', () => {
  test('שיעור מע״מ לפי תאריך המסמך', () => {
    assert.equal(vatRateOn('2024-06-01'), 0.17)
    assert.equal(vatRateOn('2025-01-01'), 0.18)
    assert.equal(vatRateOn('2026-08-01'), 0.18)
  })

  test('סף מספר ההקצאה יורד לפי הלוח המעודכן', () => {
    assert.equal(allocationThresholdOn('2024-06-01'), 25_000)
    assert.equal(allocationThresholdOn('2025-03-01'), 20_000)
    assert.equal(allocationThresholdOn('2026-03-01'), 10_000)
    assert.equal(allocationThresholdOn('2026-08-01'), 5_000)
    assert.equal(allocationThresholdOn('2023-01-01'), null)
  })
})

const base: DocumentFacts = {
  docType: 'tax_invoice',
  docDate: '2026-07-14',
  supplierTaxId: '520000118',
  recipientTaxId: ALEGRIA,
  netAmount: 1000,
  vatAmount: 180,
  totalAmount: 1180,
  currency: 'ILS',
  allocationNumber: null,
}
const ctx = { businessTaxId: ALEGRIA, today: '2026-08-01' }

describe('ולידציית מסמך', () => {
  test('חשבונית תקינה מתחת לסף עוברת נקייה', () => {
    const flags = validateDocument(base, ctx)
    assert.equal(hasBlockingFlag(flags), false, JSON.stringify(flags))
  })

  test('סכומים שלא מסתדרים נתפסים', () => {
    const flags = validateDocument({ ...base, totalAmount: 1200 }, ctx)
    assert.ok(has(flags, 'sum_mismatch'))
    assert.ok(hasBlockingFlag(flags))
  })

  test('סטייה של אגורה אחת מתקבלת, של עשר אגורות נפסלת', () => {
    assert.equal(has(validateDocument({ ...base, totalAmount: 1180.01 }, ctx), 'sum_mismatch'), false)
    assert.ok(has(validateDocument({ ...base, totalAmount: 1180.1 }, ctx), 'sum_mismatch'))
  })

  test('חשבונית מעל הסף בלי מספר הקצאה חוסמת', () => {
    const flags = validateDocument({ ...base, netAmount: 6000, vatAmount: 1080, totalAmount: 7080 }, ctx)
    assert.ok(has(flags, 'missing_allocation_number'))
    assert.ok(hasBlockingFlag(flags))
  })

  test('אותה חשבונית עם מספר הקצאה תקין עוברת', () => {
    const flags = validateDocument(
      { ...base, netAmount: 6000, vatAmount: 1080, totalAmount: 7080, allocationNumber: '123456789' },
      ctx,
    )
    assert.equal(has(flags, 'missing_allocation_number'), false)
    assert.equal(hasBlockingFlag(flags), false, JSON.stringify(flags))
  })

  test('הסף נבדק מול תאריך המסמך, לא מול היום', () => {
    // 6,000 ₪ במרץ 2026 היה מתחת לסף של 10,000 — אין דרישת הקצאה
    const flags = validateDocument(
      { ...base, docDate: '2026-03-10', netAmount: 6000, vatAmount: 1080, totalAmount: 7080 },
      ctx,
    )
    assert.equal(has(flags, 'missing_allocation_number'), false)
  })

  test('קבלה אינה נדרשת למספר הקצאה ומסומנת כלא מזכה בניכוי', () => {
    const flags = validateDocument(
      { ...base, docType: 'receipt', netAmount: 9000, vatAmount: 1620, totalAmount: 10620 },
      ctx,
    )
    assert.equal(has(flags, 'missing_allocation_number'), false)
    assert.ok(has(flags, 'doc_type_not_deductible'))
  })

  test('ח.פ. ספק עם ספרת ביקורת שגויה חוסם', () => {
    const flags = validateDocument({ ...base, supplierTaxId: '520000119' }, ctx)
    assert.ok(has(flags, 'invalid_supplier_taxid'))
    assert.ok(hasBlockingFlag(flags))
  })

  test('תאריך עתידי חוסם', () => {
    const flags = validateDocument({ ...base, docDate: '2026-12-31' }, ctx)
    assert.ok(has(flags, 'future_date'))
  })

  test('מסמך על שם מישהו אחר מסומן', () => {
    const flags = validateDocument({ ...base, recipientTaxId: '520000118' }, ctx)
    assert.ok(has(flags, 'recipient_not_business'))
  })

  test('שיעור מע״מ חריג מסומן אך לא חוסם', () => {
    const flags = validateDocument({ ...base, vatAmount: 100, totalAmount: 1100 }, ctx)
    assert.ok(has(flags, 'vat_rate_unexpected'))
    assert.equal(flags.find((f) => f.code === 'vat_rate_unexpected')?.level, 'warn')
  })

  test('מע״מ אפס אינו נחשב שיעור חריג', () => {
    const flags = validateDocument({ ...base, vatAmount: 0, totalAmount: 1000 }, ctx)
    assert.equal(has(flags, 'vat_rate_unexpected'), false)
  })

  test('שדות חסרים נתפסים', () => {
    const flags = validateDocument(
      { ...base, docDate: null, supplierTaxId: null, totalAmount: null, docType: null },
      ctx,
    )
    for (const code of ['missing_date', 'missing_supplier_taxid', 'missing_total', 'missing_doc_type']) {
      assert.ok(has(flags, code), `ציפיתי ל-${code}`)
    }
  })
})

describe('סיווג הוצאה מול הכנסה', () => {
  test('ספק הנפיק לנו — הוצאה', () => {
    const r = classifyDirection({ supplierTaxId: '520000118', recipientTaxId: ALEGRIA }, ALEGRIA)
    assert.equal(r.verdict, 'expense')
  })

  test('אנחנו הנפקנו ללקוח — הכנסה', () => {
    const r = classifyDirection({ supplierTaxId: ALEGRIA, recipientTaxId: '520000118' }, ALEGRIA)
    assert.equal(r.verdict, 'income')
  })

  test('אף צד לא זוהה — לא מכריעים לבד', () => {
    const r = classifyDirection({ supplierTaxId: '520000118', recipientTaxId: '520013954' }, ALEGRIA)
    assert.equal(r.verdict, 'unclear')
  })

  test('חסר ח.פ. נמען — לא מכריעים לבד', () => {
    const r = classifyDirection({ supplierTaxId: '520000118', recipientTaxId: null }, ALEGRIA)
    assert.equal(r.verdict, 'unclear')
  })

  test('שני הצדדים אלגריה — לא מכריעים לבד', () => {
    const r = classifyDirection({ supplierTaxId: ALEGRIA, recipientTaxId: ALEGRIA }, ALEGRIA)
    assert.equal(r.verdict, 'unclear')
  })
})

describe('ולידציה בצד ההכנסות', () => {
  const incomeCtx = { ...ctx, direction: 'income' as const }
  const income = {
    ...base,
    supplierTaxId: ALEGRIA,
    recipientTaxId: '520000118',
  }

  test('חשבונית שהנפקנו ללקוח עסקי — בלי דגלים חוסמים', () => {
    const flags = validateDocument(income, incomeCtx)
    assert.equal(flags.filter((f) => f.level === 'error').length, 0)
  })

  test('המנפיק אינו העסק — שגיאה חוסמת', () => {
    const flags = validateDocument({ ...income, supplierTaxId: '520000118' }, incomeCtx)
    assert.ok(has(flags, 'issuer_not_business'))
  })

  test('ח.פ. לקוח חסר — אזהרה בלבד, לקוח פרטי לגיטימי', () => {
    const flags = validateDocument({ ...income, recipientTaxId: null }, incomeCtx)
    const flag = flags.find((f) => f.code === 'missing_customer_taxid')
    assert.equal(flag?.level, 'warn')
    assert.equal(flags.filter((f) => f.level === 'error').length, 0)
  })

  test('מעל הסף בלי מספר הקצאה — אזהרה, לא חסימה: אנחנו המנפיקים', () => {
    const flags = validateDocument(
      { ...income, netAmount: 6000, vatAmount: 1080, totalAmount: 7080 },
      incomeCtx,
    )
    const flag = flags.find((f) => f.code === 'missing_allocation_number_income')
    assert.equal(flag?.level, 'warn')
    assert.ok(!has(flags, 'missing_allocation_number'))
  })

  test('בדיקות ההוצאה לא דולפות להכנסה', () => {
    const flags = validateDocument(income, incomeCtx)
    assert.ok(!has(flags, 'recipient_not_business'))
    assert.ok(!has(flags, 'missing_supplier_taxid'))
  })

  test('קבלה בהכנסה מסומנת כתיעוד תשלום בלבד', () => {
    const flags = validateDocument({ ...income, docType: 'receipt' }, incomeCtx)
    assert.ok(has(flags, 'receipt_only_income'))
  })
})

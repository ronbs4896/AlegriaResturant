import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { decide, CONFIDENCE_THRESHOLD } from '../src/lib/pipeline'
import type { ExtractedFields } from '../src/lib/extract'

const ALEGRIA = '514999994'
const SUPPLIER = '520000118'
const TODAY = '2026-08-01'

// תשובת חילוץ תקינה. כל בדיקה משנה ממנה שדה אחד, כך שברור
// מה בדיוק גרם לתוצאה.
const clean: ExtractedFields = {
  doc_type: 'tax_invoice',
  supplier_name: 'חברת החשמל',
  supplier_tax_id: SUPPLIER,
  recipient_name: 'קייטרינג אלגריה',
  recipient_tax_id: ALEGRIA,
  doc_number: '20315',
  doc_date: '2026-07-14',
  net_amount: 1000,
  vat_amount: 180,
  total_amount: 1180,
  currency: 'ILS',
  allocation_number: null,
  payment_method: 'העברה בנקאית',
  expense_category: 'utilities',
  confidence: 0.96,
  notes: null,
}

const run = (over: Partial<ExtractedFields>) =>
  decide({ ...clean, ...over }, ALEGRIA, TODAY)

describe('הכרעת הצינור', () => {
  test('חשבונית ספק תקינה מתחת לסף — מאושרת אוטומטית', () => {
    const r = run({})
    assert.equal(r.status, 'approved')
    assert.equal(r.flags.filter((f) => f.level === 'error').length, 0)
  })

  test('חשבונית ספק מסומנת כהוצאה', () => {
    const r = run({})
    assert.equal(r.direction, 'expense')
  })

  test('חשבונית מעל 5,000 בלי מספר הקצאה — לבדיקה, לא לאישור', () => {
    const r = run({ net_amount: 6000, vat_amount: 1080, total_amount: 7080 })
    assert.equal(r.status, 'review')
    assert.match(r.reason, /מספר הקצאה/)
  })

  test('אותה חשבונית עם מספר הקצאה — מאושרת', () => {
    const r = run({
      net_amount: 6000,
      vat_amount: 1080,
      total_amount: 7080,
      allocation_number: '123456789',
    })
    assert.equal(r.status, 'approved')
  })

  test('ביטחון נמוך שולח לבדיקה גם כשהכל תקין', () => {
    const r = run({ confidence: CONFIDENCE_THRESHOLD - 0.01 })
    assert.equal(r.status, 'review')
    assert.match(r.reason, /אינה ודאית/)
  })

  test('ביטחון בדיוק על הסף מאושר', () => {
    assert.equal(run({ confidence: CONFIDENCE_THRESHOLD }).status, 'approved')
  })

  test('סכומים שלא מסתדרים — לבדיקה', () => {
    const r = run({ total_amount: 1200 })
    assert.equal(r.status, 'review')
    assert.match(r.reason, /לא מסתדרים/)
  })

  test('ח.פ. שלא עובר ספרת ביקורת — לבדיקה', () => {
    assert.equal(run({ supplier_tax_id: '520000119' }).status, 'review')
  })

  test('ח.פ. של אלגריה לא זוהה באף צד — לא מכריעים לבד', () => {
    const r = run({ recipient_tax_id: '520013954' })
    assert.equal(r.status, 'review')
    assert.equal(r.direction, null)
  })

  test('חסר ח.פ. נמען — לבדיקה ולא אישור', () => {
    assert.equal(run({ recipient_tax_id: null }).status, 'review')
  })

  test('מסמך ריק לגמרי — לבדיקה, לא קורס', () => {
    const r = decide(
      {
        ...clean,
        doc_type: null,
        supplier_tax_id: null,
        recipient_tax_id: null,
        doc_date: null,
        net_amount: null,
        vat_amount: null,
        total_amount: null,
        allocation_number: null,
        confidence: 0.2,
      },
      ALEGRIA,
      TODAY,
    )
    assert.equal(r.status, 'review')
  })

  test('שום מסמך לא מאושר עם דגל חוסם — הכלל שלא נשבר', () => {
    const cases: Partial<ExtractedFields>[] = [
      { total_amount: 1200 },
      { supplier_tax_id: '520000119' },
      { doc_date: '2026-12-31' },
      { net_amount: 6000, vat_amount: 1080, total_amount: 7080 },
      { doc_date: null },
      { total_amount: null },
    ]
    for (const c of cases) {
      const r = run(c)
      const blocking = r.flags.filter((f) => f.level === 'error')
      if (blocking.length > 0) {
        assert.notEqual(r.status, 'approved', `אושר למרות ${blocking[0]?.code}`)
      }
    }
  })

  test('קבלה מזוהה כלא מזכה בניכוי אך עדיין נכנסת לתיק', () => {
    const r = run({ doc_type: 'receipt' })
    assert.equal(r.status, 'approved')
    assert.ok(r.flags.some((f) => f.code === 'doc_type_not_deductible'))
  })
})

// חשבוניות שהעסק הנפיק: נרשמות כהכנסה באותו מסלול, לא נזרקות.
const income = (over: Partial<ExtractedFields>) =>
  run({
    supplier_name: 'קייטרינג אלגריה',
    supplier_tax_id: ALEGRIA,
    recipient_name: 'מפעל הצפון בע״מ',
    recipient_tax_id: SUPPLIER,
    expense_category: null,
    ...over,
  })

describe('הכרעת הצינור — צד ההכנסות', () => {
  test('חשבונית שהנפקנו ללקוח עסקי — מאושרת כהכנסה', () => {
    const r = income({})
    assert.equal(r.status, 'approved')
    assert.equal(r.direction, 'income')
  })

  test('הכנסה מעל הסף בלי מספר הקצאה — מאושרת עם אזהרה', () => {
    const r = income({ net_amount: 6000, vat_amount: 1080, total_amount: 7080 })
    assert.equal(r.status, 'approved')
    assert.ok(r.flags.some((f) => f.code === 'missing_allocation_number_income'))
  })

  test('קבלה ללקוח פרטי בלי ח.פ. — הכנסה מאושרת: המנפיק לבדו מכריע', () => {
    const r = income({ doc_type: 'receipt', recipient_tax_id: null, recipient_name: 'לקוח פרטי' })
    assert.equal(r.status, 'approved')
    assert.equal(r.direction, 'income')
    assert.ok(r.flags.some((f) => f.code === 'missing_customer_taxid'))
  })

  test('סכומים שלא מסתדרים חוסמים גם הכנסה', () => {
    const r = income({ total_amount: 9999 })
    assert.equal(r.status, 'review')
    assert.equal(r.direction, 'income')
  })

  test('ביטחון נמוך שולח הכנסה לבדיקה', () => {
    const r = income({ confidence: 0.5 })
    assert.equal(r.status, 'review')
  })
})

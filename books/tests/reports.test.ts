import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  isVatDeductible,
  lastNMonths,
  shiftMonth,
  vatPeriodMonths,
  yearMonths,
  foldMonths,
  sumSummaries,
  vatPosition,
  resolveReportPeriod,
  shiftReportPeriod,
  foldByCategory,
  foldByParty,
  type TotalsRow,
} from '../src/lib/reports'

describe('מטריצת הניכוי', () => {
  test('חשבונית מס על חומרי גלם — מוכר', () => {
    assert.equal(isVatDeductible('tax_invoice', 'food_raw'), true)
  })
  test('קבלה — לא מוכר, גם על קטגוריה מוכרת', () => {
    assert.equal(isVatDeductible('receipt', 'food_raw'), false)
  })
  test('חשבונית מס על אירוח — לא מוכר (תקנה 16)', () => {
    assert.equal(isVatDeductible('tax_invoice', 'hospitality'), false)
  })
  test('בלי קטגוריה — סוג המסמך מכריע', () => {
    assert.equal(isVatDeductible('tax_invoice', null), true)
    assert.equal(isVatDeductible(null, 'food_raw'), false)
  })
})

describe('חשבון תקופות', () => {
  test('שישה חודשים אחרונים, מהישן לחדש', () => {
    const months = lastNMonths(6, new Date('2026-08-02T00:00:00Z'))
    assert.deepEqual(months, ['2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'])
  })

  test('מעבר שנה לא שובר את הרצף', () => {
    const months = lastNMonths(3, new Date('2026-01-15T00:00:00Z'))
    assert.deepEqual(months, ['2025-11', '2025-12', '2026-01'])
    assert.equal(shiftMonth('2026-01', -1), '2025-12')
    assert.equal(shiftMonth('2025-12', 1), '2026-01')
  })

  test('תקופות מע״מ דו-חודשיות', () => {
    assert.deepEqual(vatPeriodMonths(2026, 1), ['2026-01', '2026-02'])
    assert.deepEqual(vatPeriodMonths(2026, 4), ['2026-07', '2026-08'])
    assert.deepEqual(vatPeriodMonths(2026, 6), ['2026-11', '2026-12'])
    assert.deepEqual(vatPeriodMonths(2026, 7), [])
  })

  test('שנה שלמה — 12 חודשים', () => {
    const months = yearMonths(2026)
    assert.equal(months.length, 12)
    assert.equal(months[0], '2026-01')
    assert.equal(months[11], '2026-12')
  })
})

const row = (over: Partial<TotalsRow>): TotalsRow => ({
  period: '2026-07',
  direction: 'expense',
  docType: 'tax_invoice',
  category: 'food_raw',
  partyTaxId: null,
  partyName: null,
  net: 1000,
  vat: 180,
  total: 1180,
  count: 1,
  ...over,
})

describe('קיפול חודשים ועמדת מע״מ', () => {
  test('הכנסות והוצאות נצברות בנפרד, וחודש ריק נשאר אפס', () => {
    const folded = foldMonths(
      [
        row({}),
        row({ direction: 'income', docType: 'tax_invoice', category: null, net: 5000, vat: 900, total: 5900 }),
      ],
      ['2026-06', '2026-07'],
    )
    assert.equal(folded[0]?.income.total, 0)
    assert.equal(folded[1]?.income.total, 5900)
    assert.equal(folded[1]?.expense.total, 1180)
  })

  test('מס תשומות שאינו מוכר לא נכנס לעמדת המע״מ', () => {
    const folded = foldMonths(
      [
        row({ vat: 180 }), // מוכר
        row({ category: 'hospitality', vat: 90 }), // לא מוכר
        row({ direction: 'income', category: null, vat: 900 }),
      ],
      ['2026-07'],
    )
    const m = folded[0]!
    assert.equal(m.deductibleInputVat, 180)
    assert.equal(vatPosition(m), 900 - 180)
  })

  test('עמדת מע״מ שלילית = החזר', () => {
    const folded = foldMonths([row({ vat: 500 })], ['2026-07'])
    assert.ok(vatPosition(folded[0]!) < 0)
  })

  test('כיוון לא מוכרע לא נספר בשום צד', () => {
    const folded = foldMonths([row({ direction: null })], ['2026-07'])
    assert.equal(folded[0]?.expense.count, 0)
    assert.equal(folded[0]?.income.count, 0)
  })

  test('סיכום תקופה מחבר חודשים', () => {
    const folded = foldMonths(
      [row({}), row({ period: '2026-08', direction: 'income', category: null, vat: 900 })],
      ['2026-07', '2026-08'],
    )
    const total = sumSummaries(folded)
    assert.equal(total.expense.count, 1)
    assert.equal(total.income.count, 1)
    assert.equal(vatPosition(total), 900 - 180)
  })
})

describe('בורר תקופת הדוח', () => {
  const now = new Date('2026-08-02T00:00:00Z')

  test('ברירת מחדל: החודש הנוכחי', () => {
    const p = resolveReportPeriod(undefined, undefined, now)
    assert.equal(p.mode, 'month')
    assert.deepEqual(p.months, ['2026-08'])
  })

  test('תקופת מע״מ נוכחית: אוגוסט שייך ל-P4', () => {
    const p = resolveReportPeriod('vat', undefined, now)
    assert.equal(p.key, '2026-P4')
    assert.deepEqual(p.months, ['2026-07', '2026-08'])
  })

  test('שנה מלאה', () => {
    const p = resolveReportPeriod('year', '2025', now)
    assert.equal(p.months.length, 12)
    assert.equal(p.months[0], '2025-01')
  })

  test('מפתח פגום נופל לתקופה הנוכחית, לא לשגיאה', () => {
    assert.equal(resolveReportPeriod('month', 'garbage', now).key, '2026-08')
    assert.equal(resolveReportPeriod('vat', '2026-P9', now).key, '2026-P4')
  })

  test('מעבר תקופת מע״מ חוצה שנה', () => {
    const p1 = resolveReportPeriod('vat', '2026-P1', now)
    assert.equal(shiftReportPeriod(p1, -1), '2025-P6')
    const p6 = resolveReportPeriod('vat', '2025-P6', now)
    assert.equal(shiftReportPeriod(p6, 1), '2026-P1')
  })
})

describe('קיפול לקטגוריות ולצדדים', () => {
  const rows: TotalsRow[] = [
    row({ category: 'food_raw', net: 1000, partyTaxId: '520000118', partyName: 'תנובה' }),
    row({ category: 'food_raw', net: 500, partyTaxId: '520013954', partyName: 'טבע' }),
    row({ category: 'hospitality', net: 200, partyTaxId: '520000118', partyName: 'תנובה' }),
    row({
      direction: 'income',
      category: null,
      net: 9000,
      total: 10620,
      partyTaxId: '515044111',
      partyName: 'מפעל הצפון',
    }),
  ]

  test('קטגוריות: הוצאות בלבד, ממוינות מהגדולה לקטנה', () => {
    const cats = foldByCategory(rows)
    assert.equal(cats.length, 2)
    assert.equal(cats[0]?.category, 'food_raw')
    assert.equal(cats[0]?.net, 1500)
  })

  test('ריכוז ספקים מאחד לפי ח.פ. וכולל רק הוצאות', () => {
    const suppliers = foldByParty(rows, 'expense')
    assert.equal(suppliers.length, 2)
    const tnuva = suppliers.find((s) => s.taxId === '520000118')
    assert.equal(tnuva?.count, 2)
  })

  test('ריכוז לקוחות רואה רק הכנסות', () => {
    const customers = foldByParty(rows, 'income')
    assert.equal(customers.length, 1)
    assert.equal(customers[0]?.name, 'מפעל הצפון')
    assert.equal(customers[0]?.total, 10620)
  })
})

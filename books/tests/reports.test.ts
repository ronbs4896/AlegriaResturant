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

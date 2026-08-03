import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  parsePaymentTerms,
  computeDueDate,
  endOfMonth,
  addDays,
  describeTerms,
} from '../src/lib/terms'

describe('קריאת תנאי תשלום', () => {
  test('שוטף+30 הוא סוף חודש, לא תאריך המסמך', () => {
    assert.deepEqual(parsePaymentTerms('שוטף+30')?.basis, 'eom')
    assert.equal(parsePaymentTerms('שוטף+30')?.days, 30)
    assert.equal(parsePaymentTerms('שוטף + 60 יום')?.days, 60)
  })

  test('נטו נמדד מתאריך המסמך', () => {
    assert.equal(parsePaymentTerms('נטו 30')?.basis, 'net')
    assert.equal(parsePaymentTerms('net 45')?.basis, 'net')
    assert.equal(parsePaymentTerms('תוך 14 ימים')?.basis, 'net')
  })

  test('מספר לבדו נקרא כשוטף — זו ברירת המחדל המסחרית בעברית', () => {
    assert.equal(parsePaymentTerms('+30')?.basis, 'eom')
    assert.equal(parsePaymentTerms('60 יום')?.basis, 'eom')
  })

  test('מזומן ומיידי', () => {
    assert.equal(parsePaymentTerms('מזומן')?.basis, 'immediate')
    assert.equal(parsePaymentTerms('תשלום מיידי')?.basis, 'immediate')
    assert.equal(parsePaymentTerms('due on receipt')?.basis, 'immediate')
  })

  test('שוטף בלי מספר הוא סוף החודש עצמו', () => {
    assert.deepEqual(parsePaymentTerms('שוטף'), { basis: 'eom', days: 0, label: 'שוטף' })
  })

  test('טקסט בלי מידע מחזיר null, ולא ניחוש', () => {
    for (const v of [null, undefined, '', '   ', 'תודה רבה']) {
      assert.equal(parsePaymentTerms(v as never), null)
    }
  })
})

describe('חשבון תאריכים', () => {
  test('סוף חודש, כולל פברואר ושנה מעוברת', () => {
    assert.equal(endOfMonth('2026-01-15'), '2026-01-31')
    assert.equal(endOfMonth('2026-02-03'), '2026-02-28')
    assert.equal(endOfMonth('2024-02-03'), '2024-02-29')
    assert.equal(endOfMonth('2026-12-31'), '2026-12-31')
  })

  test('הוספת ימים חוצה חודש ושנה', () => {
    assert.equal(addDays('2026-01-31', 1), '2026-02-01')
    assert.equal(addDays('2026-12-31', 1), '2027-01-01')
  })

  test('תאריך פגום אינו מייצר תאריך', () => {
    assert.equal(endOfMonth('15/01/2026'), null)
    assert.equal(addDays('שלום', 5), null)
  })
})

describe('תאריך לתשלום', () => {
  test('שוטף+30 על חשבונית מ-3 באוגוסט הוא 30 בספטמבר', () => {
    assert.equal(computeDueDate('2026-08-03', { terms: 'שוטף+30' }), '2026-09-30')
  })

  test('אותה חשבונית בנטו 30 היא 2 בספטמבר — 28 יום הפרש', () => {
    assert.equal(computeDueDate('2026-08-03', { terms: 'נטו 30' }), '2026-09-02')
  })

  test('מיידי הוא תאריך המסמך', () => {
    assert.equal(computeDueDate('2026-08-03', { terms: 'מזומן' }), '2026-08-03')
  })

  test('תאריך מפורש על המסמך גובר על כל חישוב', () => {
    assert.equal(
      computeDueDate('2026-08-03', { explicit: '2026-08-20', terms: 'שוטף+90' }),
      '2026-08-20',
    )
  })

  test('כשהמסמך שותק, ברירת המחדל של הצד השני נכנסת', () => {
    assert.equal(
      computeDueDate('2026-08-03', { terms: null, fallbackTerms: 'שוטף+60' }),
      '2026-10-30',
    )
  })

  test('בלי תנאים ובלי תאריך מסמך אין תאריך לתשלום, ולא ניחוש', () => {
    assert.equal(computeDueDate('2026-08-03', {}), null)
    assert.equal(computeDueDate(null, { terms: 'שוטף+30' }), null)
  })
})

describe('תווית לתצוגה', () => {
  test('מנוסח קצר ואחיד', () => {
    assert.equal(describeTerms('שוטף + 30 יום'), 'שוטף+30')
    assert.equal(describeTerms('net 45'), 'נטו 45')
    assert.equal(describeTerms('מזומן'), 'מיידי')
  })

  test('טקסט שלא זוהה מוצג כפי שנכתב, ולא נעלם', () => {
    assert.equal(describeTerms('לפי סיכום טלפוני'), 'לפי סיכום טלפוני')
    assert.equal(describeTerms(null), null)
  })
})

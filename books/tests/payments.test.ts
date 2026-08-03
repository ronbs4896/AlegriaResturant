import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  impliesPaid,
  initialPaymentStatus,
  derivePaymentStatus,
  paymentFieldsFor,
  remainingAmount,
  isOverdue,
} from '../src/lib/payments'

describe('מה כבר שולם בעצם הנפקתו', () => {
  test('קבלה וחשבונית מס-קבלה', () => {
    assert.equal(impliesPaid('receipt'), true)
    assert.equal(impliesPaid('tax_invoice_receipt'), true)
  })

  test('חשבונית מס אינה ראיה לתשלום', () => {
    assert.equal(impliesPaid('tax_invoice'), false)
    assert.equal(impliesPaid('proforma'), false)
    assert.equal(impliesPaid(null), false)
  })

  test('זיכוי יוצא ממשוואת התזרים', () => {
    assert.equal(initialPaymentStatus('credit_note'), 'n/a')
    assert.equal(initialPaymentStatus('receipt'), 'paid')
    assert.equal(initialPaymentStatus('tax_invoice'), 'unpaid')
  })
})

describe('גזירת מצב תשלום מסכומים', () => {
  test('מלא, חלקי וריק', () => {
    assert.equal(derivePaymentStatus(1180, 1180), 'paid')
    assert.equal(derivePaymentStatus(1180, 500), 'partial')
    assert.equal(derivePaymentStatus(1180, 0), 'unpaid')
  })

  test('הפרש של אגורה אינו הופך חשבונית משולמת לחלקית', () => {
    assert.equal(derivePaymentStatus(1180, 1179.995), 'paid')
    assert.equal(derivePaymentStatus(1180, 1180.5), 'paid')
  })

  test('בלי סכום כולל, כל תשלום סוגר — אחרת אין דרך לסגור', () => {
    assert.equal(derivePaymentStatus(null, 100), 'paid')
    assert.equal(derivePaymentStatus(null, 0), 'unpaid')
  })

  test('"לא רלוונטי" נשמר: תשלום בודד לא הופך זיכוי לחוב', () => {
    assert.equal(derivePaymentStatus(1180, 1180, 'n/a'), 'n/a')
  })
})

describe('שדות התשלום אחרי חילוץ', () => {
  test('קבלה: שולמה בתאריך המסמך ואין לה תאריך יעד', () => {
    const r = paymentFieldsFor({ kind: 'receipt', docDate: '2026-08-03' })
    assert.equal(r.paymentStatus, 'paid')
    assert.equal(r.paidAt, '2026-08-03')
    assert.equal(r.dueDate, null)
  })

  test('חשבונית מס עם שוטף+30 מקבלת תאריך יעד מחושב', () => {
    const r = paymentFieldsFor({
      kind: 'tax_invoice',
      docDate: '2026-08-03',
      terms: 'שוטף+30',
    })
    assert.equal(r.paymentStatus, 'unpaid')
    assert.equal(r.dueDate, '2026-09-30')
  })

  test('תנאי הספק נכנסים כשהמסמך שותק', () => {
    const r = paymentFieldsFor({
      kind: 'tax_invoice',
      docDate: '2026-08-03',
      partyTerms: 'נטו 15',
    })
    assert.equal(r.dueDate, '2026-08-18')
  })

  test('בלי תנאים אין תאריך יעד — וזה מצב תקין, לא ברירת מחדל', () => {
    const r = paymentFieldsFor({ kind: 'tax_invoice', docDate: '2026-08-03' })
    assert.equal(r.dueDate, null)
    assert.equal(r.paymentStatus, 'unpaid')
  })
})

describe('נותר לתשלום ואיחור', () => {
  test('נותר = כולל פחות ששולם, ולעולם לא שלילי', () => {
    assert.equal(remainingAmount(1180, 500), 680)
    assert.equal(remainingAmount(1180, 2000), 0)
    assert.equal(remainingAmount(null, 500), 0)
  })

  test('מסמך שתאריכו היום עדיין בזמן', () => {
    const doc = { paymentStatus: 'unpaid', dueDate: '2026-08-03' }
    assert.equal(isOverdue(doc, '2026-08-03'), false)
    assert.equal(isOverdue(doc, '2026-08-04'), true)
  })

  test('מסמך בלי תאריך אינו באיחור — הוא במצב אחר', () => {
    assert.equal(isOverdue({ paymentStatus: 'unpaid', dueDate: null }, '2026-08-04'), false)
  })

  test('מה ששולם ומה שאינו רלוונטי לעולם לא באיחור', () => {
    assert.equal(isOverdue({ paymentStatus: 'paid', dueDate: '2020-01-01' }, '2026-08-04'), false)
    assert.equal(isOverdue({ paymentStatus: 'n/a', dueDate: '2020-01-01' }, '2026-08-04'), false)
  })
})

import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { hasComparableKey, sameDocNumber, sameAmount } from '../src/lib/duplicates'

describe('מפתח הכפילות הדומה', () => {
  test('שלושת השדות חייבים להיות קיימים כדי לטעון לכפילות', () => {
    const full = {
      supplierTaxId: '520000118',
      docNumber: '20315',
      totalAmount: '1180.00',
      docDate: '2026-07-14',
      currency: 'ILS',
    }
    assert.equal(hasComparableKey(full), true)
    assert.equal(hasComparableKey({ ...full, docNumber: null }), false)
    assert.equal(hasComparableKey({ ...full, supplierTaxId: null }), false)
    assert.equal(hasComparableKey({ ...full, totalAmount: null }), false)
  })

  test('מספר מסמך: אפסים מובילים ומקפים אינם הבדל', () => {
    assert.equal(sameDocNumber('20315', '020315'), true)
    assert.equal(sameDocNumber('20-315', '20315'), true)
    assert.equal(sameDocNumber('20315', '20316'), false)
  })

  test('מספר מסמך ריק אינו מתאים לכלום', () => {
    assert.equal(sameDocNumber(null, '20315'), false)
    assert.equal(sameDocNumber('', ''), false)
  })

  test('סכומים: הפרש אגורה אינו הבדל, שקל כן', () => {
    assert.equal(sameAmount('1180.00', '1180.004'), true)
    assert.equal(sameAmount('1180.00', '1181.00'), false)
    assert.equal(sameAmount(null, '1180.00'), false)
  })
})

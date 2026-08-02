import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import Anthropic from '@anthropic-ai/sdk'
import { describeApiFailure, ExtractionError } from '../src/lib/extract'
import { failureMessage } from '../src/lib/pipeline'

// ה-SDK בונה את message מגוף התשובה, לא מהפרמטר — כמו בייצור.
const apiError = (status: number, detail?: string) =>
  new Anthropic.APIError(
    status,
    { type: 'error', error: { type: 'invalid_request_error', message: detail ?? 'no' } },
    undefined,
    undefined,
  )

describe('מיפוי שגיאות ה-API להודעה שאפשר לפעול לפיה', () => {
  test('401: מכוון ישירות למפתח', () => {
    const e = describeApiFailure(apiError(401))
    assert.ok(e instanceof ExtractionError)
    assert.equal(e.code, 'api_401')
    assert.match(e.message, /ANTHROPIC_API_KEY/)
  })

  test('429: אומר שזה זמני', () => {
    const e = describeApiFailure(apiError(429))
    assert.equal(e?.code, 'api_429')
    assert.match(e!.message, /נסו שוב/)
  })

  test('400: הודעת השרת נשמרת — היא אומרת מה נדחה', () => {
    const e = describeApiFailure(apiError(400, 'schema: field X is invalid'))
    assert.equal(e?.code, 'api_400')
    assert.match(e!.message, /schema: field X is invalid/)
  })

  test('שגיאת שרת 529 מסומנת כזמנית', () => {
    const e = describeApiFailure(apiError(529))
    assert.equal(e?.code, 'api_529')
  })

  test('תקלת רשת בלי סטטוס', () => {
    const e = describeApiFailure(new Anthropic.APIConnectionError({ message: 'boom' }))
    assert.equal(e?.code, 'api_network')
  })

  test('שגיאה שאינה של ה-API לא נתפסת כאן', () => {
    assert.equal(describeApiFailure(new Error('disk on fire')), null)
  })
})

describe('ההודעה שנשמרת על המסמך כשהחילוץ נכשל', () => {
  test('ExtractionError עוברת כמו שהיא', () => {
    assert.equal(
      failureMessage(new ExtractionError('refused', 'הבקשה נדחתה על ידי המודל')),
      'הבקשה נדחתה על ידי המודל',
    )
  })

  test('שגיאה כללית לא נבלעת — הפירוט מופיע בסוגריים', () => {
    assert.equal(failureMessage(new Error('blob fetch 404')), 'החילוץ נכשל (blob fetch 404)')
  })

  test('הודעה ארוכה נחתכת, לא מוצפת', () => {
    const long = 'x'.repeat(500)
    assert.ok(failureMessage(new Error(long)).length < 200)
  })
})

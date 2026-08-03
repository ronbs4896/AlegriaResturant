import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  money,
  moneyShort,
  shekel,
  formatDate,
  formatPeriod,
  timeAgo,
  deltaPercent,
} from '../src/lib/format'

describe('עיצוב סכומים — מקור אחד לכל המסכים', () => {
  test('סכום מלא תמיד בשתי ספרות', () => {
    assert.equal(money(1180), '1,180.00')
    assert.equal(money('1180.5'), '1,180.50')
  })

  test('ריק, null ולא-מספר מוצגים כמקף ולא כ-NaN', () => {
    for (const v of [null, undefined, '', 'abc', NaN]) {
      assert.equal(money(v as never), '—')
    }
  })

  test('אפס הוא מספר, לא ערך חסר', () => {
    assert.equal(money(0), '0.00')
  })

  test('קיצור: אלפים מעל 100 אלף, מיליונים מעל מיליון', () => {
    assert.equal(moneyShort(1234), '1,234')
    assert.equal(moneyShort(150_000), '150K')
    assert.equal(moneyShort(2_500_000), '2.5M')
    assert.equal(moneyShort(-150_000), '-150K')
  })

  test('סימן המטבע מתווסף רק לערך אמיתי', () => {
    assert.match(shekel(100), /100\.00.₪/)
    assert.equal(shekel(null), '—')
  })
})

describe('תאריכים', () => {
  test('תאריך ISO מתפרש כמו שהוא, בלי הזזת אזור זמן', () => {
    assert.match(formatDate('2026-07-14'), /14/)
    assert.match(formatDate('2026-01-01'), /1/)
  })

  test('תאריך פגום מוצג כמקף', () => {
    assert.equal(formatDate(null), '—')
    assert.equal(formatDate('14/07/2026'), '—')
  })

  test('תווית חודש', () => {
    assert.match(formatPeriod('2026-07'), /2026/)
    assert.ok(formatPeriod('2026-07', true).length > 0)
  })
})

describe('זמן יחסי ודלתא', () => {
  const now = new Date('2026-08-02T12:00:00Z')

  test('דקות, שעות וימים', () => {
    assert.equal(timeAgo(new Date('2026-08-02T11:59:40Z'), now), 'עכשיו')
    assert.match(timeAgo(new Date('2026-08-02T11:30:00Z'), now), /דקות/)
    assert.match(timeAgo(new Date('2026-08-02T09:00:00Z'), now), /שעות/)
    assert.match(timeAgo(new Date('2026-07-30T12:00:00Z'), now), /ימים/)
  })

  test('בלי ערך — "מעולם", ולא קריסה', () => {
    assert.equal(timeAgo(null, now), 'מעולם')
  })

  test('דלתא באחוזים, ובסיס אפס אינו אינסוף', () => {
    assert.equal(deltaPercent(150, 100), 50)
    assert.equal(deltaPercent(50, 100), -50)
    assert.equal(deltaPercent(100, 0), null)
  })
})

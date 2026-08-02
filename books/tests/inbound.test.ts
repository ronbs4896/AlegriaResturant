import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { verifyWebhook } from '../src/lib/webhook'
import { extractAddress, parseInbound, shouldFetch } from '../src/lib/inbound'

// ── חתימה ─────────────────────────────────────────────────────

const SECRET = 'whsec_' + Buffer.from('a'.repeat(32)).toString('base64')
const NOW = 1_785_000_000_000

function sign(body: string, id = 'msg_1', ts = String(Math.floor(NOW / 1000))) {
  const key = Buffer.from(SECRET.replace(/^whsec_/, ''), 'base64')
  const sig = createHmac('sha256', key).update(`${id}.${ts}.${body}`).digest('base64')
  return new Headers({
    'svix-id': id,
    'svix-timestamp': ts,
    'svix-signature': `v1,${sig}`,
  })
}

describe('אימות חתימת webhook', () => {
  const body = '{"type":"email.received"}'

  test('חתימה תקינה מתקבלת', () => {
    assert.deepEqual(verifyWebhook(body, sign(body), SECRET, NOW), { ok: true })
  })

  test('בלי סוד מוגדר — נדחה, ולא נפתח', () => {
    const r = verifyWebhook(body, sign(body), undefined, NOW)
    assert.equal(r.ok, false)
    assert.equal(r.ok === false && r.reason, 'no_secret')
  })

  test('גוף ששונה בתו אחד — נדחה', () => {
    const headers = sign(body)
    const r = verifyWebhook(body + ' ', headers, SECRET, NOW)
    assert.equal(r.ok, false)
    assert.equal(r.ok === false && r.reason, 'bad_signature')
  })

  test('חתימה ישנה — נדחית, כדי שהקלטה לא תישלח שוב מחר', () => {
    const old = String(Math.floor(NOW / 1000) - 600)
    const r = verifyWebhook(body, sign(body, 'msg_1', old), SECRET, NOW)
    assert.equal(r.ok, false)
    assert.equal(r.ok === false && r.reason, 'stale')
  })

  test('כותרות חסרות — נדחה', () => {
    const r = verifyWebhook(body, new Headers(), SECRET, NOW)
    assert.equal(r.ok, false)
    assert.equal(r.ok === false && r.reason, 'missing_headers')
  })

  test('כמה חתימות בכותרת, אחת מהן נכונה — מתקבל', () => {
    const headers = sign(body)
    const good = headers.get('svix-signature')!
    headers.set('svix-signature', `v1,ZmFrZQ== ${good}`)
    assert.deepEqual(verifyWebhook(body, headers, SECRET, NOW), { ok: true })
  })

  test('סוד שגוי — נדחה', () => {
    const other = 'whsec_' + Buffer.from('b'.repeat(32)).toString('base64')
    const r = verifyWebhook(body, sign(body), other, NOW)
    assert.equal(r.ok, false)
    assert.equal(r.ok === false && r.reason, 'bad_signature')
  })
})

// ── פענוח ─────────────────────────────────────────────────────

describe('פענוח המטען', () => {
  const payload = {
    type: 'email.received',
    data: {
      email_id: 'e1',
      from: 'תנובה <billing@tnuva.co.il>',
      to: ['docs@alegriacatering.co.il'],
      subject: 'חשבונית מס 8841',
      attachments: [
        { id: 'a1', filename: 'inv.pdf', content_type: 'application/pdf' },
        { id: 'a2', filename: 'logo.png', content_type: 'image/png', content_disposition: 'inline', content_id: 'l1' },
      ],
    },
  }

  test('שדות מרכזיים נקראים', () => {
    const e = parseInbound(payload)!
    assert.equal(e.emailId, 'e1')
    assert.equal(e.from, 'billing@tnuva.co.il')
    assert.equal(e.subject, 'חשבונית מס 8841')
    assert.equal(e.attachments.length, 2)
  })

  test('אירוע אחר מוחזר null ולא קורס', () => {
    assert.equal(parseInbound({ type: 'email.sent', data: {} }), null)
    assert.equal(parseInbound(null), null)
    assert.equal(parseInbound({ type: 'email.received' }), null)
  })

  test('כתובת נחלצת מתוך "שם <כתובת>"', () => {
    assert.equal(extractAddress('קייטרינג אלגריה <a@b.co.il>'), 'a@b.co.il')
    assert.equal(extractAddress('A@B.CO.IL'), 'a@b.co.il')
    assert.equal(extractAddress(null), '')
  })
})

// ── סינון ─────────────────────────────────────────────────────

// אין חסימת שולחים: חשבונית שמערכת ההנפקה שלחה היא הכנסה
// שנקלטת, וההבחנה נעשית על המסמך עצמו לפי ח.פ.

describe('סינון', () => {
  test('PDF מצורף נמשך', () => {
    assert.equal(
      shouldFetch({ id: 'a1', filename: 'i.pdf', contentType: 'application/pdf', contentDisposition: 'attachment', contentId: null }),
      true,
    )
  })

  test('לוגו inline עם Content-ID לא נמשך', () => {
    assert.equal(
      shouldFetch({ id: 'a2', filename: 'logo.png', contentType: 'image/png', contentDisposition: 'inline', contentId: 'l1' }),
      false,
    )
  })

  test('תמונה מצורפת רגילה כן נמשכת, גם אם היא PNG', () => {
    assert.equal(
      shouldFetch({ id: 'a3', filename: 'scan.png', contentType: 'image/png', contentDisposition: 'attachment', contentId: null }),
      true,
    )
  })

  test('סוג שאינו מסמך נדחה', () => {
    assert.equal(
      shouldFetch({ id: 'a4', filename: 'x.docx', contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', contentDisposition: 'attachment', contentId: null }),
      false,
    )
  })
})

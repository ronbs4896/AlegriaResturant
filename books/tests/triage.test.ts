import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { triageAttachment } from '../src/lib/triage'

const PDF = 'application/pdf'
const BIG = 120_000

describe('סינון טכני של קבצים מצורפים', () => {
  test('PDF בגודל סביר עובר', () => {
    const v = triageAttachment({ filename: 'invoice.pdf', mime: PDF, sizeBytes: BIG }, false)
    assert.equal(v.ok, true)
  })

  test('חתימת מייל משובצת נחסמת', () => {
    const v = triageAttachment(
      { filename: 'sig.png', mime: 'image/png', sizeBytes: BIG, inlineWithCid: true },
      true,
    )
    assert.equal(v.ok, false)
    assert.equal(v.ok === false && v.code, 'inline_logo')
  })

  test('קובץ בשם logo או signature נחסם גם כשאינו inline', () => {
    for (const name of ['logo.png', 'signature-1.jpg', 'image001.png', 'footer.gif']) {
      const v = triageAttachment({ filename: name, mime: 'image/png', sizeBytes: BIG }, true)
      assert.equal(v.ok, false, name)
      assert.equal(v.ok === false && v.code, 'blocked_filename', name)
    }
  })

  test('הזמנת יומן, ארכיון וקובץ מדיה נחסמים', () => {
    for (const name of ['meeting.ics', 'files.zip', 'clip.mp4', 'song.mp3', 'sheet.xlsx']) {
      const v = triageAttachment({ filename: name, mime: PDF, sizeBytes: BIG }, true)
      assert.equal(v.ok, false, name)
      assert.equal(v.ok === false && v.code, 'blocked_filename', name)
    }
  })

  test('קובץ זעיר נחסם — לוגו, לא מסמך', () => {
    const v = triageAttachment({ filename: 'a.pdf', mime: PDF, sizeBytes: 3_000 }, false)
    assert.equal(v.ok, false)
    assert.equal(v.ok === false && v.code, 'too_small')
  })

  test('תמונה נחסמת בברירת המחדל ועוברת כשמאשרים תמונות', () => {
    const args = { filename: 'receipt.jpg', mime: 'image/jpeg', sizeBytes: BIG }
    assert.equal(triageAttachment(args, false).ok, false)
    assert.equal(triageAttachment(args, true).ok, true)
  })

  test('סוג שאינו מסמך כלל נחסם', () => {
    const v = triageAttachment({ filename: 'x.bin', mime: 'application/octet-stream', sizeBytes: BIG }, true)
    assert.equal(v.ok, false)
    assert.equal(v.ok === false && v.code, 'mime_not_accepted')
  })

  test('לכל חסימה יש הודעה בעברית שאפשר להציג', () => {
    const v = triageAttachment({ filename: 'logo.png', mime: 'image/png', sizeBytes: BIG }, true)
    assert.equal(v.ok, false)
    assert.ok(v.ok === false && v.message.length > 0)
    assert.ok(v.ok === false && /[א-ת]/.test(v.message))
  })

  test('בלי שם קובץ עדיין מסננים לפי סוג וגודל', () => {
    assert.equal(triageAttachment({ mime: PDF, sizeBytes: BIG }, false).ok, true)
    assert.equal(triageAttachment({ mime: PDF, sizeBytes: 100 }, false).ok, false)
  })
})

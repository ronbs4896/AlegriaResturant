import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readMailboxes, hostForAddress, cursorKey, isCursor } from '../src/lib/mailbox'

const env = (o: Record<string, string>) => o as unknown as NodeJS.ProcessEnv

describe('קריאת הגדרות התיבות', () => {
  test('תיבת Gmail דורשת שני שדות בלבד', () => {
    const boxes = readMailboxes(
      env({ MAILBOX_1_USER: 'a@gmail.com', MAILBOX_1_PASSWORD: 'abcd efgh ijkl mnop' }),
    )
    assert.equal(boxes.length, 1)
    assert.equal(boxes[0]?.host, 'imap.gmail.com')
    assert.equal(boxes[0]?.port, 993)
  })

  test('הרווחים שגוגל מציגה בסיסמה מוסרים', () => {
    const boxes = readMailboxes(
      env({ MAILBOX_1_USER: 'a@gmail.com', MAILBOX_1_PASSWORD: 'abcd efgh ijkl mnop' }),
    )
    assert.equal(boxes[0]?.password, 'abcdefghijklmnop')
  })

  test('ב-Gmail נסרק All Mail ולא רק INBOX, אחרת מפספסים ארכיון', () => {
    const boxes = readMailboxes(
      env({ MAILBOX_1_USER: 'a@gmail.com', MAILBOX_1_PASSWORD: 'x'.repeat(16) }),
    )
    assert.equal(boxes[0]?.folder, '[Gmail]/All Mail')
  })

  test('ספק לא מוכר בלי HOST מפורש — מדולג ולא מנוחש', () => {
    const boxes = readMailboxes(
      env({ MAILBOX_1_USER: 'a@example.co.il', MAILBOX_1_PASSWORD: 'x'.repeat(16) }),
    )
    assert.equal(boxes.length, 0)
  })

  test('אותו ספק עם HOST מפורש — נקרא', () => {
    const boxes = readMailboxes(
      env({
        MAILBOX_1_USER: 'a@example.co.il',
        MAILBOX_1_PASSWORD: 'x'.repeat(16),
        MAILBOX_1_HOST: 'mail.example.co.il',
      }),
    )
    assert.equal(boxes.length, 1)
    assert.equal(boxes[0]?.folder, 'INBOX')
  })

  test('סיסמה חסרה — התיבה לא נטענת חלקית', () => {
    assert.equal(readMailboxes(env({ MAILBOX_1_USER: 'a@gmail.com' })).length, 0)
  })

  test('כמה תיבות, וחור במספור לא עוצר את הסריקה', () => {
    const boxes = readMailboxes(
      env({
        MAILBOX_1_USER: 'a@gmail.com',
        MAILBOX_1_PASSWORD: 'x'.repeat(16),
        MAILBOX_3_USER: 'b@outlook.com',
        MAILBOX_3_PASSWORD: 'y'.repeat(16),
      }),
    )
    assert.equal(boxes.length, 2)
    assert.equal(boxes[1]?.host, 'outlook.office365.com')
  })

  test('בלי הגדרות — רשימה ריקה, לא שגיאה', () => {
    assert.deepEqual(readMailboxes(env({})), [])
  })

  test('דומיינים מוכרים', () => {
    assert.equal(hostForAddress('x@GMAIL.COM'), 'imap.gmail.com')
    assert.equal(hostForAddress('x@hotmail.com'), 'outlook.office365.com')
    assert.equal(hostForAddress('x@nowhere.zz'), null)
  })
})

describe('נקודת החידוש', () => {
  const box = {
    index: 1,
    user: 'a@gmail.com',
    password: 'x',
    host: 'imap.gmail.com',
    port: 993,
    folder: '[Gmail]/All Mail',
  }

  test('המפתח מפריד בין תיבות ובין תיקיות', () => {
    assert.equal(cursorKey(box), 'mailbox:a@gmail.com:[Gmail]/All Mail')
    assert.notEqual(cursorKey(box), cursorKey({ ...box, folder: 'INBOX' }))
  })

  test('ערך פגום נדחה במקום להיקרא כמצב תקין', () => {
    assert.equal(isCursor({ uidValidity: '1', lastUid: 5 }), true)
    assert.equal(isCursor({ lastUid: 5 }), false)
    assert.equal(isCursor({ uidValidity: 1, lastUid: 5 }), false)
    assert.equal(isCursor(null), false)
  })
})

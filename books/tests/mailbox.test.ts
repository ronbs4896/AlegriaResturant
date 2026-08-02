import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  readMailboxes,
  hostForAddress,
  cursorKey,
  isCursor,
  pickAllMailFolder,
} from '../src/lib/mailbox'
import { mimeAllowed, hasUsefulAttachment } from '../src/lib/mailsync'

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

  test('בלי FOLDER מפורש, התיקייה מתגלה מול השרת ולא מנוחשת', () => {
    const boxes = readMailboxes(
      env({ MAILBOX_1_USER: 'a@gmail.com', MAILBOX_1_PASSWORD: 'x'.repeat(16) }),
    )
    assert.equal(boxes[0]?.folder, null)
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
    assert.equal(boxes[0]?.host, 'mail.example.co.il')
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

  test('חלון הזמן: ברירת מחדל שנה אחורה, לא כל ההיסטוריה', () => {
    const now = new Date('2026-08-02T00:00:00Z')
    const boxes = readMailboxes(
      env({ MAILBOX_1_USER: 'a@gmail.com', MAILBOX_1_PASSWORD: 'x'.repeat(16) }),
      now,
    )
    assert.equal(boxes[0]?.since.toISOString().slice(0, 10), '2025-08-02')
  })

  test('SINCE מפורש גובר על ברירת המחדל', () => {
    const boxes = readMailboxes(
      env({
        MAILBOX_1_USER: 'a@gmail.com',
        MAILBOX_1_PASSWORD: 'x'.repeat(16),
        MAILBOX_1_SINCE: '2026-01-01',
      }),
    )
    assert.equal(boxes[0]?.since.toISOString().slice(0, 10), '2026-01-01')
  })

  test('SINCE פגום נופל לברירת המחדל, לא לתחילת הזמן', () => {
    const now = new Date('2026-08-02T00:00:00Z')
    const boxes = readMailboxes(
      env({
        MAILBOX_1_USER: 'a@gmail.com',
        MAILBOX_1_PASSWORD: 'x'.repeat(16),
        MAILBOX_1_SINCE: 'לא-תאריך',
      }),
      now,
    )
    assert.equal(boxes[0]?.since.toISOString().slice(0, 10), '2025-08-02')
  })

  test('תמונות ממייל: כבוי כברירת מחדל, נדלק במפורש בלבד', () => {
    const off = readMailboxes(
      env({ MAILBOX_1_USER: 'a@gmail.com', MAILBOX_1_PASSWORD: 'x'.repeat(16) }),
    )
    assert.equal(off[0]?.images, false)
    const on = readMailboxes(
      env({
        MAILBOX_1_USER: 'a@gmail.com',
        MAILBOX_1_PASSWORD: 'x'.repeat(16),
        MAILBOX_1_IMAGES: 'true',
      }),
    )
    assert.equal(on[0]?.images, true)
  })

  test('דומיינים מוכרים', () => {
    assert.equal(hostForAddress('x@GMAIL.COM'), 'imap.gmail.com')
    assert.equal(hostForAddress('x@hotmail.com'), 'outlook.office365.com')
    assert.equal(hostForAddress('x@nowhere.zz'), null)
  })
})

describe('בחירת התיקייה', () => {
  test('נבחרת לפי הסימון \\All ולא לפי השם', () => {
    const list = [
      { path: 'INBOX' },
      { path: '[Gmail]/כל הדואר', specialUse: '\\All' },
      { path: '[Gmail]/נשלחו', specialUse: '\\Sent' },
    ]
    assert.equal(pickAllMailFolder(list), '[Gmail]/כל הדואר')
  })

  test('אותה לוגיקה על חשבון באנגלית', () => {
    const list = [{ path: 'INBOX' }, { path: '[Gmail]/All Mail', specialUse: '\\All' }]
    assert.equal(pickAllMailFolder(list), '[Gmail]/All Mail')
  })

  test('שרת בלי \\All נופל ל-INBOX ולא קורס', () => {
    assert.equal(pickAllMailFolder([{ path: 'INBOX' }, { path: 'Archive' }]), 'INBOX')
    assert.equal(pickAllMailFolder([]), 'INBOX')
  })
})

describe('נקודת החידוש', () => {
  test('המפתח מפריד בין תיבות ובין תיקיות', () => {
    assert.equal(cursorKey('a@gmail.com', '[Gmail]/כל הדואר'), 'mailbox:a@gmail.com:[Gmail]/כל הדואר')
    assert.notEqual(cursorKey('a@gmail.com', 'INBOX'), cursorKey('a@gmail.com', '[Gmail]/כל הדואר'))
  })

  test('ערך פגום נדחה במקום להיקרא כמצב תקין', () => {
    assert.equal(isCursor({ uidValidity: '1', lastUid: 5 }), true)
    assert.equal(isCursor({ lastUid: 5 }), false)
    assert.equal(isCursor({ uidValidity: 1, lastUid: 5 }), false)
    assert.equal(isCursor(null), false)
  })
})

describe('סינון סוגי קבצים ממייל', () => {
  test('PDF תמיד עובר', () => {
    assert.equal(mimeAllowed('application/pdf', false), true)
  })

  test('תמונה ממייל נחסמת כברירת מחדל — תמונה בתיבה אישית היא פרטית', () => {
    assert.equal(mimeAllowed('image/jpeg', false), false)
    assert.equal(mimeAllowed('image/png', false), false)
  })

  test('עם images=true תמונות עוברות', () => {
    assert.equal(mimeAllowed('image/jpeg', true), true)
  })

  test('מבנה הודעה עם JPEG בלבד לא נמשך כברירת מחדל', () => {
    const structure = {
      type: 'multipart/mixed',
      childNodes: [
        { type: 'text/plain', size: 500 },
        { type: 'image/jpeg', disposition: 'attachment', size: 500_000 },
      ],
    }
    assert.equal(hasUsefulAttachment(structure, false), false)
    assert.equal(hasUsefulAttachment(structure, true), true)
  })

  test('מבנה עם PDF נמשך גם במצב ברירת המחדל', () => {
    const structure = {
      type: 'multipart/mixed',
      childNodes: [{ type: 'application/pdf', disposition: 'attachment', size: 90_000 }],
    }
    assert.equal(hasUsefulAttachment(structure, false), true)
  })
})

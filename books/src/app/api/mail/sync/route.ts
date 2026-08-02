import { after } from 'next/server'
import { handler, requireUser } from '@/lib/session'
import { syncAllMailboxes } from '@/lib/mailsync'
import { readMailboxes } from '@/lib/mailbox'
import { processDocument } from '@/lib/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 300

// ============================================================
//  משיכה יזומה מהממשק.
//
//  ה-cron רץ ממילא, אבל אחרי הזנת סיסמת אפליקציה רוצים לדעת
//  מיד אם החיבור עובד — ולא לחכות רבע שעה ולנחש.
// ============================================================
export const POST = handler(async () => {
  await requireUser('admin')

  const boxes = readMailboxes()
  if (boxes.length === 0) {
    return Response.json({ ok: true, mailboxes: 0, results: [] })
  }

  const results = await syncAllMailboxes()

  for (const r of results) {
    for (const id of r.documentIds) {
      after(async () => {
        try {
          await processDocument(id)
        } catch (err) {
          console.error('[mailsync] חילוץ נכשל', id, err)
        }
      })
    }
  }

  return Response.json({
    ok: true,
    mailboxes: boxes.length,
    results: results.map(({ documentIds, ...r }) => ({ ...r, stored: documentIds.length })),
  })
})

export const GET = handler(async () => {
  await requireUser('admin')
  // רק שמות התיבות. הסיסמאות לא יוצאות מהשרת בשום מצב.
  return Response.json({ mailboxes: readMailboxes().map((b) => b.user) })
})

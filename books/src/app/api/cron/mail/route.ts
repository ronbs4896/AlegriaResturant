import { after } from 'next/server'
import { syncAllMailboxes } from '@/lib/mailsync'
import { processDocument } from '@/lib/pipeline'
import { readMailboxes } from '@/lib/mailbox'

export const runtime = 'nodejs'
export const maxDuration = 300

// ============================================================
//  משיכה מתוזמנת מתיבות המייל.
//  מוגן בסוד — בלעדיו זו נקודת קצה שכל אחד יכול להפעיל.
// ============================================================
export async function GET(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET
  if (!secret) return Response.json({ error: 'cron_not_configured' }, { status: 503 })
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  if (readMailboxes().length === 0) {
    return Response.json({ ok: true, mailboxes: 0, note: 'לא הוגדרה אף תיבה' })
  }

  const results = await syncAllMailboxes()

  for (const r of results) {
    console.log(
      `[mailsync] ${r.mailbox} · נסרקו ${r.scanned}, נשמרו ${r.stored}, דולגו ${r.skipped}` +
        (r.error ? ` · שגיאה: ${r.error}` : ''),
    )
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

  return Response.json({ ok: true, results: results.map(({ documentIds, ...r }) => ({ ...r, stored: documentIds.length })) })
}

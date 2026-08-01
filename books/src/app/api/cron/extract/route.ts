import { and, eq, lt } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { processDocument } from '@/lib/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 300

// רשת ביטחון: מסמכים שהקריאה המיידית אחרי ההעלאה לא הספיקה
// לטפל בהם. מוגן בסוד — בלעדיו זו נקודת קצה פתוחה שמבזבזת
// כסף אמיתי בקריאות API.
const BATCH = 10

export async function GET(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET
  if (!secret) return Response.json({ error: 'cron_not_configured' }, { status: 503 })

  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  const db = await getDb()
  // רק מסמכים שיושבים ב-pending יותר מדקה, כדי לא להתנגש
  // בעיבוד שכבר רץ ברקע על אותו מסמך.
  const stale = new Date(Date.now() - 60_000)
  const rows = await db
    .select({ id: schema.documents.id })
    .from(schema.documents)
    .where(and(eq(schema.documents.status, 'pending'), lt(schema.documents.createdAt, stale)))
    .limit(BATCH)

  const results = { processed: 0, failed: 0 }
  for (const row of rows) {
    try {
      await processDocument(row.id)
      results.processed++
    } catch (err) {
      console.error('[cron/extract]', row.id, err)
      results.failed++
    }
  }

  return Response.json({ ok: true, ...results })
}

import { after } from 'next/server'
import { z } from 'zod'
import { desc, eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'
import { runExport, failExport, PERIOD_RE } from '@/lib/export'
import { signedViewUrl } from '@/lib/storage'

export const runtime = 'nodejs'
export const maxDuration = 300

const Body = z.object({ period: z.string().regex(PERIOD_RE) })

// ============================================================
//  יצירת חבילה חודשית.
//  התשובה חוזרת מיד עם מזהה, והעבודה רצה אחריה. אריזה של מאה
//  מסמכים לוקחת עשרות שניות, ואין סיבה שמישהו יעמוד מול ספינר.
// ============================================================
export const POST = handler(async (req) => {
  const user = await requireUser('admin')
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_period' }, { status: 400 })

  const period = parsed.data.period
  const db = await getDb()

  const inserted = await db
    .insert(schema.exports_)
    .values({ period, status: 'running', createdBy: user.uid })
    .returning({ id: schema.exports_.id })

  const id = inserted[0]?.id
  if (!id) return Response.json({ error: 'create_failed' }, { status: 500 })

  after(async () => {
    try {
      const result = await runExport(id, period)
      console.log('[export] הושלם', period, result.docCount, 'מסמכים,', result.sizeBytes, 'בתים')
    } catch (err) {
      console.error('[export] נכשל', period, err)
      await failExport(id, err instanceof Error ? err.message : 'unknown').catch(() => {})
    }
  })

  return Response.json({ ok: true, id, period })
})

export const GET = handler(async () => {
  await requireUser('admin')
  const db = await getDb()

  const rows = await db
    .select()
    .from(schema.exports_)
    .orderBy(desc(schema.exports_.createdAt))
    .limit(24)

  // קישור ההורדה נחתם מחדש בכל טעינה. אין קישור קבוע לחבילה,
  // וגם אם הוא ידלוף הוא פג.
  const withUrls = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      url: row.blobPath ? await signedViewUrl(row.blobPath, 900) : null,
    })),
  )

  return Response.json({ exports: withUrls })
})

const Del = z.object({ id: z.string().uuid() })

export const DELETE = handler(async (req) => {
  await requireUser('admin')
  const parsed = Del.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  // מוחקים את רשומת הייצוא בלבד. הקובץ באחסון נשאר, וכך גם
  // מסמכי המקור — המערכת לא מוחקת תיעוד.
  await db.delete(schema.exports_).where(eq(schema.exports_.id, parsed.data.id))
  return Response.json({ ok: true })
})

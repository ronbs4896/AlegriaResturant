import { z } from 'zod'
import { after } from 'next/server'
import { sql, and, eq } from 'drizzle-orm'
import { handler, requireUser } from '@/lib/session'
import { getDb, schema } from '@/db'
import { processDocument } from '@/lib/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 120

const Body = z.union([
  z.object({ id: z.string().uuid() }),
  // הרצה מרוכזת: כל מה שנכשל בחילוץ. אחרי תיקון תקלה (מפתח,
  // אחסון) אין טעם לפתוח מסמך-מסמך.
  z.object({ scope: z.literal('failed') }),
])

export const POST = handler(async (req) => {
  await requireUser()
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  if ('id' in parsed.data) {
    const outcome = await processDocument(parsed.data.id)
    return Response.json({ ok: true, ...outcome })
  }

  const db = await getDb()
  const rows = await db
    .select({ id: schema.documents.id })
    .from(schema.documents)
    .where(
      and(
        eq(schema.documents.status, 'review'),
        sql`${schema.documents.validationFlags} @> '[{"code":"extraction_failed"}]'::jsonb`,
      ),
    )
    .limit(20)

  // העיבוד רץ ברקע אחרי שהתשובה נשלחה; כל מסמך לגופו, כישלון
  // אחד לא עוצר את השאר.
  after(async () => {
    for (const row of rows) {
      try {
        await processDocument(row.id)
      } catch (err) {
        console.error('[extract] הרצה חוזרת נכשלה', row.id, err)
      }
    }
  })

  return Response.json({ ok: true, count: rows.length })
})

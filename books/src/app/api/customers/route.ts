import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'

export const runtime = 'nodejs'

const Body = z.object({
  id: z.string().uuid(),
  fields: z
    .object({
      name: z.string().trim().min(1).max(200),
      notes: z.string().max(2000).nullable(),
    })
    .partial(),
})

export const PATCH = handler(async (req) => {
  await requireUser('admin')
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  const existing = await db
    .select({ id: schema.customers.id })
    .from(schema.customers)
    .where(eq(schema.customers.id, parsed.data.id))
    .limit(1)
  if (!existing[0]) return Response.json({ error: 'not_found' }, { status: 404 })

  const fields = parsed.data.fields
  if (Object.keys(fields).length === 0) return Response.json({ ok: true, unchanged: true })

  await db.update(schema.customers).set(fields).where(eq(schema.customers.id, parsed.data.id))
  return Response.json({ ok: true })
})

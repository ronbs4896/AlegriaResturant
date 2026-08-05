import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'
import { EXPENSE_CATEGORIES } from '@/lib/constants'

export const runtime = 'nodejs'

// ============================================================
//  עריכת הגדרות ספק. אלה ההגדרות שהצנרת קוראת: קטגוריית ברירת
//  המחדל גוברת על ניחוש המודל, ו"מוכר לניכוי" נכנס לדוח המע״מ.
// ============================================================

const domain = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, 'domain')

const Body = z.object({
  id: z.string().uuid(),
  fields: z
    .object({
      name: z.string().trim().min(1).max(200),
      defaultCategory: z
        .enum(Object.keys(EXPENSE_CATEGORIES) as [string, ...string[]])
        .nullable(),
      defaultPaymentTerms: z.string().trim().max(60).nullable(),
      vatDeductible: z.boolean(),
      notes: z.string().max(2000).nullable(),
      knownSenders: z.array(domain).max(20),
    })
    .partial(),
})

export const PATCH = handler(async (req) => {
  await requireUser('admin')
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  const existing = await db
    .select({ id: schema.suppliers.id })
    .from(schema.suppliers)
    .where(eq(schema.suppliers.id, parsed.data.id))
    .limit(1)
  if (!existing[0]) return Response.json({ error: 'not_found' }, { status: 404 })

  const fields = parsed.data.fields
  if (Object.keys(fields).length === 0) return Response.json({ ok: true, unchanged: true })

  await db.update(schema.suppliers).set(fields).where(eq(schema.suppliers.id, parsed.data.id))
  return Response.json({ ok: true })
})

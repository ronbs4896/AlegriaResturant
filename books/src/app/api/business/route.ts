import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'
import { isValidIsraeliTaxId } from '@/lib/validate'

export const runtime = 'nodejs'

// ============================================================
//  פרופיל העסק — שורה אחת. שמירה יוצרת אותה בפעם הראשונה.
// ============================================================

const list = z.array(z.string().trim().min(1).max(200)).max(20)

const Body = z.object({
  legalName: z.string().trim().min(2).max(200),
  tradeNames: list,
  taxId: z.string().trim().max(20).nullable(),
  vatNumber: z.string().trim().max(20).nullable(),
  addresses: list,
  emails: z.array(z.string().trim().email().max(200)).max(20),
  phones: list,
  bankAccounts: list,
  defaultCurrency: z.string().trim().length(3),
})

export const PATCH = handler(async (req) => {
  await requireUser('admin')
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: 'invalid_body', issues: parsed.error.issues }, { status: 400 })
  }

  const data = parsed.data
  // ח.פ. שגוי הוא לא פרט טכני: כל הבחנה בין הכנסה להוצאה תלויה בו.
  if (data.taxId && !isValidIsraeliTaxId(data.taxId)) {
    return Response.json({ error: 'invalid_tax_id' }, { status: 400 })
  }

  const db = await getDb()
  const existing = await db.select({ id: schema.businessProfile.id }).from(schema.businessProfile).limit(1)

  if (existing[0]) {
    await db
      .update(schema.businessProfile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.businessProfile.id, existing[0].id))
  } else {
    await db.insert(schema.businessProfile).values(data)
  }

  return Response.json({ ok: true })
})

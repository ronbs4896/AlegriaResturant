import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { isValidIsraeliTaxId } from './validate'
import type { Customer } from '@/db/schema'

// ============================================================
//  זיכרון לקוחות — הצד השני של זיכרון הספקים, אותם כללים:
//  התאמה לפי ח.פ. בלבד, ושורה נוצרת רק כשיש מספר תקין.
//  לקוח פרטי בלי ח.פ. נשאר שם על המסמך, לא שורה בטבלה.
// ============================================================

export async function matchOrCreateCustomer(
  taxId: string | null,
  name: string | null,
): Promise<Customer | null> {
  if (!taxId || !isValidIsraeliTaxId(taxId)) return null

  const normalized = taxId.replace(/\D/g, '').replace(/^0+/, '')
  const db = await getDb()

  const existing = await db
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.taxId, normalized))
    .limit(1)

  if (existing[0]) {
    if (name && name !== existing[0].name) {
      await db
        .update(schema.customers)
        .set({ name })
        .where(eq(schema.customers.id, existing[0].id))
      return { ...existing[0], name }
    }
    return existing[0]
  }

  const inserted = await db
    .insert(schema.customers)
    .values({ name: name ?? normalized, taxId: normalized })
    .returning()

  return inserted[0] ?? null
}

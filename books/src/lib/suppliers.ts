import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { isValidIsraeliTaxId } from './validate'
import type { Supplier } from '@/db/schema'

// ============================================================
//  זיכרון ספקים.
//
//  ההתאמה נעשית לפי ח.פ. ולא לפי שם: "תנובה", "תנובה בע״מ"
//  ו"תנובה מרכז שיתופי" הם אותו ספק, ורק המספר יודע את זה.
//
//  ספק נוצר רק כשיש ח.פ. תקין. בלעדיו נוצרות שורות זבל שאף
//  אחד לא ינקה, והטבלה מפסיקה להיות שימושית.
// ============================================================

export async function matchOrCreateSupplier(
  taxId: string | null,
  name: string | null,
): Promise<Supplier | null> {
  if (!taxId || !isValidIsraeliTaxId(taxId)) return null

  const normalized = taxId.replace(/\D/g, '').replace(/^0+/, '')
  const db = await getDb()

  const existing = await db
    .select()
    .from(schema.suppliers)
    .where(eq(schema.suppliers.taxId, normalized))
    .limit(1)

  if (existing[0]) {
    // שם עודכן אצל הספק? מעדכנים, אבל לא דורסים בערך ריק.
    if (name && name !== existing[0].name) {
      await db
        .update(schema.suppliers)
        .set({ name })
        .where(eq(schema.suppliers.id, existing[0].id))
      return { ...existing[0], name }
    }
    return existing[0]
  }

  const inserted = await db
    .insert(schema.suppliers)
    .values({ name: name ?? normalized, taxId: normalized })
    .returning()

  return inserted[0] ?? null
}

/**
 * לומד את דומיין השולח של הספק. אחרי מסמך אחד מהמייל, ההגדרות
 * של הספק כבר יודעות מאיפה המסמכים שלו מגיעים.
 */
export async function learnSender(supplierId: string, sender: string): Promise<void> {
  const domain = sender.split('@')[1]?.trim().toLowerCase()
  if (!domain) return

  const db = await getDb()
  const rows = await db
    .select()
    .from(schema.suppliers)
    .where(eq(schema.suppliers.id, supplierId))
    .limit(1)

  const supplier = rows[0]
  if (!supplier || supplier.knownSenders.includes(domain)) return

  await db
    .update(schema.suppliers)
    .set({ knownSenders: [...supplier.knownSenders, domain] })
    .where(eq(schema.suppliers.id, supplierId))
}

import { and, eq, ne, isNotNull } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import type { Document } from '@/db/schema'

// ============================================================
//  כפילויות.
//
//  זהות לפי sha256 כבר נתפסת בקליטה. כאן נתפסת הכפילות השנייה,
//  הקשה יותר: אותה חשבונית שהגיעה פעם כ-PDF מהספק ופעם כצילום
//  מהטלפון. הקבצים שונים לגמרי, המסמך אותו מסמך.
//
//  המפתח הוא מה שמזהה מסמך מס באופן ייחודי: מי הנפיק, איזה
//  מספר, ועל כמה. תאריך ומטבע מצטרפים כדי לא לתפוס בטעות
//  מסמכים תקופתיים עם אותו מספר.
// ============================================================

export interface DuplicateKey {
  supplierTaxId: string | null
  docNumber: string | null
  totalAmount: string | null
  docDate: string | null
  currency: string | null
}

/** חסר אחד מהשלושה — אין מספיק כדי לטעון לכפילות. */
export function hasComparableKey(d: DuplicateKey): boolean {
  return Boolean(d.supplierTaxId && d.docNumber && d.totalAmount)
}

const digits = (v: string | null) => (v ? v.replace(/\D/g, '') : '')

/** השוואה סלחנית: מספר מסמך עם אפסים מובילים או מקפים הוא אותו מספר. */
export function sameDocNumber(a: string | null, b: string | null): boolean {
  const na = digits(a).replace(/^0+/, '')
  const nb = digits(b).replace(/^0+/, '')
  return na.length > 0 && na === nb
}

export function sameAmount(a: string | null, b: string | null): boolean {
  if (a == null || b == null) return false
  return Math.abs(Number(a) - Number(b)) < 0.01
}

export interface DuplicateHit {
  document: Document
  /** מה בדיוק זהה — מוצג למשתמש כדי שיכריע בעצמו. */
  matched: string[]
}

/**
 * מחפש מסמך קיים שנראה כאותו מסמך. מחזיר את הראשון שנמצא;
 * המסך מציג את שניהם זה מול זה וההכרעה נשארת אצל אדם.
 */
export async function findDuplicate(doc: Document): Promise<DuplicateHit | null> {
  if (!hasComparableKey(doc)) return null

  const db = await getDb()
  const candidates = await db
    .select()
    .from(schema.documents)
    .where(
      and(
        ne(schema.documents.id, doc.id),
        eq(schema.documents.supplierTaxId, doc.supplierTaxId!),
        isNotNull(schema.documents.docNumber),
      ),
    )
    .limit(50)

  for (const other of candidates) {
    // מסמך שכבר סומן ככפילות אינו מועמד — אחרת נוצרות שרשראות.
    if (other.status === 'duplicate' || other.status === 'not_financial') continue
    if (!sameDocNumber(doc.docNumber, other.docNumber)) continue
    if (!sameAmount(doc.totalAmount, other.totalAmount)) continue

    const matched = ['ח.פ. הספק', 'מספר המסמך', 'הסכום הכולל']
    if (doc.docDate && doc.docDate === other.docDate) matched.push('התאריך')
    if ((doc.currency ?? 'ILS') !== (other.currency ?? 'ILS')) continue

    return { document: other, matched }
  }

  return null
}

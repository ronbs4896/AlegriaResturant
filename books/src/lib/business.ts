import { getDb, schema } from '@/db'
import { sameTaxId, isValidIsraeliTaxId } from './validate'
import type { BusinessProfile } from '@/db/schema'

// ============================================================
//  מי אנחנו.
//
//  ההכרעה הכי חזקה היא ח.פ., אבל היא לא תמיד זמינה: בקבלות
//  רבות הוא לא מודפס, ובצילום מטושטש הוא נקרא שגוי. לכן הפרופיל
//  מחזיק גם שמות מסחריים — עוגן שני שמאפשר לזהות איזה צד במסמך
//  הוא העסק גם בלי מספר.
//
//  שם לבדו לעולם לא מספיק לאישור אוטומטי; הוא רמז שמעלה ודאות
//  ומוביל לבדיקה, לא ראיה.
// ============================================================

export interface BusinessIdentity {
  legalName: string
  tradeNames: string[]
  taxId: string | null
  emails: string[]
}

/**
 * הפרופיל מהמסד, ואם עוד אין שורה — נבנה מה-env כדי שהמערכת
 * תעבוד מהרגע הראשון בלי מסך הגדרות.
 */
export async function loadBusiness(): Promise<BusinessIdentity> {
  const db = await getDb()
  const rows = await db.select().from(schema.businessProfile).limit(1)
  const row: BusinessProfile | undefined = rows[0]

  if (row) {
    return {
      legalName: row.legalName,
      tradeNames: row.tradeNames,
      taxId: row.taxId,
      emails: row.emails,
    }
  }

  return {
    legalName: process.env.BUSINESS_NAME?.trim() || 'קייטרינג אלגריה',
    tradeNames: [],
    taxId: process.env.BUSINESS_TAX_ID?.trim() || null,
    emails: [],
  }
}

/** נרמול שם לצורך השוואה: בלי צורות התאגדות, ניקוד ורווחים כפולים. */
export function normalizeName(raw: string | null | undefined): string {
  if (!raw) return ''
  return raw
    .toLowerCase()
    .replace(/["'’`״׳]/g, '')
    .replace(/\b(בעמ|בע"מ|בע״מ|ltd|limited|inc|llc|co)\b/g, '')
    .replace(/[.,\-–—()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export type IdentityMatch = 'tax_id' | 'name' | 'none'

/**
 * האם הצד הזה במסמך הוא העסק שלנו, ועל סמך מה.
 * 'tax_id' — הכרעה ודאית. 'name' — רמז בלבד.
 */
export function matchBusinessSide(
  side: { name?: string | null; taxId?: string | null },
  business: BusinessIdentity,
): IdentityMatch {
  if (business.taxId && sameTaxId(side.taxId, business.taxId)) return 'tax_id'

  const candidate = normalizeName(side.name)
  if (!candidate) return 'none'

  const ours = [business.legalName, ...business.tradeNames]
    .map(normalizeName)
    .filter((n) => n.length >= 3)

  // הכלה ולא רק שוויון: "קייטרינג אלגריה בע״מ" מול "אלגריה".
  const hit = ours.some((n) => candidate === n || candidate.includes(n) || n.includes(candidate))
  return hit ? 'name' : 'none'
}

/** ח.פ. תקין להשוואה. בלעדיו אין הכרעה ודאית על אף צד. */
export const hasUsableTaxId = (b: BusinessIdentity): boolean =>
  Boolean(b.taxId && isValidIsraeliTaxId(b.taxId))

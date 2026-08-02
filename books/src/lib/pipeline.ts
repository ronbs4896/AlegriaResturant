import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { getObjectBytes } from './storage'
import { extractDocument, ExtractionError, type ExtractedFields } from './extract'
import {
  validateDocument,
  classifyDirection,
  hasBlockingFlag,
  type ValidationFlag,
  type DocumentFacts,
  type Direction,
} from './validate'
import { isDocType, isExpenseCategory } from './constants'
import { matchOrCreateSupplier, learnSender } from './suppliers'
import { matchOrCreateCustomer } from './customers'

// ============================================================
//  הצינור: ממסמך גולמי לסטטוס סופי.
//
//  מקום אחד שמשמש גם את ההעלאה הידנית וגם את קליטת המייל,
//  כדי שלא יהיו שתי דרכים שונות להגיע לאותה טבלה.
// ============================================================

/** מתחת לזה לא מאשרים לבד, גם כשהכל נראה תקין. */
export const CONFIDENCE_THRESHOLD = 0.85

export type DocStatus = 'pending' | 'review' | 'approved' | 'rejected'

export interface PipelineOutcome {
  status: DocStatus
  /** צד הספר. null כשההשוואה לח.פ. העסק לא הכריעה. */
  direction: Direction | null
  flags: ValidationFlag[]
  reason: string
}

/**
 * ההכרעה עצמה, מופרדת מכל קלט/פלט כדי שאפשר יהיה לבדוק אותה
 * בלי לקרוא ל-API ובלי מסד.
 */
export function decide(
  fields: ExtractedFields,
  businessTaxId: string,
  today?: string,
): PipelineOutcome {
  const facts: DocumentFacts = {
    docType: isDocType(fields.doc_type) ? fields.doc_type : null,
    docDate: fields.doc_date,
    supplierTaxId: fields.supplier_tax_id,
    recipientTaxId: fields.recipient_tax_id,
    netAmount: fields.net_amount,
    vatAmount: fields.vat_amount,
    totalAmount: fields.total_amount,
    currency: fields.currency,
    allocationNumber: fields.allocation_number,
  }

  // הכנסה והוצאה עוברות את אותו מסלול: ולידציה, סף ביטחון,
  // ורק אז אישור. מסמך שהעסק הנפיק הוא הכנסה שנרשמת, לא מסמך
  // שנזרק הצידה.
  const classified = classifyDirection(facts, businessTaxId)
  const direction = classified.verdict === 'unclear' ? null : classified.verdict

  // כשהצד לא הוכרע, הוולידציה רצה במצב הוצאה — הצד השמרני.
  const flags = validateDocument(facts, {
    businessTaxId,
    today,
    direction: direction ?? 'expense',
  })

  if (!direction) {
    return { status: 'review', direction, flags, reason: classified.reason }
  }
  if (hasBlockingFlag(flags)) {
    const first = flags.find((f) => f.level === 'error')
    return { status: 'review', direction, flags, reason: first?.message ?? 'נדרשת בדיקה' }
  }
  if (fields.confidence < CONFIDENCE_THRESHOLD) {
    return {
      status: 'review',
      direction,
      flags,
      reason: `הקריאה מהמסמך אינה ודאית (${Math.round(fields.confidence * 100)}%)`,
    }
  }

  return { status: 'approved', direction, flags, reason: classified.reason }
}

/** מריץ מסמך יחיד מ-pending לסטטוס סופי ושומר. */
export async function processDocument(documentId: string): Promise<PipelineOutcome> {
  const db = await getDb()
  const rows = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.id, documentId))
    .limit(1)

  const doc = rows[0]
  if (!doc) throw new Error(`document_not_found:${documentId}`)

  const businessTaxId = process.env.BUSINESS_TAX_ID
  if (!businessTaxId) {
    throw new Error('BUSINESS_TAX_ID חסר — בלעדיו אי אפשר להבחין בין הוצאה להכנסה')
  }

  let extraction
  try {
    const bytes = await getObjectBytes(doc.blobPath)
    extraction = await extractDocument(bytes, doc.mime)
  } catch (err) {
    // כישלון חילוץ לא מאבד את המסמך — הוא נוחת בתור בדיקה עם
    // הסיבה כתובה, וניתן למלא ידנית או להריץ שוב.
    console.error('[pipeline] חילוץ נכשל', doc.id, err)
    const message = failureMessage(err)
    const flags: ValidationFlag[] = [
      { code: 'extraction_failed', level: 'error', message },
    ]
    await db
      .update(schema.documents)
      .set({ status: 'review', validationFlags: flags, classifyReason: message })
      .where(eq(schema.documents.id, doc.id))
    return { status: 'review', direction: null, flags, reason: message }
  }

  const f = extraction.fields
  const outcome = decide(f, businessTaxId)

  // הצד השני של המסמך נרשם לפי הכיוון: בהוצאה הספק (המנפיק),
  // בהכנסה הלקוח (הנמען). כשהצד לא הוכרע לא נרשם אף אחד —
  // אין טעם למלא את הטבלאות בישויות של מסמכים זרים.
  const supplier =
    outcome.direction === 'expense'
      ? await matchOrCreateSupplier(f.supplier_tax_id, f.supplier_name)
      : null
  const customer =
    outcome.direction === 'income'
      ? await matchOrCreateCustomer(f.recipient_tax_id, f.recipient_name)
      : null

  // ספק מוכר תורם קטגוריה, כך שאחרי סיווג ידני אחד כל מסמך הבא
  // ממנו מגיע כבר מסווג. דומיין השולח נלמד מאותה סיבה.
  if (supplier && doc.source === 'email' && doc.sourceSender) {
    await learnSender(supplier.id, doc.sourceSender)
  }

  await db
    .update(schema.documents)
    .set({
      status: outcome.status,
      direction: outcome.direction,
      docType: isDocType(f.doc_type) ? f.doc_type : null,
      supplierId: supplier?.id ?? null,
      customerId: customer?.id ?? null,
      supplierName: f.supplier_name,
      supplierTaxId: f.supplier_tax_id,
      recipientName: f.recipient_name,
      recipientTaxId: f.recipient_tax_id,
      docNumber: f.doc_number,
      docDate: f.doc_date,
      netAmount: f.net_amount?.toFixed(2) ?? null,
      vatAmount: f.vat_amount?.toFixed(2) ?? null,
      totalAmount: f.total_amount?.toFixed(2) ?? null,
      currency: f.currency ?? 'ILS',
      allocationNumber: f.allocation_number,
      paymentMethod: f.payment_method,
      // קטגוריית הוצאה היא מושג של צד ההוצאות בלבד.
      expenseCategory:
        outcome.direction === 'income'
          ? null
          : pickCategory(f.expense_category, supplier?.defaultCategory ?? null),
      confidence: f.confidence.toFixed(3),
      validationFlags: outcome.flags,
      classifyReason: outcome.reason,
      extractedRaw: f,
      extractionModel: extraction.model,
      extractedAt: new Date(),
    })
    .where(eq(schema.documents.id, doc.id))

  return outcome
}

/**
 * הסיבה האמיתית לכישלון נשמרת ומוצגת, לא נבלעת. "החילוץ נכשל"
 * בלי פירוט הופך כל תקלה — מפתח, אחסון, רשת — לאותו מסך.
 */
export function failureMessage(err: unknown): string {
  if (err instanceof ExtractionError) return err.message
  const detail =
    err instanceof Error ? err.message.replace(/\s+/g, ' ').slice(0, 160) : String(err)
  return `החילוץ נכשל (${detail})`
}

/** ברירת המחדל של הספק גוברת — היא נקבעה בידי אדם. */
function pickCategory(fromModel: string | null, fromSupplier: string | null): string | null {
  if (fromSupplier && isExpenseCategory(fromSupplier)) return fromSupplier
  if (fromModel && isExpenseCategory(fromModel)) return fromModel
  return null
}

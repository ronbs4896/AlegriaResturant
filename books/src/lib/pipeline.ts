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
import {
  isExpenseCategory,
  isDocKind,
  docTypeForKind,
  DOC_KINDS,
  type DocKind,
} from './constants'
import { matchOrCreateSupplier, learnSender } from './suppliers'
import { matchOrCreateCustomer } from './customers'
import { findDuplicate } from './duplicates'

// ============================================================
//  הצינור: ממסמך גולמי לסטטוס סופי.
//
//  מקום אחד שמשמש גם את ההעלאה הידנית וגם את קליטת המייל,
//  כדי שלא יהיו שתי דרכים שונות להגיע לאותה טבלה.
// ============================================================

// ============================================================
//  רמות ודאות.
//
//  ≥ READY   — הקריאה ברורה, המסמך מועמד לאישור
//  ≥ REVIEW  — לבדיקה, עם סימון השדות החשודים
//  מתחת לזה — לבדיקה, ו**הכיוון לא נקבע אוטומטית**: מסמך שלא
//              נקרא כמו שצריך לא יסווג כהכנסה או הוצאה לבד.
// ============================================================
export const CONFIDENCE_READY = 0.9
export const CONFIDENCE_REVIEW = 0.7

/** נשמר לתאימות מבחנים ותיקים. */
export const CONFIDENCE_THRESHOLD = CONFIDENCE_READY

/**
 * אישור אוטומטי כבוי כברירת מחדל. בתקופה הראשונה כל מסמך עובר
 * דרך עיניים אנושיות — עדיף מסמך אמיתי אחד שמחכה מאשר עשרות
 * מסמכים שגויים בתוך הספרים. מדליקים כשהזיהוי הוכיח את עצמו.
 */
export const autoApproveEnabled = (): boolean => process.env.AUTO_APPROVE_ENABLED === 'true'

export type DocStatus =
  | 'pending'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'not_financial'
  | 'awaiting_final'
  | 'duplicate'

export interface PipelineOutcome {
  status: DocStatus
  /** צד הספר. null כשההשוואה לח.פ. העסק לא הכריעה. */
  direction: Direction | null
  flags: ValidationFlag[]
  reason: string
  /** מה המסמך הזה, לפי הטקסונומיה הרחבה. */
  kind: DocKind
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
  const kind: DocKind = isDocKind(fields.document_kind) ? fields.document_kind : 'unknown'
  const family = DOC_KINDS[kind].family
  const kindLabel = DOC_KINDS[kind].he
  const reason = fields.kind_reason?.trim() || kindLabel

  // "לא זוהה" אינו דחייה. מסמך שלא הצלחנו לקרוא צריך עין
  // אנושית, לא חותמת "אינו פיננסי" שתקבור אותו.
  if (kind === 'unknown') {
    return {
      status: 'review',
      direction: null,
      flags: [
        {
          code: 'kind_unknown',
          level: 'error',
          message: 'לא זוהה סוג המסמך. נדרשת הכרעה ידנית',
        },
      ],
      reason: reason || 'לא זוהה סוג המסמך',
      kind,
    }
  }

  // ── שכבה ראשונה: האם זה בכלל מסמך פיננסי ─────────────────
  // המודל והטקסונומיה צריכים להסכים. חוסר הסכמה נופל לצד
  // הזהיר: לא נכנס לספרים בלי שאדם הכריע.
  if (family === 'other' || !fields.is_financial_document) {
    return {
      status: 'not_financial',
      direction: null,
      flags: [
        {
          code: 'not_financial',
          level: 'info',
          message: `זוהה כ${kindLabel} — אינו חשבונית או קבלה`,
        },
      ],
      reason,
      kind,
    }
  }

  const facts: DocumentFacts = {
    docType: docTypeForKind(kind),
    docDate: fields.doc_date,
    supplierTaxId: fields.supplier_tax_id,
    recipientTaxId: fields.recipient_tax_id,
    netAmount: fields.net_amount,
    vatAmount: fields.vat_amount,
    totalAmount: fields.total_amount,
    currency: fields.currency,
    allocationNumber: fields.allocation_number,
  }

  const classified = classifyDirection(facts, businessTaxId)
  // ודאות נמוכה מדי — לא מסווגים צד לבד. הקריאה עצמה לא אמינה,
  // וסיווג על בסיסה יכניס מסמך לצד הלא נכון של הספר.
  const readEnough = fields.confidence >= CONFIDENCE_REVIEW
  const direction =
    classified.verdict === 'unclear' || !readEnough ? null : classified.verdict

  // כשהצד לא הוכרע, הוולידציה רצה במצב הוצאה — הצד השמרני.
  const flags = validateDocument(facts, {
    businessTaxId,
    today,
    direction: direction ?? 'expense',
  })

  // ── מסמך פיננסי שאינו סופי ───────────────────────────────
  // חשבון עסקה ודרישת תשלום נשמרים, אבל לעולם לא נספרים בדוחות
  // עד שתגיע החשבונית הסופית.
  if (family === 'interim') {
    flags.push({
      code: 'awaiting_final_document',
      level: 'warn',
      message: `${kindLabel} אינו מסמך מס סופי. ממתין לחשבונית או לקבלה`,
    })
    return { status: 'awaiting_final', direction, flags, reason, kind }
  }

  // ── איכות ופיצול ─────────────────────────────────────────
  if (!fields.image_quality_ok) {
    flags.push({
      code: 'poor_image_quality',
      level: 'error',
      message: 'איכות הצילום נמוכה מכדי לקרוא בוודאות. כדאי לצלם מחדש',
    })
  }
  if (fields.looks_like_multiple_documents) {
    flags.push({
      code: 'multiple_documents',
      level: 'error',
      message: 'נראה שהקובץ מכיל יותר ממסמך אחד. יש להפריד לפני אישור',
    })
  }

  // ── שדות בודדים בוודאות נמוכה ────────────────────────────
  for (const field of lowConfidenceFields(fields)) {
    flags.push({
      code: `low_confidence_${field.key}`,
      level: 'warn',
      message: `${field.he} נקרא בוודאות נמוכה (${Math.round(field.value * 100)}%). כדאי לאמת מול המסמך`,
    })
  }

  if (!direction) {
    const why = readEnough
      ? classified.reason
      : `הקריאה מהמסמך אינה ודאית (${Math.round(fields.confidence * 100)}%) — הצד לא נקבע אוטומטית`
    return { status: 'review', direction: null, flags, reason: why, kind }
  }
  if (hasBlockingFlag(flags)) {
    const first = flags.find((f) => f.level === 'error')
    return { status: 'review', direction, flags, reason: first?.message ?? 'נדרשת בדיקה', kind }
  }
  if (fields.confidence < CONFIDENCE_READY) {
    return {
      status: 'review',
      direction,
      flags,
      reason: `הקריאה מהמסמך אינה ודאית (${Math.round(fields.confidence * 100)}%)`,
      kind,
    }
  }
  if (!autoApproveEnabled()) {
    return {
      status: 'review',
      direction,
      flags,
      reason: 'הכול נראה תקין. אישור אוטומטי כבוי, ולכן ממתין לאישורכם',
      kind,
    }
  }

  return { status: 'approved', direction, flags, reason: classified.reason, kind }
}

/** שדות מפתח שהמודל עצמו סימן כלא ודאיים. */
const CONFIDENCE_LABELS: Record<string, string> = {
  document_kind: 'סוג המסמך',
  supplier_name: 'שם הספק',
  supplier_tax_id: 'ח.פ. הספק',
  recipient_name: 'שם הנמען',
  recipient_tax_id: 'ח.פ. הנמען',
  doc_number: 'מספר המסמך',
  doc_date: 'תאריך המסמך',
  total_amount: 'הסכום הכולל',
}

export function lowConfidenceFields(
  fields: Pick<ExtractedFields, 'field_confidence'>,
): { key: string; he: string; value: number }[] {
  return Object.entries(fields.field_confidence ?? {})
    .filter(([key, value]) => key in CONFIDENCE_LABELS && value < CONFIDENCE_REVIEW)
    .map(([key, value]) => ({ key, he: CONFIDENCE_LABELS[key]!, value }))
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
    return { status: 'review', direction: null, flags, reason: message, kind: 'unknown' }
  }

  const f = extraction.fields
  const outcome = decide(f, businessTaxId)

  // הצד השני של המסמך נרשם לפי הכיוון: בהוצאה הספק (המנפיק),
  // בהכנסה הלקוח (הנמען). כשהצד לא הוכרע לא נרשם אף אחד —
  // אין טעם למלא את הטבלאות בישויות של מסמכים זרים.
  // מסמך שאינו פיננסי לא מייצר ספק ולא לקוח: אין סיבה שחוזה או
  // הצעת מחיר יוסיפו ישויות לטבלאות שהדוחות נשענים עליהן.
  const booked = outcome.status !== 'not_financial'
  const supplier =
    booked && outcome.direction === 'expense'
      ? await matchOrCreateSupplier(f.supplier_tax_id, f.supplier_name)
      : null
  const customer =
    booked && outcome.direction === 'income'
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
      docKind: outcome.kind,
      duplicateOfId: null,
      kindReason: f.kind_reason || null,
      docLanguage: f.document_language,
      fieldConfidence: f.field_confidence,
      docType: docTypeForKind(outcome.kind),
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

  // בדיקת כפילות רצה על המסמך אחרי שנשמר, כי היא משווה שדות
  // מחולצים. מסמך שאינו פיננסי לא נבדק — אין לו מה לשכפל.
  if (booked && outcome.status !== 'awaiting_final') {
    const fresh = await db
      .select()
      .from(schema.documents)
      .where(eq(schema.documents.id, doc.id))
      .limit(1)
    const hit = fresh[0] ? await findDuplicate(fresh[0]) : null

    if (hit) {
      const flags: ValidationFlag[] = [
        ...outcome.flags,
        {
          code: 'possible_duplicate',
          level: 'error',
          message: `נראה זהה למסמך שכבר קיים (${hit.matched.join(', ')}). צריך להכריע`,
        },
      ]
      const reason = 'חשד לכפילות מול מסמך קיים'
      await db
        .update(schema.documents)
        .set({
          status: 'duplicate',
          duplicateOfId: hit.document.id,
          validationFlags: flags,
          classifyReason: reason,
        })
        .where(eq(schema.documents.id, doc.id))
      return { ...outcome, status: 'duplicate', flags, reason }
    }
  }

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

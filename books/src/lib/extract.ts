import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { DOC_KINDS, EXPENSE_CATEGORIES, isDocKind } from './constants'

// ============================================================
//  חילוץ שדות ממסמך.
//
//  קריאה אחת ל-Claude עם structured outputs: התשובה מובטחת
//  כ-JSON תקין לפי סכימה, ואין ניתוח טקסט חופשי שיכול להישבר.
//
//  PDF וצילום נשלחים שניהם כמו שהם — ה-API עושה את הרסטור.
//  **לא קוראים את שכבת הטקסט של ה-PDF.** PDF שומר גליפים בסדר
//  חזותי, וספריות חילוץ מחזירות עברית הפוכה ומספרים שקפצו
//  ממקומם. כאן זה היה מייצר סכומים שגויים בשקט.
// ============================================================

const MODEL = 'claude-opus-5'

const DOC_KIND_KEYS = Object.keys(DOC_KINDS)
const CATEGORY_KEYS = Object.keys(EXPENSE_CATEGORIES)

/** השדות שמקבלים ודאות נפרדת — אלה שטעות בהם עולה כסף. */
const CONFIDENCE_FIELDS = [
  'document_kind',
  'supplier_name',
  'supplier_tax_id',
  'recipient_name',
  'recipient_tax_id',
  'doc_number',
  'doc_date',
  'total_amount',
] as const

/** נכתב ידנית ולא נגזר מ-zod, כדי לא להיתלות בתאימות helper לגרסה. */
const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'is_financial_document',
    'document_kind',
    'kind_reason',
    'document_language',
    'looks_like_multiple_documents',
    'image_quality_ok',
    'field_confidence',
    'supplier_name',
    'supplier_tax_id',
    'recipient_name',
    'recipient_tax_id',
    'doc_number',
    'doc_date',
    'net_amount',
    'vat_amount',
    'total_amount',
    'currency',
    'allocation_number',
    'payment_method',
    'expense_category',
    'confidence',
    'notes',
  ],
  properties: {
    // ── קודם כל: מה זה בכלל ────────────────────────────────
    is_financial_document: { type: 'boolean' },
    // ל-enum עם null יש שתי צורות כתיבה; anyOf היא החד-משמעית מול
    // הוולידטור של structured outputs, אז רק בה משתמשים.
    document_kind: { anyOf: [{ type: 'string', enum: DOC_KIND_KEYS }, { type: 'null' }] },
    kind_reason: { type: 'string' },
    document_language: { type: ['string', 'null'] },
    looks_like_multiple_documents: { type: 'boolean' },
    image_quality_ok: { type: 'boolean' },
    field_confidence: {
      type: 'object',
      additionalProperties: false,
      required: [...CONFIDENCE_FIELDS],
      properties: Object.fromEntries(
        CONFIDENCE_FIELDS.map((f) => [f, { type: 'number', minimum: 0, maximum: 1 }]),
      ),
    },
    // ── ואז: מה כתוב בו ────────────────────────────────────
    supplier_name: { type: ['string', 'null'] },
    supplier_tax_id: { type: ['string', 'null'] },
    recipient_name: { type: ['string', 'null'] },
    recipient_tax_id: { type: ['string', 'null'] },
    doc_number: { type: ['string', 'null'] },
    doc_date: { type: ['string', 'null'] },
    net_amount: { type: ['number', 'null'] },
    vat_amount: { type: ['number', 'null'] },
    total_amount: { type: ['number', 'null'] },
    currency: { type: ['string', 'null'] },
    allocation_number: { type: ['string', 'null'] },
    payment_method: { type: ['string', 'null'] },
    expense_category: { anyOf: [{ type: 'string', enum: CATEGORY_KEYS }, { type: 'null' }] },
    confidence: { type: 'number' },
    notes: { type: ['string', 'null'] },
  },
} as const

const Extracted = z.object({
  is_financial_document: z.boolean(),
  document_kind: z.string().nullable(),
  kind_reason: z.string(),
  document_language: z.string().nullable(),
  looks_like_multiple_documents: z.boolean(),
  image_quality_ok: z.boolean(),
  field_confidence: z.record(z.string(), z.number()),
  supplier_name: z.string().nullable(),
  supplier_tax_id: z.string().nullable(),
  recipient_name: z.string().nullable(),
  recipient_tax_id: z.string().nullable(),
  doc_number: z.string().nullable(),
  doc_date: z.string().nullable(),
  net_amount: z.number().nullable(),
  vat_amount: z.number().nullable(),
  total_amount: z.number().nullable(),
  currency: z.string().nullable(),
  allocation_number: z.string().nullable(),
  payment_method: z.string().nullable(),
  expense_category: z.string().nullable(),
  confidence: z.number(),
  notes: z.string().nullable(),
})

export type ExtractedFields = z.infer<typeof Extracted>

const SYSTEM = `אתה בודק מסמכים עבור מערכת הנהלת חשבונות של עסק ישראלי.
העבודה שלך היא בשני שלבים, ובסדר הזה.

## שלב 1 — מה המסמך הזה?
זו המשימה החשובה. רוב הקבצים שמגיעים אליך אינם חשבוניות: הם חוזים, הצעות מחיר, תעודות משלוח, דוחות, חומר שיווקי או צילומי מסך. סיווג שגוי שלהם כחשבונית מכניס נתונים שקריים לספרי העסק.

is_financial_document = true רק כאשר מדובר במסמך שמתעד תשלום או חיוב בפועל: חשבונית מס, חשבונית מס-קבלה, קבלה, חשבונית זיכוי, חשבונית מחו"ל, חשבון עסקה או דרישת תשלום.

is_financial_document = false לכל השאר. במיוחד שים לב להבחנות האלה:
- **הצעת מחיר** (quote) — כתוב "הצעת מחיר", "הצעה", "Quotation", "Estimate", לרוב עם תוקף להצעה או "בכפוף לאישור". אינה חשבונית גם כשיש בה סכומים ומע"מ.
- **הזמנת רכש / אישור הזמנה** (purchase_order / order_confirmation) — "הזמנה", "Order", "PO". מתעדת כוונה, לא חיוב.
- **תעודת משלוח** (delivery_note) — "תעודת משלוח", "משלוח", "Delivery Note". מתעדת סחורה שנמסרה, לרוב בלי סכומים או בלי מע"מ.
- **חוזה, הסכם, דוח, קטלוג, תפריט, מצגת, חומר שיווקי, כרטיס טיסה, דף חשבון בנק, צילום מסך** — לא מסמכים פיננסיים.
- **לוגו או חתימת מייל** (signature_or_logo) — תמונה קטנה עם סמל בלבד, בלי תוכן מסמך.
- אם אינך מצליח לקרוא את המסמך או שאינו מתאים לאף קטגוריה — document_kind = "unknown".

ההבחנה בין חשבונית מס לבין חשבון עסקה קריטית: "חשבון עסקה" או "חשבונית עסקה" (proforma) אינה מסמך מס ואינה מזכה בניכוי. אל תסווג אותה כחשבונית מס גם אם היא נראית זהה.

kind_reason: משפט קצר אחד בעברית שמסביר על סמך מה הכרעת. ייקרא בידי אדם כשהמסמך נדחה, אז כתוב מה ראית: "כתוב בראש המסמך 'הצעת מחיר' ויש תוקף להצעה".

## שלב 2 — חילוץ השדות
רק אם המסמך פיננסי. במסמך שאינו פיננסי החזר null בכל שדות התוכן.

- החזר בדיוק את מה שכתוב. אל תחשב, אל תשלים ואל תנחש.
- שדה שאינו מופיע, או שאינך קורא בוודאות — null. **null עדיף על ניחוש.** מספר מומצא גרוע פי כמה משדה ריק.
- תאריכים YYYY-MM-DD. מסמך ישראלי כותב לרוב DD/MM/YYYY.
- סכומים כמספרים, בלי מטבע ובלי מפרידי אלפים.
- ח.פ. / ע.מ. — ספרות בלבד.
- "מספר הקצאה" הוא בן 9 ספרות ממודל חשבוניות ישראל, ונפרד ממספר המסמך. אל תבלבל.
- המנפיק בדרך כלל בראש המסמך; הנמען ליד "לכבוד" או "Bill To". אל תניח מי מהם העסק — חלץ את שניהם כפי שהם.
- בחשבונית זיכוי החזר את הסכומים כפי שמופיעים במסמך, בלי להפוך סימן.
- expense_category רק כשזו הוצאה של עסק הסעדה. אחרת null.

## ודאות
field_confidence: מספר בין 0 ל-1 לכל שדה — כמה אתה בטוח **באותו שדה**. שדה שקראת מטקסט ברור מקבל ערך גבוה; שדה שנחתך, מטושטש או שהסקת אותו מהקשר מקבל ערך נמוך. אל תיתן ערך גבוה לשדה שלא ראית.
confidence: הערכה כוללת לקריאת המסמך.

image_quality_ok = false כשהצילום מטושטש, חתוך, כהה או מסונוור עד שאי אפשר לקרוא ממנו בביטחון. במקרה כזה עדיף לבקש צילום מחדש מאשר להחזיר מספרים מנוחשים.
looks_like_multiple_documents = true כשבקובץ יש יותר ממסמך אחד (למשל שתי חשבוניות שונות, או חשבונית וקבלה נפרדת).
document_language: קוד שפה עיקרי, למשל "he" או "en".
notes: משפט קצר בעברית רק אם יש משהו חריג שאדם צריך לדעת.`

export class ExtractionError extends Error {
  constructor(readonly code: string, message: string) {
    super(message)
  }
}

/**
 * שגיאת API הופכת להודעה שאדם יכול לפעול לפיה. בלי המיפוי הזה
 * המסך מציג "החילוץ נכשל" וכל תקלה — מפתח שגוי, עומס, רשת —
 * נראית אותו דבר.
 */
export function describeApiFailure(err: unknown): ExtractionError | null {
  if (!(err instanceof Anthropic.APIError)) return null
  const status = typeof err.status === 'number' ? err.status : null

  if (status === 401 || status === 403) {
    return new ExtractionError(
      `api_${status}`,
      `מפתח ה-API נדחה (${status}). בדקו את ANTHROPIC_API_KEY בהגדרות הפרויקט ב-Vercel`,
    )
  }
  if (status === 429) {
    return new ExtractionError('api_429', 'עומס זמני על שירות החילוץ (429). נסו שוב בעוד דקה')
  }
  if (status === 413) {
    return new ExtractionError('api_413', 'הקובץ גדול מדי לחילוץ (413)')
  }
  if (status !== null && status >= 500) {
    return new ExtractionError(`api_${status}`, `תקלה זמנית בשירות החילוץ (${status}). נסו שוב`)
  }
  if (status !== null) {
    // 400 וכדומה: תחילת הודעת השרת נשמרת — היא אומרת מה בדיוק נדחה.
    const detail = err.message.replace(/\s+/g, ' ').slice(0, 160)
    return new ExtractionError(`api_${status}`, `הבקשה נדחתה (${status}): ${detail}`)
  }
  return new ExtractionError('api_network', 'אין חיבור לשירות החילוץ. תקלת רשת או timeout')
}

export interface ExtractionResult {
  fields: ExtractedFields
  model: string
  usage: { input: number; output: number }
}

export async function extractDocument(
  bytes: Uint8Array,
  mime: string,
): Promise<ExtractionResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ExtractionError('no_api_key', 'ANTHROPIC_API_KEY חסר — אי אפשר לחלץ שדות')
  }

  // timeout קצר מ-maxDuration של ה-route (120), כדי שהכישלון יירשם
  // במסד במקום שהפונקציה תמות בשקט. תקלות רשת ועומס נרפאות ב-retry.
  const client = new Anthropic({ timeout: 90_000, maxRetries: 3 })
  const data = Buffer.from(bytes).toString('base64')

  const source =
    mime === 'application/pdf'
      ? ({
          type: 'document' as const,
          source: { type: 'base64' as const, media_type: 'application/pdf' as const, data },
        })
      : ({
          type: 'image' as const,
          source: {
            type: 'base64' as const,
            media_type: mime as 'image/jpeg' | 'image/png' | 'image/webp',
            data,
          },
        })

  let response: Anthropic.Message
  try {
    response = await client.messages.create({
      model: MODEL,
      // תקרה נדיבה: ב-Opus 5 החשיבה דלוקה כברירת מחדל ונספרת כאן.
      max_tokens: 16_000,
      system: SYSTEM,
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: OUTPUT_SCHEMA },
      },
      messages: [
        {
          role: 'user',
          content: [source, { type: 'text', text: 'חלץ את שדות המסמך.' }],
        },
      ],
    })
  } catch (err) {
    throw describeApiFailure(err) ?? err
  }

  if (response.stop_reason === 'refusal') {
    throw new ExtractionError('refused', 'הבקשה נדחתה על ידי המודל')
  }
  if (response.stop_reason === 'max_tokens') {
    throw new ExtractionError('max_tokens', 'התשובה נקטעה באמצע. נסו שוב')
  }

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')

  if (!text.trim()) {
    throw new ExtractionError('empty_response', 'המודל החזיר תשובה ריקה')
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new ExtractionError('bad_json', 'התשובה אינה JSON תקין')
  }

  const result = Extracted.safeParse(parsed)
  if (!result.success) {
    throw new ExtractionError('schema_mismatch', `התשובה אינה תואמת לסכימה: ${result.error.message}`)
  }

  return {
    fields: normalize(result.data),
    model: MODEL,
    usage: {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens,
    },
  }
}

/** ניקוי קל שאפשר לעשות בוודאות, לפני שהוולידציה נכנסת. */
function normalize(f: ExtractedFields): ExtractedFields {
  const digits = (v: string | null) => {
    if (!v) return null
    const d = v.replace(/\D/g, '')
    return d.length > 0 ? d : null
  }
  const trim = (v: string | null) => {
    if (!v) return null
    const t = v.trim()
    return t.length > 0 ? t : null
  }
  return {
    ...f,
    supplier_name: trim(f.supplier_name),
    recipient_name: trim(f.recipient_name),
    supplier_tax_id: digits(f.supplier_tax_id),
    recipient_tax_id: digits(f.recipient_tax_id),
    allocation_number: digits(f.allocation_number),
    doc_number: trim(f.doc_number),
    // תאריך שאינו ISO תקין נזרק ומטופל כחסר, במקום להישמר שבור.
    doc_date: f.doc_date && /^\d{4}-\d{2}-\d{2}$/.test(f.doc_date) ? f.doc_date : null,
    currency: trim(f.currency)?.toUpperCase() ?? null,
    confidence: clamp(f.confidence),
    // סוג לא מוכר נחשב "לא זוהה" ולא ערך חופשי שיזלוג הלאה.
    document_kind: isDocKind(f.document_kind) ? f.document_kind : 'unknown',
    kind_reason: trim(f.kind_reason) ?? '',
    document_language: trim(f.document_language),
    field_confidence: Object.fromEntries(
      Object.entries(f.field_confidence ?? {}).map(([k, v]) => [k, clamp(Number(v))]),
    ),
  }
}

const clamp = (n: number) => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0)

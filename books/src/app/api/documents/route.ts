import { after } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'
import { putObject, StorageNotConfigured } from '@/lib/storage'
import { isAcceptedMime, MIN_ATTACHMENT_BYTES, DOC_TYPES, EXPENSE_CATEGORIES } from '@/lib/constants'
import { processDocument } from '@/lib/pipeline'
import { validateDocument, classifyDirection, hasBlockingFlag, type Direction } from '@/lib/validate'
import { matchOrCreateSupplier } from '@/lib/suppliers'
import { matchOrCreateCustomer } from '@/lib/customers'
import { isDocType } from '@/lib/constants'

export const runtime = 'nodejs'
export const maxDuration = 120

// גבול גוף הבקשה של פונקציה ב-Vercel הוא 4.5MB. הדפדפן כבר
// מקטין צילומים לכמה מאות KB, כך שהתקרה נוגעת רק לקבצי PDF
// גדולים שהועלו מהמחשב — ואלה ממילא עדיפים דרך המייל.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

export const POST = handler(async (req) => {
  const user = await requireUser()

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) {
    return Response.json({ error: 'no_file' }, { status: 400 })
  }

  const mime = file.type || 'application/octet-stream'
  if (!isAcceptedMime(mime)) {
    return Response.json({ error: 'unsupported_type', mime }, { status: 415 })
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return Response.json({ error: 'too_large', maxBytes: MAX_UPLOAD_BYTES }, { status: 413 })
  }
  if (file.size < MIN_ATTACHMENT_BYTES) {
    return Response.json({ error: 'too_small' }, { status: 400 })
  }

  const bytes = new Uint8Array(await file.arrayBuffer())

  let stored
  try {
    stored = await putObject(bytes, mime)
  } catch (err) {
    if (err instanceof StorageNotConfigured) {
      console.error('[documents]', err.message)
      return Response.json({ error: err.code }, { status: 503 })
    }
    throw err
  }

  const db = await getDb()

  // אותו קובץ בדיוק שכבר קיים: מחזירים את הרשומה הקיימת במקום
  // ליצור כפילות. זה מה שמאפשר לצלם בלי לחשוב פעמיים.
  const existing = await db
    .select({ id: schema.documents.id })
    .from(schema.documents)
    .where(eq(schema.documents.sha256, stored.sha256))
    .limit(1)

  if (existing[0]) {
    return Response.json({ ok: true, id: existing[0].id, duplicate: true })
  }

  const inserted = await db
    .insert(schema.documents)
    .values({
      sha256: stored.sha256,
      blobPath: stored.path,
      mime,
      sizeBytes: stored.sizeBytes,
      originalFilename: file.name || null,
      source: 'upload',
      uploadedBy: user.uid,
      status: 'pending',
    })
    .returning({ id: schema.documents.id })

  const id = inserted[0]?.id

  // החילוץ רץ אחרי שהתשובה נשלחה, כדי שמי שמצלם עשר קבלות
  // לא יעמוד מול ספינר. after() מחזיק את הפונקציה בחיים עד
  // שהעבודה מסתיימת — בלעדיו serverless היה נסגר באמצע.
  if (id) {
    after(async () => {
      try {
        await processDocument(id)
      } catch (err) {
        console.error('[documents] extraction failed', id, err)
      }
    })
  }

  return Response.json({ ok: true, id, duplicate: false })
})

// ============================================================
//  עריכה מתור הבדיקה.
//  כל שינוי נרשם ביומן, והוולידציה רצה מחדש — תיקון ידני
//  שמשאיר דגל חוסם לא יאשר את המסמך.
// ============================================================
const EDITABLE = {
  direction: z.enum(['expense', 'income']).nullable(),
  docType: z.enum(Object.keys(DOC_TYPES) as [string, ...string[]]).nullable(),
  supplierName: z.string().max(200).nullable(),
  supplierTaxId: z.string().max(20).nullable(),
  recipientName: z.string().max(200).nullable(),
  recipientTaxId: z.string().max(20).nullable(),
  docNumber: z.string().max(60).nullable(),
  docDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  netAmount: z.number().nullable(),
  vatAmount: z.number().nullable(),
  totalAmount: z.number().nullable(),
  allocationNumber: z.string().max(20).nullable(),
  paymentMethod: z.string().max(60).nullable(),
  expenseCategory: z.enum(Object.keys(EXPENSE_CATEGORIES) as [string, ...string[]]).nullable(),
} as const

const Patch = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'review', 'approved', 'rejected']).optional(),
  fields: z.object(EDITABLE).partial().optional(),
})

export const PATCH = handler(async (req) => {
  const user = await requireUser('admin')
  const parsed = Patch.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  const before = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.id, parsed.data.id))
    .limit(1)

  const row = before[0]
  if (!row) return Response.json({ error: 'not_found' }, { status: 404 })

  const businessTaxId = process.env.BUSINESS_TAX_ID
  if (!businessTaxId) return Response.json({ error: 'business_tax_id_missing' }, { status: 503 })

  const edits = parsed.data.fields ?? {}
  const update: Record<string, unknown> = {}
  const auditRows: { field: string; oldValue: string | null; newValue: string | null }[] = []

  for (const [key, value] of Object.entries(edits)) {
    if (value === undefined) continue
    const oldValue = (row as Record<string, unknown>)[key]
    const normalized = typeof value === 'number' ? value.toFixed(2) : value
    if (String(oldValue ?? '') === String(normalized ?? '')) continue
    update[key] = normalized
    auditRows.push({
      field: key,
      oldValue: oldValue == null ? null : String(oldValue),
      newValue: normalized == null ? null : String(normalized),
    })
  }

  // הוולידציה רצה על המצב אחרי העריכה, לא על מה שהוגש.
  const merged = { ...row, ...update } as typeof row
  const num = (v: string | null) => (v == null ? null : Number(v))
  const facts = {
    docType: isDocType(merged.docType) ? merged.docType : null,
    docDate: merged.docDate,
    supplierTaxId: merged.supplierTaxId,
    recipientTaxId: merged.recipientTaxId,
    netAmount: num(merged.netAmount),
    vatAmount: num(merged.vatAmount),
    totalAmount: num(merged.totalAmount),
    currency: merged.currency,
    allocationNumber: merged.allocationNumber,
  }
  // צד הספר: בחירה ידנית גוברת; בלעדיה ההשוואה לח.פ. העסק
  // מכריעה. ההכרעה האוטומטית נרשמת ביומן כמו כל שינוי.
  const classified = classifyDirection(facts, businessTaxId)
  let direction = (merged.direction ?? null) as Direction | null
  if (!direction && classified.verdict !== 'unclear') {
    direction = classified.verdict
    if (direction !== row.direction) {
      update.direction = direction
      auditRows.push({ field: 'direction', oldValue: row.direction, newValue: direction })
    }
  }

  const flags = validateDocument(facts, {
    businessTaxId,
    direction: direction ?? 'expense',
  })
  update.validationFlags = flags

  const nextStatus = parsed.data.status ?? row.status
  // אישור ידני נחסם כל עוד יש דגל חוסם. זה הכלל שלא נשבר,
  // וגם אדם לא עוקף אותו בטעות.
  if (nextStatus === 'approved' && hasBlockingFlag(flags)) {
    return Response.json(
      {
        error: 'blocking_flags',
        flags: flags.filter((f) => f.level === 'error'),
      },
      { status: 409 },
    )
  }
  // מסמך מאושר חייב צד: הדוחות בנויים על ההבחנה הזו.
  if (nextStatus === 'approved' && !direction) {
    return Response.json({ error: 'direction_required' }, { status: 409 })
  }

  if (nextStatus !== row.status) {
    update.status = nextStatus
    auditRows.push({ field: 'status', oldValue: row.status, newValue: nextStatus })
  }

  if (auditRows.length === 0) return Response.json({ ok: true, unchanged: true, flags })

  // תיקון ידני של ח.פ. הוא בדיוק הרגע שבו כדאי ללמוד את הצד
  // השני: מכאן והלאה כל מסמך שיגיע ממנו כבר מגיע מקושר.
  if (
    direction !== 'income' &&
    (update.supplierTaxId !== undefined || update.supplierName !== undefined)
  ) {
    const supplier = await matchOrCreateSupplier(merged.supplierTaxId, merged.supplierName)
    if (supplier && supplier.id !== row.supplierId) update.supplierId = supplier.id
  }
  if (
    direction === 'income' &&
    (update.recipientTaxId !== undefined ||
      update.recipientName !== undefined ||
      update.direction !== undefined)
  ) {
    const customer = await matchOrCreateCustomer(merged.recipientTaxId, merged.recipientName)
    if (customer && customer.id !== row.customerId) update.customerId = customer.id
  }

  update.reviewedBy = user.uid
  update.reviewedAt = new Date()

  await db.update(schema.documents).set(update).where(eq(schema.documents.id, row.id))
  await db.insert(schema.auditLog).values(
    auditRows.map((a) => ({ documentId: row.id, userId: user.uid, ...a })),
  )

  return Response.json({ ok: true, status: nextStatus, flags })
})

import { eq, sum } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import {
  derivePaymentStatus,
  type PaymentSource,
  type PaymentStatus,
} from './payments'

// ============================================================
//  כתיבת תשלומים.
//
//  `payment_status` על המסמך נגזר תמיד מטבלת התשלומים ואינו
//  נכתב ישירות משום מסלול אחר. כל מסלול — ידני, אוטומטי,
//  ביטול — מוסיף או מוריד שורה וקורא ל-recompute.
// ============================================================

const num = (v: string | number | null | undefined): number => {
  const n = typeof v === 'number' ? v : Number(v ?? 0)
  return Number.isFinite(n) ? n : 0
}

export async function recomputePaymentStatus(documentId: string): Promise<{
  paid: number
  status: PaymentStatus
  paidAt: string | null
}> {
  const db = await getDb()

  const [doc] = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.id, documentId))
    .limit(1)
  if (!doc) throw new Error(`document_not_found:${documentId}`)

  const payments = await db
    .select()
    .from(schema.documentPayments)
    .where(eq(schema.documentPayments.documentId, documentId))

  const paid = payments.reduce((s, p) => s + num(p.amount), 0)
  const current = (doc.paymentStatus ?? 'unpaid') as PaymentStatus
  const status = derivePaymentStatus(num(doc.totalAmount) || null, paid, current)

  // תאריך התשלום הוא של התשלום האחרון — זה התאריך שסוגר את
  // החוב, וזה מה שההתאמה מול הבנק מחפשת.
  const paidAt =
    payments.length === 0 ? null : (payments.map((p) => p.paidAt).sort().at(-1) ?? null)

  await db
    .update(schema.documents)
    .set({ paidAmount: paid.toFixed(2), paymentStatus: status, paidAt })
    .where(eq(schema.documents.id, documentId))

  return { paid, status, paidAt }
}

export async function addPayment(input: {
  documentId: string
  amount: number
  paidAt: string
  source: PaymentSource
  method?: string | null
  reference?: string | null
  note?: string | null
  createdBy?: string | null
}) {
  const db = await getDb()
  await db.insert(schema.documentPayments).values({
    documentId: input.documentId,
    amount: input.amount.toFixed(2),
    paidAt: input.paidAt,
    source: input.source,
    method: input.method ?? null,
    reference: input.reference ?? null,
    note: input.note ?? null,
    createdBy: input.createdBy ?? null,
  })
  return recomputePaymentStatus(input.documentId)
}

export async function removePayment(paymentId: string, documentId: string) {
  const db = await getDb()
  await db.delete(schema.documentPayments).where(eq(schema.documentPayments.id, paymentId))
  return recomputePaymentStatus(documentId)
}

/**
 * האם נרשמו למסמך תשלומים בפועל.
 *
 * הצנרת שואלת לפני שהיא דורסת מצב תשלום: הרצת חילוץ חוזרת
 * מרעננת את שדות המסמך, אבל תשלום שנרשם הוא עובדה שאינה
 * נגזרת מהקובץ ואסור שתימחק בגללו.
 */
export async function hasRecordedPayments(documentId: string): Promise<boolean> {
  const db = await getDb()
  const rows = await db
    .select({ id: schema.documentPayments.id })
    .from(schema.documentPayments)
    .where(eq(schema.documentPayments.documentId, documentId))
    .limit(1)
  return rows.length > 0
}

export async function totalPaid(documentId: string): Promise<number> {
  const db = await getDb()
  const [row] = await db
    .select({ total: sum(schema.documentPayments.amount) })
    .from(schema.documentPayments)
    .where(eq(schema.documentPayments.documentId, documentId))
  return num(row?.total)
}

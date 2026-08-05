import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { handler, requireUser } from '@/lib/session'
import { addPayment, removePayment } from '@/lib/payments-db'
import { PAYMENT_STATUS_HE, remainingAmount } from '@/lib/payments'

export const runtime = 'nodejs'

// ============================================================
//  רישום תשלום ידני.
//
//  זה המסלול של מזומן ושל כל תשלום שלא עובר בבנק. הוא מוסיף
//  שורה בטבלת התשלומים ומחשב מחדש את מצב המסמך — אף מסלול
//  אינו כותב את מצב התשלום ישירות.
// ============================================================

const ISO = /^\d{4}-\d{2}-\d{2}$/

const Body = z.object({
  documentId: z.string().uuid(),
  /** ריק = הסכום שנותר לתשלום */
  amount: z.number().positive().max(100_000_000).optional(),
  paidAt: z.string().regex(ISO),
  method: z.string().max(60).nullable().optional(),
  reference: z.string().max(120).nullable().optional(),
  note: z.string().max(300).nullable().optional(),
})

const num = (v: string | null): number => {
  const n = Number(v ?? 0)
  return Number.isFinite(n) ? n : 0
}

export const POST = handler(async (req) => {
  const user = await requireUser('admin')
  const parsed = Body.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  const [doc] = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.id, parsed.data.documentId))
    .limit(1)
  if (!doc) return Response.json({ error: 'not_found' }, { status: 404 })

  // זיכוי אינו חוב שנפרע אלא קיזוז מול מסמך אחר. רישום תשלום
  // עליו היה מייצר כסף שלא זז.
  if (doc.paymentStatus === 'n/a') {
    return Response.json({ error: 'not_payable' }, { status: 409 })
  }

  const already = num(doc.paidAmount)
  const remaining = remainingAmount(doc.totalAmount, doc.paidAmount)

  // בלי סכום מפורש: מה שנותר. זה המקרה השכיח — לוחצים "שולם"
  // על חשבונית שלמה ולא רוצים להקליד מספר שכבר כתוב במסמך.
  const amount = parsed.data.amount ?? remaining
  if (amount <= 0) {
    return Response.json({ error: 'nothing_to_pay' }, { status: 409 })
  }

  const result = await addPayment({
    documentId: doc.id,
    amount,
    paidAt: parsed.data.paidAt,
    source: 'manual',
    method: parsed.data.method ?? null,
    reference: parsed.data.reference ?? null,
    note: parsed.data.note ?? null,
    createdBy: user.uid,
  })

  await db.insert(schema.auditLog).values({
    documentId: doc.id,
    userId: user.uid,
    field: 'payment',
    oldValue: `${PAYMENT_STATUS_HE[(doc.paymentStatus ?? 'unpaid') as 'unpaid']} (${already.toFixed(2)})`,
    newValue: `${PAYMENT_STATUS_HE[result.status]} (${result.paid.toFixed(2)}) בתאריך ${parsed.data.paidAt}`,
  })

  return Response.json({ ok: true, ...result })
})

const Remove = z.object({
  documentId: z.string().uuid(),
  paymentId: z.string().uuid(),
})

export const DELETE = handler(async (req) => {
  const user = await requireUser('admin')
  const parsed = Remove.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_body' }, { status: 400 })

  const db = await getDb()
  const [row] = await db
    .select()
    .from(schema.documentPayments)
    .where(
      and(
        eq(schema.documentPayments.id, parsed.data.paymentId),
        eq(schema.documentPayments.documentId, parsed.data.documentId),
      ),
    )
    .limit(1)
  if (!row) return Response.json({ error: 'not_found' }, { status: 404 })

  const result = await removePayment(row.id, row.documentId)

  await db.insert(schema.auditLog).values({
    documentId: row.documentId,
    userId: user.uid,
    field: 'payment',
    oldValue: `תשלום ${Number(row.amount).toFixed(2)} מ-${row.paidAt}`,
    newValue: `בוטל — ${PAYMENT_STATUS_HE[result.status]}`,
  })

  return Response.json({ ok: true, ...result })
})

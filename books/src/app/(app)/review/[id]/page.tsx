import Link from 'next/link'
import { notFound } from 'next/navigation'
import { eq, desc } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { signedViewUrl } from '@/lib/storage'
import { requireUser } from '@/lib/session'
import DocumentViewer from '@/components/DocumentViewer'
import ReviewForm from '@/components/ReviewForm'
import PaymentPanel from '@/components/PaymentPanel'
import { DOC_KINDS, isDocKind } from '@/lib/constants'
import { isPaymentStatus } from '@/lib/payments'
import { describeTerms } from '@/lib/terms'

export const dynamic = 'force-dynamic'

const DATE_FMT = new Intl.DateTimeFormat('he-IL', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})
const fullDate = (d: Date) => DATE_FMT.format(d)

export default async function ReviewOne({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('admin')
  const { id } = await params

  const db = await getDb()
  const rows = await db.select().from(schema.documents).where(eq(schema.documents.id, id)).limit(1)
  const doc = rows[0]
  if (!doc) notFound()

  const payments = await db
    .select()
    .from(schema.documentPayments)
    .where(eq(schema.documentPayments.documentId, doc.id))
    .orderBy(schema.documentPayments.paidAt)

  const history = await db
    .select()
    .from(schema.auditLog)
    .where(eq(schema.auditLog.documentId, doc.id))
    .orderBy(desc(schema.auditLog.at))
    .limit(20)

  // מי העלה ומי טיפל — שמות ולא מזהי UUID.
  const people = await db.select().from(schema.users)
  const emailOf = (id: string | null) => people.find((u) => u.id === id)?.email ?? null
  const uploader = emailOf(doc.uploadedBy)
  const reviewer = emailOf(doc.reviewedBy)

  const url = await signedViewUrl(doc.blobPath)

  return (
    <div>
      <Link href="/review" className="text-sm text-muted underline underline-offset-4">
        חזרה לתור
      </Link>

      {/* המסמך מצד אחד, השדות מצד שני — בלי לגלול בין שניהם */}
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div>
          <DocumentViewer url={url} mime={doc.mime} alt={doc.originalFilename ?? 'מסמך'} />
          <p className="mt-2 text-xs text-faint">
            {doc.originalFilename} · {Math.round(doc.sizeBytes / 1024)} KB
            {doc.extractionModel && ` · חולץ ב-${doc.extractionModel}`}
          </p>

          {/* מאיפה הגיע ומי הביא אותו — לפני שמאשרים */}
          <dl className="mt-3 space-y-1.5 rounded-xl border border-line bg-surface px-4 py-3 text-xs">
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 font-semibold text-muted">הגיע מ</dt>
              <dd className="min-w-0 flex-1">
                {doc.source === 'email' ? (
                  <>
                    מייל
                    {doc.sourceSender && (
                      <span className="text-muted" dir="ltr">
                        {' · '}
                        {doc.sourceSender}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    העלאה ידנית
                    {uploader && <span className="text-muted" dir="ltr">{` · ${uploader}`}</span>}
                  </>
                )}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 font-semibold text-muted">נקלט</dt>
              <dd className="num flex-1">{fullDate(doc.createdAt)}</dd>
            </div>
            {doc.reviewedAt && (
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-semibold text-muted">טופל</dt>
                <dd className="flex-1">
                  <span className="num">{fullDate(doc.reviewedAt)}</span>
                  {reviewer && <span className="text-muted" dir="ltr">{` · ${reviewer}`}</span>}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          <ReviewForm
            id={doc.id}
            flags={doc.validationFlags}
            kindLabel={isDocKind(doc.docKind) ? DOC_KINDS[doc.docKind].he : null}
            kindReason={doc.kindReason}
            fieldConfidence={doc.fieldConfidence}
            duplicateOfId={doc.duplicateOfId}
            initial={{
              direction: doc.direction,
              docType: doc.docType,
              supplierName: doc.supplierName,
              supplierTaxId: doc.supplierTaxId,
              recipientName: doc.recipientName,
              recipientTaxId: doc.recipientTaxId,
              docNumber: doc.docNumber,
              docDate: doc.docDate,
              netAmount: doc.netAmount,
              vatAmount: doc.vatAmount,
              totalAmount: doc.totalAmount,
              allocationNumber: doc.allocationNumber,
              paymentMethod: doc.paymentMethod,
              expenseCategory: doc.expenseCategory,
            }}
          />

          {/* תשלום הוא ציר נפרד מאישור, ולכן מחוץ לטופס */}
          <PaymentPanel
            documentId={doc.id}
            status={isPaymentStatus(doc.paymentStatus) ? doc.paymentStatus : 'unpaid'}
            total={doc.totalAmount}
            paid={doc.paidAmount}
            dueDate={doc.dueDate}
            terms={describeTerms(doc.paymentTerms)}
            payments={payments.map((p) => ({
              id: p.id,
              amount: p.amount,
              paidAt: p.paidAt,
              source: p.source,
              method: p.method,
              note: p.note,
            }))}
          />

          {history.length > 0 && (
            <details className="mt-6 rounded-xl border border-line bg-surface p-4">
              <summary className="cursor-pointer text-sm font-semibold">
                יומן שינויים ({history.length})
              </summary>
              <ul className="mt-3 space-y-1.5 text-xs text-muted">
                {history.map((h) => (
                  <li key={h.id}>
                    <span className="font-semibold">{h.field}</span>{' '}
                    <span className="num">{h.oldValue ?? '—'}</span> ←{' '}
                    <span className="num">{h.newValue ?? '—'}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}

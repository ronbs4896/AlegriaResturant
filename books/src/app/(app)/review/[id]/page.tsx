import Link from 'next/link'
import { notFound } from 'next/navigation'
import { eq, desc } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { signedViewUrl } from '@/lib/storage'
import { requireUser } from '@/lib/session'
import DocumentViewer from '@/components/DocumentViewer'
import ReviewForm from '@/components/ReviewForm'

export const dynamic = 'force-dynamic'

export default async function ReviewOne({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('admin')
  const { id } = await params

  const db = await getDb()
  const rows = await db.select().from(schema.documents).where(eq(schema.documents.id, id)).limit(1)
  const doc = rows[0]
  if (!doc) notFound()

  const history = await db
    .select()
    .from(schema.auditLog)
    .where(eq(schema.auditLog.documentId, doc.id))
    .orderBy(desc(schema.auditLog.at))
    .limit(20)

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
        </div>

        <div>
          <ReviewForm
            id={doc.id}
            flags={doc.validationFlags}
            initial={{
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

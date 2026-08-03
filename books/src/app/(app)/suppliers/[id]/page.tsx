import Link from 'next/link'
import { notFound } from 'next/navigation'
import { and, desc, eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import SupplierForm from '@/components/SupplierForm'
import DocumentList from '@/components/DocumentList'

export const dynamic = 'force-dynamic'

export default async function SupplierPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('admin')
  const { id } = await params

  const db = await getDb()
  const rows = await db.select().from(schema.suppliers).where(eq(schema.suppliers.id, id)).limit(1)
  const supplier = rows[0]
  if (!supplier) notFound()

  const docs = await db
    .select()
    .from(schema.documents)
    .where(and(eq(schema.documents.supplierId, supplier.id)))
    .orderBy(desc(schema.documents.docDate))
    .limit(100)

  const approvedTotal = docs
    .filter((d) => d.status === 'approved')
    .reduce((s, d) => s + Number(d.totalAmount ?? 0), 0)

  return (
    <div>
      <Link href="/suppliers" className="text-sm text-muted underline underline-offset-4">
        חזרה לספקים
      </Link>

      <div className="mt-3 mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-xl font-bold">{supplier.name}</h1>
        <span className="num text-sm text-faint">{supplier.taxId ?? 'ללא ח.פ.'}</span>
        {approvedTotal > 0 && (
          <span className="text-sm text-muted">
            <span className="num">
              {approvedTotal.toLocaleString('he-IL', { maximumFractionDigits: 0 })}
            </span>{' '}
            ₪ מאושרים
          </span>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <SupplierForm
          id={supplier.id}
          initial={{
            name: supplier.name,
            defaultCategory: supplier.defaultCategory,
            defaultPaymentTerms: supplier.defaultPaymentTerms,
            vatDeductible: supplier.vatDeductible,
            notes: supplier.notes,
            knownSenders: supplier.knownSenders,
          }}
        />

        <div>
          <h2 className="mb-3 font-bold">המסמכים של הספק</h2>
          {docs.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line bg-surface px-4 py-8 text-center text-sm text-muted">
              עדיין אין מסמכים מקושרים.
            </p>
          ) : (
            <DocumentList docs={docs} linkRows />
          )}
        </div>
      </div>
    </div>
  )
}

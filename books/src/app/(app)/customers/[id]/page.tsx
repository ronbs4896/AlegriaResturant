import Link from 'next/link'
import { notFound } from 'next/navigation'
import { desc, eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import CustomerForm from '@/components/CustomerForm'
import DocumentList from '@/components/DocumentList'

export const dynamic = 'force-dynamic'

export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser('admin')
  const { id } = await params

  const db = await getDb()
  const rows = await db.select().from(schema.customers).where(eq(schema.customers.id, id)).limit(1)
  const customer = rows[0]
  if (!customer) notFound()

  const docs = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.customerId, customer.id))
    .orderBy(desc(schema.documents.docDate))
    .limit(100)

  const approvedTotal = docs
    .filter((d) => d.status === 'approved')
    .reduce((s, d) => s + Number(d.totalAmount ?? 0), 0)

  return (
    <div>
      <Link href="/customers" className="text-sm text-muted underline underline-offset-4">
        חזרה ללקוחות
      </Link>

      <div className="mt-3 mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-xl font-bold">{customer.name}</h1>
        <span className="num text-sm text-faint">{customer.taxId ?? 'ללא ח.פ.'}</span>
        {approvedTotal > 0 && (
          <span className="text-sm text-muted">
            <span className="num text-ok">
              {approvedTotal.toLocaleString('he-IL', { maximumFractionDigits: 0 })}
            </span>{' '}
            ₪ מאושרים
          </span>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <CustomerForm
          id={customer.id}
          initial={{
            name: customer.name,
            defaultPaymentTerms: customer.defaultPaymentTerms,
            notes: customer.notes,
          }}
        />

        <div>
          <h2 className="mb-3 font-bold">המסמכים של הלקוח</h2>
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

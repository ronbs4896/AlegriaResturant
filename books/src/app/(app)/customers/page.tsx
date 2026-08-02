import Link from 'next/link'
import { and, eq, sql, gte, ilike, or, isNotNull } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import { shiftMonth, monthKey } from '@/lib/reports'

export const metadata = { title: 'לקוחות' }
export const dynamic = 'force-dynamic'

const money = (n: number) => n.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  await requireUser('admin')
  const { q: rawQ } = await searchParams
  const q = (rawQ ?? '').trim().slice(0, 80) || undefined

  const db = await getDb()

  const customers = await db
    .select()
    .from(schema.customers)
    .where(
      q
        ? or(ilike(schema.customers.name, `%${q}%`), ilike(schema.customers.taxId, `%${q}%`))
        : undefined,
    )
    .orderBy(schema.customers.name)
    .limit(300)

  const yearAgo = shiftMonth(monthKey(new Date()), -11)
  const totals = await db
    .select({
      customerId: schema.documents.customerId,
      count: sql<number>`count(*)`,
      total: sql<string>`coalesce(sum(${schema.documents.totalAmount}), 0)`,
    })
    .from(schema.documents)
    .where(
      and(
        eq(schema.documents.status, 'approved'),
        eq(schema.documents.direction, 'income'),
        isNotNull(schema.documents.customerId),
        gte(schema.documents.docDate, `${yearAgo}-01`),
      ),
    )
    .groupBy(schema.documents.customerId)

  const byId = new Map(totals.map((t) => [t.customerId, t]))

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl font-bold">לקוחות</h1>
        <form action="/customers" className="flex items-center gap-2">
          <label htmlFor="cus-search" className="sr-only">
            חיפוש לקוח
          </label>
          <input
            id="cus-search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="חיפוש לפי שם או ח.פ."
            className="min-h-9 w-56 rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-action"
          />
        </form>
      </div>
      <p className="mb-5 text-sm text-muted">
        לקוח נוצר אוטומטית מחשבונית הכנסה עם ח.פ. תקין. לקוחות פרטיים נשארים על המסמך בלבד.
      </p>

      {customers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">{q ? 'לא נמצא לקוח כזה' : 'אין עדיין לקוחות'}</p>
          <p className="mt-1 text-sm text-muted">
            {q ? 'נסו שם חלקי או ח.פ.' : 'ברגע שתיקלט חשבונית הכנסה ראשונה, הלקוח יופיע כאן.'}
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-2 lg:hidden">
            {customers.map((c) => {
              const t = byId.get(c.id)
              return (
                <li key={c.id}>
                  <Link
                    href={`/customers/${c.id}`}
                    className="block rounded-xl border border-line bg-surface p-4 hover:border-action/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{c.name}</div>
                        <div className="num mt-0.5 text-xs text-faint">{c.taxId ?? '—'}</div>
                      </div>
                      <div className="text-end">
                        <div className="num font-bold text-ok">{money(Number(t?.total ?? 0))} ₪</div>
                        <div className="text-xs text-faint">{t?.count ?? 0} מסמכים בשנה</div>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-faint">
                  <th className="px-4 py-2.5 text-right font-semibold">לקוח</th>
                  <th className="px-4 py-2.5 text-left font-semibold">הכנסות 12 חודשים</th>
                  <th className="px-4 py-2.5 text-left font-semibold">מסמכים</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const t = byId.get(c.id)
                  return (
                    <tr key={c.id} className="relative border-b border-line/60 last:border-0 hover:bg-raised">
                      <td className="px-4 py-3">
                        <Link
                          href={`/customers/${c.id}`}
                          className="font-semibold after:absolute after:inset-0"
                        >
                          {c.name}
                        </Link>
                        <div className="num text-xs text-faint">{c.taxId ?? '—'}</div>
                      </td>
                      <td className="num px-4 py-3 text-left font-bold text-ok">
                        {money(Number(t?.total ?? 0))}
                      </td>
                      <td className="num px-4 py-3 text-left text-muted">{t?.count ?? 0}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

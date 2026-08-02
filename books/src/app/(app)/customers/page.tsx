import Link from 'next/link'
import { and, eq, sql, gte, ilike, or, isNotNull } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import { shiftMonth, monthKey } from '@/lib/reports'
import PartyToolbar, {
  isPartySort,
  isPartyFilter,
  type PartySort,
  type PartyFilter,
} from '@/components/PartyToolbar'

export const metadata = { title: 'לקוחות' }
export const dynamic = 'force-dynamic'

const money = (n: number) =>
  n.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

const MONTH_FMT = new Intl.DateTimeFormat('he-IL', { month: 'short', year: '2-digit' })
function lastDocLabel(date: string | null): string {
  if (!date) return 'אין מסמכים'
  const [y, m] = date.split('-').map(Number)
  if (!y || !m) return date
  return MONTH_FMT.format(new Date(Date.UTC(y, m - 1, 1)))
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; filter?: string }>
}) {
  await requireUser('admin')
  const params = await searchParams
  const q = (params.q ?? '').trim().slice(0, 80) || undefined
  const sort: PartySort = isPartySort(params.sort) ? params.sort : 'total'
  const filter: PartyFilter = isPartyFilter(params.filter) ? params.filter : 'all'

  const db = await getDb()

  const customers = await db
    .select()
    .from(schema.customers)
    .where(
      q
        ? or(ilike(schema.customers.name, `%${q}%`), ilike(schema.customers.taxId, `%${q}%`))
        : undefined,
    )
    .limit(500)

  const yearAgo = shiftMonth(monthKey(new Date()), -11)
  const totals = await db
    .select({
      customerId: schema.documents.customerId,
      count: sql<number>`count(*)::int`,
      total: sql<string>`coalesce(sum(${schema.documents.totalAmount}), 0)`,
      lastDate: sql<string | null>`max(${schema.documents.docDate})`,
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

  let rows = customers.map((c) => {
    const t = byId.get(c.id)
    return {
      id: c.id,
      name: c.name,
      taxId: c.taxId,
      total: Number(t?.total ?? 0),
      count: t?.count ?? 0,
      lastDate: t?.lastDate ?? null,
    }
  })

  if (filter === 'active') rows = rows.filter((r) => r.count > 0)
  if (filter === 'dormant') rows = rows.filter((r) => r.count === 0)

  rows.sort((a, b) => {
    switch (sort) {
      case 'docs':
        return b.count - a.count || b.total - a.total
      case 'name':
        return a.name.localeCompare(b.name, 'he')
      case 'recent':
        return (b.lastDate ?? '').localeCompare(a.lastDate ?? '')
      default:
        return b.total - a.total
    }
  })

  const grandTotal = rows.reduce((s, r) => s + r.total, 0)
  const top = rows[0]?.total ?? 0

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-xl font-bold">לקוחות</h1>
        {grandTotal > 0 && (
          <span className="text-sm text-muted">
            <span className="num font-bold text-ok">{money(grandTotal)}</span> ₪ ב-12 החודשים
            האחרונים
          </span>
        )}
      </div>
      <p className="mb-5 text-sm text-muted">
        לקוח נוצר אוטומטית מחשבונית הכנסה עם ח.פ. תקין. לקוחות פרטיים נשארים על המסמך בלבד.
      </p>

      <PartyToolbar base="/customers" q={q} sort={sort} filter={filter} count={rows.length} />

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">
            {q || filter !== 'all' ? 'אין לקוחות שעונים לסינון' : 'אין עדיין לקוחות'}
          </p>
          <p className="mt-1 text-sm text-muted">
            {q || filter !== 'all'
              ? 'נסו להרחיב: לנקות את החיפוש או לעבור ל"הכול".'
              : 'ברגע שתיקלט חשבונית הכנסה ראשונה, הלקוח יופיע כאן.'}
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-2 lg:hidden">
            {rows.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/customers/${r.id}`}
                  className="block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-action/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{r.name}</div>
                      <div className="num mt-0.5 text-xs text-faint">{r.taxId ?? '—'}</div>
                    </div>
                    <div className="text-end">
                      <div className="num font-bold text-ok">{money(r.total)} ₪</div>
                      <div className="text-xs text-faint">
                        <span className="num">{r.count}</span> מסמכים ·{' '}
                        {lastDocLabel(r.lastDate)}
                      </div>
                    </div>
                  </div>
                  <Share value={r.total} max={top} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-faint">
                  <th className="px-4 py-2.5 text-right font-semibold">לקוח</th>
                  <th className="px-4 py-2.5 text-right font-semibold">חלק מההכנסות</th>
                  <th className="px-4 py-2.5 text-right font-semibold">מסמך אחרון</th>
                  <th className="px-4 py-2.5 text-left font-semibold">12 חודשים</th>
                  <th className="px-4 py-2.5 text-left font-semibold">מסמכים</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="relative border-b border-line/60 transition-colors last:border-0 hover:bg-raised"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/customers/${r.id}`}
                        className="font-semibold after:absolute after:inset-0"
                      >
                        {r.name}
                      </Link>
                      <div className="num text-xs text-faint">{r.taxId ?? '—'}</div>
                    </td>
                    <td className="w-40 px-4 py-3">
                      <Share value={r.total} max={top} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{lastDocLabel(r.lastDate)}</td>
                    <td className="num px-4 py-3 text-left font-bold text-ok">{money(r.total)}</td>
                    <td className="num px-4 py-3 text-left text-muted">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

/** פס יחסי מול הלקוח הגדול — סדר גודל נקרא מהר יותר ממספר. */
function Share({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-raised lg:mt-0">
      <div
        className="h-full rounded-full bg-ok/70 transition-all duration-500"
        style={{ width: `${Math.max(value > 0 ? 3 : 0, pct)}%` }}
      />
    </div>
  )
}

import Link from 'next/link'
import { and, eq, sql, gte, ilike, or, isNotNull } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import { shiftMonth, monthKey } from '@/lib/reports'
import { EXPENSE_CATEGORIES, isExpenseCategory } from '@/lib/constants'
import PartyToolbar, {
  isPartySort,
  isPartyFilter,
  type PartySort,
  type PartyFilter,
} from '@/components/PartyToolbar'

export const metadata = { title: 'ספקים' }
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

interface Row {
  id: string
  name: string
  taxId: string | null
  defaultCategory: string | null
  vatDeductible: boolean
  total: number
  count: number
  lastDate: string | null
}

export default async function SuppliersPage({
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

  const suppliers = await db
    .select()
    .from(schema.suppliers)
    .where(
      q
        ? or(ilike(schema.suppliers.name, `%${q}%`), ilike(schema.suppliers.taxId, `%${q}%`))
        : undefined,
    )
    .limit(500)

  // סכומים ותאריך המסמך האחרון, בשאילתה אחת לכל הספקים.
  const yearAgo = shiftMonth(monthKey(new Date()), -11)
  const totals = await db
    .select({
      supplierId: schema.documents.supplierId,
      count: sql<number>`count(*)::int`,
      total: sql<string>`coalesce(sum(${schema.documents.totalAmount}), 0)`,
      lastDate: sql<string | null>`max(${schema.documents.docDate})`,
    })
    .from(schema.documents)
    .where(
      and(
        eq(schema.documents.status, 'approved'),
        eq(schema.documents.direction, 'expense'),
        isNotNull(schema.documents.supplierId),
        gte(schema.documents.docDate, `${yearAgo}-01`),
      ),
    )
    .groupBy(schema.documents.supplierId)

  const byId = new Map(totals.map((t) => [t.supplierId, t]))

  let rows: Row[] = suppliers.map((s) => {
    const t = byId.get(s.id)
    return {
      id: s.id,
      name: s.name,
      taxId: s.taxId,
      defaultCategory: s.defaultCategory,
      vatDeductible: s.vatDeductible,
      total: Number(t?.total ?? 0),
      count: t?.count ?? 0,
      lastDate: t?.lastDate ?? null,
    }
  })

  // "פעיל" נמדד מול חלון 12 החודשים שהסכומים חושבו עליו.
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

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-xl font-bold">ספקים</h1>
        {grandTotal > 0 && (
          <span className="text-sm text-muted">
            <span className="num font-bold">{money(grandTotal)}</span> ₪ ב-12 החודשים האחרונים
          </span>
        )}
      </div>
      <p className="mb-5 text-sm text-muted">
        הרשימה נבנית לבד מהמסמכים. ההגדרות של כל ספק קובעות את הסיווג של המסמכים הבאים ממנו.
      </p>

      <PartyToolbar base="/suppliers" q={q} sort={sort} filter={filter} count={rows.length} />

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">
            {q || filter !== 'all' ? 'אין ספקים שעונים לסינון' : 'אין עדיין ספקים'}
          </p>
          <p className="mt-1 text-sm text-muted">
            {q || filter !== 'all'
              ? 'נסו להרחיב: לנקות את החיפוש או לעבור ל"הכול".'
              : 'ספק נוצר אוטומטית מהמסמך הראשון שלו עם ח.פ. תקין.'}
          </p>
        </div>
      ) : (
        <>
          {/* מובייל: כרטיסים */}
          <ul className="space-y-2 lg:hidden">
            {rows.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/suppliers/${r.id}`}
                  className="block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-action/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{r.name}</div>
                      <div className="num mt-0.5 text-xs text-faint">{r.taxId ?? '—'}</div>
                    </div>
                    <div className="text-end">
                      <div className="num font-bold">{money(r.total)} ₪</div>
                      <div className="text-xs text-faint">
                        <span className="num">{r.count}</span> מסמכים
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>
                      {isExpenseCategory(r.defaultCategory)
                        ? EXPENSE_CATEGORIES[r.defaultCategory].he
                        : 'בלי קטגוריה'}
                    </span>
                    <span className="text-faint">· {lastDocLabel(r.lastDate)}</span>
                    {!r.vatDeductible && (
                      <span className="rounded-full bg-warn-soft px-2 py-0.5 font-semibold text-warn">
                        לא מוכר לניכוי
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* דסקטופ: טבלה */}
          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-faint">
                  <th className="px-4 py-2.5 text-right font-semibold">ספק</th>
                  <th className="px-4 py-2.5 text-right font-semibold">קטגוריה</th>
                  <th className="px-4 py-2.5 text-right font-semibold">ניכוי</th>
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
                        href={`/suppliers/${r.id}`}
                        className="font-semibold after:absolute after:inset-0"
                      >
                        {r.name}
                      </Link>
                      <div className="num text-xs text-faint">{r.taxId ?? '—'}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {isExpenseCategory(r.defaultCategory)
                        ? EXPENSE_CATEGORIES[r.defaultCategory].he
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {r.vatDeductible ? (
                        <span className="text-xs text-faint">מוכר</span>
                      ) : (
                        <span className="rounded-full bg-warn-soft px-2 py-0.5 text-xs font-semibold text-warn">
                          לא מוכר
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{lastDocLabel(r.lastDate)}</td>
                    <td className="num px-4 py-3 text-left font-bold">{money(r.total)}</td>
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

import Link from 'next/link'
import { and, eq, sql, gte, ilike, or, isNotNull } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import { shiftMonth, monthKey } from '@/lib/reports'
import { EXPENSE_CATEGORIES, isExpenseCategory } from '@/lib/constants'

export const metadata = { title: 'ספקים' }
export const dynamic = 'force-dynamic'

const money = (n: number) => n.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default async function SuppliersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  await requireUser('admin')
  const { q: rawQ } = await searchParams
  const q = (rawQ ?? '').trim().slice(0, 80) || undefined

  const db = await getDb()

  const suppliers = await db
    .select()
    .from(schema.suppliers)
    .where(
      q
        ? or(ilike(schema.suppliers.name, `%${q}%`), ilike(schema.suppliers.taxId, `%${q}%`))
        : undefined,
    )
    .orderBy(schema.suppliers.name)
    .limit(300)

  // סכומי 12 חודשים בשאילתה אחת, לא שאילתה לכל ספק.
  const yearAgo = shiftMonth(monthKey(new Date()), -11)
  const totals = await db
    .select({
      supplierId: schema.documents.supplierId,
      count: sql<number>`count(*)`,
      total: sql<string>`coalesce(sum(${schema.documents.totalAmount}), 0)`,
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

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl font-bold">ספקים</h1>
        <form action="/suppliers" className="flex items-center gap-2">
          <label htmlFor="sup-search" className="sr-only">
            חיפוש ספק
          </label>
          <input
            id="sup-search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="חיפוש לפי שם או ח.פ."
            className="min-h-9 w-56 rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-action"
          />
        </form>
      </div>
      <p className="mb-5 text-sm text-muted">
        הרשימה נבנית לבד מהמסמכים. ההגדרות של כל ספק קובעות את הסיווג של המסמכים הבאים ממנו.
      </p>

      {suppliers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">{q ? 'לא נמצא ספק כזה' : 'אין עדיין ספקים'}</p>
          <p className="mt-1 text-sm text-muted">
            {q
              ? 'נסו שם חלקי או ח.פ.'
              : 'ספק נוצר אוטומטית מהמסמך הראשון שלו עם ח.פ. תקין.'}
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-2 lg:hidden">
            {suppliers.map((s) => {
              const t = byId.get(s.id)
              return (
                <li key={s.id}>
                  <Link
                    href={`/suppliers/${s.id}`}
                    className="block rounded-xl border border-line bg-surface p-4 hover:border-action/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{s.name}</div>
                        <div className="num mt-0.5 text-xs text-faint">{s.taxId ?? '—'}</div>
                      </div>
                      <div className="text-end">
                        <div className="num font-bold">{money(Number(t?.total ?? 0))} ₪</div>
                        <div className="text-xs text-faint">{t?.count ?? 0} מסמכים בשנה</div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <span>
                        {isExpenseCategory(s.defaultCategory)
                          ? EXPENSE_CATEGORIES[s.defaultCategory].he
                          : 'בלי קטגוריית ברירת מחדל'}
                      </span>
                      {!s.vatDeductible && (
                        <span className="rounded-full bg-warn-soft px-2 py-0.5 font-semibold text-warn">
                          לא מוכר לניכוי
                        </span>
                      )}
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
                  <th className="px-4 py-2.5 text-right font-semibold">ספק</th>
                  <th className="px-4 py-2.5 text-right font-semibold">קטגוריה</th>
                  <th className="px-4 py-2.5 text-right font-semibold">ניכוי</th>
                  <th className="px-4 py-2.5 text-left font-semibold">12 חודשים</th>
                  <th className="px-4 py-2.5 text-left font-semibold">מסמכים</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => {
                  const t = byId.get(s.id)
                  return (
                    <tr key={s.id} className="relative border-b border-line/60 last:border-0 hover:bg-raised">
                      <td className="px-4 py-3">
                        <Link
                          href={`/suppliers/${s.id}`}
                          className="font-semibold after:absolute after:inset-0"
                        >
                          {s.name}
                        </Link>
                        <div className="num text-xs text-faint">{s.taxId ?? '—'}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted">
                        {isExpenseCategory(s.defaultCategory)
                          ? EXPENSE_CATEGORIES[s.defaultCategory].he
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {s.vatDeductible ? (
                          <span className="text-xs text-faint">מוכר</span>
                        ) : (
                          <span className="rounded-full bg-warn-soft px-2 py-0.5 text-xs font-semibold text-warn">
                            לא מוכר
                          </span>
                        )}
                      </td>
                      <td className="num px-4 py-3 text-left font-bold">
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

import Link from 'next/link'
import { and, eq, inArray, like, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import { withBase } from '@/lib/url'
import {
  totalsForMonths,
  foldMonths,
  sumSummaries,
  vatPosition,
  foldByCategory,
  foldByParty,
  resolveReportPeriod,
  shiftReportPeriod,
  reportPeriodLabel,
  lastNMonths,
} from '@/lib/reports'
import { EXPENSE_CATEGORIES, isExpenseCategory } from '@/lib/constants'
import ExportPanel from '@/components/ExportPanel'

export const metadata = { title: 'דוחות וייצוא' }
export const dynamic = 'force-dynamic'

const money = (n: number) =>
  n.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; period?: string }>
}) {
  await requireUser('admin')
  const params = await searchParams
  const period = resolveReportPeriod(params.mode, params.period)

  const db = await getDb()
  const rows = await totalsForMonths(db, period.months)
  const total = sumSummaries(foldMonths(rows, period.months))
  const position = vatPosition(total)
  const nonDeductible = total.expense.vat - total.deductibleInputVat
  const categories = foldByCategory(rows)
  const suppliers = foldByParty(rows, 'expense').slice(0, 30)
  const customers = foldByParty(rows, 'income').slice(0, 30)

  const hasData = total.income.count + total.expense.count > 0
  const dl = (type: string) =>
    withBase(`/api/reports?type=${type}&mode=${period.mode}&period=${period.key}`)

  // הנתונים לחבילה החודשית (עברו מ-/exports, אותה שאילתה)
  const counts = await db
    .select({
      period: sql<string>`substr(${schema.documents.docDate}, 1, 7)`,
      n: sql<number>`count(*)::int`,
    })
    .from(schema.documents)
    .where(and(eq(schema.documents.status, 'approved'), like(schema.documents.docDate, '20%')))
    .groupBy(sql`substr(${schema.documents.docDate}, 1, 7)`)
  const approvedByPeriod = new Map(counts.map((r) => [r.period, r.n]))
  const waiting = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.documents)
    .where(inArray(schema.documents.status, ['pending', 'review']))
  const zipPeriods = lastNMonths(12).reverse()

  return (
    <div>
      <h1 className="text-xl font-bold">דוחות וייצוא</h1>
      <p className="mt-1 mb-5 text-sm text-muted">
        כל המספרים מבוססים על מסמכים מאושרים בלבד. מה שבבדיקה עדיין לא נספר.
      </p>

      {/* בורר התקופה: מצב + קודם/הבא */}
      <div className="mb-3 inline-grid grid-cols-3 gap-1 rounded-xl border border-line bg-raised p-1">
        {(
          [
            ['month', 'חודש'],
            ['vat', 'תקופת מע״מ'],
            ['year', 'שנה'],
          ] as const
        ).map(([mode, label]) => (
          <Link
            key={mode}
            href={`/reports?mode=${mode}`}
            aria-current={period.mode === mode ? 'page' : undefined}
            className={`rounded-lg px-4 py-2 text-center text-sm font-semibold ${
              period.mode === mode ? 'bg-surface text-ink shadow-sm' : 'text-muted'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">{reportPeriodLabel(period)}</h2>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/reports?mode=${period.mode}&period=${shiftReportPeriod(period, -1)}`}
            className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised"
          >
            הקודמת
          </Link>
          <Link
            href={`/reports?mode=${period.mode}&period=${shiftReportPeriod(period, 1)}`}
            className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised"
          >
            הבאה
          </Link>
        </div>
      </div>

      {!hasData && (
        <div className="mb-6 rounded-2xl border border-dashed border-line bg-surface px-6 py-10 text-center">
          <p className="font-semibold">אין מסמכים מאושרים בתקופה הזו</p>
          <p className="mt-1 text-sm text-muted">הדוחות יתמלאו ברגע שיאושרו מסמכים.</p>
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-2">
        {/* דוח מע״מ */}
        <Section title="דוח מע״מ" download={dl('vat')}>
          <table className="w-full text-sm">
            <tbody>
              <Row label="עסקאות (הכנסות)" sub={`נטו ${money(total.income.net)} ₪`}>
                <Money v={total.income.vat} />
              </Row>
              <Row label="תשומות מוכרות לניכוי">
                <Money v={total.deductibleInputVat} />
              </Row>
              <Row label="תשומות שאינן מוכרות" sub="אירוח, כיבודים וכדומה">
                <Money v={nonDeductible} muted />
              </Row>
              <tr className="border-t border-line">
                <td className="py-3 font-bold">{position >= 0 ? 'מע״מ לתשלום' : 'מע״מ להחזר'}</td>
                <td className={`num py-3 text-left text-lg font-bold ${position > 0 ? 'text-danger' : 'text-ok'}`}>
                  {money(Math.abs(position))} ₪
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* רווח והפסד */}
        <Section title="רווח והפסד לפי קטגוריה" download={dl('pnl')}>
          <table className="w-full text-sm">
            <tbody>
              <Row label="הכנסות" sub={`${total.income.count} מסמכים`}>
                <Money v={total.income.net} ok />
              </Row>
              {categories.map((c) => (
                <Row
                  key={c.category ?? 'none'}
                  label={
                    isExpenseCategory(c.category)
                      ? EXPENSE_CATEGORIES[c.category].he
                      : 'ללא קטגוריה'
                  }
                  sub={`${c.count} מסמכים`}
                >
                  <Money v={-c.net} muted />
                </Row>
              ))}
              <tr className="border-t border-line">
                <td className="py-3 font-bold">רווח תפעולי</td>
                <td
                  className={`num py-3 text-left text-lg font-bold ${
                    total.income.net - total.expense.net >= 0 ? 'text-ok' : 'text-danger'
                  }`}
                >
                  {money(total.income.net - total.expense.net)} ₪
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* ריכוז ספקים */}
        <Section title="ריכוז ספקים" download={dl('suppliers')}>
          <PartyTable parties={suppliers} empty="אין הוצאות בתקופה" />
        </Section>

        {/* ריכוז לקוחות */}
        <Section title="ריכוז לקוחות" download={dl('customers')}>
          <PartyTable parties={customers} empty="אין הכנסות בתקופה" />
        </Section>
      </div>

      {/* החבילה החודשית לרו״ח */}
      <section className="mt-6 rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <h2 className="font-bold">חבילה חודשית לרואה חשבון</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          קובץ ZIP עם כל מסמכי החודש בשמות קריאים וגיליון מרוכז. נכנסים רק מסמכים מאושרים.
        </p>
        <ExportPanel
          waiting={waiting[0]?.n ?? 0}
          periods={[...zipPeriods]
            .reverse()
            .map((p) => ({ period: p, approved: approvedByPeriod.get(p) ?? 0 }))}
        />
      </section>
    </div>
  )
}

function Section({
  title,
  download,
  children,
}: {
  title: string
  download: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-bold">{title}</h2>
        {/* קישור רגיל, לא fetch: הדפדפן מוריד והשם נקבע בשרת */}
        <a
          href={download}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-muted hover:bg-raised"
        >
          הורדת Excel
        </a>
      </div>
      {children}
    </section>
  )
}

function Row({
  label,
  sub,
  children,
}: {
  label: string
  sub?: string
  children: React.ReactNode
}) {
  return (
    <tr className="border-b border-line/60 last:border-0">
      <td className="py-2.5">
        <div className="font-semibold">{label}</div>
        {sub && <div className="text-xs text-faint">{sub}</div>}
      </td>
      <td className="py-2.5 text-left align-middle">{children}</td>
    </tr>
  )
}

function Money({ v, ok, muted }: { v: number; ok?: boolean; muted?: boolean }) {
  return (
    <span className={`num font-bold ${ok ? 'text-ok' : muted ? 'text-muted' : ''}`}>
      {money(v)} ₪
    </span>
  )
}

function PartyTable({
  parties,
  empty,
}: {
  parties: { taxId: string | null; name: string | null; total: number; vat: number; count: number }[]
  empty: string
}) {
  if (parties.length === 0) {
    return <p className="py-6 text-center text-sm text-faint">{empty}</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-faint">
            <th className="py-2 text-right font-semibold">שם</th>
            <th className="py-2 text-right font-semibold">מסמכים</th>
            <th className="py-2 text-left font-semibold">מע״מ</th>
            <th className="py-2 text-left font-semibold">סה״כ</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((p) => (
            <tr key={`${p.taxId}-${p.name}`} className="border-b border-line/60 last:border-0">
              <td className="py-2">
                <div className="font-semibold">{p.name ?? '—'}</div>
                {p.taxId && <div className="num text-xs text-faint">{p.taxId}</div>}
              </td>
              <td className="num py-2">{p.count}</td>
              <td className="num py-2 text-left">{money(p.vat)}</td>
              <td className="num py-2 text-left font-bold">{money(p.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

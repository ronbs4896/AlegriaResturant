import Link from 'next/link'
import { getDb } from '@/db'
import { currentUser } from '@/lib/session'
import {
  totalsForMonths,
  foldMonths,
  vatPosition,
  awaitingCounts,
  lastNMonths,
  shiftMonth,
  monthKey,
  type MonthSummary,
} from '@/lib/reports'

export const metadata = { title: 'דשבורד' }
export const dynamic = 'force-dynamic'

const MONTH_FMT = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' })
const MONTH_SHORT = new Intl.DateTimeFormat('he-IL', { month: 'short' })

function label(period: string, fmt: Intl.DateTimeFormat): string {
  const [y, m] = period.split('-').map(Number)
  if (!y || !m) return period
  return fmt.format(new Date(Date.UTC(y, m - 1, 1)))
}

const money = (n: number) =>
  n.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const params = await searchParams
  const user = await currentUser()
  const now = new Date()
  const current = /^\d{4}-\d{2}$/.test(params.period ?? '') ? params.period! : monthKey(now)

  const db = await getDb()
  // שישה חודשים אחורה מהתקופה הנבחרת, כדי שההשוואה תזוז יחד איתה.
  const months = Array.from({ length: 6 }, (_, i) => shiftMonth(current, i - 5))
  const summaries = foldMonths(await totalsForMonths(db, months), months)
  const thisMonth = summaries[summaries.length - 1]!
  const awaiting = await awaitingCounts(db)

  const vat = vatPosition(thisMonth)
  const hasAnyData = summaries.some((m) => m.income.count + m.expense.count > 0)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold">{label(current, MONTH_FMT)}</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/dashboard?period=${shiftMonth(current, -1)}`}
            className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised"
          >
            חודש קודם
          </Link>
          {current !== monthKey(now) && (
            <>
              <Link
                href={`/dashboard?period=${shiftMonth(current, 1)}`}
                className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised"
              >
                חודש הבא
              </Link>
              <Link href="/dashboard" className="text-muted underline underline-offset-4">
                לחודש הנוכחי
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ארבעת המספרים שמנהל צריך לפני כל פירוט */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card title="הכנסות" hint={`${thisMonth.income.count} מסמכים`}>
          <span className="num text-2xl font-bold text-ok">
            {money(thisMonth.income.total)} ₪
          </span>
        </Card>
        <Card title="הוצאות" hint={`${thisMonth.expense.count} מסמכים`}>
          <span className="num text-2xl font-bold">{money(thisMonth.expense.total)} ₪</span>
        </Card>
        <Card
          title={vat >= 0 ? 'מע״מ לתשלום' : 'מע״מ להחזר'}
          hint="עסקאות פחות תשומות מוכרות"
        >
          <span className={`num text-2xl font-bold ${vat > 0 ? 'text-danger' : 'text-ok'}`}>
            {money(Math.abs(vat))} ₪
          </span>
        </Card>
        <Link
          href="/review"
          className={`rounded-2xl border bg-surface p-4 transition-colors ${
            awaiting.review > 0 ? 'border-warn/40 hover:border-warn' : 'border-line hover:border-action/40'
          }`}
        >
          <div className="text-sm font-semibold text-muted">ממתינים לבדיקה</div>
          <div className={`num mt-1 text-2xl font-bold ${awaiting.review > 0 ? 'text-warn' : ''}`}>
            {awaiting.review}
          </div>
          <div className="mt-0.5 text-xs text-faint">
            {awaiting.pending > 0 ? `ועוד ${awaiting.pending} בעיבוד` : 'הכול נבדק'}
          </div>
        </Link>
      </div>

      {/* השוואת חצי שנה: עמודות CSS, בלי ספריית גרפים */}
      <section className="mt-6 rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold">הכנסות מול הוצאות, חצי שנה</h2>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-ok" aria-hidden />
              הכנסות
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-action" aria-hidden />
              הוצאות
            </span>
          </div>
        </div>

        {hasAnyData ? (
          <Bars summaries={summaries} />
        ) : (
          <div className="rounded-xl border border-dashed border-line px-6 py-12 text-center">
            <p className="font-semibold">עדיין אין מסמכים מאושרים</p>
            <p className="mt-1 text-sm text-muted">
              העלו מסמך ראשון או הפעילו משיכה מהמייל, והמספרים יופיעו כאן.
            </p>
            <Link
              href="/upload"
              className="mt-5 inline-block rounded-xl bg-action px-5 py-3 font-bold text-white"
            >
              העלאת מסמך
            </Link>
          </div>
        )}
      </section>

      {user?.role === 'admin' && (
        <p className="mt-4 text-xs text-faint">
          המספרים מבוססים על מסמכים מאושרים בלבד. מה שבבדיקה עדיין לא נספר.
        </p>
      )}
    </div>
  )
}

function Card({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="text-sm font-semibold text-muted">{title}</div>
      <div className="mt-1">{children}</div>
      <div className="mt-0.5 text-xs text-faint">{hint}</div>
    </div>
  )
}

const BAR_MAX_PX = 140

function Bars({ summaries }: { summaries: MonthSummary[] }) {
  const max = Math.max(1, ...summaries.flatMap((m) => [m.income.total, m.expense.total]))
  const h = (v: number) => (v <= 0 ? 2 : Math.max(3, Math.round((v / max) * BAR_MAX_PX)))

  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-4">
      {summaries.map((m) => (
        <div
          key={m.period}
          role="img"
          aria-label={`${label(m.period, MONTH_FMT)}: הכנסות ${money(m.income.total)} שקלים, הוצאות ${money(m.expense.total)} שקלים`}
          className="flex flex-col items-center"
        >
          <div className="flex items-end gap-1" style={{ height: BAR_MAX_PX }}>
            <div className="w-3 rounded-t-sm bg-ok sm:w-5" style={{ height: h(m.income.total) }} />
            <div
              className="w-3 rounded-t-sm bg-action sm:w-5"
              style={{ height: h(m.expense.total) }}
            />
          </div>
          <span className="mt-2 text-xs text-muted">{label(m.period, MONTH_SHORT)}</span>
        </div>
      ))}
    </div>
  )
}

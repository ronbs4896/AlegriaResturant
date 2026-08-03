import Link from 'next/link'
import { getDb } from '@/db'
import { currentUser } from '@/lib/session'
import {
  totalsForMonths,
  foldMonths,
  vatPosition,
  awaitingCounts,
  shiftMonth,
  monthKey,
  type MonthSummary,
} from '@/lib/reports'
import { formatPeriod, deltaPercent, shekelShort } from '@/lib/format'
import PageHeader, { PeriodNav } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import StatTile from '@/components/ui/StatTile'
import Sparkline from '@/components/ui/Sparkline'
import EmptyState from '@/components/ui/EmptyState'

export const metadata = { title: 'מרכז בקרה' }
export const dynamic = 'force-dynamic'

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
  const prevMonth = summaries[summaries.length - 2]
  const awaiting = await awaitingCounts(db)

  const vat = vatPosition(thisMonth)
  const profit = thisMonth.income.net - thisMonth.expense.net
  const prevProfit = prevMonth ? prevMonth.income.net - prevMonth.expense.net : 0
  const hasAnyData = summaries.some((m) => m.income.count + m.expense.count > 0)

  const series = (pick: (m: MonthSummary) => number) => summaries.map(pick)

  return (
    <div>
      <PageHeader
        title={formatPeriod(current)}
        subtitle="מבוסס על מסמכים מאושרים בלבד."
        nav={
          <PeriodNav
            prev={`/dashboard?period=${shiftMonth(current, -1)}`}
            next={`/dashboard?period=${shiftMonth(current, 1)}`}
            reset={current !== monthKey(now) ? '/dashboard' : undefined}
            label="month"
          />
        }
      />

      {/* המספרים שמנהל שואל עליהם ראשונים */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatTile
          label="הכנסות"
          value={thisMonth.income.total}
          tone="positive"
          delta={prevMonth ? deltaPercent(thisMonth.income.total, prevMonth.income.total) : null}
          hint={`${thisMonth.income.count} מסמכים`}
        >
          <Trend points={series((m) => m.income.total)} label="הכנסות" tone="ok" />
        </StatTile>

        <StatTile
          label="הוצאות"
          value={thisMonth.expense.total}
          delta={prevMonth ? deltaPercent(thisMonth.expense.total, prevMonth.expense.total) : null}
          goodDirection="down"
          hint={`${thisMonth.expense.count} מסמכים`}
        >
          <Trend points={series((m) => m.expense.total)} label="הוצאות" tone="action" />
        </StatTile>

        <StatTile
          label="רווח תפעולי"
          value={profit}
          delta={prevMonth ? deltaPercent(profit, prevProfit) : null}
          hint="לפני מע״מ"
        />

        <StatTile
          label={vat >= 0 ? 'מע״מ לתשלום' : 'מע״מ להחזר'}
          value={Math.abs(vat)}
          tone={vat > 0 ? 'negative' : 'positive'}
          hint="עסקאות פחות תשומות מוכרות"
        />
      </div>

      {/* מה מחכה לאדם — מקושר ישירות למסך שבו מטפלים */}
      {(awaiting.review > 0 || awaiting.pending > 0) && (
        <Link
          href="/review"
          className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-warn/40 bg-warn-soft px-4 py-3 transition-colors hover:border-warn"
        >
          <span className="text-sm font-semibold text-warn">
            <span className="num font-bold">{awaiting.review}</span> מסמכים ממתינים לבדיקה שלכם
            {awaiting.pending > 0 && (
              <span className="font-normal">
                {' · '}
                <span className="num">{awaiting.pending}</span> עוד בעיבוד
              </span>
            )}
          </span>
          <span className="shrink-0 text-sm font-bold text-warn">לתור הבדיקה ←</span>
        </Link>
      )}

      <Card className="mt-4">
        <CardHeader
          title="הכנסות מול הוצאות, חצי שנה"
          action={
            <div className="flex items-center gap-4 text-xs text-muted">
              <Legend color="bg-ok" label="הכנסות" />
              <Legend color="bg-action" label="הוצאות" />
            </div>
          }
        />
        {hasAnyData ? (
          <Bars summaries={summaries} />
        ) : (
          <EmptyState
            title="עדיין אין מסמכים מאושרים"
            hint="העלו מסמך ראשון או הפעילו משיכה מהמייל, והמספרים יופיעו כאן."
            action={{ href: '/upload', label: 'העלאת מסמך' }}
          />
        )}
      </Card>

      {user?.role !== 'admin' && (
        <p className="mt-4 text-xs text-faint">
          אישור מסמכים ושינוי סטטוס שמורים למנהל.
        </p>
      )}
    </div>
  )
}

function Trend({
  points,
  label,
  tone,
}: {
  points: number[]
  label: string
  tone: 'ok' | 'action'
}) {
  if (points.every((n) => n === 0)) return null
  return (
    <div className="mt-2">
      <Sparkline
        points={points}
        tone={tone}
        label={`${label} בששת החודשים האחרונים: ${points.map((n) => shekelShort(n)).join(', ')}`}
      />
    </div>
  )
}

const Legend = ({ color, label }: { color: string; label: string }) => (
  <span className="flex items-center gap-1.5">
    <span className={`h-2.5 w-2.5 rounded-sm ${color}`} aria-hidden />
    {label}
  </span>
)

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
          aria-label={`${formatPeriod(m.period)}: הכנסות ${shekelShort(m.income.total)}, הוצאות ${shekelShort(m.expense.total)}`}
          className="flex flex-col items-center"
        >
          <div className="flex items-end gap-1" style={{ height: BAR_MAX_PX }}>
            <div
              className="w-3 rounded-t-sm bg-ok transition-all duration-500 sm:w-5"
              style={{ height: h(m.income.total) }}
            />
            <div
              className="w-3 rounded-t-sm bg-action transition-all duration-500 sm:w-5"
              style={{ height: h(m.expense.total) }}
            />
          </div>
          <span className="mt-2 text-xs text-muted">{formatPeriod(m.period, true)}</span>
        </div>
      ))}
    </div>
  )
}

import Link from 'next/link'
import { desc, eq, and, or, like, ilike, inArray, isNull, gte, lt, type SQL } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { currentUser } from '@/lib/session'
import { monthKey, shiftMonth } from '@/lib/reports'
import MailSyncPanel from '@/components/MailSyncPanel'
import DocumentList from '@/components/DocumentList'
import PageHeader, { PeriodNav } from '@/components/ui/PageHeader'
import { Toolbar, SegmentedControl, FilterChips, SearchBox } from '@/components/ui/Toolbar'
import Money from '@/components/ui/Money'
import EmptyState from '@/components/ui/EmptyState'

export const metadata = { title: 'מסמכים' }
export const dynamic = 'force-dynamic'

const MONTH_FMT = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' })

function periodLabel(period: string): string {
  const [y, m] = period.split('-').map(Number)
  if (!y || !m) return period
  return MONTH_FMT.format(new Date(Date.UTC(y, m - 1, 1)))
}

interface Filters {
  period: string
  direction?: string
  status?: string
  payment?: string
  q?: string
}

/** בונה כתובת עם הפילטרים, בלי ריקים — הכתובת היא ה-state. */
function href(f: Filters): string {
  const params = new URLSearchParams()
  params.set('period', f.period)
  if (f.direction) params.set('direction', f.direction)
  if (f.status) params.set('status', f.status)
  if (f.payment) params.set('payment', f.payment)
  if (f.q) params.set('q', f.q)
  return `/documents?${params.toString()}`
}

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string
    direction?: string
    status?: string
    payment?: string
    q?: string
  }>
}) {
  const params = await searchParams
  const user = await currentUser()

  const period = /^\d{4}-\d{2}$/.test(params.period ?? '') ? params.period! : monthKey(new Date())
  const direction = ['expense', 'income'].includes(params.direction ?? '')
    ? params.direction
    : undefined
  const status = [
    'pending',
    'review',
    'approved',
    'rejected',
    'not_financial',
    'awaiting_final',
    'duplicate',
  ].includes(params.status ?? '')
    ? params.status
    : undefined
  // "overdue" אינו מצב תשלום שנשמר אלא שאלה על היחס בין מצב
  // התשלום לתאריך היעד, ולכן הוא מתורגם לתנאי משלו.
  const payment = ['unpaid', 'partial', 'paid', 'overdue'].includes(params.payment ?? '')
    ? params.payment
    : undefined
  const q = (params.q ?? '').trim().slice(0, 80) || undefined
  const current: Filters = { period, direction, status, payment, q }

  const db = await getDb()

  // החודש לפי תאריך המסמך — אותו חודש שהייצוא והדוחות רואים.
  // מסמך בלי תאריך (עוד בעיבוד, או שהחילוץ לא קרא) משויך לפי
  // מועד הקליטה, כדי ששום מסמך לא ייעלם מהרשימה.
  const [y, m] = period.split('-').map(Number)
  const monthStart = new Date(Date.UTC(y!, m! - 1, 1))
  const monthEnd = new Date(Date.UTC(y!, m!, 1))

  const filters: SQL[] = [
    or(
      like(schema.documents.docDate, `${period}%`),
      and(
        isNull(schema.documents.docDate),
        gte(schema.documents.createdAt, monthStart),
        lt(schema.documents.createdAt, monthEnd),
      ),
    )!,
  ]
  if (direction) filters.push(eq(schema.documents.direction, direction as 'expense'))
  if (status) filters.push(eq(schema.documents.status, status as 'pending'))
  if (payment === 'overdue') {
    // תשלום חלקי שעבר את מועדו הוא חוב באיחור בדיוק כמו כזה
    // שלא שולם כלל. מסמך בלי תאריך יעד אינו באיחור.
    filters.push(
      and(
        inArray(schema.documents.paymentStatus, ['unpaid', 'partial']),
        lt(schema.documents.dueDate, new Date().toISOString().slice(0, 10)),
      )!,
    )
  } else if (payment) {
    filters.push(eq(schema.documents.paymentStatus, payment as 'unpaid'))
  }
  if (q) {
    filters.push(
      or(
        ilike(schema.documents.supplierName, `%${q}%`),
        ilike(schema.documents.recipientName, `%${q}%`),
        ilike(schema.documents.docNumber, `%${q}%`),
      )!,
    )
  }

  const rows = await db
    .select()
    .from(schema.documents)
    .where(and(...filters))
    .orderBy(desc(schema.documents.createdAt))
    .limit(300)

  const approved = rows.filter((r) => r.status === 'approved')
  const incomeTotal = approved
    .filter((r) => r.direction === 'income')
    .reduce((s, r) => s + Number(r.totalAmount ?? 0), 0)
  const expenseTotal = approved
    .filter((r) => r.direction === 'expense')
    .reduce((s, r) => s + Number(r.totalAmount ?? 0), 0)
  const needsAttention = rows.filter(
    (r) => r.status === 'review' || r.validationFlags.some((f) => f.level === 'error'),
  ).length

  return (
    <div>
      {user?.role === 'admin' && <MailSyncPanel />}

      <PageHeader
        title={periodLabel(period)}
        meta={
          <span className="text-sm text-muted">
            <span className="num">{rows.length}</span> מסמכים
            {incomeTotal > 0 && (
              <>
                {' · הכנסות '}
                <Money value={incomeTotal} tone="positive" />
              </>
            )}
            {expenseTotal > 0 && (
              <>
                {' · הוצאות '}
                <Money value={expenseTotal} tone="plain" />
              </>
            )}
          </span>
        }
        nav={
          <PeriodNav
            prev={href({ ...current, period: shiftMonth(period, -1) })}
            next={href({ ...current, period: shiftMonth(period, 1) })}
            reset="/documents"
            label="month"
          />
        }
      />

      {needsAttention > 0 && (
        <Link
          href={href({ ...current, status: 'review' })}
          className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-warn/25 bg-warn-soft px-4 py-3 text-sm text-warn transition-colors hover:border-warn"
        >
          <span>
            <b className="num">{needsAttention}</b> מסמכים ממתינים לבדיקה שלכם
          </span>
          <span className="shrink-0 font-bold">הצגה ←</span>
        </Link>
      )}

      <Toolbar>
        <SegmentedControl
          ariaLabel="צד הספר"
          value={direction}
          href={(v) => href({ ...current, direction: v })}
          options={[
            { value: undefined, label: 'הכול' },
            { value: 'expense', label: 'הוצאות' },
            { value: 'income', label: 'הכנסות' },
          ]}
        />
        <SearchBox
          action="/documents"
          value={q}
          placeholder="חיפוש ספק, לקוח או מספר מסמך"
          hidden={{ period, direction, status, payment }}
          clearHref={href({ ...current, q: undefined })}
        />
      </Toolbar>

      <div className="mb-2">
        <FilterChips
          value={status}
          href={(v) => href({ ...current, status: v })}
          options={[
            { value: undefined, label: 'כל המצבים' },
            { value: 'review', label: 'בבדיקה' },
            { value: 'approved', label: 'מאושרים' },
            { value: 'pending', label: 'בעיבוד' },
            { value: 'duplicate', label: 'כפילויות' },
            { value: 'awaiting_final', label: 'ממתין למסמך סופי' },
            { value: 'not_financial', label: 'לא פיננסיים' },
            { value: 'rejected', label: 'נדחו' },
          ]}
        />
      </div>

      {/* תשלום הוא ציר נפרד מסטטוס הבדיקה, ולכן שורה משלו */}
      <div className="mb-4">
        <FilterChips
          value={payment}
          href={(v) => href({ ...current, payment: v })}
          options={[
            { value: undefined, label: 'כל התשלומים' },
            { value: 'overdue', label: 'באיחור' },
            { value: 'unpaid', label: 'לא שולמו' },
            { value: 'partial', label: 'שולמו חלקית' },
            { value: 'paid', label: 'שולמו' },
          ]}
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title={q || status || direction || payment
              ? 'אין מסמכים שעונים לסינון'
              : 'אין עדיין מסמכים בחודש הזה'}
          hint={
            q || status || direction || payment
              ? 'נסו להרחיב: לנקות את החיפוש או לעבור ל"הכול".'
              : 'צלמו קבלה ראשונה, והיא תופיע כאן מיד.'
          }
          action={
            !q && !status && !direction && !payment
              ? { href: '/upload', label: 'העלאת מסמך' }
              : undefined
          }
        />
      ) : (
        <DocumentList docs={rows} linkRows={user?.role === 'admin'} />
      )}

      {user?.role !== 'admin' && (
        <p className="mt-6 text-xs text-faint">
          מוצגים המסמכים של החודש. אישור ושינוי סטטוס שמורים למנהל.
        </p>
      )}
    </div>
  )
}

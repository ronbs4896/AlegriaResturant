import Link from 'next/link'
import { desc, eq, and, or, like, ilike, isNull, gte, lt, type SQL } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { currentUser } from '@/lib/session'
import { monthKey, shiftMonth } from '@/lib/reports'
import MailSyncPanel from '@/components/MailSyncPanel'
import DocumentList from '@/components/DocumentList'

export const metadata = { title: 'מסמכים' }
export const dynamic = 'force-dynamic'

const MONTH_FMT = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' })

function periodLabel(period: string): string {
  const [y, m] = period.split('-').map(Number)
  if (!y || !m) return period
  return MONTH_FMT.format(new Date(Date.UTC(y, m - 1, 1)))
}

const money = (n: number) => n.toLocaleString('he-IL', { minimumFractionDigits: 2 })

interface Filters {
  period: string
  direction?: string
  status?: string
  q?: string
}

/** בונה כתובת עם הפילטרים, בלי ריקים — הכתובת היא ה-state. */
function href(f: Filters): string {
  const params = new URLSearchParams()
  params.set('period', f.period)
  if (f.direction) params.set('direction', f.direction)
  if (f.status) params.set('status', f.status)
  if (f.q) params.set('q', f.q)
  return `/documents?${params.toString()}`
}

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; direction?: string; status?: string; q?: string }>
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
  const q = (params.q ?? '').trim().slice(0, 80) || undefined
  const current: Filters = { period, direction, status, q }

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

      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-xl font-bold">{periodLabel(period)}</h1>
        <span className="text-sm text-muted">
          {rows.length} מסמכים
          {incomeTotal > 0 && (
            <>
              {' · הכנסות '}
              <span className="num text-ok">{money(incomeTotal)}</span> ₪
            </>
          )}
          {expenseTotal > 0 && (
            <>
              {' · הוצאות '}
              <span className="num">{money(expenseTotal)}</span> ₪
            </>
          )}
        </span>
      </div>

      {needsAttention > 0 && (
        <div className="mb-4 rounded-xl border border-warn/25 bg-warn-soft px-4 py-3 text-sm text-warn">
          <b>{needsAttention}</b> מסמכים ממתינים לבדיקה שלכם.
        </div>
      )}

      {/* חודש קודם/הבא — הפילטרים נשמרים במעבר */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <Link
          href={href({ ...current, period: shiftMonth(period, -1) })}
          className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised"
        >
          חודש קודם
        </Link>
        <Link
          href={href({ ...current, period: shiftMonth(period, 1) })}
          className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised"
        >
          חודש הבא
        </Link>
        <Link href="/documents" className="ms-auto text-muted underline underline-offset-4">
          לחודש הנוכחי
        </Link>
      </div>

      {/* צד הספר: הכול / הוצאות / הכנסות */}
      <div className="mb-3 grid grid-cols-3 gap-1 rounded-xl border border-line bg-raised p-1 sm:inline-grid sm:min-w-72">
        {(
          [
            [undefined, 'הכול'],
            ['expense', 'הוצאות'],
            ['income', 'הכנסות'],
          ] as const
        ).map(([value, label]) => (
          <Link
            key={label}
            href={href({ ...current, direction: value })}
            aria-current={direction === value ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-center text-sm font-semibold ${
              direction === value ? 'bg-surface text-ink shadow-sm' : 'text-muted'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(
          [
            [undefined, 'כל המצבים'],
            ['review', 'בבדיקה'],
            ['approved', 'מאושרים'],
            ['pending', 'בעיבוד'],
            ['duplicate', 'כפילויות'],
            ['awaiting_final', 'ממתין למסמך סופי'],
            ['not_financial', 'לא פיננסיים'],
            ['rejected', 'נדחו'],
          ] as const
        ).map(([value, label]) => (
          <Link
            key={label}
            href={href({ ...current, status: value })}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              status === value
                ? 'border-action bg-action-soft text-action'
                : 'border-line text-muted hover:bg-raised'
            }`}
          >
            {label}
          </Link>
        ))}

        {/* חיפוש: טופס GET — הכתובת נשארת ברת-שיתוף */}
        <form action="/documents" className="ms-auto flex w-full items-center gap-2 sm:w-auto">
          <input type="hidden" name="period" value={period} />
          {direction && <input type="hidden" name="direction" value={direction} />}
          {status && <input type="hidden" name="status" value={status} />}
          <label htmlFor="doc-search" className="sr-only">
            חיפוש
          </label>
          <input
            id="doc-search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="חיפוש ספק, לקוח או מספר מסמך"
            className="min-h-9 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-action sm:w-64"
          />
          {q && (
            <Link href={href({ ...current, q: undefined })} className="text-xs text-muted underline">
              ניקוי
            </Link>
          )}
        </form>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">
            {q || status || direction ? 'אין מסמכים שעונים לסינון' : 'אין עדיין מסמכים בחודש הזה'}
          </p>
          <p className="mt-1 text-sm text-muted">
            {q || status || direction
              ? 'נסו להרחיב: לנקות את החיפוש או לעבור ל"הכול".'
              : 'צלמו קבלה ראשונה, והיא תופיע כאן מיד.'}
          </p>
          {!q && !status && !direction && (
            <Link
              href="/upload"
              className="mt-5 inline-block rounded-xl bg-action px-5 py-3 font-bold text-white"
            >
              העלאת מסמך
            </Link>
          )}
        </div>
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

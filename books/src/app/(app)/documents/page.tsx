import Link from 'next/link'
import { desc, eq, and, like, type SQL } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { currentUser } from '@/lib/session'
import StatusPill from '@/components/StatusPill'
import { DOC_TYPES, type DocType } from '@/lib/constants'

export const metadata = { title: 'מסמכים' }
export const dynamic = 'force-dynamic'

const MONTH_FMT = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' })

function currentPeriod(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function periodLabel(period: string): string {
  const [y, m] = period.split('-').map(Number)
  if (!y || !m) return period
  return MONTH_FMT.format(new Date(Date.UTC(y, m - 1, 1)))
}

const money = (v: string | null) =>
  v == null ? '—' : Number(v).toLocaleString('he-IL', { minimumFractionDigits: 2 })

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; status?: string }>
}) {
  const params = await searchParams
  const user = await currentUser()
  const period = params.period ?? currentPeriod()
  const status = params.status

  const db = await getDb()

  const filters: SQL[] = [like(schema.documents.blobPath, `raw/${period}/%`)]
  if (status) filters.push(eq(schema.documents.status, status as 'pending'))

  const rows = await db
    .select()
    .from(schema.documents)
    .where(filters.length === 1 ? filters[0] : and(...filters))
    .orderBy(desc(schema.documents.createdAt))
    .limit(300)

  const needsAttention = rows.filter(
    (r) => r.validationFlags.some((f) => f.level === 'error') || r.status === 'review',
  ).length

  const approvedTotal = rows
    .filter((r) => r.status === 'approved')
    .reduce((sum, r) => sum + Number(r.totalAmount ?? 0), 0)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-xl font-bold">{periodLabel(period)}</h1>
        <span className="text-sm text-muted">
          {rows.length} מסמכים
          {approvedTotal > 0 && (
            <>
              {' · '}
              <span className="num">{money(String(approvedTotal))}</span> ₪ מאושרים
            </>
          )}
        </span>
      </div>

      {needsAttention > 0 && (
        <div className="mb-5 rounded-xl border border-warn/25 bg-warn-soft px-4 py-3 text-sm text-warn">
          <b>{needsAttention}</b> מסמכים ממתינים לבדיקה שלכם.
        </div>
      )}

      <PeriodNav period={period} status={status} />

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">אין עדיין מסמכים בחודש הזה</p>
          <p className="mt-1 text-sm text-muted">
            צלמו קבלה ראשונה, והיא תופיע כאן מיד.
          </p>
          <Link
            href="/upload"
            className="mt-5 inline-block rounded-xl bg-action px-5 py-3 font-bold text-white"
          >
            העלאת מסמך
          </Link>
        </div>
      ) : (
        <>
          {/* מובייל: כרטיסים. דסקטופ: טבלה שנסרקת בעמודה. */}
          <ul className="space-y-2 sm:hidden">
            {rows.map((r) => (
              <li key={r.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-semibold">
                      {r.supplierName ?? r.originalFilename ?? 'מסמך ללא שם'}
                    </div>
                    <div className="mt-0.5 text-xs text-muted">
                      {r.docDate ?? 'תאריך לא זוהה'}
                      {r.docType && ` · ${DOC_TYPES[r.docType as DocType]?.he ?? r.docType}`}
                    </div>
                  </div>
                  <StatusPill status={r.status} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="num text-lg font-bold">{money(r.totalAmount)} ₪</span>
                  <Flags flags={r.validationFlags} />
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-faint">
                  <Th>תאריך</Th>
                  <Th>ספק</Th>
                  <Th>סוג</Th>
                  <Th align="left">סכום</Th>
                  <Th>מצב</Th>
                  <Th>הערות</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-line/60 last:border-0">
                    <Td>
                      <span className="num text-xs">{r.docDate ?? '—'}</span>
                    </Td>
                    <Td>
                      <div className="font-semibold">
                        {r.supplierName ?? r.originalFilename ?? '—'}
                      </div>
                      {r.supplierTaxId && (
                        <div className="num text-xs text-faint">{r.supplierTaxId}</div>
                      )}
                    </Td>
                    <Td>
                      <span className="text-xs text-muted">
                        {r.docType ? (DOC_TYPES[r.docType as DocType]?.he ?? r.docType) : '—'}
                      </span>
                    </Td>
                    <Td align="left">
                      <span className="num font-bold">{money(r.totalAmount)}</span>
                    </Td>
                    <Td>
                      <StatusPill status={r.status} />
                    </Td>
                    <Td>
                      <Flags flags={r.validationFlags} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {user?.role !== 'admin' && (
        <p className="mt-6 text-xs text-faint">
          מוצגים המסמכים של החודש. אישור ושינוי סטטוס שמורים למנהל.
        </p>
      )}
    </div>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: 'left' }) {
  return (
    <th className={`px-4 py-2.5 font-semibold ${align === 'left' ? 'text-left' : 'text-right'}`}>
      {children}
    </th>
  )
}
function Td({ children, align }: { children: React.ReactNode; align?: 'left' }) {
  return (
    <td className={`px-4 py-3 align-top ${align === 'left' ? 'text-left' : 'text-right'}`}>
      {children}
    </td>
  )
}

function Flags({ flags }: { flags: { code: string; level: string; message: string }[] }) {
  const errors = flags.filter((f) => f.level === 'error')
  const warns = flags.filter((f) => f.level === 'warn')
  if (errors.length === 0 && warns.length === 0) {
    return <span className="text-xs text-faint">—</span>
  }
  const first = errors[0] ?? warns[0]
  return (
    <span
      title={flags.map((f) => f.message).join('\n')}
      className={`text-xs ${errors.length ? 'text-danger' : 'text-warn'}`}
    >
      {first?.message}
      {flags.length > 1 && ` (+${flags.length - 1})`}
    </span>
  )
}

function PeriodNav({ period, status }: { period: string; status?: string }) {
  const [y, m] = period.split('-').map(Number)
  if (!y || !m) return null
  const shift = (delta: number) => {
    const d = new Date(Date.UTC(y, m - 1 + delta, 1))
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
  }
  const qs = (p: string) => `/documents?period=${p}${status ? `&status=${status}` : ''}`

  return (
    <div className="mb-4 flex items-center gap-2 text-sm">
      <Link href={qs(shift(-1))} className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised">
        חודש קודם
      </Link>
      <Link href={qs(shift(1))} className="rounded-lg border border-line px-3 py-1.5 hover:bg-raised">
        חודש הבא
      </Link>
      <Link href="/documents" className="ms-auto text-muted underline underline-offset-4">
        לחודש הנוכחי
      </Link>
    </div>
  )
}

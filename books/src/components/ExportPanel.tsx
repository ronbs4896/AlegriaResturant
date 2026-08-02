'use client'

import { useEffect, useState, useCallback } from 'react'
import { withBase } from '@/lib/url'

interface PeriodStat {
  period: string
  approved: number
}

interface ExportRow {
  id: string
  period: string
  status: 'running' | 'ready' | 'failed'
  docCount: number
  totalAmount: string | null
  error: string | null
  createdAt: string
  url: string | null
}

const MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
]

function periodLabel(period: string): string {
  const [year, month] = period.split('-')
  return `${MONTHS[Number(month) - 1]} ${year}`
}

const money = (v: string | null) =>
  v == null ? '—' : Number(v).toLocaleString('he-IL', { minimumFractionDigits: 2 })

export default function ExportPanel({
  periods,
  waiting,
}: {
  periods: PeriodStat[]
  waiting: number
}) {
  const [selected, setSelected] = useState(periods[0]?.period ?? '')
  const [rows, setRows] = useState<ExportRow[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch(withBase('/api/export'))
      if (!res.ok) return
      const data = await res.json()
      setRows(data.exports ?? [])
    } catch {
      /* טעינה חוזרת תנסה שוב */
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // כל עוד יש חבילה בעבודה, מרעננים. ברגע שאין — מפסיקים,
  // כדי לא לדפוק על השרת בלי סיבה.
  useEffect(() => {
    if (!rows?.some((r) => r.status === 'running')) return
    const t = setInterval(load, 3000)
    return () => clearInterval(t)
  }, [rows, load])

  const stat = periods.find((p) => p.period === selected)

  async function create() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(withBase('/api/export'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period: selected }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(`יצירת החבילה נכשלה. (${data.error ?? res.status})`)
        return
      }
      await load()
    } catch {
      setError('אין חיבור לשרת.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <label htmlFor="period" className="mb-1 block text-xs font-semibold text-muted">
          חודש
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            id="period"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-lg border border-line bg-raised px-3 py-2 outline-none focus:border-action sm:flex-1"
          >
            {periods.map((p) => (
              <option key={p.period} value={p.period}>
                {periodLabel(p.period)} · {p.approved} מסמכים
              </option>
            ))}
          </select>
          <button
            onClick={create}
            disabled={busy || !selected || stat?.approved === 0}
            className="shrink-0 rounded-xl bg-action px-5 py-2.5 font-bold text-white disabled:opacity-45"
          >
            {busy ? 'מכין…' : 'הכנת חבילה'}
          </button>
        </div>

        {waiting > 0 && (
          <p className="mt-3 rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn">
            {waiting === 1 ? (
              'מסמך אחד ממתין'
            ) : (
              <>
                <span className="num">{waiting}</span> מסמכים ממתינים
              </>
            )}{' '}
            בתור הבדיקה ולא ייכנסו לאף חבילה. מסמך נתקע שם בדרך כלל כשלא זוהה לו תאריך,
            ואז אין לו חודש לשייך אליו עד שתאשרו אותו.{' '}
            <a href={withBase('/review')} className="underline underline-offset-4">
              למסך הבדיקה
            </a>
          </p>
        )}
        {stat && stat.approved === 0 && (
          <p className="mt-3 text-sm text-muted">אין מסמכים מאושרים בחודש הזה.</p>
        )}
        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-bold text-muted">חבילות שהוכנו</h2>
        {rows === null ? (
          <p className="text-sm text-faint">טוען…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted">עוד לא הוכנה אף חבילה.</p>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-line bg-surface px-4 py-3"
              >
                <span className="font-semibold">{periodLabel(r.period)}</span>
                <span className="text-xs text-muted">
                  <span className="num">{r.docCount}</span> מסמכים
                  {r.totalAmount && <> · <span className="num">{money(r.totalAmount)}</span> ₪</>}
                </span>
                <span className="ms-auto flex items-center gap-3">
                  {r.status === 'running' && <span className="text-xs text-muted">מכין…</span>}
                  {r.status === 'failed' && (
                    <span className="text-xs text-danger">נכשל{r.error ? `: ${r.error}` : ''}</span>
                  )}
                  {r.status === 'ready' && r.url && (
                    <a
                      href={r.url}
                      className="rounded-lg bg-action px-4 py-1.5 text-sm font-bold text-white"
                    >
                      הורדה
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-faint">
          קישור ההורדה נחתם מחדש בכל טעינה של העמוד ופג אחרי רבע שעה. אפשר להוריד את
          אותה חבילה שוב מכאן בכל זמן.
        </p>
      </div>
    </div>
  )
}

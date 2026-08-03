import Link from 'next/link'
import type { ReactNode } from 'react'
import Money from './Money'

// ============================================================
//  אטום המדד. כותרת, מספר גדול, ושורת הקשר.
//
//  הדלתא מוצגת מול התקופה הקודמת, כי מספר בלי בסיס השוואה לא
//  אומר אם המצב טוב. ירידה בהוצאות היא שיפור — ולכן הכיוון
//  ה"טוב" נקבע פר-כרטיס ולא לפי הסימן.
// ============================================================

export default function StatTile({
  label,
  value,
  money: isMoney = true,
  short = true,
  tone = 'plain',
  delta,
  goodDirection = 'up',
  hint,
  href,
  children,
}: {
  label: string
  value: number | string | null | undefined
  money?: boolean
  short?: boolean
  tone?: 'plain' | 'positive' | 'negative' | 'warn' | 'ok'
  /** שינוי באחוזים מול התקופה הקודמת */
  delta?: number | null
  goodDirection?: 'up' | 'down'
  hint?: ReactNode
  href?: string
  children?: ReactNode
}) {
  const valueTone =
    tone === 'positive' ? 'positive' : tone === 'negative' ? 'negative' : 'plain'

  const body = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-muted">{label}</span>
        {typeof delta === 'number' && <Delta value={delta} goodDirection={goodDirection} />}
      </div>

      <div className="mt-1 text-2xl font-bold">
        {isMoney ? (
          <Money value={value} short={short} tone={valueTone} />
        ) : (
          <span className={`num ${tone === 'warn' ? 'text-warn' : ''}`}>{value ?? '—'}</span>
        )}
      </div>

      {hint && <div className="mt-0.5 text-xs text-faint">{hint}</div>}
      {children}
    </>
  )

  const base = 'rounded-2xl border bg-surface p-4 transition-colors'
  const border =
    tone === 'warn' ? 'border-warn/40' : tone === 'ok' ? 'border-ok/30' : 'border-line'

  if (href) {
    return (
      <Link href={href} className={`${base} ${border} block hover:border-action/50`}>
        {body}
      </Link>
    )
  }
  return <div className={`${base} ${border}`}>{body}</div>
}

function Delta({ value, goodDirection }: { value: number; goodDirection: 'up' | 'down' }) {
  if (!Number.isFinite(value) || Math.abs(value) < 0.5) {
    return <span className="text-xs text-faint">ללא שינוי</span>
  }
  const up = value > 0
  const good = goodDirection === 'up' ? up : !up
  return (
    <span
      className={`num text-xs font-bold ${good ? 'text-ok' : 'text-warn'}`}
      title="לעומת התקופה הקודמת"
    >
      {up ? '▲' : '▼'} {Math.abs(Math.round(value))}%
    </span>
  )
}

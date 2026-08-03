// ============================================================
//  קו מגמה זעיר. SVG מוטבע, בלי ספריית גרפים — מהיר, בטוח
//  ב-RTL, ולא מוסיף 100KB לחבילה.
//
//  aria-label מכיל את המספרים עצמם: קורא מסך לא יכול "לראות"
//  את הקו, ולכן הוא מקבל את מה שהקו אומר.
// ============================================================

export default function Sparkline({
  points,
  label,
  tone = 'action',
  height = 28,
  width = 88,
}: {
  points: number[]
  label: string
  tone?: 'action' | 'ok' | 'steel'
  height?: number
  width?: number
}) {
  const clean = points.filter((n) => Number.isFinite(n))
  if (clean.length < 2) return null

  const max = Math.max(...clean)
  const min = Math.min(...clean)
  const span = max - min || 1
  const stepX = width / (clean.length - 1)

  // מרווח פנימי כדי שקצה הקו לא ייחתך בגבול ה-SVG
  const pad = 2
  const y = (v: number) => pad + (1 - (v - min) / span) * (height - pad * 2)

  const d = clean.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${y(v)}`).join(' ')
  const last = clean[clean.length - 1]!

  const stroke =
    tone === 'ok' ? 'var(--color-ok)' : tone === 'steel' ? 'var(--color-steel)' : 'var(--color-action)'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      className="overflow-visible"
    >
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
      {/* הנקודה האחרונה מודגשת — היא ההווה */}
      <circle cx={(clean.length - 1) * stepX} cy={y(last)} r="2.5" fill={stroke} />
    </svg>
  )
}

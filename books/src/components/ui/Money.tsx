import { money, moneyShort } from '@/lib/format'

// ============================================================
//  סכום. כל סכום במערכת.
//
//  אחראי על שלושה דברים שנהגו להתפזר: ספרות טבלאיות ובידוד
//  דו-כיווני (.num), מספר קבוע של ספרות אחרי הנקודה, וצבע לפי
//  כיוון התנועה — ולא לפי מצב. סכום שלילי אינו שגיאה.
// ============================================================

export default function Money({
  value,
  short = false,
  tone = 'auto',
  bold = false,
  currency = true,
  className = '',
}: {
  value: number | string | null | undefined
  short?: boolean
  /** auto = צבע לפי סימן · plain = ניטרלי · positive/negative = כפוי */
  tone?: 'auto' | 'plain' | 'positive' | 'negative' | 'muted'
  bold?: boolean
  currency?: boolean
  className?: string
}) {
  const n = value === null || value === undefined || value === '' ? null : Number(value)
  const text = short ? moneyShort(value) : money(value)

  const resolved =
    tone === 'auto' ? (n === null || n === 0 ? 'plain' : n > 0 ? 'positive' : 'negative') : tone

  const tones: Record<string, string> = {
    plain: '',
    positive: 'text-positive',
    negative: 'text-negative',
    muted: 'text-muted',
  }

  return (
    <span className={`num ${tones[resolved] ?? ''} ${bold ? 'font-bold' : ''} ${className}`}>
      {text}
      {currency && text !== '—' ? ' ₪' : ''}
    </span>
  )
}

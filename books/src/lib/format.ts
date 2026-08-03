// ============================================================
//  עיצוב מספרים ותאריכים — מקור אחד.
//
//  לפני הקובץ הזה כל עמוד הגדיר money() משלו, עם מספר שונה של
//  ספרות אחרי הנקודה. אותו סכום נראה אחרת בשני מסכים, וזה בדיוק
//  מה שגורם למערכת להיראות חובבנית.
// ============================================================

const NBSP = ' '

/** סכום מלא, שתי ספרות. ברירת המחדל לכל מקום שבו מוצג כסף. */
export function money(value: number | string | null | undefined): string {
  const n = toNumber(value)
  if (n === null) return '—'
  return n.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/**
 * סכום מקוצר לכותרות ולכרטיסי מדד: בלי אגורות, ומעל 100 אלף
 * בקיצור. בכרטיס KPI סדר הגודל חשוב, לא האגורות.
 */
export function moneyShort(value: number | string | null | undefined): string {
  const n = toNumber(value)
  if (n === null) return '—'
  const abs = Math.abs(n)
  if (abs >= 1_000_000) return sign(n) + (abs / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (abs >= 100_000) return sign(n) + Math.round(abs / 1000) + 'K'
  return n.toLocaleString('he-IL', { maximumFractionDigits: 0 })
}

/** עם סימן המטבע, בסדר שקריא בעברית. */
export const shekel = (value: number | string | null | undefined): string => {
  const text = money(value)
  return text === '—' ? text : `${text}${NBSP}₪`
}

export const shekelShort = (value: number | string | null | undefined): string => {
  const text = moneyShort(value)
  return text === '—' ? text : `${text}${NBSP}₪`
}

const sign = (n: number) => (n < 0 ? '-' : '')

function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

// ── תאריכים ──────────────────────────────────────────────────

const DAY = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'short' })
const DAY_YEAR = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'short', year: 'numeric' })
const MONTH_YEAR = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' })
const MONTH_SHORT = new Intl.DateTimeFormat('he-IL', { month: 'short' })
const DATE_TIME = new Intl.DateTimeFormat('he-IL', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

/** תאריכי מסמך נשמרים כטקסט ISO, ולכן מתפרשים כאן ולא ב-Date. */
function fromIso(iso: string | null | undefined): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return null
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(Date.UTC(y, m - 1, d))
}

export function formatDate(iso: string | null | undefined, withYear = true): string {
  const d = fromIso(iso)
  if (!d) return '—'
  return (withYear ? DAY_YEAR : DAY).format(d)
}

export function formatDateTime(value: Date | null | undefined): string {
  return value ? DATE_TIME.format(value) : '—'
}

/** תווית לחודש בפורמט yyyy-MM. */
export function formatPeriod(period: string, short = false): string {
  const d = fromIso(`${period}-01`)
  if (!d) return period
  return (short ? MONTH_SHORT : MONTH_YEAR).format(d)
}

/** "לפני 3 שעות" — למצבי בריאות ופעילות אחרונה. */
export function timeAgo(value: Date | null | undefined, now = new Date()): string {
  if (!value) return 'מעולם'
  const minutes = Math.round((now.getTime() - value.getTime()) / 60_000)
  if (minutes < 1) return 'עכשיו'
  if (minutes < 60) return `לפני ${minutes} דקות`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `לפני ${hours} שעות`
  const days = Math.round(hours / 24)
  if (days < 30) return `לפני ${days} ימים`
  return formatDate(value.toISOString().slice(0, 10))
}

/** אחוז שינוי מול תקופה קודמת. null כשאין בסיס להשוואה. */
export function deltaPercent(current: number, previous: number): number | null {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return null
  return ((current - previous) / Math.abs(previous)) * 100
}

import { sql, and, eq, isNotNull, inArray } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import {
  DOC_TYPES,
  EXPENSE_CATEGORIES,
  isDocType,
  isExpenseCategory,
} from './constants'

// ============================================================
//  שכבת הדוחות: צבירות טהורות מעל מסמכים מאושרים.
//
//  הדשבורד, עמוד הדוחות והייצוא קוראים מכאן — מקור אמת אחד,
//  כדי שהמספר שמופיע על המסך יהיה אותו מספר שיורד לרואה החשבון.
//
//  רק מסמכים מאושרים נספרים. מסמך בבדיקה אינו נתון, הוא שאלה.
// ============================================================

type Db = Awaited<ReturnType<typeof getDb>>

/**
 * ניכוי מס תשומות: שני תנאים בלתי תלויים — סוג המסמך מזכה,
 * והקטגוריה מזכה. קבלה על חומרי גלם אינה מזכה, וכך גם חשבונית
 * מס על אירוח. (חולץ מ-export.ts כדי שיהיה מקור אחד.)
 */
export function isVatDeductible(docType: string | null, category: string | null): boolean {
  const type = isDocType(docType) ? DOC_TYPES[docType] : null
  const cat = isExpenseCategory(category) ? EXPENSE_CATEGORIES[category] : null
  return Boolean(type?.deductible) && cat?.vatDeductible !== false
}

// ── תקופות ───────────────────────────────────────────────────

export const monthKey = (d: Date): string =>
  `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`

/** החודשים האחרונים כולל הנוכחי, מהישן לחדש. */
export function lastNMonths(n: number, now: Date = new Date()): string[] {
  const months: string[] = []
  for (let i = n - 1; i >= 0; i--) {
    months.push(monthKey(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))))
  }
  return months
}

export function shiftMonth(period: string, delta: number): string {
  const [y, m] = period.split('-').map(Number)
  if (!y || !m) return period
  return monthKey(new Date(Date.UTC(y, m - 1 + delta, 1)))
}

/**
 * תקופת מע״מ דו-חודשית: P1 = ינואר–פברואר … P6 = נובמבר–דצמבר.
 * עוסק בדיווח חד-חודשי פשוט יבחר חודש בודד.
 */
export function vatPeriodMonths(year: number, p: number): string[] {
  if (p < 1 || p > 6) return []
  const first = (p - 1) * 2 + 1
  return [
    `${year}-${String(first).padStart(2, '0')}`,
    `${year}-${String(first + 1).padStart(2, '0')}`,
  ]
}

export const yearMonths = (year: number): string[] =>
  Array.from({ length: 12 }, (_, i) => `${year}-${String(i + 1).padStart(2, '0')}`)

export type ReportMode = 'month' | 'vat' | 'year'

export interface ReportPeriod {
  mode: ReportMode
  /** month: '2026-08' · vat: '2026-P4' · year: '2026' */
  key: string
  months: string[]
}

/**
 * מפרש את בורר התקופה של עמוד הדוחות. מפתח פגום נופל לתקופה
 * הנוכחית של אותו מצב — לא לשגיאה.
 */
export function resolveReportPeriod(
  mode?: string,
  key?: string,
  now: Date = new Date(),
): ReportPeriod {
  const currentMonth = monthKey(now)
  const year = now.getUTCFullYear()

  if (mode === 'year') {
    const y = /^\d{4}$/.test(key ?? '') ? Number(key) : year
    return { mode: 'year', key: String(y), months: yearMonths(y) }
  }
  if (mode === 'vat') {
    const match = /^(\d{4})-P([1-6])$/.exec(key ?? '')
    const y = match ? Number(match[1]) : year
    const p = match ? Number(match[2]) : Math.floor(now.getUTCMonth() / 2) + 1
    return { mode: 'vat', key: `${y}-P${p}`, months: vatPeriodMonths(y, p) }
  }
  const m = /^\d{4}-\d{2}$/.test(key ?? '') ? key! : currentMonth
  return { mode: 'month', key: m, months: [m] }
}

/** התקופה הקודמת/הבאה באותו מצב. */
export function shiftReportPeriod(p: ReportPeriod, delta: number): string {
  if (p.mode === 'month') return shiftMonth(p.key, delta)
  if (p.mode === 'year') return String(Number(p.key) + delta)
  const match = /^(\d{4})-P([1-6])$/.exec(p.key)
  if (!match) return p.key
  const index = Number(match[1]) * 6 + (Number(match[2]) - 1) + delta
  return `${Math.floor(index / 6)}-P${(index % 6) + 1}`
}

const MODE_MONTH_FMT = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' })
const MONTH_ONLY_FMT = new Intl.DateTimeFormat('he-IL', { month: 'long' })

/** תווית עברית לתקופה: "יולי–אוגוסט 2026", "אוגוסט 2026", "2026". */
export function reportPeriodLabel(p: ReportPeriod): string {
  if (p.mode === 'year') return p.key
  const toDate = (m: string) => {
    const [y, mm] = m.split('-').map(Number)
    return new Date(Date.UTC(y!, mm! - 1, 1))
  }
  if (p.mode === 'month') return MODE_MONTH_FMT.format(toDate(p.key))
  const [a, b] = p.months
  if (!a || !b) return p.key
  return `${MONTH_ONLY_FMT.format(toDate(a))}–${MODE_MONTH_FMT.format(toDate(b))}`
}

// ── צבירה ────────────────────────────────────────────────────

export interface TotalsRow {
  period: string
  direction: string | null
  docType: string | null
  category: string | null
  partyTaxId: string | null
  partyName: string | null
  net: number
  vat: number
  total: number
  count: number
}

/**
 * שאילתה אחת לכל צריכת הדוחות: מאושרים בלבד, מקובצים לפי חודש,
 * צד, סוג מסמך, קטגוריה והצד השני. הקיפול למספרים ל-UI נעשה
 * ב-TS — מטריצת הניכוי היא קוד, לא נתון במסד.
 */
export async function totalsForMonths(db: Db, months: string[]): Promise<TotalsRow[]> {
  if (months.length === 0) return []

  const period = sql<string>`substr(${schema.documents.docDate}, 1, 7)`
  const partyTaxId = sql<string | null>`case
    when ${schema.documents.direction} = 'income' then ${schema.documents.recipientTaxId}
    else ${schema.documents.supplierTaxId} end`
  const partyName = sql<string | null>`case
    when ${schema.documents.direction} = 'income' then ${schema.documents.recipientName}
    else ${schema.documents.supplierName} end`

  const rows = await db
    .select({
      period,
      direction: schema.documents.direction,
      docType: schema.documents.docType,
      category: schema.documents.expenseCategory,
      partyTaxId,
      partyName,
      net: sql<string>`coalesce(sum(${schema.documents.netAmount}), 0)`,
      vat: sql<string>`coalesce(sum(${schema.documents.vatAmount}), 0)`,
      total: sql<string>`coalesce(sum(${schema.documents.totalAmount}), 0)`,
      count: sql<number>`count(*)`,
    })
    .from(schema.documents)
    .where(
      and(
        // רק מסמך שאושר בידי אדם, יש לו תאריך, ויש לו סוג מס
        // סופי. חשבון עסקה ומסמך שלא זוהה לעולם לא נספרים.
        eq(schema.documents.status, 'approved'),
        isNotNull(schema.documents.docDate),
        isNotNull(schema.documents.docType),
        inArray(period, months),
      ),
    )
    .groupBy(period, schema.documents.direction, schema.documents.docType,
      schema.documents.expenseCategory, partyTaxId, partyName)

  return rows.map((r) => ({
    ...r,
    net: Number(r.net),
    vat: Number(r.vat),
    total: Number(r.total),
    count: Number(r.count),
  }))
}

export interface MonthSummary {
  period: string
  income: { net: number; vat: number; total: number; count: number }
  expense: { net: number; vat: number; total: number; count: number }
  /** מס תשומות שמוכר לניכוי בלבד — הבסיס לעמדת המע״מ. */
  deductibleInputVat: number
}

const emptySide = () => ({ net: 0, vat: 0, total: 0, count: 0 })

/** מקפל שורות צבירה לסיכום חודשי, כולל חודשים ריקים. */
export function foldMonths(rows: TotalsRow[], months: string[]): MonthSummary[] {
  const byPeriod = new Map<string, MonthSummary>(
    months.map((p) => [
      p,
      { period: p, income: emptySide(), expense: emptySide(), deductibleInputVat: 0 },
    ]),
  )

  for (const r of rows) {
    const m = byPeriod.get(r.period)
    if (!m || (r.direction !== 'income' && r.direction !== 'expense')) continue
    const side = m[r.direction]
    side.net += r.net
    side.vat += r.vat
    side.total += r.total
    side.count += r.count
    if (r.direction === 'expense' && isVatDeductible(r.docType, r.category)) {
      m.deductibleInputVat += r.vat
    }
  }

  return months.map((p) => byPeriod.get(p)!)
}

export function sumSummaries(list: MonthSummary[]): MonthSummary {
  const acc: MonthSummary = {
    period: list[0]?.period ?? '',
    income: emptySide(),
    expense: emptySide(),
    deductibleInputVat: 0,
  }
  for (const m of list) {
    for (const side of ['income', 'expense'] as const) {
      acc[side].net += m[side].net
      acc[side].vat += m[side].vat
      acc[side].total += m[side].total
      acc[side].count += m[side].count
    }
    acc.deductibleInputVat += m.deductibleInputVat
  }
  return acc
}

/**
 * עמדת המע״מ: מע״מ עסקאות פחות מס תשומות מוכר. חיובי = לתשלום,
 * שלילי = להחזר.
 */
export const vatPosition = (m: MonthSummary): number => m.income.vat - m.deductibleInputVat

export interface CategorySummary {
  category: string | null
  net: number
  vat: number
  total: number
  count: number
  deductible: boolean
}

/** רווח והפסד: הוצאות לפי קטגוריה (נטו), להשוואה מול ההכנסות. */
export function foldByCategory(rows: TotalsRow[]): CategorySummary[] {
  const map = new Map<string, CategorySummary>()
  for (const r of rows) {
    if (r.direction !== 'expense') continue
    const key = r.category ?? ''
    const entry = map.get(key) ?? {
      category: r.category,
      net: 0,
      vat: 0,
      total: 0,
      count: 0,
      deductible: false,
    }
    entry.net += r.net
    entry.vat += r.vat
    entry.total += r.total
    entry.count += r.count
    entry.deductible ||= isVatDeductible(r.docType, r.category)
    map.set(key, entry)
  }
  return [...map.values()].sort((a, b) => b.net - a.net)
}

export interface PartySummary {
  taxId: string | null
  name: string | null
  net: number
  vat: number
  total: number
  count: number
}

/** ריכוז לפי הצד השני: ספקים בהוצאות, לקוחות בהכנסות. */
export function foldByParty(rows: TotalsRow[], direction: 'expense' | 'income'): PartySummary[] {
  const map = new Map<string, PartySummary>()
  for (const r of rows) {
    if (r.direction !== direction) continue
    const key = r.partyTaxId ?? r.partyName ?? '—'
    const entry = map.get(key) ?? {
      taxId: r.partyTaxId,
      name: r.partyName,
      net: 0,
      vat: 0,
      total: 0,
      count: 0,
    }
    entry.net += r.net
    entry.vat += r.vat
    entry.total += r.total
    entry.count += r.count
    if (!entry.name && r.partyName) entry.name = r.partyName
    map.set(key, entry)
  }
  return [...map.values()].sort((a, b) => b.total - a.total)
}

/** מה שמחכה לבני אדם. לא תחום בתקופה: מסמך תקוע הוא תקוע. */
export async function awaitingCounts(db: Db): Promise<{ review: number; pending: number }> {
  const rows = await db
    .select({ status: schema.documents.status, count: sql<number>`count(*)` })
    .from(schema.documents)
    .where(inArray(schema.documents.status, ['review', 'pending']))
    .groupBy(schema.documents.status)

  const get = (s: string) => Number(rows.find((r) => r.status === s)?.count ?? 0)
  return { review: get('review'), pending: get('pending') }
}

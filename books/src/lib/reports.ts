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
        eq(schema.documents.status, 'approved'),
        isNotNull(schema.documents.docDate),
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

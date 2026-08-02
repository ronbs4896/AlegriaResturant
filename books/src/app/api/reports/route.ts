import { getDb } from '@/db'
import { handler, requireUser } from '@/lib/session'
import {
  totalsForMonths,
  foldMonths,
  sumSummaries,
  vatPosition,
  foldByCategory,
  foldByParty,
  resolveReportPeriod,
} from '@/lib/reports'
import { buildSheet, type SheetColumn } from '@/lib/xlsx'
import { EXPENSE_CATEGORIES, isExpenseCategory } from '@/lib/constants'

export const runtime = 'nodejs'
export const maxDuration = 120

// ============================================================
//  הורדת דוח תקופה כ-Excel. אותם מספרים שמופיעים על המסך —
//  אותה שכבת צבירה, בלי חישוב מקביל שיכול לסטות.
// ============================================================

const TYPES = ['vat', 'pnl', 'suppliers', 'customers'] as const
type ReportType = (typeof TYPES)[number]

const NAMES: Record<ReportType, string> = {
  vat: 'דוח-מעמ',
  pnl: 'רווח-והפסד',
  suppliers: 'ריכוז-ספקים',
  customers: 'ריכוז-לקוחות',
}

export const GET = handler(async (req) => {
  await requireUser('admin')

  const url = new URL(req.url)
  const type = url.searchParams.get('type') as ReportType
  if (!TYPES.includes(type)) return Response.json({ error: 'invalid_type' }, { status: 400 })

  const period = resolveReportPeriod(
    url.searchParams.get('mode') ?? undefined,
    url.searchParams.get('period') ?? undefined,
  )

  const db = await getDb()
  const rows = await totalsForMonths(db, period.months)

  let sheet: Uint8Array
  if (type === 'vat') {
    const total = sumSummaries(foldMonths(rows, period.months))
    const nonDeductible = total.expense.vat - total.deductibleInputVat
    const position = vatPosition(total)
    const columns: SheetColumn[] = [
      { header: 'סעיף', key: 'item', width: 34 },
      { header: 'לפני מע״מ', key: 'net', width: 14, money: true },
      { header: 'מע״מ', key: 'vat', width: 14, money: true },
    ]
    sheet = await buildSheet({
      sheetName: period.key,
      columns,
      rows: [
        { item: 'עסקאות (הכנסות)', net: total.income.net, vat: total.income.vat },
        { item: 'תשומות מוכרות לניכוי', net: null, vat: total.deductibleInputVat },
        { item: 'תשומות שאינן מוכרות', net: null, vat: nonDeductible },
        {
          item: position >= 0 ? 'מע״מ לתשלום' : 'מע״מ להחזר',
          net: null,
          vat: Math.abs(position),
        },
      ],
    })
  } else if (type === 'pnl') {
    const total = sumSummaries(foldMonths(rows, period.months))
    const categories = foldByCategory(rows)
    const columns: SheetColumn[] = [
      { header: 'סעיף', key: 'item', width: 30 },
      { header: 'נטו', key: 'net', width: 14, money: true },
      { header: 'מסמכים', key: 'count', width: 10 },
    ]
    const catRows = categories.map((c) => ({
      item: isExpenseCategory(c.category) ? EXPENSE_CATEGORIES[c.category].he : 'ללא קטגוריה',
      net: -c.net,
      count: c.count,
    }))
    sheet = await buildSheet({
      sheetName: period.key,
      columns,
      rows: [
        { item: 'הכנסות', net: total.income.net, count: total.income.count },
        ...catRows,
        { item: 'רווח תפעולי', net: total.income.net - total.expense.net, count: null },
      ],
    })
  } else {
    const parties = foldByParty(rows, type === 'suppliers' ? 'expense' : 'income')
    const columns: SheetColumn[] = [
      { header: type === 'suppliers' ? 'ספק' : 'לקוח', key: 'name', width: 30 },
      { header: 'ח.פ.', key: 'taxId', width: 14 },
      { header: 'מסמכים', key: 'count', width: 10 },
      { header: 'לפני מע״מ', key: 'net', width: 14, money: true },
      { header: 'מע״מ', key: 'vat', width: 14, money: true },
      { header: 'סה״כ', key: 'total', width: 14, money: true },
    ]
    sheet = await buildSheet({
      sheetName: period.key,
      columns,
      rows: parties.map((p) => ({
        name: p.name ?? '—',
        taxId: p.taxId ?? '',
        count: p.count,
        net: p.net,
        vat: p.vat,
        total: p.total,
      })),
      totalsLabelKey: 'name',
    })
  }

  const filename = `${NAMES[type]}-${period.key}.xlsx`
  return new Response(Buffer.from(sheet), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  })
})

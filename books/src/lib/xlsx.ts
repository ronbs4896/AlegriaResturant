// ============================================================
//  בניית גיליון אחד בפורמט שרואה חשבון מקבל: RTL, כותרת קפואה
//  ומודגשת, עמודות כסף עם פורמט אלפים, ושורת סיכום להצלבה.
//  גם חבילת הייצוא החודשית וגם דוחות התקופה עוברים מכאן.
// ============================================================

export interface SheetColumn {
  header: string
  key: string
  width: number
  /** עמודת כסף: פורמט #,##0.00 וסכימה בשורת הסיכום. */
  money?: boolean
}

export async function buildSheet(opts: {
  sheetName: string
  columns: readonly SheetColumn[]
  rows: Record<string, unknown>[]
  /** המפתח שבו תופיע התווית "סה״כ" בשורת הסיכום. */
  totalsLabelKey?: string
  autoFilter?: boolean
}): Promise<Uint8Array> {
  const ExcelJS = (await import('exceljs')).default
  const wb = new ExcelJS.Workbook()
  wb.creator = 'מערכת החשבוניות · קייטרינג אלגריה'
  wb.created = new Date()

  const ws = wb.addWorksheet(opts.sheetName, {
    views: [{ rightToLeft: true, state: 'frozen', ySplit: 1 }],
  })
  ws.columns = opts.columns.map((c) => ({ header: c.header, key: c.key, width: c.width }))

  ws.getRow(1).font = { bold: true }
  ws.getRow(1).alignment = { vertical: 'middle' }

  for (const row of opts.rows) ws.addRow(row)

  const moneyKeys = opts.columns.filter((c) => c.money).map((c) => c.key)
  for (const key of moneyKeys) ws.getColumn(key).numFmt = '#,##0.00'

  if (opts.totalsLabelKey && opts.rows.length > 0) {
    const totals: Record<string, unknown> = { [opts.totalsLabelKey]: 'סה״כ' }
    for (const key of moneyKeys) {
      totals[key] = opts.rows.reduce((acc, r) => acc + (Number(r[key]) || 0), 0)
    }
    ws.addRow(totals).font = { bold: true }
  }

  if (opts.autoFilter) {
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: opts.columns.length } }
  }

  const buf = await wb.xlsx.writeBuffer()
  return new Uint8Array(buf as ArrayBuffer)
}

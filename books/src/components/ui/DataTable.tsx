import Link from 'next/link'
import type { ReactNode } from 'react'

// ============================================================
//  טבלה אחת לכל המערכת.
//
//  עד היום כל עמוד כתב פעמיים את אותם נתונים: כרטיסים למובייל
//  וטבלה לדסקטופ, כל אחד עם ה-markup שלו. כאן מגדירים את
//  העמודות פעם אחת, ושתי התצוגות נגזרות מאותה הגדרה — כך שעמודה
//  שמתווספת מופיעה בשתיהן, ולא נשכחת באחת.
//
//  מיון דרך הכתובת ולא ב-state: הקישור ניתן לשיתוף, וחזרה
//  אחורה בדפדפן עובדת.
// ============================================================

export interface Column<T> {
  key: string
  header: string
  /** ברירת מחדל: ימין. סכומים משמאל, כדי שהספרות יתיישרו. */
  align?: 'start' | 'end'
  /** מוסתרת מתחת ל-xl — פרט משני שלא שווה רוחב במסך צר. */
  secondary?: boolean
  sortable?: boolean
  width?: string
  render: (row: T) => ReactNode
}

export interface CardShape<T> {
  title: (row: T) => ReactNode
  subtitle?: (row: T) => ReactNode
  amount?: (row: T) => ReactNode
  meta?: (row: T) => ReactNode
  badge?: (row: T) => ReactNode
}

export default function DataTable<T>({
  rows,
  columns,
  card,
  rowKey,
  href,
  sort,
  dir = 'desc',
  sortHref,
  density = 'comfortable',
  footer,
}: {
  rows: T[]
  columns: Column<T>[]
  /** תצוגת המובייל, נגזרת מאותם נתונים. */
  card: CardShape<T>
  rowKey: (row: T) => string
  href?: (row: T) => string
  sort?: string
  dir?: 'asc' | 'desc'
  /** בונה כתובת למיון לפי עמודה. בלעדיו אין מיון. */
  sortHref?: (key: string, dir: 'asc' | 'desc') => string
  density?: 'comfortable' | 'compact'
  footer?: ReactNode
}) {
  const pad = density === 'compact' ? 'px-3 py-1.5' : 'px-4 py-3'

  return (
    <>
      {/* מובייל וטאבלט: כרטיסים */}
      <ul className="space-y-2 lg:hidden">
        {rows.map((row) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-semibold">{card.title(row)}</div>
                  {card.subtitle && (
                    <div className="mt-0.5 text-xs text-muted">{card.subtitle(row)}</div>
                  )}
                </div>
                {card.badge?.(row)}
              </div>
              {(card.amount || card.meta) && (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold">{card.amount?.(row)}</span>
                  <span className="text-xs text-muted">{card.meta?.(row)}</span>
                </div>
              )}
            </>
          )
          return (
            <li key={rowKey(row)}>
              {href ? (
                <Link
                  href={href(row)}
                  className="block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-action/40"
                >
                  {inner}
                </Link>
              ) : (
                <div className="rounded-xl border border-line bg-surface p-4">{inner}</div>
              )}
            </li>
          )
        })}
      </ul>

      {/* דסקטופ: טבלה עם כותרת דביקה */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-header">
            <tr className="border-b border-line-strong text-xs text-muted">
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={c.width ? { width: c.width } : undefined}
                  className={`${pad} font-semibold ${c.align === 'end' ? 'text-left' : 'text-right'} ${
                    c.secondary ? 'hidden xl:table-cell' : ''
                  }`}
                >
                  {c.sortable && sortHref ? (
                    <Link
                      href={sortHref(c.key, sort === c.key && dir === 'desc' ? 'asc' : 'desc')}
                      className="inline-flex items-center gap-1 hover:text-ink"
                      aria-label={`מיון לפי ${c.header}`}
                    >
                      {c.header}
                      <span aria-hidden className={sort === c.key ? 'text-action' : 'text-faint'}>
                        {sort === c.key ? (dir === 'desc' ? '↓' : '↑') : '↕'}
                      </span>
                    </Link>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                className={`border-b border-line/60 transition-colors last:border-0 ${
                  href ? 'relative hover:bg-raised' : ''
                }`}
              >
                {columns.map((c, i) => (
                  <td
                    key={c.key}
                    className={`${pad} align-middle ${c.align === 'end' ? 'text-left' : 'text-right'} ${
                      c.secondary ? 'hidden xl:table-cell' : ''
                    }`}
                  >
                    {/* הקישור נפרס על כל השורה מהתא הראשון */}
                    {i === 0 && href ? (
                      <Link href={href(row)} className="after:absolute after:inset-0">
                        {c.render(row)}
                      </Link>
                    ) : (
                      c.render(row)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot>
              <tr className="border-t border-line-strong bg-raised font-bold">{footer}</tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  )
}

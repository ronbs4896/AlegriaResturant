import Link from 'next/link'

// ============================================================
//  סרגל הסינון והמיון של רשימות ספקים ולקוחות.
//
//  הכול בכתובת ולא ב-state: אפשר לשתף קישור לתצוגה מדויקת,
//  והחזרה אחורה בדפדפן עובדת כמו שמצפים.
// ============================================================

export type PartySort = 'total' | 'docs' | 'name' | 'recent'

export const PARTY_SORTS: [PartySort, string][] = [
  ['total', 'לפי סכום'],
  ['docs', 'לפי כמות מסמכים'],
  ['recent', 'לפי מסמך אחרון'],
  ['name', 'לפי שם'],
]

export type PartyFilter = 'all' | 'active' | 'dormant'

const FILTERS: [PartyFilter, string, string][] = [
  ['all', 'הכול', ''],
  ['active', 'פעילים', 'עם מסמך ב-12 החודשים האחרונים'],
  ['dormant', 'רדומים', 'בלי מסמך בשנה האחרונה'],
]

export const isPartySort = (v: string | undefined): v is PartySort =>
  PARTY_SORTS.some(([k]) => k === v)

export const isPartyFilter = (v: string | undefined): v is PartyFilter =>
  FILTERS.some(([k]) => k === v)

export default function PartyToolbar({
  base,
  q,
  sort,
  filter,
  count,
}: {
  base: '/suppliers' | '/customers'
  q?: string
  sort: PartySort
  filter: PartyFilter
  count: number
}) {
  const href = (next: { sort?: PartySort; filter?: PartyFilter; q?: string }) => {
    const p = new URLSearchParams()
    const s = next.sort ?? sort
    const f = next.filter ?? filter
    const query = next.q ?? q
    if (s !== 'total') p.set('sort', s)
    if (f !== 'all') p.set('filter', f)
    if (query) p.set('q', query)
    const qs = p.toString()
    return qs ? `${base}?${qs}` : base
  }

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map(([key, label, hint]) => (
          <Link
            key={key}
            href={href({ filter: key })}
            title={hint}
            aria-current={filter === key ? 'page' : undefined}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              filter === key
                ? 'border-action bg-action-soft text-action'
                : 'border-line text-muted hover:bg-raised'
            }`}
          >
            {label}
          </Link>
        ))}

        <span className="text-xs text-faint">
          <span className="num">{count}</span> ברשימה
        </span>

        {/* חיפוש: טופס GET ששומר על הסינון והמיון */}
        <form action={base} className="ms-auto flex items-center gap-2">
          {sort !== 'total' && <input type="hidden" name="sort" value={sort} />}
          {filter !== 'all' && <input type="hidden" name="filter" value={filter} />}
          <label htmlFor="party-search" className="sr-only">
            חיפוש
          </label>
          <input
            id="party-search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="חיפוש לפי שם או ח.פ."
            className="min-h-9 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none transition-colors focus:border-action sm:w-56"
          />
          {q && (
            <Link href={href({ q: '' })} className="text-xs text-muted underline">
              ניקוי
            </Link>
          )}
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-muted">מיון:</span>
        {PARTY_SORTS.map(([key, label]) => (
          <Link
            key={key}
            href={href({ sort: key })}
            aria-current={sort === key ? 'page' : undefined}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              sort === key ? 'bg-raised text-ink' : 'text-muted hover:bg-raised'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

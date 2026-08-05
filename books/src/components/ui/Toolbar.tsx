import Link from 'next/link'
import type { ReactNode } from 'react'

// ============================================================
//  סרגלי סינון ומיון. הכול קישורים ולא state — הכתובת היא
//  המצב, כך שאפשר לשתף תצוגה מדויקת והדפדפן חוזר אחורה נכון.
// ============================================================

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">{children}</div>
}

export interface Option<T extends string | undefined> {
  value: T
  label: string
  hint?: string
  count?: number
}

/** בורר בלעדי — טאבים של צד או מצב. */
export function SegmentedControl<T extends string | undefined>({
  options,
  value,
  href,
  ariaLabel,
}: {
  options: Option<T>[]
  value: T
  href: (v: T) => string
  ariaLabel: string
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-raised p-1 sm:inline-flex"
    >
      {options.map((o) => (
        <Link
          key={o.label}
          href={href(o.value)}
          aria-current={value === o.value ? 'page' : undefined}
          className={`rounded-lg px-3 py-2 text-center text-sm font-semibold transition-colors sm:px-4 ${
            value === o.value ? 'bg-surface text-ink shadow-raised' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
          {typeof o.count === 'number' && (
            <span className="num ms-1.5 text-xs text-faint">{o.count}</span>
          )}
        </Link>
      ))}
    </div>
  )
}

/** צ'יפים — סינון משני, קריא במבט. */
export function FilterChips<T extends string | undefined>({
  options,
  value,
  href,
}: {
  options: Option<T>[]
  value: T
  href: (v: T) => string
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {options.map((o) => (
        <Link
          key={o.label}
          href={href(o.value)}
          title={o.hint}
          aria-current={value === o.value ? 'page' : undefined}
          className={`min-h-8 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            value === o.value
              ? 'border-action bg-action-soft text-action'
              : 'border-line text-muted hover:bg-raised'
          }`}
        >
          {o.label}
          {typeof o.count === 'number' && <span className="num ms-1">{o.count}</span>}
        </Link>
      ))}
    </div>
  )
}

/** חיפוש כטופס GET — שומר על שאר הפילטרים דרך שדות מוסתרים. */
export function SearchBox({
  action,
  value,
  placeholder,
  hidden = {},
  clearHref,
}: {
  action: string
  value?: string
  placeholder: string
  hidden?: Record<string, string | undefined>
  clearHref?: string
}) {
  return (
    <form action={action} className="ms-auto flex items-center gap-2">
      {Object.entries(hidden).map(([k, v]) =>
        v ? <input key={k} type="hidden" name={k} value={v} /> : null,
      )}
      <label htmlFor={`search-${action}`} className="sr-only">
        חיפוש
      </label>
      <input
        id={`search-${action}`}
        name="q"
        defaultValue={value ?? ''}
        placeholder={placeholder}
        className="min-h-9 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none transition-colors focus:border-action sm:w-64"
      />
      {value && clearHref && (
        <Link href={clearHref} className="shrink-0 text-xs text-muted underline">
          ניקוי
        </Link>
      )}
    </form>
  )
}

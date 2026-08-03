import Link from 'next/link'
import type { ReactNode } from 'react'

// ============================================================
//  ראש עמוד. כל מסך פותח כך, וכך הוא נראה אותו דבר בכולם.
// ============================================================

export default function PageHeader({
  title,
  subtitle,
  meta,
  action,
  nav,
}: {
  title: string
  subtitle?: string
  /** מספרים או תגיות שנקראים לצד הכותרת */
  meta?: ReactNode
  action?: ReactNode
  nav?: ReactNode
}) {
  return (
    <header className="mb-5">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-xl font-bold">{title}</h1>
            {meta}
          </div>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      {nav && <div className="mt-3">{nav}</div>}
    </header>
  )
}

/** ניווט תקופה — קודם / הבא / חזרה להווה. */
export function PeriodNav({
  prev,
  next,
  reset,
  label,
}: {
  prev: string
  next: string
  reset?: string
  label?: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={prev}
        className="rounded-lg border border-line px-3 py-1.5 transition-colors hover:bg-raised"
      >
        {label === 'month' ? 'חודש קודם' : 'הקודם'}
      </Link>
      <Link
        href={next}
        className="rounded-lg border border-line px-3 py-1.5 transition-colors hover:bg-raised"
      >
        {label === 'month' ? 'חודש הבא' : 'הבא'}
      </Link>
      {reset && (
        <Link href={reset} className="text-muted underline underline-offset-4">
          להיום
        </Link>
      )}
    </div>
  )
}

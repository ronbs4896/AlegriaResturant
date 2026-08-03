import Link from 'next/link'
import type { ReactNode } from 'react'

// ============================================================
//  מצב ריק. תמיד אומר מה הפעולה הבאה, אחרת המסך נראה שבור
//  במקום ריק.
// ============================================================

export default function EmptyState({
  title,
  hint,
  action,
  icon,
}: {
  title: string
  hint?: string
  action?: { href: string; label: string }
  icon?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      {icon && <div className="mx-auto mb-3 text-faint">{icon}</div>}
      <p className="font-semibold">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-md text-sm text-muted">{hint}</p>}
      {action && (
        <Link
          href={action.href}
          className="mt-5 inline-block rounded-xl bg-action px-5 py-3 font-bold text-white transition-all hover:-translate-y-px"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

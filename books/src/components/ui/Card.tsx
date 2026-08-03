import type { ReactNode } from 'react'

// ============================================================
//  משטח בסיס. כל כרטיס במערכת עובר דרך כאן, כדי שרדיוס, גבול
//  וריפוד יהיו זהים בכל מסך במקום להיבחר מחדש בכל עמוד.
// ============================================================

export function Card({
  children,
  className = '',
  as: Tag = 'div',
  tone = 'plain',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
  tone?: 'plain' | 'warn' | 'danger' | 'ok' | 'dashed'
}) {
  const tones: Record<string, string> = {
    plain: 'border-line bg-surface',
    warn: 'border-warn/25 bg-warn-soft',
    danger: 'border-danger/25 bg-danger-soft',
    ok: 'border-ok/25 bg-ok-soft',
    dashed: 'border-dashed border-line bg-surface',
  }
  return (
    <Tag className={`rounded-2xl border p-4 sm:p-6 ${tones[tone]} ${className}`}>{children}</Tag>
  )
}

export function CardHeader({
  title,
  hint,
  action,
}: {
  title: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="font-bold">{title}</h2>
        {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
      </div>
      {action}
    </div>
  )
}

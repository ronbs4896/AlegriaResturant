const MAP = {
  pending: { he: 'ממתין לעיבוד', cls: 'bg-steel-soft text-steel' },
  review: { he: 'בבדיקה', cls: 'bg-warn-soft text-warn' },
  approved: { he: 'מאושר', cls: 'bg-ok-soft text-ok' },
  rejected: { he: 'נדחה', cls: 'bg-danger-soft text-danger' },
} as const

export type DocStatus = keyof typeof MAP

export default function StatusPill({ status }: { status: string }) {
  const s = MAP[status as DocStatus] ?? MAP.pending
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${s.cls}`}>
      {s.he}
    </span>
  )
}

const DIRECTION = {
  expense: { he: 'הוצאה', cls: 'bg-steel-soft text-steel' },
  income: { he: 'הכנסה', cls: 'bg-ok-soft text-ok' },
} as const

/** צד הספר. לא מוצג כשעוד אין הכרעה — היעדר תג אומר בדיוק את זה. */
export function DirectionPill({ direction }: { direction: string | null }) {
  const d = DIRECTION[direction as keyof typeof DIRECTION]
  if (!d) return null
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${d.cls}`}>
      {d.he}
    </span>
  )
}

const MAP = {
  pending: { he: 'ממתין לעיבוד', cls: 'bg-steel-soft text-steel' },
  review: { he: 'בבדיקה', cls: 'bg-warn-soft text-warn' },
  approved: { he: 'מאושר', cls: 'bg-ok-soft text-ok' },
  rejected: { he: 'נדחה', cls: 'bg-danger-soft text-danger' },
  not_expense: { he: 'לא הוצאה', cls: 'bg-steel-soft text-steel' },
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

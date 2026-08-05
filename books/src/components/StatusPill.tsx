const MAP = {
  pending: { he: 'ממתין לעיבוד', cls: 'bg-steel-soft text-steel' },
  review: { he: 'בבדיקה', cls: 'bg-warn-soft text-warn' },
  approved: { he: 'מאושר', cls: 'bg-ok-soft text-ok' },
  rejected: { he: 'נדחה', cls: 'bg-danger-soft text-danger' },
  not_financial: { he: 'לא מסמך פיננסי', cls: 'bg-steel-soft text-steel' },
  awaiting_final: { he: 'ממתין למסמך סופי', cls: 'bg-warn-soft text-warn' },
  duplicate: { he: 'חשד לכפילות', cls: 'bg-warn-soft text-warn' },
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

const PAYMENT = {
  paid: { he: 'שולם', cls: 'bg-ok-soft text-ok' },
  partial: { he: 'חלקי', cls: 'bg-warn-soft text-warn' },
  unpaid: { he: 'לא שולם', cls: 'bg-steel-soft text-steel' },
} as const

/**
 * מצב התשלום. "לא רלוונטי" ומצב חסר אינם מוצגים — תג שאומר
 * "אין מה לדעת" רק מרעיש את הטבלה.
 *
 * `overdue` דורס את הטקסט: חוב שעבר את מועדו הוא המידע החשוב
 * בשורה, ולא העובדה שהוא לא שולם.
 */
export function PaymentPill({
  status,
  overdue = false,
}: {
  status: string | null
  overdue?: boolean
}) {
  const p = PAYMENT[status as keyof typeof PAYMENT]
  if (!p) return null
  if (overdue) {
    return (
      <span className="inline-block rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-bold text-danger">
        באיחור
      </span>
    )
  }
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${p.cls}`}>
      {p.he}
    </span>
  )
}

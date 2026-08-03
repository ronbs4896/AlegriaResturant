import StatusPill, { DirectionPill, PaymentPill } from './StatusPill'
import DataTable, { type Column } from './ui/DataTable'
import Money from './ui/Money'
import { formatDate } from '@/lib/format'
import { isOverdue } from '@/lib/payments'
import { DOC_TYPES, type DocType } from '@/lib/constants'
import type { Document } from '@/db/schema'

// ============================================================
//  רשימת מסמכים — הגדרת עמודות אחת, שתי תצוגות.
//
//  קודם היו כאן שני עצי markup נפרדים, אחד לכרטיסי מובייל ואחד
//  לטבלת דסקטופ, ועמודה שהתווספה לאחד נשכחה בשני. עכשיו שניהם
//  נגזרים מאותה רשימה.
// ============================================================

/** הצד השני של המסמך, לפי הכיוון: בהכנסה הלקוח, אחרת הספק. */
export function counterpartName(doc: Document): string | null {
  return doc.direction === 'income'
    ? (doc.recipientName ?? doc.supplierName)
    : (doc.supplierName ?? doc.recipientName)
}

function counterpartTaxId(doc: Document): string | null {
  return doc.direction === 'income' ? doc.recipientTaxId : doc.supplierTaxId
}

const docTypeLabel = (doc: Document) =>
  doc.docType ? (DOC_TYPES[doc.docType as DocType]?.he ?? doc.docType) : '—'

export default function DocumentList({
  docs,
  linkRows,
  density,
}: {
  docs: Document[]
  /** קישור למסך הבדיקה — רק למי שרשאי לערוך שם. */
  linkRows: boolean
  density?: 'comfortable' | 'compact'
}) {
  // "היום" נקבע פעם אחת לכל הרשימה, כדי שכל השורות יישפטו מול
  // אותו גבול גם אם הרינדור נמשך על פני חצות.
  const today = new Date().toISOString().slice(0, 10)
  const thisYear = today.slice(0, 4)

  const columns: Column<Document>[] = [
    {
      key: 'party',
      header: 'ספק / לקוח',
      render: (d) => (
        <>
          <div className="font-semibold">
            {counterpartName(d) ?? d.originalFilename ?? '—'}
          </div>
          {counterpartTaxId(d) && (
            <div className="num text-xs text-faint">{counterpartTaxId(d)}</div>
          )}
        </>
      ),
    },
    {
      key: 'date',
      header: 'תאריך',
      render: (d) => <span className="num text-xs">{formatDate(d.docDate)}</span>,
    },
    {
      key: 'direction',
      header: 'צד',
      render: (d) => <DirectionPill direction={d.direction} />,
    },
    {
      key: 'docType',
      header: 'סוג',
      secondary: true,
      render: (d) => <span className="text-xs text-muted">{docTypeLabel(d)}</span>,
    },
    {
      key: 'total',
      header: 'סכום',
      align: 'end',
      render: (d) => <Money value={d.totalAmount} tone="plain" bold />,
    },
    {
      key: 'payment',
      header: 'תשלום',
      render: (d) => (
        <>
          <PaymentPill status={d.paymentStatus} overdue={isOverdue(d, today)} />
          {/* השנה מוצגת רק כשהיא אינה השנה הנוכחית: חוב מ-2025
              שנראה כמו "31 בדצמבר" קורא כאילו הוא עוד לפנינו. */}
          {d.dueDate && d.paymentStatus !== 'paid' && (
            <div className="num text-xs text-faint">
              {formatDate(d.dueDate, d.dueDate.slice(0, 4) !== thisYear)}
            </div>
          )}
        </>
      ),
    },
    {
      key: 'status',
      header: 'מצב',
      render: (d) => <StatusPill status={d.status} />,
    },
    {
      key: 'flags',
      header: 'הערות',
      secondary: true,
      render: (d) => <Flags flags={d.validationFlags} />,
    },
  ]

  return (
    <DataTable
      rows={docs}
      columns={columns}
      rowKey={(d) => d.id}
      href={linkRows ? (d) => `/review/${d.id}` : undefined}
      density={density}
      card={{
        title: (d) => counterpartName(d) ?? d.originalFilename ?? 'מסמך ללא שם',
        subtitle: (d) => (
          <>
            {formatDate(d.docDate)}
            {d.docType && ` · ${docTypeLabel(d)}`}
          </>
        ),
        badge: (d) => <StatusPill status={d.status} />,
        amount: (d) => <Money value={d.totalAmount} tone="plain" bold />,
        meta: (d) => (
          <span className="flex items-center gap-2">
            <Flags flags={d.validationFlags} />
            <DirectionPill direction={d.direction} />
            <PaymentPill status={d.paymentStatus} overdue={isOverdue(d, today)} />
          </span>
        ),
      }}
    />
  )
}

function Flags({ flags }: { flags: { code: string; level: string; message: string }[] }) {
  const errors = flags.filter((f) => f.level === 'error')
  const warns = flags.filter((f) => f.level === 'warn')
  if (errors.length === 0 && warns.length === 0) {
    return <span className="text-xs text-faint">—</span>
  }
  const first = errors[0] ?? warns[0]
  return (
    <span
      title={flags.map((f) => f.message).join('\n')}
      className={`text-xs ${errors.length ? 'text-danger' : 'text-warn'}`}
    >
      {first?.message}
      {flags.length > 1 && ` (+${flags.length - 1})`}
    </span>
  )
}

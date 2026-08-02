import Link from 'next/link'
import StatusPill, { DirectionPill } from './StatusPill'
import { DOC_TYPES, type DocType } from '@/lib/constants'
import type { Document } from '@/db/schema'

// ============================================================
//  תצוגת רשימת מסמכים אחת לכל המערכת: כרטיסים במובייל, טבלה
//  מ-1024. עמוד המסמכים, דף ספק ודף לקוח מרנדרים את אותו רכיב —
//  שינוי אחד מתעדכן בכולם.
// ============================================================

const money = (v: string | null) =>
  v == null ? '—' : Number(v).toLocaleString('he-IL', { minimumFractionDigits: 2 })

/** הצד השני של המסמך, לפי הכיוון: בהכנסה הלקוח, אחרת הספק. */
export function counterpartName(doc: Document): string | null {
  return doc.direction === 'income'
    ? (doc.recipientName ?? doc.supplierName)
    : (doc.supplierName ?? doc.recipientName)
}

function counterpartTaxId(doc: Document): string | null {
  return doc.direction === 'income' ? doc.recipientTaxId : doc.supplierTaxId
}

export default function DocumentList({
  docs,
  linkRows,
}: {
  docs: Document[]
  /** קישור למסך הבדיקה — רק למי שרשאי לערוך שם. */
  linkRows: boolean
}) {
  return (
    <>
      {/* מובייל וטאבלט: כרטיסים */}
      <ul className="space-y-2 lg:hidden">
        {docs.map((doc) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-semibold">
                    {counterpartName(doc) ?? doc.originalFilename ?? 'מסמך ללא שם'}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {doc.docDate ?? 'תאריך לא זוהה'}
                    {doc.docType && ` · ${DOC_TYPES[doc.docType as DocType]?.he ?? doc.docType}`}
                  </div>
                </div>
                <StatusPill status={doc.status} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="num text-lg font-bold">{money(doc.totalAmount)} ₪</span>
                <span className="flex items-center gap-2">
                  <Flags flags={doc.validationFlags} />
                  <DirectionPill direction={doc.direction} />
                </span>
              </div>
            </>
          )
          return (
            <li key={doc.id}>
              {linkRows ? (
                <Link
                  href={`/review/${doc.id}`}
                  className="block rounded-xl border border-line bg-surface p-4 hover:border-action/40"
                >
                  {body}
                </Link>
              ) : (
                <div className="rounded-xl border border-line bg-surface p-4">{body}</div>
              )}
            </li>
          )
        })}
      </ul>

      {/* דסקטופ: טבלה שנסרקת בעמודה */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-faint">
              <Th>תאריך</Th>
              <Th>צד</Th>
              <Th>ספק / לקוח</Th>
              <Th>סוג</Th>
              <Th align="left">סכום</Th>
              <Th>מצב</Th>
              <Th>הערות</Th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr
                key={doc.id}
                className={`border-b border-line/60 last:border-0 ${linkRows ? 'relative hover:bg-raised' : ''}`}
              >
                <Td>
                  <span className="num text-xs">{doc.docDate ?? '—'}</span>
                </Td>
                <Td>
                  <DirectionPill direction={doc.direction} />
                </Td>
                <Td>
                  <div className="font-semibold">
                    {linkRows ? (
                      // הקישור פרוס על כל השורה דרך ה-after, בלי JS
                      <Link href={`/review/${doc.id}`} className="after:absolute after:inset-0">
                        {counterpartName(doc) ?? doc.originalFilename ?? '—'}
                      </Link>
                    ) : (
                      (counterpartName(doc) ?? doc.originalFilename ?? '—')
                    )}
                  </div>
                  {counterpartTaxId(doc) && (
                    <div className="num text-xs text-faint">{counterpartTaxId(doc)}</div>
                  )}
                </Td>
                <Td>
                  <span className="text-xs text-muted">
                    {doc.docType ? (DOC_TYPES[doc.docType as DocType]?.he ?? doc.docType) : '—'}
                  </span>
                </Td>
                <Td align="left">
                  <span className="num font-bold">{money(doc.totalAmount)}</span>
                </Td>
                <Td>
                  <StatusPill status={doc.status} />
                </Td>
                <Td>
                  <Flags flags={doc.validationFlags} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: 'left' }) {
  return (
    <th className={`px-4 py-2.5 font-semibold ${align === 'left' ? 'text-left' : 'text-right'}`}>
      {children}
    </th>
  )
}

function Td({ children, align }: { children: React.ReactNode; align?: 'left' }) {
  return (
    <td className={`px-4 py-3 align-top ${align === 'left' ? 'text-left' : 'text-right'}`}>
      {children}
    </td>
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

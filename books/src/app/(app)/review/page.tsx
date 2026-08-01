import Link from 'next/link'
import { desc, eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { DOC_TYPES, type DocType } from '@/lib/constants'

export const metadata = { title: 'תור בדיקה' }
export const dynamic = 'force-dynamic'

const money = (v: string | null) =>
  v == null ? '—' : Number(v).toLocaleString('he-IL', { minimumFractionDigits: 2 })

export default async function ReviewQueue() {
  const db = await getDb()
  const rows = await db
    .select()
    .from(schema.documents)
    .where(eq(schema.documents.status, 'review'))
    .orderBy(desc(schema.documents.createdAt))
    .limit(200)

  return (
    <div>
      <h1 className="text-xl font-bold">תור בדיקה</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        מסמכים שהמערכת לא הכריעה לבדה. אף אחד מהם לא ייכנס לייצוא לפני שאישרתם.
      </p>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold">התור ריק</p>
          <p className="mt-1 text-sm text-muted">כל המסמכים עברו בדיקה.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => {
            const errors = r.validationFlags.filter((f) => f.level === 'error')
            return (
              <li key={r.id}>
                <Link
                  href={`/review/${r.id}`}
                  className="block rounded-xl border border-line bg-surface p-4 hover:border-action/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">
                        {r.supplierName ?? r.originalFilename ?? 'מסמך ללא שם'}
                      </div>
                      <div className="mt-0.5 text-xs text-muted">
                        {r.docDate ?? 'תאריך לא זוהה'}
                        {r.docType && ` · ${DOC_TYPES[r.docType as DocType]?.he ?? r.docType}`}
                      </div>
                    </div>
                    <span className="num shrink-0 font-bold">{money(r.totalAmount)} ₪</span>
                  </div>
                  <p className="mt-2 text-xs text-danger">
                    {errors[0]?.message ?? r.classifyReason ?? 'נדרשת בדיקה'}
                    {errors.length > 1 && ` (+${errors.length - 1})`}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

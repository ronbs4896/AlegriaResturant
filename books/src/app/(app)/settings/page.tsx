import { desc, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import { loadBusiness } from '@/lib/business'
import BusinessProfileForm from '@/components/BusinessProfileForm'
import WipeButton from '@/components/WipeButton'

export const metadata = { title: 'הגדרות' }
export const dynamic = 'force-dynamic'

const DECISIONS: Record<string, { he: string; cls: string }> = {
  imported: { he: 'נכנס', cls: 'bg-ok-soft text-ok' },
  filtered: { he: 'סוננו', cls: 'bg-steel-soft text-steel' },
  duplicate: { he: 'כפילות', cls: 'bg-warn-soft text-warn' },
  error: { he: 'שגיאה', cls: 'bg-danger-soft text-danger' },
}

export default async function SettingsPage() {
  await requireUser('admin')

  const db = await getDb()
  const [profileRows, docCount, log] = await Promise.all([
    db.select().from(schema.businessProfile).limit(1),
    db.select({ n: sql<number>`count(*)::int` }).from(schema.documents),
    db.select().from(schema.ingestLog).orderBy(desc(schema.ingestLog.at)).limit(50),
  ])

  const row = profileRows[0]
  const fallback = await loadBusiness()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">הגדרות</h1>
        <p className="mt-1 text-sm text-muted">
          פרטי העסק, יומן הקליטה ופעולות תחזוקה.
        </p>
      </div>

      <BusinessProfileForm
        initial={{
          legalName: row?.legalName ?? fallback.legalName,
          tradeNames: row?.tradeNames ?? [],
          taxId: row?.taxId ?? fallback.taxId,
          vatNumber: row?.vatNumber ?? null,
          addresses: row?.addresses ?? [],
          emails: row?.emails ?? [],
          phones: row?.phones ?? [],
          bankAccounts: row?.bankAccounts ?? [],
          defaultCurrency: row?.defaultCurrency ?? 'ILS',
        }}
      />

      {/* יומן הקליטה — התשובה ל"למה זה לא נמשך" ול"למה זה כן" */}
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <h2 className="font-bold">יומן קליטה</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          כל קובץ שהמערכת ראתה, כולל מה שסוננו ולמה. חמישים האחרונים.
        </p>

        {log.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
            עדיין לא נקלטו קבצים.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-faint">
                  <th className="px-2 py-2 text-right font-semibold">קובץ</th>
                  <th className="px-2 py-2 text-right font-semibold">מאת</th>
                  <th className="px-2 py-2 text-right font-semibold">החלטה</th>
                  <th className="px-2 py-2 text-right font-semibold">סיבה</th>
                </tr>
              </thead>
              <tbody>
                {log.map((e) => {
                  const d = DECISIONS[e.decision] ?? DECISIONS.filtered!
                  return (
                    <tr key={e.id} className="border-b border-line/60 last:border-0">
                      <td className="px-2 py-2">
                        <div className="max-w-56 truncate font-semibold">{e.filename ?? '—'}</div>
                        <div className="text-xs text-faint">
                          {e.mime ?? ''}
                          {e.sizeBytes ? ` · ${Math.round(e.sizeBytes / 1024)} KB` : ''}
                        </div>
                      </td>
                      <td className="max-w-44 truncate px-2 py-2 text-xs text-muted" dir="ltr">
                        {e.sender ?? '—'}
                      </td>
                      <td className="px-2 py-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${d.cls}`}>
                          {d.he}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-xs text-muted">{e.reason}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <WipeButton documentCount={docCount[0]?.n ?? 0} />
    </div>
  )
}

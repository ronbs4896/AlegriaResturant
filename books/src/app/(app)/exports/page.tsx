import { and, eq, inArray, like, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import ExportPanel from '@/components/ExportPanel'

export const metadata = { title: 'ייצוא לרואה חשבון' }
export const dynamic = 'force-dynamic'

/** שנים-עשר החודשים האחרונים, החדש קודם. */
function recentPeriods(count = 12): string[] {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
  })
}

export default async function ExportsPage() {
  await requireUser('admin')
  const db = await getDb()

  const periods = recentPeriods()

  // מסמך מאושר תמיד נושא תאריך — חוסר תאריך הוא דגל חוסם שמונע
  // אישור — ולכן אפשר לקבץ אותם לפי חודש בלי לאבד אף אחד.
  const counts = await db
    .select({
      period: sql<string>`substr(${schema.documents.docDate}, 1, 7)`,
      n: sql<number>`count(*)::int`,
    })
    .from(schema.documents)
    .where(and(eq(schema.documents.status, 'approved'), like(schema.documents.docDate, '20%')))
    .groupBy(sql`substr(${schema.documents.docDate}, 1, 7)`)

  const approvedByPeriod = new Map(counts.map((r) => [r.period, r.n]))

  // הממתינים נספרים בלי חלוקה לחודשים, וזו לא עצלות: מסמך נתקע
  // בבדיקה בדיוק כשלא זוהה לו תאריך, ואז אין לו חודש לשייך אליו.
  // ספירה לפי חודש הייתה מחמיצה בשיטתיות את מי שהאזהרה נועדה לו.
  const waiting = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.documents)
    .where(inArray(schema.documents.status, ['pending', 'review']))

  return (
    <div>
      <h1 className="text-xl font-bold">ייצוא לרואה חשבון</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        חבילה אחת לחודש: המסמכים בשמות קריאים, וגיליון מרוכז עם כל השדות. נכנסים רק
        מסמכים מאושרים.
      </p>

      <ExportPanel
        waiting={waiting[0]?.n ?? 0}
        periods={periods.map((p) => ({ period: p, approved: approvedByPeriod.get(p) ?? 0 }))}
      />
    </div>
  )
}

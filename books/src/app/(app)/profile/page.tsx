import Link from 'next/link'
import { desc, eq, sql } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import DocumentList from '@/components/DocumentList'

export const metadata = { title: 'הפרופיל שלי' }
export const dynamic = 'force-dynamic'

const ROLE_LABEL: Record<string, string> = { admin: 'מנהל', uploader: 'מעלה מסמכים' }

const ROLE_EXPLAIN: Record<string, string> = {
  admin: 'אתם רואים הכול, מאשרים מסמכים, ומנהלים ספקים, לקוחות והגדרות.',
  uploader: 'אתם מעלים מסמכים ורואים את רשימת החודש. אישור מסמכים שמור למנהל.',
}

export default async function ProfilePage() {
  const me = await requireUser()
  const db = await getDb()

  const [counts, recent] = await Promise.all([
    db
      .select({
        uploads: sql<number>`count(*) filter (where ${schema.documents.uploadedBy} = ${me.uid})::int`,
        approvals: sql<number>`count(*) filter (where ${schema.documents.reviewedBy} = ${me.uid} and ${schema.documents.status} = 'approved')::int`,
      })
      .from(schema.documents),
    db
      .select()
      .from(schema.documents)
      .where(eq(schema.documents.uploadedBy, me.uid))
      .orderBy(desc(schema.documents.createdAt))
      .limit(20),
  ])

  const stats = counts[0] ?? { uploads: 0, approvals: 0 }

  return (
    <div>
      <h1 className="text-xl font-bold">הפרופיל שלי</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        מה עבר דרככם במערכת, ומה ההרשאה שלכם.
      </p>

      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="num flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-steel-soft text-lg font-bold text-steel">
            {me.email.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="truncate font-bold" dir="ltr">
              {me.email}
            </div>
            <div className="mt-0.5 text-sm text-muted">
              <span className="rounded-full bg-action-soft px-2.5 py-0.5 text-xs font-bold text-action">
                {ROLE_LABEL[me.role] ?? me.role}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{ROLE_EXPLAIN[me.role]}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="text-sm font-semibold text-muted">מסמכים שהעליתם</div>
          <div className="num mt-1 text-2xl font-bold">{stats.uploads}</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="text-sm font-semibold text-muted">מסמכים שאישרתם</div>
          <div className="num mt-1 text-2xl font-bold text-ok">{stats.approvals}</div>
        </div>
      </div>

      <h2 className="mt-6 mb-3 font-bold">ההעלאות האחרונות שלכם</h2>
      {recent.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold">עוד לא העליתם מסמכים</p>
          <Link
            href="/upload"
            className="mt-4 inline-block rounded-xl bg-action px-5 py-3 font-bold text-white"
          >
            העלאת מסמך
          </Link>
        </div>
      ) : (
        <DocumentList docs={recent} linkRows={me.role === 'admin'} />
      )}
    </div>
  )
}

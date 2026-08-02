import { sql, eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { requireUser } from '@/lib/session'
import UsersPanel, { type UserRow } from '@/components/UsersPanel'

export const metadata = { title: 'ניהול משתמשים' }
export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const me = await requireUser('admin')
  const db = await getDb()

  // ספירות בשאילתה אחת לכל סוג, ולא שאילתה לכל משתמש.
  const [rows, uploads, approvals] = await Promise.all([
    db.select().from(schema.users).orderBy(schema.users.email),
    db
      .select({ id: schema.documents.uploadedBy, n: sql<number>`count(*)::int` })
      .from(schema.documents)
      .groupBy(schema.documents.uploadedBy),
    db
      .select({ id: schema.documents.reviewedBy, n: sql<number>`count(*)::int` })
      .from(schema.documents)
      .where(eq(schema.documents.status, 'approved'))
      .groupBy(schema.documents.reviewedBy),
  ])

  const uploadBy = new Map(uploads.map((u) => [u.id, u.n]))
  const approveBy = new Map(approvals.map((u) => [u.id, u.n]))

  const users: UserRow[] = rows.map((u) => ({
    id: u.id,
    email: u.email,
    role: u.role,
    lastSeenAt: u.lastSeenAt?.toISOString() ?? null,
    uploads: uploadBy.get(u.id) ?? 0,
    approvals: approveBy.get(u.id) ?? 0,
  }))

  return (
    <div>
      <h1 className="text-xl font-bold">ניהול משתמשים</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        מי נכנס למערכת, מה הוא רשאי לעשות, וכמה מסמכים עברו דרכו.
      </p>
      <UsersPanel users={users} meId={me.uid} />
    </div>
  )
}

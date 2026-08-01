import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '@/db'
import { SESSION_COOKIE, decodeSession, type SessionPayload, type Role } from './auth'

/** קורא את המשתמש מהעוגייה. null = לא מחובר. */
export async function currentUser(): Promise<SessionPayload | null> {
  const jar = await cookies()
  return decodeSession(jar.get(SESSION_COOKIE)?.value)
}

/**
 * שער ההרשאה. נקרא בכל route handler ובכל עמוד מוגן.
 * זורק Response מוכן, כך שאי אפשר לשכוח לטפל בכישלון.
 */
export class HttpError extends Error {
  constructor(readonly status: number, readonly code: string) {
    super(code)
  }
  toResponse(): Response {
    return Response.json({ error: this.code }, { status: this.status })
  }
}

export async function requireUser(role?: Role): Promise<SessionPayload> {
  const user = await currentUser()
  if (!user) throw new HttpError(401, 'not_authenticated')
  // ההרשאה נאכפת כאן, בשרת — הסתרת כפתור בממשק אינה הרשאה.
  if (role === 'admin' && user.role !== 'admin') throw new HttpError(403, 'forbidden')
  return user
}

/** עוטף route handler ומתרגם HttpError לתשובה תקינה. */
export function handler(fn: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    try {
      return await fn(req)
    } catch (err) {
      if (err instanceof HttpError) return err.toResponse()
      console.error('[api]', err)
      return Response.json({ error: 'internal_error' }, { status: 500 })
    }
  }
}

/** מוצא או יוצר את שורת המשתמש, ומיישר את התפקיד מול הרשימה המורשית. */
export async function upsertUser(email: string, role: Role) {
  const db = await getDb()
  const normalized = email.trim().toLowerCase()

  const existing = await db.select().from(schema.users).where(eq(schema.users.email, normalized)).limit(1)
  const found = existing[0]

  if (found) {
    if (found.role !== role) {
      await db.update(schema.users).set({ role }).where(eq(schema.users.id, found.id))
    }
    await db
      .update(schema.users)
      .set({ lastSeenAt: new Date() })
      .where(eq(schema.users.id, found.id))
    return { ...found, role }
  }

  const inserted = await db
    .insert(schema.users)
    .values({ email: normalized, role, lastSeenAt: new Date() })
    .returning()

  const row = inserted[0]
  if (!row) throw new HttpError(500, 'user_create_failed')
  return row
}

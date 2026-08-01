import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core'
import * as schema from './schema'

// ============================================================
//  חיבור למסד.
//
//  בייצור: Neon דרך HTTP — מתאים ל-serverless, בלי pool שנשאר
//  פתוח בין הפעלות.
//
//  בפיתוח בלי DATABASE_URL: PGlite, שהוא Postgres שמורץ בתוך
//  התהליך. אותו דיאלקט, אותן מיגרציות, בלי להתקין שרת. זה מה
//  שמאפשר להריץ ולבדוק את המערכת מקומית מהרגע הראשון.
// ============================================================

// טיפוס אחד לשני המימושים. בלי זה כל קריאה ל-db מקבלת איחוד
// טיפוסים ששובר את החתימות (למשל .returning עם ארגומנט).
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>

async function create(): Promise<Db> {
  const url = process.env.DATABASE_URL

  if (url) {
    const { neon } = await import('@neondatabase/serverless')
    const { drizzle } = await import('drizzle-orm/neon-http')
    return drizzle(neon(url), { schema }) as unknown as Db
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'DATABASE_URL חסר. בייצור חייבים מסד אמיתי — PGlite הוא לפיתוח בלבד.',
    )
  }

  const { PGlite } = await import('@electric-sql/pglite')
  const { drizzle } = await import('drizzle-orm/pglite')
  const client = new PGlite('./.pglite')
  const db = drizzle(client, { schema }) as unknown as Db
  await ensureLocalSchema(client)
  return db
}

// PGlite מתחיל ריק בכל מכונה חדשה. במקום להריץ drizzle-kit,
// מיישמים את ה-DDL פעם אחת — מספיק לפיתוח, ולא נוגע בייצור.
async function ensureLocalSchema(client: { exec: (sql: string) => Promise<unknown> }) {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const sql = await readFile(join(process.cwd(), 'drizzle', 'local-schema.sql'), 'utf8')
  await client.exec(sql)
}

// הסינגלטון יושב על globalThis ולא על משתנה מודול: ב-Next בפיתוח
// אותו קובץ נטען כמה פעמים (RSC, route handler, HMR), וכל טעינה
// הייתה פותחת מופע PGlite נפרד על אותה תיקייה — כתיבה מצד אחד
// שלא נראית מהצד השני.
const globalRef = globalThis as unknown as { __alegriaDb?: Promise<Db> }

export function getDb(): Promise<Db> {
  if (!globalRef.__alegriaDb) globalRef.__alegriaDb = create()
  return globalRef.__alegriaDb
}

export { schema }

import { createHash } from 'node:crypto'
import { EXT_BY_MIME } from './constants'
import { withBase } from './url'

// ============================================================
//  אחסון הקבצים המקוריים.
//
//  שתי מימושים מאחורי ממשק אחד:
//  · Vercel Blob בחנות פרטית — בייצור. גישה רק דרך קישור חתום.
//  · מערכת קבצים מקומית — בפיתוח, כדי שהמערכת תרוץ ותיבדק
//    בלי חשבון וטוקן.
//
//  הנתיב מבוסס-תוכן: raw/YYYY-MM/<sha256>.<ext>. שתי תוצאות
//  שלא צריך לתכנת בנפרד — אותו קובץ בדיוק לעולם לא נכתב פעמיים,
//  ושינוי בייט אחד מייצר נתיב אחר ולכן ניתן לגילוי.
// ============================================================

export interface StoredObject {
  path: string
  sha256: string
  sizeBytes: number
}

export function sha256Of(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex')
}

export function objectPath(sha256: string, mime: string, when = new Date()): string {
  const ym = `${when.getUTCFullYear()}-${String(when.getUTCMonth() + 1).padStart(2, '0')}`
  const ext = EXT_BY_MIME[mime] ?? 'bin'
  return `raw/${ym}/${sha256}.${ext}`
}

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

/** נזרקת כשאין חנות Blob בייצור. נתפסת ומתורגמת לתשובת API. */
export class StorageNotConfigured extends Error {
  readonly code = 'storage_not_configured'
  constructor() {
    super('BLOB_READ_WRITE_TOKEN חסר. בייצור חייבים חנות Blob פרטית.')
  }
}

/**
 * הנפילה חזרה לדיסק המקומי היא מנגנון פיתוח בלבד. בייצור מערכת
 * הקבצים של הפונקציה לקריאה בלבד, וגם אם לא הייתה — היא נמחקת
 * בין הפעלות. עדיף להיכשל ברור מלכתוב קובץ שייעלם.
 */
function assertLocalAllowed(): void {
  if (process.env.NODE_ENV === 'production') throw new StorageNotConfigured()
}

/** כותב פעם אחת. אם הנתיב כבר קיים, לא כותב שוב. */
export async function putObject(
  bytes: Uint8Array,
  mime: string,
): Promise<StoredObject> {
  const sha256 = sha256Of(bytes)
  const path = objectPath(sha256, mime)
  const stored: StoredObject = { path, sha256, sizeBytes: bytes.byteLength }

  if (useBlob()) {
    const { put, head } = await import('@vercel/blob')
    const existing = await head(path).catch(() => null)
    if (existing) return stored
    await put(path, Buffer.from(bytes), {
      access: 'private',
      contentType: mime,
      addRandomSuffix: false,
    })
    return stored
  }

  assertLocalAllowed()
  const { writeFile, mkdir, access } = await import('node:fs/promises')
  const { join, dirname } = await import('node:path')
  const full = join(localRoot(), path)
  const exists = await access(full).then(() => true, () => false)
  if (!exists) {
    await mkdir(dirname(full), { recursive: true })
    await writeFile(full, bytes)
  }
  return stored
}

/**
 * כתיבה לנתיב נתון, לתוצרים שאינם מסמכי מקור — חבילת הייצוא
 * החודשית. לא מבוסס-תוכן: הנתיב נקבע מראש כדי שאפשר יהיה
 * להוריד את אותה חבילה שוב, ורואה החשבון יאבד את הקישור.
 */
export async function putBytes(
  path: string,
  bytes: Uint8Array,
  mime: string,
): Promise<void> {
  if (useBlob()) {
    const { put } = await import('@vercel/blob')
    await put(path, Buffer.from(bytes), {
      access: 'private',
      contentType: mime,
      addRandomSuffix: false,
      allowOverwrite: true,
      multipart: bytes.byteLength > 8 * 1024 * 1024,
    })
    return
  }
  assertLocalAllowed()
  const { writeFile, mkdir } = await import('node:fs/promises')
  const { join, dirname } = await import('node:path')
  const full = join(localRoot(), path)
  await mkdir(dirname(full), { recursive: true })
  await writeFile(full, bytes)
}

export async function getObjectBytes(path: string): Promise<Uint8Array> {
  if (useBlob()) {
    const { get } = await import('@vercel/blob')
    const result = await get(path, { access: 'private', useCache: false })
    if (!result) throw new Error('blob_not_found')
    if (result.statusCode !== 200) throw new Error(`blob_get_${result.statusCode}`)
    const buf = await new Response(result.stream).arrayBuffer()
    return new Uint8Array(buf)
  }
  assertLocalAllowed()
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  return new Uint8Array(await readFile(join(localRoot(), path)))
}

/**
 * קישור זמני לצפייה במסמך.
 * בייצור: URL חתום מ-Blob שפג תוקפו.
 * בפיתוח: מסלול פנימי שעובר דרך בדיקת ההרשאה של המערכת.
 */
export async function signedViewUrl(path: string, ttlSeconds = 300): Promise<string> {
  if (useBlob()) {
    const { issueSignedToken, presignUrl } = await import('@vercel/blob')
    const validUntil = Date.now() + ttlSeconds * 1000
    const token = await issueSignedToken({ pathname: path, operations: ['get'], validUntil })
    const { presignedUrl } = await presignUrl(token, {
      operation: 'get',
      pathname: path,
      access: 'private',
    })
    return presignedUrl
  }
  return withBase(`/api/files/${encodeURIComponent(path)}`)
}

/**
 * מחיקת כל הקבצים תחת קידומת. משמש רק את פעולת האיפוס היזומה
 * של המנהל — אין בקוד שום מסלול שמוחק קבצים מעצמו.
 */
export async function deletePrefix(prefix: string): Promise<number> {
  if (useBlob()) {
    const { list, del } = await import('@vercel/blob')
    let cursor: string | undefined
    let removed = 0
    do {
      const page = await list({ prefix, cursor, limit: 1000 })
      if (page.blobs.length > 0) {
        await del(page.blobs.map((b) => b.url))
        removed += page.blobs.length
      }
      cursor = page.cursor
    } while (cursor)
    return removed
  }

  assertLocalAllowed()
  const { rm } = await import('node:fs/promises')
  const { join } = await import('node:path')
  await rm(join(localRoot(), prefix), { recursive: true, force: true })
  return 0
}

function localRoot(): string {
  return process.env.LOCAL_STORAGE_DIR ?? '.storage'
}

export const storageBackend = (): 'blob' | 'local' => (useBlob() ? 'blob' : 'local')

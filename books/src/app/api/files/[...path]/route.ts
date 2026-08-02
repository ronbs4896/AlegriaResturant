import { getObjectBytes, storageBackend } from '@/lib/storage'
import { handler, requireUser } from '@/lib/session'

export const runtime = 'nodejs'

// הגשת קובץ בפיתוח (אחסון מקומי). בייצור הקישור החתום של Blob
// מחליף את המסלול הזה — אבל גם כאן ההרשאה נבדקת, כדי שלא
// ייווצר הרגל של נתיב פתוח.
export const GET = handler(async (req) => {
  await requireUser()
  if (storageBackend() === 'blob') {
    return Response.json({ error: 'use_signed_url' }, { status: 400 })
  }

  const url = new URL(req.url)
  const path = decodeURIComponent(url.pathname.replace(/^\/api\/files\//, ''))

  // חוסם יציאה מהתיקייה גם אם מישהו יבנה נתיב בעצמו.
  // raw = מסמכי מקור, exports = חבילות חודשיות.
  const allowed = path.startsWith('raw/') || path.startsWith('exports/')
  if (path.includes('..') || !allowed) {
    return Response.json({ error: 'bad_path' }, { status: 400 })
  }

  const TYPES: Record<string, string> = {
    pdf: 'application/pdf',
    png: 'image/png',
    zip: 'application/zip',
  }

  try {
    const bytes = await getObjectBytes(path)
    const ext = path.split('.').pop() ?? ''
    return new Response(Buffer.from(bytes), {
      headers: { 'Content-Type': TYPES[ext] ?? 'image/jpeg', 'Cache-Control': 'private, max-age=300' },
    })
  } catch {
    return Response.json({ error: 'not_found' }, { status: 404 })
  }
})

import { after } from 'next/server'
import { verifyWebhook } from '@/lib/webhook'
import { parseInbound, ingestEmail } from '@/lib/inbound'
import { processDocument } from '@/lib/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 300

// ============================================================
//  קליטת מייל נכנס.
//
//  הכתובת הזו חשופה לאינטרנט מעצם טבעה, ולכן היא מאמתת חתימה
//  לפני שהיא נוגעת במשהו. בלי סוד מוגדר היא מסרבת לקלוט —
//  עדיף שהקליטה לא תעבוד מאשר שתהיה פתוחה לכל אחד.
//
//  התשובה חוזרת מיד. חילוץ השדות רץ אחריה, כי ספק webhook
//  שמחכה יותר מכמה שניות מסמן כישלון ושולח שוב.
// ============================================================
export async function POST(req: Request): Promise<Response> {
  // הגוף נקרא כמחרוזת גולמית. parse ואז stringify משנה רווחים
  // וסדר מפתחות, והחתימה נשברת.
  const raw = await req.text()

  const check = verifyWebhook(raw, req.headers, process.env.INBOUND_WEBHOOK_SECRET)
  if (!check.ok) {
    if (check.reason === 'no_secret') {
      console.error('[inbound] INBOUND_WEBHOOK_SECRET חסר — הקליטה מושבתת')
      return Response.json({ error: 'not_configured' }, { status: 503 })
    }
    console.warn('[inbound] חתימה נדחתה:', check.reason)
    return Response.json({ error: check.reason }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return Response.json({ error: 'bad_json' }, { status: 400 })
  }

  const email = parseInbound(payload)
  // אירוע שאינו מייל נכנס מקבל 200 בכוונה. 4xx היה גורם לספק
  // לנסות שוב ושוב אירוע שלעולם לא נטפל בו.
  if (!email) return Response.json({ ok: true, ignored: true })

  try {
    const outcome = await ingestEmail(email)
    console.log(
      `[inbound] ${email.from} · ${outcome.status} · נשמרו ${outcome.documentIds.length}, דולגו ${outcome.skipped}`,
    )

    for (const id of outcome.documentIds) {
      after(async () => {
        try {
          await processDocument(id)
        } catch (err) {
          console.error('[inbound] חילוץ נכשל', id, err)
        }
      })
    }

    return Response.json({ ok: true, ...outcome })
  } catch (err) {
    console.error('[inbound] קליטה נכשלה', email.emailId, err)
    // 500 מבקש מהספק לנסות שוב. סימון "טופל" נכתב רק בסיום
    // מוצלח, כך שניסיון חוזר לא ייצור כפילות.
    return Response.json({ error: 'ingest_failed' }, { status: 500 })
  }
}

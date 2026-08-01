// ============================================================
//  שליחת מייל דרך Resend, ב-fetch ישיר ובלי SDK — בדיוק כמו
//  באתר השיווק, כדי שיהיה מקום אחד להבין.
//
//  בפיתוח בלי מפתח: הקוד נכתב ללוג ולא נשלח, כדי שאפשר יהיה
//  להתחבר מקומית בלי חשבון.
// ============================================================
export interface MailResult {
  ok: boolean
  devCode?: string
  error?: string
}

export async function sendLoginCode(email: string, code: string): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.AUTH_FROM_EMAIL

  if (!apiKey || !from) {
    console.warn(`[auth] אין RESEND_API_KEY — קוד ההתחברות ל-${email}: ${code}`)
    return { ok: true, devCode: code }
  }

  const html = loginEmailHtml(code)
  const text = `קוד ההתחברות שלך למערכת החשבוניות של אלגריה: ${code}\nהקוד תקף ל-15 דקות.`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `קייטרינג אלגריה <${from}>`,
        to: [email],
        subject: `${code} — קוד כניסה למערכת החשבוניות`,
        html,
        text,
      }),
    })
    if (!res.ok) {
      return { ok: false, error: `resend_${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    console.error('[auth] שליחת מייל נכשלה', err)
    return { ok: false, error: 'send_failed' }
  }
}

// הקוד בנושא ההודעה, לא רק בגוף — כך רואים אותו בהתראה של
// הטלפון בלי לפתוח את המייל.
function loginEmailHtml(code: string): string {
  return `<!doctype html>
<html lang="he" dir="rtl"><body style="margin:0;background:#F2EADE;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:440px;background:#FBF8F3;border-radius:16px;padding:32px">
        <tr><td style="font-size:13px;color:#8A817A;padding-bottom:8px">קייטרינג אלגריה · מערכת חשבוניות</td></tr>
        <tr><td style="font-size:19px;font-weight:bold;color:#2E2A27;padding-bottom:20px">קוד הכניסה שלך</td></tr>
        <tr><td align="center" style="padding:16px 0">
          <div style="font-family:'Courier New',monospace;font-size:38px;font-weight:bold;
                      letter-spacing:8px;color:#2E2A27;direction:ltr">${code}</div>
        </td></tr>
        <tr><td style="font-size:14px;color:#635C55;padding-top:20px;line-height:1.7">
          הקוד תקף ל-15 דקות ולשימוש אחד.<br>
          אם לא ביקשת להתחבר, אפשר להתעלם מההודעה.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

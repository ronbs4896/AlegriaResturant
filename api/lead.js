// ============================================================
//  Vercel Serverless Function — /api/lead
//  שולח מייל על כל ליד שנשלח מטופס "קבלו הצעת מחיר", דרך Resend.
//  ה-API key נשאר בשרת בלבד (משתני סביבה) — לעולם לא בצד-לקוח.
//
//  משתני סביבה (Vercel → Settings → Environment Variables):
//    RESEND_API_KEY   — המפתח מ-resend.com (חובה, סוד)
//    LEAD_TO_EMAIL    — לאן הלידים נשלחים (חובה; אפשר כמה, מופרד בפסיקים)
//    LEAD_FROM_EMAIL  — כתובת השולח (רשות; ברירת מחדל onboarding@resend.dev
//                       לבדיקה. לאחר אימות הדומיין ב-Resend: leads@alegriacatering.co.il)
// ============================================================

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  const from = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev'
  if (!apiKey || !to) {
    // התשתית עוד לא הוגדרה — לא מפילים את הטופס, הליד עדיין הולך לוואטסאפ
    return res.status(503).json({ error: 'email_not_configured' })
  }

  let data = req.body
  if (typeof data === 'string') {
    try { data = JSON.parse(data) } catch { data = {} }
  }
  data = data || {}
  const { name = '', phone = '', service = '', size = '', when = '', city = '', notes = '' } = data

  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'missing_name_or_phone' })
  }

  const rows = [
    ['שם', name],
    ['טלפון', phone],
    ['סוג פנייה', service],
    ['כמות משוערת', size],
    ['מסגרת זמן', when],
    ['עיר', city],
    ['הערות', notes],
  ].filter(([, v]) => v && String(v).trim())

  const html = `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2A2624;max-width:520px">
    <h2 style="color:#B4511E;margin:0 0 12px">ליד חדש מהאתר 🎉</h2>
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px;font-weight:bold;background:#F2EADE;border:1px solid #eadfce;white-space:nowrap">${k}</td><td style="padding:8px 12px;border:1px solid #eadfce">${escapeHtml(v)}</td></tr>`
        )
        .join('')}
    </table>
    <p style="margin-top:16px;color:#6B625C;font-size:13px">התקבל דרך www.alegriacatering.co.il</p>
  </div>`

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `קייטרינג אלגריה <${from}>`,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject: `ליד חדש: ${name}${service ? ' · ' + service : ''}`,
        html,
        text,
      }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => '')
      return res.status(502).json({ error: 'resend_failed', detail })
    }
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'send_error' })
  }
}

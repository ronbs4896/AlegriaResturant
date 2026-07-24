// ============================================================
//  Vercel Serverless Function — /api/lead
//  שולח מייל מעוצב על כל ליד שנשלח מטופס "קבלו הצעת מחיר", דרך Resend.
//  ה-API key נשאר בשרת בלבד (משתני סביבה) — לעולם לא בצד-לקוח.
//
//  משתני סביבה (Vercel → Settings → Environment Variables):
//    RESEND_API_KEY   — המפתח מ-resend.com (חובה, סוד)
//    LEAD_TO_EMAIL    — לאן הלידים נשלחים (חובה; אפשר כמה, מופרד בפסיקים)
//    LEAD_FROM_EMAIL  — כתובת השולח (רשות; ברירת מחדל onboarding@resend.dev
//                       לבדיקה. לאחר אימות הדומיין ב-Resend: leads@alegriacatering.co.il)
// ============================================================

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// טלפון ישראלי → פורמט בינלאומי ל-wa.me (0529876543 → 972529876543)
function phoneToIntl(p = '') {
  const d = String(p).replace(/\D/g, '')
  return d.startsWith('0') ? '972' + d.slice(1) : d
}

// בונה את המייל (נושא + HTML + טקסט). מיוצא כדי שאפשר להציג תצוגה מקדימה.
export function buildLeadEmail(data = {}) {
  const {
    name = '', phone = '', service = '', size = '',
    when = '', city = '', notes = '', source = '',
  } = data

  const sourceLabel = (source && String(source).trim()) || 'טופס באתר'
  const subject = `ליד חדש מהאתר · ${sourceLabel}`
  const waPhone = phoneToIntl(phone)

  // רק שדות שמולאו (שם וטלפון מופיעים בבלוק העליון, לא בטבלה)
  const rows = [
    ['סוג פנייה', service],
    ['כמות משוערת', size],
    ['מסגרת זמן', when],
    ['עיר', city],
    ['הערות', notes],
  ].filter(([, v]) => v && String(v).trim())

  const btn = (href, bg, label) =>
    `<a href="${href}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;font-weight:bold;padding:11px 20px;border-radius:10px;font-size:14px">${label}</a>`

  const html = `<div style="background:#F2EADE;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
  <table dir="rtl" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 34px rgba(42,33,27,0.14)">
    <tr><td style="background:#2A2624;padding:22px 28px">
      <div style="color:#C89B3C;font-size:13px;font-weight:bold;letter-spacing:.3px">קייטרינג אלגריה</div>
      <div style="color:#ffffff;font-size:22px;font-weight:bold;margin-top:5px">ליד חדש מהאתר 🎉</div>
      <div style="color:#B5AAA2;font-size:13px;margin-top:7px">מקור: ${escapeHtml(sourceLabel)}</div>
    </td></tr>
    <tr><td style="padding:24px 28px 8px">
      <div style="font-size:20px;font-weight:bold;color:#2A2624">${escapeHtml(name)}</div>
      <div style="direction:ltr;text-align:right;color:#6B625C;font-size:16px;margin-top:3px">${escapeHtml(phone)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px"><tr>
        <td style="padding-left:8px">${btn(`tel:${escapeHtml(phone)}`, '#B4511E', '📞 חייג עכשיו')}</td>
        <td>${btn(`https://wa.me/${waPhone}`, '#25D366', '💬 וואטסאפ')}</td>
      </tr></table>
    </td></tr>
    ${
      rows.length
        ? `<tr><td style="padding:16px 28px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:11px 14px;background:#F7F2EA;color:#6B625C;font-weight:bold;border:1px solid #eadfce;white-space:nowrap;width:120px">${k}</td><td style="padding:11px 14px;color:#2A2624;border:1px solid #eadfce">${escapeHtml(v)}</td></tr>`
          )
          .join('')}
      </table>
    </td></tr>`
        : ''
    }
    <tr><td style="padding:16px 28px;background:#F7F2EA;color:#9a8f86;font-size:12px">
      התקבל דרך www.alegriacatering.co.il · מקור: ${escapeHtml(sourceLabel)}
    </td></tr>
  </table>
</div>`

  const text = [
    `ליד חדש מהאתר`,
    `מקור: ${sourceLabel}`,
    ``,
    `שם: ${name}`,
    `טלפון: ${phone}`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join('\n')

  return { subject, html, text }
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
    return res.status(503).json({ error: 'email_not_configured' })
  }

  let data = req.body
  if (typeof data === 'string') {
    try { data = JSON.parse(data) } catch { data = {} }
  }
  data = data || {}
  if (!String(data.name || '').trim() || !String(data.phone || '').trim()) {
    return res.status(400).json({ error: 'missing_name_or_phone' })
  }

  const { subject, html, text } = buildLeadEmail(data)

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `קייטרינג אלגריה <${from}>`,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject,
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

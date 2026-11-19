// ============================================================
//  שליחת ליד מטופס שמוטמע בעמוד (לא מהמודאל).
//
//  המודאל שולח ל-/api/lead בלי לחכות, כי הוא תמיד פותח וואטסאפ
//  עם כל הפרטים — הליד מגיע בכל מקרה. טופס מוטמע לא פותח חלון
//  בלי שביקשו ממנו, ולכן הוא מחכה לתשובה: אם השרת לא קיבל את
//  הליד, המבקר רואה את זה ומקבל קישור וואטסאפ עם ההודעה מוכנה.
// ============================================================
import { trackLead } from './analytics.js'
import { buildLeadMessage, buildWaLink } from './whatsapp.js'

// אותו כלל כמו במודאל, כדי שאותו מספר לא יתקבל במקום אחד וייפסל בשני
export function phoneError(value = '') {
  return /^0\d{1,2}-?\d{7}$|^0\d{9}$/.test(value.replace(/[\s-]/g, ''))
    ? ''
    : 'נא למלא מספר טלפון תקין'
}

export function nameError(value = '') {
  return value.trim() ? '' : 'נא למלא שם'
}

/**
 * @returns {Promise<{ ok: boolean, waUrl: string }>}
 *   ok=false כשהשרת לא אישר קבלה. waUrl תמיד מוכן, להמשך בוואטסאפ.
 */
export async function sendLead(form, source) {
  const waUrl = buildWaLink(buildLeadMessage(form))
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source }),
    })
    if (!res.ok) return { ok: false, waUrl }
    trackLead({ service: form.service, city: form.city, source })
    return { ok: true, waUrl }
  } catch {
    return { ok: false, waUrl }
  }
}

// ============================================================
//  הסכמה לעוגיות מדידה ושיווק (פיקסל Meta, Google).
//  ברירת המחדל: הכלים פועלים עד שהגולש בוחר "רק הכרחיות".
//  הבחירה נשמרת בדפדפן של הגולש בלבד.
// ============================================================
const KEY = 'alegria-consent'

export function getConsent() {
  try { return window.localStorage.getItem(KEY) } catch { return null }
}

export function setConsent(value) {
  try { window.localStorage.setItem(KEY, value) } catch { /* דפדפן שחוסם אחסון: הבחירה תחול רק בביקור הזה */ }
  window.dispatchEvent(new CustomEvent('alegria-consent', { detail: value }))
}

export function marketingAllowed() {
  return getConsent() !== 'essential'
}

export function openCookieSettings() {
  window.dispatchEvent(new Event('alegria-cookie-settings'))
}

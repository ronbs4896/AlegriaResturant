// ============================================================
//  שכבת מדידה אחת לכל האתר.
//  תומכת ב: Google tag (gtag.js) עבור GA4 ו-Google Ads,
//  Google Tag Manager (קונטיינר), ו-Meta (Facebook) Pixel.
//
//  הכל env-driven וכבוי כברירת מחדל — האתר לא טוען שום סקריפט
//  מדידה עד שמוגדר מזהה. הדלקה: Vercel → Settings → Environment
//  Variables → הוסיפו את המזהים הרלוונטיים → Redeploy.
//
//    VITE_GA4_ID         = G-XXXXXXXXXX     · Google Analytics 4
//        (analytics.google.com → Admin → Data streams → מזהה המדידה)
//    VITE_GOOGLE_ADS_ID  = AW-XXXXXXXXX     · Google tag / המרות Google Ads
//        (ads.google.com → Tools → Conversions / Google tag)
//    VITE_GTM_ID         = GTM-XXXXXXX      · Google Tag Manager (רשות)
//        (tagmanager.google.com → מזהה הקונטיינר)
//    VITE_META_PIXEL_ID  = 15 ספרות         · Meta / Facebook Pixel
//        (business.facebook.com → Events Manager → Data sources → Pixel ID)
//
//  אירועים שנשלחים אוטומטית:
//    • page_view / PageView — בכל מעבר עמוד (SPA), דרך AnalyticsTracker
//    • generate_lead / Lead — בכל שליחת טופס הצעת מחיר (LeadModal)
//
//  ⚠️ הימנעו מספירה כפולה: אם משתמשים ב-GTM לניהול GA4/Pixel,
//     אל תגדירו גם את VITE_GA4_ID / VITE_META_PIXEL_ID ישירות —
//     בחרו מסלול אחד (ישיר או דרך GTM), לא את שניהם לאותו תג.
// ============================================================
import { site } from '../data/site.js'

const { ga4Id, googleAdsId, gtmId, metaPixelId } = site.analytics
let initialized = false

function loadScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

// --- Google tag (gtag.js) — משרת גם GA4 וגם Google Ads מטעינה אחת ---
function initGoogleTag() {
  if (!ga4Id && !googleAdsId) return
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id || googleAdsId}`)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  // page_view ידני (send_page_view:false) — נשלח דרך trackPageview בכל ניווט
  if (ga4Id) window.gtag('config', ga4Id, { send_page_view: false })
  if (googleAdsId) window.gtag('config', googleAdsId)
}

// --- Google Tag Manager — קונטיינר (רשות) ---
function initGTM() {
  if (!gtmId) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`)
}

// --- Meta (Facebook) Pixel ---
function initMetaPixel() {
  if (!metaPixelId) return
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
    if (!f._fbq) f._fbq = n
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []
    t = b.createElement(e); t.async = !0; t.src = v
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  window.fbq('init', metaPixelId)
  // ה-PageView הראשוני נשלח דרך trackPageview (מונע ספירה כפולה)
  /* eslint-enable */
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  initGoogleTag()
  initGTM()
  initMetaPixel()
}

// מעבר עמוד — נקרא בכל שינוי route ב-SPA
export function trackPageview(path) {
  if (typeof window === 'undefined') return
  if (window.gtag && ga4Id) window.gtag('event', 'page_view', { page_path: path })
  if (window.fbq && metaPixelId) window.fbq('track', 'PageView')
  if (window.dataLayer && gtmId) window.dataLayer.push({ event: 'page_view', page_path: path })
}

// ליד — נקרא בשליחת טופס הצעת המחיר
export function trackLead(detail = {}) {
  if (typeof window === 'undefined') return
  if (window.gtag && ga4Id) window.gtag('event', 'generate_lead', detail)
  if (window.gtag && googleAdsId) window.gtag('event', 'conversion', { send_to: googleAdsId, ...detail })
  if (window.fbq && metaPixelId) window.fbq('track', 'Lead', detail)
  if (window.dataLayer && gtmId) window.dataLayer.push({ event: 'generate_lead', ...detail })
}

// פנייה ישירה — וואטסאפ / טלפון. Meta: אירוע Contact הסטנדרטי
// (method: 'whatsapp' | 'phone') כדי ש-Meta ייעל להמרות פנייה.
export function trackContact(method, detail = {}) {
  if (typeof window === 'undefined') return
  const params = { method, ...detail }
  if (window.gtag && ga4Id) window.gtag('event', 'contact', params)
  if (window.fbq && metaPixelId) window.fbq('track', 'Contact', params)
  if (window.dataLayer && gtmId) window.dataLayer.push({ event: 'contact', ...params })
}

// צפייה בתוכן — מאמר בלוג / עמוד שירות. Meta: ViewContent (לרימרקטינג).
export function trackViewContent(detail = {}) {
  if (typeof window === 'undefined') return
  if (window.gtag && ga4Id) window.gtag('event', 'view_item', detail)
  if (window.fbq && metaPixelId) window.fbq('track', 'ViewContent', detail)
  if (window.dataLayer && gtmId) window.dataLayer.push({ event: 'view_content', ...detail })
}

// אירוע כללי — לשימוש עתידי (אירועים מותאמים אישית)
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  if (window.gtag && (ga4Id || googleAdsId)) window.gtag('event', name, params)
  if (window.fbq && metaPixelId) window.fbq('trackCustom', name, params)
  if (window.dataLayer && gtmId) window.dataLayer.push({ event: name, ...params })
}

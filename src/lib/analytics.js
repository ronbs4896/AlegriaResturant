// ============================================================
//  שכבת מדידה אחת. no-op עד שמדביקים מזהים ב-site.analytics.
// ============================================================
import { site } from '../data/site.js'

let initialized = false

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  const { ga4Id } = site.analytics
  if (ga4Id) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', ga4Id, { send_page_view: false })
  }
  const { metaPixelId } = site.analytics
  if (metaPixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', metaPixelId); window.fbq('track', 'PageView')
    /* eslint-enable */
  }
}

export function trackPageview(path) {
  if (typeof window === 'undefined') return
  if (window.gtag && site.analytics.ga4Id) {
    window.gtag('event', 'page_view', { page_path: path })
  }
  if (window.fbq && site.analytics.metaPixelId) {
    window.fbq('track', 'PageView')
  }
}

export function trackLead(detail = {}) {
  if (typeof window === 'undefined') return
  if (window.gtag && site.analytics.ga4Id) {
    window.gtag('event', 'generate_lead', detail)
  }
  if (window.fbq && site.analytics.metaPixelId) {
    window.fbq('track', 'Lead')
  }
}

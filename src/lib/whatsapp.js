// ============================================================
//  בניית קישור וואטסאפ מקודד. ליד = הודעת וואטסאפ מובנית.
// ============================================================
import { site } from '../data/site.js'

export function buildWaLink(message) {
  const text = encodeURIComponent(message || site.whatsapp.defaultMessage)
  return `https://wa.me/${site.whatsapp.number}?text=${text}`
}

// בונה הודעת ליד מסודרת מבחירות האשף
export function buildLeadMessage({ service, size, when, notes, name, phone, city }) {
  const lines = ['היי אלגריה, הגעתי דרך האתר 🙂', '']
  if (service) lines.push(`• סוג פנייה: ${service}`)
  if (size) lines.push(`• כמות משוערת: ${size}`)
  if (when) lines.push(`• מסגרת זמן: ${when}`)
  if (city) lines.push(`• עיר: ${city}`)
  if (name) lines.push(`• שם: ${name}`)
  if (phone) lines.push(`• טלפון: ${phone}`)
  if (notes) lines.push(`• הערות: ${notes}`)
  lines.push('', 'אשמח לקבל הצעת מחיר. תודה!')
  return lines.join('\n')
}

export function openWhatsApp(message) {
  window.open(buildWaLink(message), '_blank', 'noopener,noreferrer')
}

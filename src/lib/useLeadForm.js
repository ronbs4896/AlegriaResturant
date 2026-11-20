// ============================================================
//  טופס ליד: אוסף את השדות מהטופס, שולח ל-/api/lead (מייל דרך Resend),
//  מציג מסך תודה ומדווח ליד לפיקסל. אם השליחה נכשלת, הליד לא הולך
//  לאיבוד: הפונה מועבר לוואטסאפ עם כל הפרטים כבר כתובים.
// ============================================================
import { useCallback, useEffect, useRef, useState } from 'react'
import { buildLeadMessage, buildWaLink } from './whatsapp.js'
import { trackLead } from './analytics.js'
import { playThanks } from './motion.js'

const KEYS = { name: 'name', phone: 'phone', city: 'city', place: 'city', guests: 'size', diners: 'size', when: 'when', date: 'when', time: 'when', notes: 'notes' }

// שם קריא לשדה: הטקסט של התווית, או הכותרת של קבוצת הבחירה
function labelOf(el) {
  if (/[\u0590-\u05FF]/.test(el.name)) return el.name
  const box = (el.type === 'checkbox' || el.type === 'radio') ? el.closest('fieldset') : el.closest('label')
  const src = box && (box.querySelector('legend') || box)
  const txt = src ? (src.innerText || src.textContent || '').split('\n')[0] : ''
  return txt.replace(/\*/g, '').trim() || el.name
}

function pick(fields) {
  const out = { name: '', phone: '', city: '', size: '', when: [], notes: [] }
  for (const [label, raw, key] of fields) {
    const v = String(raw || '').trim()
    if (!v) continue
    const l = label || ''
    const k = KEYS[key]
    if (k === 'phone' || l.includes('טלפון') || l.includes('נייד')) out.phone = v
    else if (k === 'name' || l.includes('איש קשר') || l === 'שם' || l.includes('שם מלא')) out.name = v
    else if (k === 'city' || l.includes('עיר') || l.includes('יישוב')) out.city = out.city ? `${out.city}, ${v}` : v
    else if (k === 'size' || /כמה (מנות|עובדים|אורחים|משתתפים|סועדים)/.test(l)) out.size = v
    else if (k === 'when' || /תאריך|מתי/.test(l)) out.when.push(v)
    else if (k === 'notes') out.notes.push(`הערות: ${v}`)
    else out.notes.push(`${l}: ${v}`)
  }
  return { ...out, when: out.when.join(', ') }
}

export function useLeadForm(source) {
  const [state, setState] = useState({ sending: false, sent: false })
  const formRef = useRef(null)

  const send = useCallback(async (e) => {
    if (state.sending) return
    const form = e?.currentTarget?.form || e?.currentTarget?.closest?.('form') || (e?.target && e.target.closest && e.target.closest('form'))
    if (!form) return
    if (!form.reportValidity()) return
    formRef.current = form
    // קבוצות סימון עם אותו שם מתאחדות לשורה אחת
    const groups = new Map()
    Array.from(form.elements)
      .filter((el) => el.name && !el.disabled && el.type !== 'button' && el.type !== 'submit')
      .filter((el) => (el.type === 'checkbox' || el.type === 'radio' ? el.checked : true))
      .forEach((el) => {
        const g = groups.get(el.name) || { label: labelOf(el), values: [] }
        let v = el.value
        if ((el.type === 'checkbox' || el.type === 'radio') && (!v || v === 'on')) v = (el.closest('label')?.innerText || '').trim()
        if (el.tagName === 'SELECT' && el.selectedIndex >= 0 && /^בחרו/.test(el.options[el.selectedIndex].text)) v = ''
        g.values.push(v)
        groups.set(el.name, g)
      })
    const fields = [...groups.entries()].map(([key, g]) => [g.label, g.values.filter(Boolean).join(', '), key])
    const p = pick(fields)
    const payload = {
      name: p.name || 'לא צוין שם',
      phone: p.phone,
      city: p.city,
      size: p.size,
      when: p.when,
      notes: p.notes.join('\n'),
      service: source,
      source: `${source} · ${window.location.pathname}`,
    }
    setState({ sending: true, sent: false })
    let ok = false
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      ok = r.ok
    } catch { ok = false }
    trackLead({ content_name: source })
    if (!ok) {
      const msg = buildLeadMessage({ service: source, size: payload.size, when: payload.when, notes: payload.notes, name: p.name, phone: payload.phone, city: payload.city })
      window.location.assign(buildWaLink(msg))
    }
    setState({ sending: false, sent: true })
  }, [state.sending, source])

  const reset = useCallback(() => setState({ sending: false, sent: false }), [])

  useEffect(() => {
    if (!state.sent) return
    const el = document.querySelector('[data-a="thanks"]')
    if (el) playThanks(el)
  }, [state.sent])

  return { formOpen: !state.sent, sent: state.sent, sending: state.sending, idle: !state.sending, send, reset }
}

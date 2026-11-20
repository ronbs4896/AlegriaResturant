// טופס הצעת מחיר למפעלים, בשני שלבים, כמו בטפסים של Compass, Aramark ו-ezCater:
// ds-normalized
// קודם איך לחזור אליכם, ורק אחר כך השאלות על המפעל.
// מי שמילא את שלב 1 ויצא מהעמוד בלי לסיים, הפרטים שלו עדיין נשלחים (ליד חלקי),
// כדי שאף טלפון לא ילך לאיבוד.
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import WaButton from './WaButton.jsx'

const SIZES = ['30–80', '80–150', '150–300', '300+']
const SHIFTS = ['בוקר', 'צהריים', 'ערב', 'לילה']
const TODAY = ['חדר אוכל, תפזורת', 'חמגשיות אישיות', 'עוד אין פתרון מסודר']
const START = ['כמה שיותר מהר', 'בחודשיים הקרובים', 'כשנגמר החוזה הנוכחי', 'רק בודקים מחירים']

const STEP1 = ['שם מלא', 'טלפון', 'שם החברה או המפעל', 'תפקיד', 'אימייל']

function Choice({ type = 'radio', name, value }) {
  return (
    <label className="fq2-choice">
      <input type={type} name={name} value={value} />
      <span className={type === 'checkbox' ? 'fq2-mark fq2-box' : 'fq2-mark'} aria-hidden="true" />
      <span dir={/^[\d+–]+$/.test(value) ? 'ltr' : undefined}>{value}</span>
    </label>
  )
}

function Field({ label, name, optional, ...rest }) {
  return (
    <label className="fq2-field">
      <span className="fq2-label">
        {label}
        {optional ? <span className="fq2-opt">לא חובה</span> : null}
      </span>
      <input className="fq2-input" name={name} {...rest} />
    </label>
  )
}

export default function FactoryQuote({ formOpen, sent, idle, sending, send, reset, source = 'הסעדה למפעלים' }) {
  const [step, setStep] = useState(1)
  const formRef = useRef(null)
  const stepRef = useRef(null)
  const partial = useRef({ armed: false, done: false })

  // ליד חלקי: יצא מהעמוד אחרי שלב 1 ולא שלח את שלב 2
  useEffect(() => {
    const flush = () => {
      const st = partial.current
      if (!st.armed || st.done || !st.data) return
      st.done = true
      const d = st.data
      const notes = [`שם החברה או המפעל: ${d.company}`, d.role && `תפקיד: ${d.role}`, d.email && `אימייל: ${d.email}`, 'מילא פרטי קשר ויצא לפני השאלות על המפעל']
      const body = JSON.stringify({ name: d.name || 'לא צוין שם', phone: d.phone, city: '', size: '', when: '', notes: notes.filter(Boolean).join('\n'), service: source, source: `${source} · ליד חלקי · ${d.path}` })
      try { fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }) } catch { /* אין מה לעשות ביציאה */ }
    }
    window.addEventListener('pagehide', flush)
    return () => { window.removeEventListener('pagehide', flush); flush() }
  }, [source])

  useEffect(() => { if (sent) partial.current.done = true }, [sent])

  const animateIn = () => {
    const el = stepRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(el.querySelectorAll('.fq2-body:not([hidden]) [data-fq="in"]'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 })
  }

  const next = () => {
    const f = formRef.current
    for (const n of STEP1) {
      const el = f.elements.namedItem(n)
      if (el && !el.checkValidity()) { el.reportValidity(); return }
    }
    const v = (n) => (f.elements.namedItem(n)?.value || '').trim()
    partial.current.armed = true
    partial.current.data = { name: v('שם מלא'), phone: v('טלפון'), company: v('שם החברה או המפעל'), role: v('תפקיד'), email: v('אימייל'), path: window.location.pathname }
    setStep(2)
    requestAnimationFrame(() => {
      animateIn()
      const top = f.getBoundingClientRect().top
      if (top < 80) window.scrollBy({ top: top - 110, behavior: 'smooth' })
    })
  }

  const back = () => { setStep(1); requestAnimationFrame(animateIn) }

  const submit = (e) => {
    partial.current.done = true
    send(e)
  }

  return (
    <div className="fq2" style={{ flex: '1.25 1 460px' }}>
      {formOpen ? (
        <form ref={formRef} className="fq2-card" onSubmit={(e) => { e.preventDefault(); if (step === 1) next(); else submit(e) }} noValidate>
          <ol className="fq2-steps" aria-label="שלבי הטופס">
            <li className={step === 1 ? 'is-on' : 'is-done'} aria-current={step === 1 ? 'step' : undefined}>
              <span className="fq2-num">1</span> איך חוזרים אליכם
            </li>
            <li className={step === 2 ? 'is-on' : ''} aria-current={step === 2 ? 'step' : undefined}>
              <span className="fq2-num">2</span> על המפעל
            </li>
          </ol>

          <div ref={stepRef}>
            <div hidden={step !== 1} className="fq2-body">
              <div className="fq2-grid" data-fq="in">
                <Field label="שם מלא" name="שם מלא" type="text" autoComplete="name" required />
                <Field label="טלפון" name="טלפון" type="tel" dir="ltr" autoComplete="tel" inputMode="tel" pattern="[0-9\-\s+]{9,}" required style={{ textAlign: 'right' }} />
              </div>
              <div data-fq="in">
                <Field label="שם החברה או המפעל" name="שם החברה או המפעל" type="text" autoComplete="organization" required />
              </div>
              <div className="fq2-grid" data-fq="in">
                <Field label="תפקיד" name="תפקיד" type="text" autoComplete="organization-title" placeholder="למשל: מנהלת משאבי אנוש" optional />
                <Field label="אימייל" name="אימייל" type="email" dir="ltr" autoComplete="email" optional style={{ textAlign: 'right' }} />
              </div>
              <div className="fq2-actions" data-fq="in">
                <button type="submit" className="fq2-btn">המשך לשאלות על המפעל</button>
                <span className="fq2-alt">או בטלפון: <a href="tel:+972545437526" dir="ltr">054-543-7526</a></span>
                <WaButton variant="inline" label="או בוואטסאפ" topic="הסעדה למפעל" source="factory_form" />
              </div>
            </div>

            <div hidden={step !== 2} className="fq2-body">
              <div data-fq="in">
                <Field label="איפה המפעל?" name="עיר / אזור תעשייה" type="text" placeholder="עיר או אזור תעשייה" required />
              </div>
              <fieldset className="fq2-set" data-fq="in">
                <legend className="fq2-label">כמה עובדים אוכלים ביום?</legend>
                <div className="fq2-choices fq2-c4">{SIZES.map((v) => <Choice key={v} name="כמה עובדים אוכלים ביום" value={v} />)}</div>
              </fieldset>
              <fieldset className="fq2-set" data-fq="in">
                <legend className="fq2-label">באילו משמרות? <span className="fq2-opt">אפשר לסמן כמה</span></legend>
                <div className="fq2-choices fq2-c4">{SHIFTS.map((v) => <Choice key={v} type="checkbox" name="משמרות" value={v} />)}</div>
              </fieldset>
              <fieldset className="fq2-set" data-fq="in">
                <legend className="fq2-label">איך אוכלים היום?</legend>
                <div className="fq2-choices fq2-c3">{TODAY.map((v) => <Choice key={v} name="איך אוכלים היום" value={v} />)}</div>
              </fieldset>
              <fieldset className="fq2-set" data-fq="in">
                <legend className="fq2-label">מתי רוצים להתחיל?</legend>
                <div className="fq2-choices fq2-c2">{START.map((v) => <Choice key={v} name="מתי רוצים להתחיל" value={v} />)}</div>
              </fieldset>
              <label className="fq2-field" data-fq="in">
                <span className="fq2-label">משהו שחשוב שנדע? <span className="fq2-opt">לא חובה</span></span>
                <textarea className="fq2-input fq2-area" name="משהו שחשוב לדעת" rows="3" placeholder="למשל: שעת הגשה קבועה, מנות צמחוניות" />
              </label>
              <div className="fq2-actions" data-fq="in">
                <button type="submit" className="fq2-btn" disabled={sending}>
                  {idle ? <span>שליחה, ונחזור עם הצעה</span> : null}
                  {sending ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      <span className="spin" aria-hidden="true" style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(46, 42, 39, 0.3)', borderTopColor: '#2E2A27' }} />
                      שולחים
                    </span>
                  ) : null}
                </button>
                <button type="button" className="fq2-back" onClick={back}>חזרה לפרטים</button>
                <WaButton variant="inline" label="או בוואטסאפ" topic="הסעדה למפעל" source="factory_form" />
              </div>
            </div>
          </div>
        </form>
      ) : null}

      {sent ? (
        <div data-a="thanks" role="status" className="fq2-card fq2-thanks">
          <span data-a="tk-badge" style={{ width: '88px', height: '88px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
              <circle cx="44" cy="44" r="40" fill="#FFF5E8" />
              <circle data-a="tk-ring" cx="44" cy="44" r="40" stroke="#B4511E" strokeWidth="3" transform="rotate(-90 44 44)" />
              <path data-a="tk-check" d="M28 45l11 11 22-24" stroke="#B4511E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div data-a="tk-txt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: "var(--fs-h4)", fontWeight: 700, color: '#2E2A27', lineHeight: '1.3' }}>קיבלנו את פרטי המפעל</h3>
            <p style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: '1.7', color: '#2E2A27', maxWidth: '420px' }}>
              נחזור אליכם עם הצעה כתובה, לרוב עוד באותו יום. דחוף? חייגו <span dir="ltr">054-543-7526</span>.
            </p>
            <button type="button" onClick={() => { setStep(1); partial.current = { armed: false, done: false }; reset() }} className="fq2-back" style={{ marginTop: '8px' }}>
              שליחה נוספת
            </button>
            <WaButton topic="הסעדה למפעל" source="factory_form_thanks" style={{ marginTop: 4 }} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

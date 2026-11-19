import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import { site } from '../../data/site.js'
import { contact } from '../../data/home.js'
import { sendLead, nameError, phoneError } from '../../lib/lead.js'
import { trackContact } from '../../lib/analytics.js'

// ============================================================
//  "בואו נדבר על המפעל שלכם" — ארבעה שדות ושליחה.
//
//  שם וטלפון חובה (כמו בשרת); מפעל וכמות עובדים רשות. בעיצוב
//  הכפתור הוא type="button" ולא שולח כלום — כאן הוא שולח ל-
//  /api/lead ומחכה לתשובה. אם השליחה לא הגיעה, המבקר רואה את
//  זה ומקבל וואטסאפ עם ההודעה מוכנה, כך שאף ליד לא הולך לאיבוד.
// ============================================================
const ease = [0.22, 1, 0.36, 1]
const SOURCE = 'טופס · עמוד הבית'

const fieldCls =
  'min-h-12 w-full rounded-full border border-olive-200 bg-white px-[18px] font-medium text-charcoal outline-none transition-colors focus:border-olive aria-[invalid=true]:border-danger'

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-bold">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-[13px] font-bold text-danger">
          {error}
        </span>
      )}
    </div>
  )
}

export default function FactoryContact() {
  const [form, setForm] = useState({ company: '', size: '', name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | failed
  const [waUrl, setWaUrl] = useState('')

  const set = (k) => (e) => {
    const v = e.target.value
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (state === 'sending') return
    const next = { name: nameError(form.name) || undefined, phone: phoneError(form.phone) || undefined }
    setErrors(next)
    if (next.name || next.phone) {
      document.getElementById(next.name ? 'lead-name' : 'lead-phone')?.focus()
      return
    }
    setState('sending')
    const result = await sendLead(
      {
        service: contact.service,
        name: form.name.trim(),
        phone: form.phone.trim(),
        size: form.size ? `${form.size} עובדים` : '',
        notes: form.company.trim() ? `מפעל או חברה: ${form.company.trim()}` : '',
      },
      SOURCE,
    )
    setWaUrl(result.waUrl)
    setState(result.ok ? 'sent' : 'failed')
  }

  const first = form.name.trim().split(/\s+/)[0]

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell scroll-mt-[var(--header-h)] pb-20 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease }}
        className="flex flex-wrap items-center gap-10 rounded-[26px] bg-olive-50 p-6 sm:p-10 lg:p-12"
      >
        <div className="flex flex-[1_1_340px] flex-col gap-3.5">
          <SectionHeading id="contact-title" title={contact.title} align="start" ornament={false} />
          <p className="m-0 text-base leading-[1.8] text-charcoal-600">{contact.text}</p>
          <a
            href={`tel:${site.phone.dial}`}
            onClick={() => trackContact('phone', { source: 'home_contact' })}
            dir="ltr"
            className="num self-start text-[30px] font-black text-charcoal hover:text-olive-700"
          >
            {site.phone.display}
          </a>
        </div>

        <div className="flex-[1_1_420px]" aria-live="polite">
          {state === 'sent' ? (
            <div className="flex flex-col items-start gap-3 rounded-[22px] bg-white p-7">
              <p className="m-0 text-[22px] font-black text-olive-700">
                {first ? `תודה, ${first}. הפרטים אצלנו.` : 'תודה, הפרטים אצלנו.'}
              </p>
              <p className="m-0 text-base leading-[1.75] text-charcoal-600">
                נחזור אליכם עם הצעה כתובה, לרוב עוד היום. רוצים לזרז? אפשר להמשיך בוואטסאפ.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', { source: 'home_contact_sent' })}
                className="inline-flex min-h-11 items-center font-extrabold text-olive-700 underline underline-offset-4"
              >
                להמשיך בוואטסאפ
              </a>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <Field id="lead-company" label="שם המפעל או החברה">
                <input
                  id="lead-company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={set('company')}
                  className={fieldCls}
                />
              </Field>
              <Field id="lead-size" label="כמה עובדים">
                <select id="lead-size" value={form.size} onChange={set('size')} className={`${fieldCls} px-4`}>
                  <option value="">בחרו טווח</option>
                  {contact.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="lead-name" label="איש קשר" error={errors.name}>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'lead-name-error' : undefined}
                  value={form.name}
                  onChange={set('name')}
                  className={fieldCls}
                />
              </Field>
              <Field id="lead-phone" label="טלפון" error={errors.phone}>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  required
                  aria-invalid={errors.phone ? 'true' : undefined}
                  aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
                  value={form.phone}
                  onChange={set('phone')}
                  className={`${fieldCls} text-right`}
                />
              </Field>

              {state === 'failed' && (
                <p className="col-span-full m-0 rounded-2xl bg-white px-4 py-3 text-[15px] leading-relaxed text-charcoal">
                  <b className="text-danger">השליחה לא הגיעה אלינו.</b> הפרטים שמילאתם כבר מוכנים בהודעה,{' '}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContact('whatsapp', { source: 'home_contact_fallback' })}
                    className="font-extrabold text-olive-700 underline underline-offset-4"
                  >
                    שלחו אותם בוואטסאפ
                  </a>{' '}
                  או התקשרו.
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'sending'}
                className="col-span-full min-h-[50px] rounded-full bg-olive text-base font-bold text-white transition-colors hover:bg-olive-700 disabled:opacity-60"
              >
                {state === 'sending' ? 'שולחים…' : contact.submit}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  X, ArrowLeft, ArrowRight, Check, Factory, CalendarHeart,
  PartyPopper, HandCoins, HelpCircle, MessageCircle,
} from 'lucide-react'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { leadServiceOptions, leadSizeOptions, leadWhenOptions, leadCopy } from '../../data/leadForm.js'
import { buildLeadMessage, buildWaLink } from '../../lib/whatsapp.js'
import { trackLead } from '../../lib/analytics.js'
import CityCombobox from './CityCombobox.jsx'

const ICONS = { Factory, CalendarHeart, PartyPopper, HandCoins, HelpCircle }

export default function LeadModal() {
  const { closeLead, preselect } = useLeadModal()
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)
  const [step, setStep] = useState(preselect ? 2 : 1)
  const [done, setDone] = useState(false)
  const [waUrl, setWaUrl] = useState('#')
  const [form, setForm] = useState({
    service: preselect ? leadServiceOptions.find((o) => o.key === preselect)?.label || '' : '',
    size: '', when: '', notes: '', name: '', phone: '', city: '',
  })
  const [errors, setErrors] = useState({})

  // נעילת גלילה + Esc + פוקוס ראשוני
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') closeLead() }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => dialogRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [closeLead])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const pickService = (label) => {
    set('service', label)
    setStep(2)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'נא למלא שם'
    if (!/^0\d{1,2}-?\d{7}$|^0\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'נא למלא טלפון תקין'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = () => {
    if (!validate()) return
    const msg = buildLeadMessage(form)
    const url = buildWaLink(msg)
    setWaUrl(url)
    trackLead({ service: form.service, city: form.city })
    setDone(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const anim = reduce
    ? {}
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="קבלת הצעת מחיר"
    >
      <motion.div
        className="absolute inset-0 bg-charcoal-950/70 backdrop-blur-sm"
        onClick={closeLead}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-warm-lg outline-none sm:rounded-3xl"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* כותרת */}
        <div className="flex items-center justify-between bg-charcoal-950 px-6 py-4 text-cream">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} className="text-honey" />
            <span className="font-black">קבלו הצעת מחיר</span>
          </div>
          <button onClick={closeLead} aria-label="סגירה" className="rounded-full p-1 hover:bg-white/10">
            <X size={22} />
          </button>
        </div>

        {/* פס התקדמות */}
        {!done && (
          <div className="flex gap-1.5 bg-charcoal-950 px-6 pb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-orange' : 'bg-cream/20'
                }`}
              />
            ))}
          </div>
        )}

        <div className="overflow-y-auto px-6 py-6" aria-live="polite">
          {done ? (
            <Success waUrl={waUrl} name={form.name} onClose={closeLead} />
          ) : (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" {...anim}>
                  <h3 className="text-2xl font-black text-charcoal">{leadCopy.step1Title}</h3>
                  <p className="mt-1 mb-5 text-charcoal-soft">{leadCopy.step1Sub}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {leadServiceOptions.map((o) => {
                      const Icon = ICONS[o.icon] || HelpCircle
                      return (
                        <button
                          key={o.key}
                          onClick={() => pickService(o.label)}
                          className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-charcoal/10 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-orange hover:shadow-warm"
                        >
                          <Icon size={30} className="text-orange" />
                          <span className="font-bold text-charcoal">{o.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" {...anim}>
                  <h3 className="text-2xl font-black text-charcoal">{leadCopy.step2Title}</h3>
                  <p className="mt-1 mb-5 text-charcoal-soft">{leadCopy.step2Sub}</p>

                  <label className="mb-1.5 block text-sm font-bold">{leadCopy.sizeLabel}</label>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {leadSizeOptions.map((s) => (
                      <Chip key={s} active={form.size === s} onClick={() => set('size', form.size === s ? '' : s)}>
                        {s}
                      </Chip>
                    ))}
                  </div>

                  <label className="mb-1.5 block text-sm font-bold">{leadCopy.whenLabel}</label>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {leadWhenOptions.map((w) => (
                      <Chip key={w} active={form.when === w} onClick={() => set('when', form.when === w ? '' : w)}>
                        {w}
                      </Chip>
                    ))}
                  </div>

                  <label className="mb-1.5 block text-sm font-bold">{leadCopy.notesLabel}</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-lg border border-charcoal/20 bg-white px-4 py-3 outline-none focus:border-orange"
                    placeholder="משהו שחשוב שנדע?"
                  />

                  <div className="mt-6 flex items-center justify-between">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 font-bold text-charcoal-soft hover:text-charcoal">
                      <ArrowRight size={18} /> חזרה
                    </button>
                    <button onClick={() => setStep(3)} className="flex items-center gap-2 rounded-lg bg-orange px-6 py-3 font-bold text-white shadow-ribbon hover:bg-orange-600">
                      המשך <ArrowLeft size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" {...anim}>
                  <h3 className="text-2xl font-black text-charcoal">{leadCopy.step3Title}</h3>
                  <p className="mt-1 mb-5 text-charcoal-soft">{leadCopy.step3Sub}</p>

                  <div className="space-y-4">
                    <Field label={leadCopy.nameLabel + ' *'} error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        className="w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 outline-none focus:border-orange"
                        placeholder="השם שלך"
                      />
                    </Field>
                    <Field label={leadCopy.phoneLabel + ' *'} error={errors.phone}>
                      <input
                        type="tel"
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        className="w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-end outline-none focus:border-orange"
                        placeholder="050-0000000"
                      />
                    </Field>
                    <CityCombobox value={form.city} onChange={(v) => set('city', v)} label={leadCopy.cityLabel} />
                  </div>

                  {/* סיכום */}
                  <div className="mt-5 rounded-xl bg-cream-200 p-4 text-sm text-charcoal-soft">
                    <strong className="text-charcoal">סיכום:</strong>{' '}
                    {[form.service, form.size, form.when].filter(Boolean).join(' · ') || 'פנייה כללית'}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button onClick={() => setStep(2)} className="flex items-center gap-1 font-bold text-charcoal-soft hover:text-charcoal">
                      <ArrowRight size={18} /> חזרה
                    </button>
                    <button onClick={submit} className="flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white shadow-warm hover:bg-[#1fb457]">
                      <MessageCircle size={18} /> {leadCopy.submit}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${
        active
          ? 'border-orange bg-orange text-white'
          : 'border-charcoal/15 bg-white text-charcoal hover:border-orange'
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-charcoal">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm font-bold text-orange-600">{error}</p>}
    </div>
  )
}

function Success({ waUrl, name, onClose }) {
  const firstName = (name || '').trim().split(' ')[0]
  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/15">
        <Check size={34} className="text-[#25D366]" />
      </div>
      <h3 className="text-2xl font-black text-charcoal">
        {firstName ? `תודה, ${firstName}! ${leadCopy.successTitle}` : leadCopy.successTitle}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-charcoal-soft">{leadCopy.successText}</p>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white shadow-warm hover:bg-[#1fb457]"
      >
        <MessageCircle size={18} /> שליחה בוואטסאפ
      </a>
      <button onClick={onClose} className="mt-3 block w-full text-sm font-bold text-charcoal-soft hover:text-charcoal">
        סגירה
      </button>
    </div>
  )
}

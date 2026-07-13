import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'
import { buildWaLink } from '../lib/whatsapp.js'
import { useLeadModal } from '../context/LeadModalContext.jsx'

export default function Contact() {
  const seo = getSeo('/contact')
  const { openLead } = useLeadModal()

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/contact" />
      <PageHeader
        eyebrow="צור קשר"
        title="בואו נדבר"
        subtitle="הכי מהיר בוואטסאפ — אבל אנחנו כאן בכל דרך שנוח לכם."
      />

      <section className="bg-cream py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          {/* פרטים */}
          <Reveal>
            <div className="space-y-5">
              <ContactRow icon={MessageCircle} label="וואטסאפ" value="שלחו לנו הודעה" href={buildWaLink()} accent />
              <ContactRow icon={Phone} label="טלפון" value={site.phone.display} href={`tel:${site.phone.dial}`} ltr />
              <ContactRow icon={Mail} label="אימייל" value={site.email} href={`mailto:${site.email}`} />
              <ContactRow icon={MapPin} label="אזור שירות" value={site.serviceArea} />
              <div className="rounded-2xl bg-cream-50 p-6 shadow-warm">
                <div className="mb-3 flex items-center gap-2 font-black text-charcoal">
                  <Clock size={20} className="text-orange" /> שעות פעילות
                </div>
                <ul className="space-y-2">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between text-charcoal-soft">
                      <span>{h.days}</span>
                      <span dir="ltr" className="num font-bold text-charcoal">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-center rounded-3xl bg-charcoal-950 p-8 text-cream sm:p-10">
              <h2 className="text-3xl font-black">מבקשים הצעת מחיר?</h2>
              <p className="mt-3 text-cream/75">
                מלאו כמה פרטים ונחזור אליכם מהר עם הצעה מותאמת — להסעדת מפעל, קייטרינג או מכירת שישי.
              </p>
              <div className="mt-8 space-y-3">
                <Button variant="primary" size="lg" onClick={() => openLead()} className="w-full">
                  קבלו הצעת מחיר
                </Button>
                <Button variant="whatsapp" size="lg" href={buildWaLink()} target="_blank" rel="noopener noreferrer" className="w-full">
                  <MessageCircle size={20} /> פתיחת וואטסאפ
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

function ContactRow({ icon: Icon, label, value, href, ltr, accent }) {
  const inner = (
    <div
      className={`flex items-center gap-4 rounded-2xl p-5 shadow-warm transition-all ${
        accent ? 'bg-[#25D366] text-white hover:-translate-y-0.5' : 'bg-cream-50 hover:-translate-y-0.5'
      }`}
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent ? 'bg-white/20' : 'bg-orange/10 text-orange'}`}>
        <Icon size={22} />
      </span>
      <div>
        <div className={`text-sm ${accent ? 'text-white/80' : 'text-charcoal-soft'}`}>{label}</div>
        <div className={`font-black ${accent ? 'text-white' : 'text-charcoal'} ${ltr ? 'num' : ''}`} dir={ltr ? 'ltr' : undefined}>
          {value}
        </div>
      </div>
    </div>
  )
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a> : inner
}

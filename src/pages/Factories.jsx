import {
  ChevronLeft, MessageCircle, ShieldCheck, Gauge, Salad,
  BadgeCheck, Truck, Headset, CheckCircle2,
} from 'lucide-react'

const ICONS = { ShieldCheck, Gauge, Salad, BadgeCheck, Truck, Headset, CheckCircle2 }
import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import ClientLogos from '../components/sections/ClientLogos.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { factoryValues, factorySteps, factoryTrust } from '../data/factories.js'
import { serviceSchema } from '../data/structuredData.js'
import { getService } from '../data/services.js'
import { useLeadModal } from '../context/LeadModalContext.jsx'
import { buildWaLink } from '../lib/whatsapp.js'

export default function Factories() {
  const seo = getSeo('/factories')
  const { openLead } = useLeadModal()

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/factories"
        jsonLd={serviceSchema(getService('factory-catering'))}
      />

      <PageHeader
        eyebrow="הסעדה למפעלים · הדרום"
        title="המפעלים הגדולים בדרום כבר אוכלים אצלנו"
        subtitle="מפעל עם מאות עובדים צריך ספק אחד שלא מאכזב — אמין, בזמן, באיכות של בית. כבר 25 שנה זה אנחנו."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" size="lg" onClick={() => openLead('factory')}>
            קבלו הצעת מחיר למפעל <ChevronLeft size={20} />
          </Button>
          <Button variant="whatsapp" size="lg" href={buildWaLink('שלום, אשמח לקבל הצעת מחיר להסעדת מפעל 🏭')} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} /> וואטסאפ
          </Button>
        </div>
      </PageHeader>

      {/* פס אמון */}
      <section className="warm-grain relative bg-charcoal-950 py-12 text-cream">
        <Container className="relative">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {factoryTrust.map((t) => (
              <div key={t.label} className="text-center">
                <div className="text-3xl font-black text-honey sm:text-4xl">{t.value}</div>
                <div className="mt-1 font-bold text-cream/70">{t.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* יתרונות */}
      <section className="bg-cream py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">למה מפעלים בוחרים בנו</span>
            <h2 className="mt-3 text-3xl font-black text-charcoal sm:text-4xl">
              כל מה שמנהל רכש מחפש בספק מזון
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {factoryValues.map((v, i) => {
              const Icon = ICONS[v.icon] || CheckCircle2
              return (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl bg-cream-50 p-7 shadow-warm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                      <Icon size={24} />
                    </span>
                    <h3 className="mt-4 text-xl font-black text-charcoal">{v.title}</h3>
                    <p className="mt-2 text-charcoal-soft">{v.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* איך זה עובד */}
      <section className="warm-grain relative bg-charcoal-950 py-14 text-cream sm:py-20 lg:py-28">
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow text-honey">איך מתחילים</span>
              <h2 className="mt-3 text-3xl font-black text-cream sm:text-4xl">
                תהליך פשוט, בלי כאב ראש
              </h2>
              <ol className="mt-8 space-y-6">
                {factorySteps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-lg font-black text-white">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-cream">{s.title}</h3>
                      <p className="mt-1 text-cream/70">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.12}>
              <Img src="/images/catering/factory-catering.jpg" fallback="/images/dishes/alegria-spread.jpg" alt="הסעדת מפעלים" ratio="4/5" className="shadow-warm-lg" />
            </Reveal>
          </div>
        </Container>
      </section>

      <TrustBar />
      <ClientLogos />
      <CTASection
        title="בואו נדבר על ההסעדה של המפעל שלכם"
        subtitle="שיחה קצרה, הצעת מחיר מותאמת, ואוכל טוב שהעובדים יאהבו."
      />
    </>
  )
}

import { ChevronLeft, MessageCircle } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import Certifications from '../components/sections/Certifications.jsx'
import CaseStudy from '../components/sections/CaseStudy.jsx'
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
        subtitle="כשההפסקה של מאות עובדים תלויה בספק אחד, בוחרים אחד שמגיע בזמן כבר 25 שנה. שיחת היכרות, הצעה כתובה, ושבוע ניסיון לפני שמתחייבים."
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
      <Section tone="dark" size="sm" className="warm-grain">
        <Container className="relative">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {factoryTrust.map((t) => (
              <div key={t.label} className="text-center">
                {/* הפנים הטבלאית לספרות בלבד — ערך בעברית נשאר בגופן המותג */}
                <div
                  className={`text-stat text-honey ${
                    /^[\d.,:%+\-\s]+$/.test(t.value) ? 'stat-num' : 'font-black'
                  }`}
                >
                  {t.value}
                </div>
                <div className="mt-1 font-bold text-cream/70">{t.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* יתרונות */}
      <Section tone="cream" size="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">למה מפעלים בוחרים בנו</span>
            <h2 className="mt-3 text-h2 font-black text-charcoal">
              כל מה שמנהל רכש מחפש בספק מזון
            </h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {factoryValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full border-t-2 border-charcoal/15 pt-5">
                  <span className="text-meta font-black tracking-widest text-charcoal/30">0{i + 1}</span>
                  <h3 className="mt-2 text-h3 font-black text-charcoal">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* תעודות ואישורים — תיק הספק */}
      <Certifications />

      {/* איך זה עובד */}
      <Section tone="dark" size="lg" className="warm-grain">
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow text-honey">איך מתחילים</span>
              <h2 className="mt-3 text-h2 font-black text-cream">
                תהליך פשוט, בלי כאב ראש
              </h2>
              <ol className="mt-8 space-y-6">
                {factorySteps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-honey/40 text-lead font-black text-honey">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-lead font-black text-cream">{s.title}</h3>
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
      </Section>

      {/* מקרה לקוח — הראיה החזקה ביותר, רלוונטית כאן אף יותר מהבית */}
      <CaseStudy />

      <TrustBar />
      <CTASection
        title="ההפסקה הבאה כבר יכולה להיות שלנו"
        subtitle="שלחו את מספר העובדים, ותקבלו הצעה כתובה לרוב עוד באותו יום."
      />
    </>
  )
}

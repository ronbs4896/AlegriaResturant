import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Hero from '../components/sections/Hero.jsx'
import Marquee from '../components/sections/Marquee.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import HeritageSection from '../components/sections/HeritageSection.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import FactoriesSplit from '../components/sections/FactoriesSplit.jsx'
import FridayBand from '../components/sections/FridayBand.jsx'
import ProcessSteps from '../components/sections/ProcessSteps.jsx'
import ShowcaseQuote from '../components/sections/ShowcaseQuote.jsx'
import Features from '../components/sections/Features.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import FAQAccordion from '../components/sections/FAQAccordion.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { localBusinessSchema } from '../data/structuredData.js'
import { faq } from '../data/faq.js'

export default function Home() {
  const seo = getSeo('/')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/" jsonLd={localBusinessSchema()} />
      <Hero />
      <TrustBar />
      <Marquee />
      <HeritageSection />
      <ServicesGrid />
      <FactoriesSplit />
      <FridayBand />
      <ProcessSteps />
      <ShowcaseQuote />
      <Features />
      <TestimonialsSection limit={2} />

      {/* FAQ מקוצר */}
      <section className="bg-cream py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="שאלות נפוצות"
            title="דברים ששואלים אותנו הרבה"
            align="center"
            className="mx-auto"
          />
        </Container>
        <div className="mt-8">
          <FAQAccordion items={faq.slice(0, 3)} />
        </div>
        <div className="mt-6 text-center">
          <Link to="/faq" className="inline-flex items-center gap-1 font-bold text-orange link-underline">
            לכל השאלות והתשובות <ChevronLeft size={16} />
          </Link>
        </div>
      </section>

      <CTASection
        title="הדרום כבר אוכל אצלנו. עכשיו תורכם."
        subtitle="ספרו לנו מה אתם צריכים — מפעל, אירוע או שולחן שבת — ונחזור עם הצעה מותאמת."
      />
    </>
  )
}

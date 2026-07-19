import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Hero from '../components/sections/Hero.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import FactoriesSplit from '../components/sections/FactoriesSplit.jsx'
import PhotoStrip from '../components/sections/PhotoStrip.jsx'
import FridayBand from '../components/sections/FridayBand.jsx'
import HeritageSection from '../components/sections/HeritageSection.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import FAQAccordion from '../components/sections/FAQAccordion.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { localBusinessSchema } from '../data/structuredData.js'

// פלואו הבית: פתיחה צילומית -> הוכחות -> דלתות שירות -> B2B (הסקשן הכהה
// היחיד) -> הפוגה צילומית -> שישי -> מורשת -> המלצות -> שאלות -> סגירה.
export default function Home() {
  const seo = getSeo('/')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/" jsonLd={localBusinessSchema()} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FactoriesSplit />
      <PhotoStrip />
      <FridayBand />
      <HeritageSection />
      <TestimonialsSection />

      {/* שאלות נפוצות מקוצר */}
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
          <FAQAccordion maxPerCategory={3} />
        </div>
        <div className="mt-6 text-center">
          <Link to="/faq" className="link-underline inline-flex items-center gap-1 font-bold text-charcoal">
            לכל השאלות והתשובות <ChevronLeft size={16} />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}

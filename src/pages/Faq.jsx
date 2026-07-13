import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import FAQAccordion from '../components/sections/FAQAccordion.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { faq } from '../data/faq.js'
import { faqSchema } from '../data/structuredData.js'

export default function Faq() {
  const seo = getSeo('/faq')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/faq" jsonLd={faqSchema(faq)} />
      <PageHeader
        eyebrow="שאלות נפוצות"
        title="כל מה שרציתם לדעת"
        subtitle="לא מצאתם תשובה? שלחו לנו הודעה ונשמח לעזור."
      />
      <section className="bg-cream py-16 sm:py-20">
        <FAQAccordion />
      </section>
      <CTASection />
    </>
  )
}

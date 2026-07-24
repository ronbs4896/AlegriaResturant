import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import ProcessSteps from '../components/sections/ProcessSteps.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function Services() {
  const seo = getSeo('/services')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/services" />
      <PageHeader
        eyebrow="השירותים שלנו"
        title="כל פתרונות ההסעדה במקום אחד"
        subtitle="מהסעדה יומית למפעלים ועד ארוחת שישי ביתית. בחרו את מה שמתאים לכם."
      />
      <ServicesGrid />
      <ProcessSteps />
      <CTASection />
    </>
  )
}

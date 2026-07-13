import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Stars from '../components/ui/Stars.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { ratingSummary } from '../data/testimonials.js'

export default function Testimonials() {
  const seo = getSeo('/testimonials')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/testimonials" />
      <PageHeader eyebrow="המלצות" title="לקוחות מספרים">
        <div className="mt-6 flex items-center gap-3">
          <Stars rating={5} size={24} />
          <span className="text-lg font-black text-cream">
            {ratingSummary.average.toFixed(1)} · {ratingSummary.count}+ ממליצים
          </span>
        </div>
      </PageHeader>
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

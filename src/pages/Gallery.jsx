import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import GalleryGrid from '../components/sections/GalleryGrid.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'

export default function Gallery() {
  const seo = getSeo('/gallery')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/gallery" />
      <PageHeader
        eyebrow="גלריה"
        title="קצת מהטעם שלנו"
        subtitle="מנות, קייטרינג ואווירה מהמטבח שלנו בקרית גת."
      />
      <GalleryGrid />
      <CTASection />
    </>
  )
}

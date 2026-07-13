import Seo from '../components/seo/Seo.jsx'
import Hero from '../components/sections/Hero.jsx'
import Marquee from '../components/sections/Marquee.jsx'
import ClientLogos from '../components/sections/ClientLogos.jsx'
import ServicesGrid from '../components/sections/ServicesGrid.jsx'
import HeritageSection from '../components/sections/HeritageSection.jsx'
import FactoriesSplit from '../components/sections/FactoriesSplit.jsx'
import FridayBand from '../components/sections/FridayBand.jsx'
import Features from '../components/sections/Features.jsx'
import ProcessSteps from '../components/sections/ProcessSteps.jsx'
import ShowcaseQuote from '../components/sections/ShowcaseQuote.jsx'
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { localBusinessSchema } from '../data/structuredData.js'

export default function Home() {
  const seo = getSeo('/')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/" jsonLd={localBusinessSchema()} />
      <Hero />
      <Marquee />
      <ClientLogos />
      <HeritageSection />
      <ServicesGrid />
      <FactoriesSplit />
      <FridayBand />
      <ProcessSteps />
      <ShowcaseQuote />
      <Features />
      <TestimonialsSection limit={2} />
      <CTASection />
    </>
  )
}

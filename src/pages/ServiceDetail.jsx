import { useParams, Navigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react'
import { trackViewContent } from '../lib/analytics.js'
import Seo from '../components/seo/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Img from '../components/ui/Img.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getService, services } from '../data/services.js'
import { getSeo } from '../data/seoRoutes.js'
import { serviceSchema, breadcrumbSchema } from '../data/structuredData.js'
import { useLeadModal } from '../context/LeadModalContext.jsx'

const leadKeyBySlug = {
  'factory-catering': 'factory',
  'friday-meals': 'friday',
  'event-catering': 'event',
  'subsidized-meals': 'subsidized',
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  const { openLead } = useLeadModal()

  useEffect(() => {
    if (service) trackViewContent({ content_type: 'service', content_name: service.title })
  }, [service])

  if (!service) return <Navigate to="/services" replace />

  const seo = getSeo(`/services/${slug}`)
  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={`/services/${slug}`}
        image={service.image}
        jsonLd={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: 'בית', path: '/' },
            { name: 'שירותים', path: '/services' },
            { name: service.title, path: `/services/${slug}` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-charcoal-950 pb-16 pt-[calc(var(--header-h)+3rem)] text-cream">
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <nav className="mb-4 flex items-center gap-2 text-sm text-cream/60" aria-label="breadcrumb">
              <Link to="/services" className="hover:text-honey">שירותים</Link>
              <ArrowRight size={14} />
              <span className="text-honey">{service.title}</span>
            </nav>
            <span className="ribbon mb-4">{service.sellingPoint}</span>
            <h1 className="text-4xl font-black sm:text-5xl">{service.title}</h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/80">{service.description}</p>
            <div className="mt-8">
              <Button variant="primary" size="lg" onClick={() => openLead(leadKeyBySlug[slug])}>
                קבלו הצעת מחיר <ChevronLeft size={20} />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <Img src={service.image} fallback={service.imageFallback} alt={service.title} ratio="4/3" className="shadow-warm-lg" priority />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-3xl font-black text-charcoal">מה כולל השירות</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <Reveal key={b}>
                <div className="flex items-start gap-3 rounded-2xl bg-cream-50 p-5 shadow-warm">
                  <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-charcoal/50" />
                  <span className="font-bold text-charcoal">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* שירותים נוספים */}
          <h3 className="mt-16 text-2xl font-black text-charcoal">שירותים נוספים</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/services/${o.slug}`}
                className="group rounded-2xl border-2 border-charcoal/10 bg-cream-50 p-5 transition-all hover:-translate-y-1 hover:border-charcoal/30"
              >
                <div className="font-black text-charcoal">{o.title}</div>
                <div className="mt-1 text-sm text-charcoal-soft">{o.short}</div>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:gap-2 transition-all">
                  לפרטים <ChevronLeft size={16} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

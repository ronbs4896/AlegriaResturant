import { useParams, Navigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react'
import { trackViewContent } from '../lib/analytics.js'
import Seo from '../components/seo/Seo.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Img from '../components/ui/Img.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Illustration from '../components/ui/Illustration.jsx'
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
        {/* איור ענק ברקע — נותן לעמוד סימן זיהוי בלי להוסיף עוד טקסט */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 opacity-[0.07]"
          style={{ insetInlineStart: '-3rem' }}
        >
          <Illustration name={service.art} size={260} strokeWidth={1} />
        </span>
        {/* קו קו-השירות — מפריד את ההירו מהתוכן בצבע של השירות עצמו */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1" style={{ background: service.accent }} />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal from="start">
            <nav className="mb-4 flex items-center gap-2 text-meta text-cream/60" aria-label="breadcrumb">
              <Link to="/services" className="hover:text-honey">שירותים</Link>
              <ArrowRight size={14} />
              <span className="text-honey">{service.title}</span>
            </nav>
            <span className="ribbon mb-4">{service.sellingPoint}</span>
            <h1 className="text-hero font-black">{service.title}</h1>
            <p className="mt-4 max-w-lg text-lead leading-relaxed text-cream/80">{service.description}</p>
            <div className="mt-8">
              <Button variant="primary" size="lg" onClick={() => openLead(leadKeyBySlug[slug])}>
                קבלו הצעת מחיר <ChevronLeft size={20} />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12} from="end">
            <Img src={service.image} fallback={service.imageFallback} alt={service.title} ratio="4/3" className="shadow-warm-lg" priority />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-h2 font-black text-charcoal">מה כולל השירות</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <Reveal key={b}>
                <div className="flex items-start gap-3 rounded-2xl bg-cream-50 p-5 shadow-warm">
                  <CheckCircle2 size={24} className="mt-0.5 shrink-0" style={{ color: service.accent }} />
                  <span className="font-bold text-charcoal">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* שירותים נוספים */}
          <h3 className="mt-16 text-h3 font-black text-charcoal">שירותים נוספים</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/services/${o.slug}`}
                className="group overflow-hidden rounded-2xl border border-charcoal/12 bg-cream-50 transition-all hover:-translate-y-1 hover:border-charcoal/30"
              >
                <span aria-hidden="true" className="block h-1 w-full" style={{ background: o.accent }} />
                <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-black text-charcoal">{o.title}</div>
                  <span className="shrink-0 opacity-55" style={{ color: o.accent }}>
                    <Illustration name={o.art} size={22} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="mt-1 text-meta text-charcoal-soft">{o.short}</div>
                <span className="mt-3 inline-flex items-center gap-1 text-meta font-bold text-charcoal group-hover:gap-2 transition-all">
                  לפרטים <ChevronLeft size={16} />
                </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

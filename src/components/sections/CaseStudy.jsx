import { ChevronLeft } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { caseStudy } from '../../data/caseStudy.js'

// ============================================================
//  מקרה לקוח — הרגע הכהה השני והאחרון בעמוד.
//  מבנה אתגר → פתרון → תוצאה: המבנה ש-NN/g מזהה כמאפשר לקונה
//  B2B להעריך את עצמו מול המקרה. צורה ייחודית: ציטוט גדול
//  בצד אחד, ציר שלושת השלבים בצד השני.
// ============================================================
export default function CaseStudy() {
  const { openLead } = useLeadModal()
  const { eyebrow, quote, attribution, steps, metrics } = caseStudy

  return (
    <Section tone="dark" size="lg" className="warm-grain overflow-hidden">
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* צד א׳ — הציטוט */}
          <Reveal>
            <span className="eyebrow text-honey">{eyebrow}</span>
            <blockquote className="mt-6 text-h2 font-black leading-[1.15] text-cream">
              {quote}
            </blockquote>
            <figcaption className="mt-7 hairline-light pt-5 text-meta">
              <span className="font-bold text-cream">{attribution.name}</span>
              <span className="text-cream/55"> · {attribution.role}</span>
            </figcaption>

            {/* מדדים */}
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="stat-num text-stat text-honey">{m.value}</dd>
                  <p className="mt-1 text-meta text-cream/60">{m.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* צד ב׳ — ציר אתגר/פתרון/תוצאה */}
          <Reveal delay={0.12}>
            <ol className="relative space-y-8">
              {steps.map((s, i) => (
                <li key={s.label} className="relative ps-12">
                  {/* ציר אנכי */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-9 h-full w-px bg-cream/15"
                      style={{ insetInlineStart: '1.125rem' }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-meta font-bold text-honey"
                    style={{ insetInlineStart: 0 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-meta font-bold uppercase tracking-[0.1em] text-cream/50">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-lead font-light leading-relaxed text-cream/85">{s.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Button variant="primary" size="lg" onClick={() => openLead('factory')}>
                בואו נבדוק את המספרים שלכם <ChevronLeft size={20} />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

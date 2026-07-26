import { ChevronLeft } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'
import { confirmedCertifications, certificationsCopy } from '../../data/certifications.js'

// ============================================================
//  תעודות ואישורים — שכבת ה"תיק ספק".
//  מוצג כרשימת שורות עם קווי שיער (לא כרטיסים עם אייקונים —
//  זו התבנית הכי שחוקה ב-B2B). מרנדר רק תעודות מאושרות.
// ============================================================
export default function Certifications() {
  if (confirmedCertifications.length === 0) return null

  return (
    <Section tone="raised" size="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionTitle
            eyebrow={certificationsCopy.eyebrow}
            title={certificationsCopy.title}
            subtitle={certificationsCopy.subtitle}
          />

          <Reveal delay={0.1}>
            <dl className="hairline">
              {confirmedCertifications.map((c) => (
                <div
                  key={c.key}
                  className="flex flex-col gap-1 border-b border-charcoal/12 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <dt className="shrink-0 text-meta font-bold tracking-[0.06em] text-charcoal-muted sm:w-32">
                    {c.label}
                  </dt>
                  <dd>
                    <span className="block font-black text-charcoal">{c.value}</span>
                    {c.note && (
                      <span className="mt-0.5 block text-meta text-charcoal-soft">{c.note}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                size="md"
                href={buildWaLink('שלום, אשמח לקבל את מסמכי הספק (תעודות ואישורים) 📄')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', { source: 'certifications' })}
              >
                בקשת המסמכים <ChevronLeft size={18} />
              </Button>
              <p className="text-meta text-charcoal-soft">{certificationsCopy.footnote}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

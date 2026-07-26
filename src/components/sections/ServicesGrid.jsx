import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import Illustration from '../ui/Illustration.jsx'
import { services } from '../../data/services.js'

// ============================================================
//  ארבע דלתות למטבח אחד.
//  עד היום ארבעת הכרטיסים נראו זהים ונשאו מספר סידורי (01-04),
//  שרמז על רצף שלא קיים: אף אחד לא עובר מהסעדה למפעלים
//  למכירת שישי. במקום המספר, כל שירות מקבל צבע ואיור משלו,
//  כך שמנהל רכש מזהה את השורה שלו בלי לקרוא.
//  הכתום נשאר מחוץ למשפחה הזו, הוא צבע הפעולה בלבד.
// ============================================================
export default function ServicesGrid() {
  return (
    // overflow-hidden נדרש בגלל החשיפה הכיוונית: לפני שהכרטיס נכנס
    // למסך הוא יושב 28px הצידה, ובלי גזירה זה יוצר גלילה אופקית במובייל.
    <Section tone="cream" size="lg" className="overflow-hidden">
      <Container>
        <SectionTitle
          eyebrow="מה אנחנו עושים"
          art="tray"
          title="ארבע דלתות לאותו מטבח"
          subtitle="מטבח אחד בקרית גת, ארבע דרכים לאכול ממנו: במפעל, בשולחן השבת או באירוע הבא שלכם."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} from={i % 2 === 0 ? 'start' : 'end'}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-warm transition-all hover:-translate-y-1 hover:shadow-warm-lg"
              >
                <Img
                  src={s.image}
                  fallback={s.imageFallback}
                  alt={s.title}
                  ratio="16/10"
                  rounded="rounded-none"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                {/* קו הזיהוי של קו השירות */}
                <span aria-hidden="true" className="h-1 w-full" style={{ background: s.accent }} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-micro font-black"
                      style={{ backgroundColor: `${s.accent}1A`, color: s.accent }}
                    >
                      {s.sellingPoint}
                    </span>
                    <span
                      className="shrink-0 opacity-55 transition-opacity group-hover:opacity-90"
                      style={{ color: s.accent }}
                    >
                      <Illustration name={s.art} size={26} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3 className="text-h3 font-black text-charcoal">{s.title}</h3>
                  <p className="mt-2 flex-1 text-charcoal-soft">{s.short}</p>
                  <span className="link-underline mt-4 inline-flex items-center gap-1 self-start font-bold text-charcoal transition-colors group-hover:text-orange">
                    פרטים נוספים <ArrowLeft size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

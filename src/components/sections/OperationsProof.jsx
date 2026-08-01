import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import CountUp from '../ui/CountUp.jsx'
import { operationsHeadline, operationsLead, operationsItems } from '../../data/operations.js'

// הפנים הטבלאית היא לטיני/ספרות בלבד — לערך בעברית ("רבנות") אין בה
// גליפים והדפדפן נופל לגופן מערכת שנראה זר. לכן: מונו למספרים, מותג לטקסט.
const isNumeric = (v) => /^[\d.,:%+\-\s]+$/.test(String(v))
const valueFont = (v) => (isNumeric(v) ? 'stat-num' : 'font-black')

// מספר שיודע לספור. countTo בדאטה מסמן מה ראוי לספירה:
// 3,000 ו-25 נבנים לאורך זמן, 05:30 הוא שעה ולכן נשאר קבוע.
const Value = ({ item }) =>
  item.countTo ? <CountUp to={item.countTo} suffix={item.countSuffix || ''} /> : item.value

// ============================================================
//  ראיות תפעוליות — גריד bento א-סימטרי.
//  צורה שלא קיימת בשום מקום אחר באתר: לא ספליט, לא גריד כרטיסים
//  אחיד, לא קרוסלה. הבלוק הראשי רחב וכפול, סביבו יחידות קטנות.
//  מספרים גדולים בפנים הטבלאית + קווי שיער במקום צללים.
// ============================================================
export default function OperationsProof() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <SectionTitle
          eyebrow={operationsHeadline.eyebrow}
          art="clock"
          rule
          title={operationsHeadline.title}
          subtitle={operationsHeadline.subtitle}
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-charcoal/12 sm:grid-cols-2 lg:grid-cols-3">
          {/* בלוק ראשי — תופס שתי עמודות */}
          <Reveal className="sm:col-span-2">
            <article className="flex h-full flex-col justify-between gap-6 bg-cream-50 p-7 sm:p-9">
              <div className="flex items-baseline gap-3">
                <span className={`text-display text-charcoal ${valueFont(operationsLead.value)}`}><Value item={operationsLead} /></span>
                <span className="text-meta font-bold text-charcoal-muted">{operationsLead.unit}</span>
              </div>
              <div>
                <h3 className="text-h3 font-black text-charcoal">{operationsLead.title}</h3>
                <p className="mt-2.5 max-w-[46ch] text-charcoal-soft">{operationsLead.text}</p>
              </div>
            </article>
          </Reveal>

          {operationsItems.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * (i + 1)}>
              <article className="flex h-full flex-col gap-4 bg-cream-50 p-7">
                {item.image && (
                  <Img src={item.image} alt="" ratio="16/10" rounded="rounded-xl" className="mb-1" />
                )}
                <div className="flex items-baseline gap-2.5">
                  <span className={`text-stat text-charcoal ${valueFont(item.value)}`}><Value item={item} /></span>
                  <span className="text-meta font-bold text-charcoal-muted">{item.unit}</span>
                </div>
                <div>
                  <h3 className="font-black text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-meta leading-relaxed text-charcoal-soft">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

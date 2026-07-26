import { motion, useReducedMotion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { heritage } from '../../data/heritage.js'
import { site } from '../../data/site.js'

// ============================================================
//  מורשת — רגע עריכתי ממורכז, לא ספליט.
//  קודם זה היה הספליט השלישי ברצף (מפעלים → שישי → מורשת),
//  ולכן הרגיש כמו חזרה. עכשיו: אמבלם ממורכז, ציטוט ענק
//  ברוחב מלא, וטקסט בשתי עמודות צרות מתחת — צורה שלא
//  חוזרת בשום מקום אחר בעמוד.
// ============================================================
export default function HeritageSection() {
  const reduce = useReducedMotion()
  return (
    <Section tone="cream" size="lg" divider="wheat" className="warm-grain overflow-hidden">
      <Container className="relative">
        {/* אמבלם ממורכז — הבאדג' בזרימה רגילה מתחת, בלי מיקום אבסולוטי
            (transform פיזי לא מתנהג נכון תחת RTL וכיסה את הדיוקן) */}
        <Reveal className="flex flex-col items-center">
          <motion.div
            initial={reduce ? {} : { rotate: -2, scale: 0.97 }}
            whileInView={reduce ? {} : { rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-36 overflow-hidden rounded-full bg-cream-50 p-3 shadow-warm-lg sm:w-44"
          >
            <img
              src="/images/logo/logo.jpg"
              alt={`הלוגו של ${site.name} — דיוקן המייסדת`}
              className="w-full rounded-full"
            />
          </motion.div>
          <span className="-mt-3 inline-flex items-center gap-1.5 rounded-full bg-charcoal-950 px-4 py-1.5 shadow-warm-lg">
            <span className="stat-num text-meta text-honey">25+</span>
            <span className="text-micro font-bold text-cream/75">שנות מסורת</span>
          </span>
        </Reveal>

        {/* הציטוט — הרגע הטיפוגרפי הגדול של העמוד */}
        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-meta font-bold tracking-[0.08em] text-charcoal-muted">
            {heritage.eyebrow}
          </p>
          <blockquote className="mx-auto mt-5 max-w-[18ch] text-center text-display font-black leading-[1.05] text-charcoal">
            {heritage.quote}
          </blockquote>
          {/* הכותרת נשמרת כ-h2 אמיתי לטובת SEO ומבנה הכותרות */}
          <h2 className="mt-6 text-center text-h3 font-light text-charcoal-soft">
            {heritage.title}
          </h2>
        </Reveal>

        {/* הסיפור — שתי עמודות צרות, קו שיער מפריד */}
        <Reveal delay={0.16}>
          <div className="hairline mx-auto mt-14 max-w-4xl pt-10">
            <div className="columns-1 gap-10 text-charcoal-soft sm:columns-2 [&>p]:mb-4 [&>p]:break-inside-avoid">
              {heritage.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">{p}</p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {heritage.points.map((p) => (
                <li key={p} className="text-meta font-bold text-charcoal">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

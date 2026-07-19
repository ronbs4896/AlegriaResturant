import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Img from '../components/ui/Img.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import StatsBand from '../components/sections/StatsBand.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'

const values = [
  { title: 'בישול, לא חימום', text: 'הסירים עולים על האש כל בוקר. מה שיוצא בצהריים התבשל באותו יום.' },
  { title: 'מתכונים של המשפחה', text: 'העוף בזיתים מתבשל לפי המתכון של סבתא, שלוש שעות על אש קטנה. ככה זה נשאר.' },
  { title: 'מכירים את הלקוחות בשם', text: 'מי שמתקשר מדבר עם מי שמכיר את ההזמנה שלו, בלי מוקד ובלי תסריט שיחה.' },
  { title: 'מגיעים בזמן', text: '25 שנה של אספקה יומית למפעלים. ההפסקה לא מחכה, אז גם אנחנו לא.' },
]

export default function About() {
  const seo = getSeo('/about')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/about" />
      <PageHeader
        eyebrow="הסיפור שלנו"
        title="25 שנה של אוכל ביתי אמיתי"
        subtitle={site.tagline}
      />

      <section className="bg-cream py-14 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <Img src="/images/ambience/kitchen.jpg" fallback="/images/dishes/alegria-spread.jpg" alt="המטבח של אלגריה" ratio="4/3" className="shadow-warm-lg" />
              {/* האמבלם כחותמת מורשת על התמונה */}
              <div className="absolute -bottom-8 w-32 overflow-hidden rounded-2xl bg-white p-2 shadow-warm-lg sm:w-40 inset-inline-start-6" style={{ insetInlineStart: '1.5rem' }}>
                <img src="/images/logo/logo.jpg" alt="" aria-hidden="true" className="w-full" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-black text-charcoal sm:text-4xl">מהמטבח בקרית גת לכל הדרום</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-charcoal-soft">
              <p>
                התחלנו לפני יותר מ-25 שנה עם מטבח קטן וכמה סירים. היום המטבח בקרית גת
                מוציא כ-3,000 מנות ביום לעשרות מפעלים בדרום, ובכל שישי גם למאות משפחות
                שאוספות את האוכל לשבת.
              </p>
              <p>
                הגודל השתנה, השיטה לא: מבשלים בבוקר, טועמים לפני שיוצא, ומכירים את
                הלקוחות בשם פרטי.
              </p>
              <p className="font-black text-charcoal">
                מי שאכל אצלנו פעם אחת בדרך כלל חוזר. זו כל התוכנית העסקית.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <StatsBand />

      <section className="bg-cream-50 py-14 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-center text-3xl font-black text-charcoal sm:text-4xl">הערכים שמנחים אותנו</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full border-t-2 border-charcoal/15 pt-5">
                  <span className="text-sm font-black tracking-widest text-charcoal/30">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-black text-charcoal">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

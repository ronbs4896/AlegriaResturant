import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Img from '../components/ui/Img.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import StatsBand from '../components/sections/StatsBand.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { site } from '../data/site.js'
import { Heart, Sparkles, Users, ShieldCheck } from 'lucide-react'

const values = [
  { icon: Heart, title: 'אוכל מהלב', text: 'מבשלים כמו שמבשלים בבית — באהבה, בסבלנות, עם מתכונים שעוברים במשפחה.' },
  { icon: Sparkles, title: 'טרי ואיכותי', text: 'חומרי גלם טובים, בישול יומי, בלי קיצורי דרך. איכות שמרגישים בכל ביס.' },
  { icon: Users, title: 'יחס אישי', text: 'לקוח זה לא מספר. מכירים, זמינים, וגמישים לכל בקשה — כמו שצריך.' },
  { icon: ShieldCheck, title: 'אמינות', text: '25 שנה של אספקה בזמן, כל יום. עשרות מפעלים סומכים עלינו — וזה לא מובן מאליו.' },
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

      <section className="bg-cream py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Img src="/images/ambience/kitchen.jpg" fallback="/images/dishes/alegria-spread.jpg" alt="המטבח של אלגריה" ratio="4/3" className="shadow-warm-lg" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-black text-charcoal sm:text-4xl">מהמטבח שלנו — לשולחן שלכם</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-charcoal-soft">
              <p>
                מסעדת אלגריה נולדה מתוך אהבה פשוטה לאוכל טוב. כבר מעל 25 שנה אנחנו מבשלים אוכל ביתי
                אמיתי — טעים, טרי ואיכותי — ומגישים אותו למשפחות, לאירועים, ובעיקר למאות עובדים
                בעשרות מפעלים ברחבי הארץ.
              </p>
              <p>
                התחלנו קטנים, והיום אנחנו מטבח מרכזי שמסוגל לספק אלפי מנות ביום — בלי לוותר על הטעם
                הביתי ועל היחס האישי שבזכותם לקוחות נשארים איתנו שנים.
              </p>
              <p className="font-black text-charcoal">
                כי בסוף, אוכל טוב זה לא רק מה שאוכלים — זה איך שמרגישים אחרי.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <StatsBand />

      <section className="bg-cream-50 py-20 sm:py-28">
        <Container>
          <h2 className="text-center text-3xl font-black text-charcoal sm:text-4xl">הערכים שמנחים אותנו</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl bg-cream p-6 shadow-warm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <v.icon size={24} />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-charcoal">{v.title}</h3>
                  <p className="mt-2 text-charcoal-soft">{v.text}</p>
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

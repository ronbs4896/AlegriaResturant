import { MessageCircle } from 'lucide-react'
import Seo from '../components/seo/Seo.jsx'
import PageHeader from '../components/sections/PageHeader.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { fridayIntro, fridayMenu, fridayHow } from '../data/friday.js'
import { buildWaLink } from '../lib/whatsapp.js'

export default function Friday() {
  const seo = getSeo('/friday')
  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/friday" />
      <PageHeader eyebrow={fridayIntro.kicker} title={fridayIntro.title} subtitle={fridayIntro.lead}>
        <div className="mt-8">
          <Button variant="whatsapp" size="lg" href={buildWaLink('שלום, אשמח להזמין ארוחת שישי 🍲')} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} /> הזמנה בוואטסאפ
          </Button>
        </div>
      </PageHeader>

      {/* תמונה + תפריט */}
      <section className="bg-cream py-14 sm:py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Img src="/images/dishes/friday.jpg" fallback="/images/dishes/alegria-spread.jpg" alt="ארוחת שישי של אלגריה" ratio="4/5" className="shadow-warm-lg" />
              <div className="mt-6 rounded-2xl bg-cream-200 p-5 text-center">
                <p className="font-black text-charcoal">התפריט מתחלף מדי שבוע 🍽️</p>
                <p className="mt-1 text-sm text-charcoal-soft">שלחו הודעה ונעדכן אתכם בתפריט של השבוע</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl font-black text-charcoal">תפריט שישי לדוגמה</h2>
            <div className="mt-8 space-y-8">
              {fridayMenu.map((cat) => (
                <div key={cat.category}>
                  <h3 className="mb-3 flex items-center gap-3 text-xl font-black text-charcoal">
                    <span className="h-px flex-1 bg-charcoal/20" />
                    {cat.category}
                    <span className="h-px flex-1 bg-charcoal/20" />
                  </h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-3 border-b border-dashed border-charcoal/15 pb-2">
                        <span className="font-bold text-charcoal">{item.name}</span>
                        {item.note && <span className="text-sm text-charcoal-soft">{item.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* איך מזמינים */}
      <section className="bg-cream-50 py-14 sm:py-16 lg:py-24">
        <Container>
          <h2 className="text-center text-3xl font-black text-charcoal sm:text-4xl">איך מזמינים?</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {fridayHow.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="rounded-2xl bg-cream p-7 text-center shadow-warm">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-950 text-2xl font-black text-honey">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-xl font-black text-charcoal">{s.title}</h3>
                  <p className="mt-2 text-charcoal-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="רביעי בערב זה הדדליין"
        subtitle="שלחו הודעה עכשיו ותפריט השבוע יחכה לכם בוואטסאפ."
      />
    </>
  )
}

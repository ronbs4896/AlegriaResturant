import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'

// כותרת עמוד משותפת (עמודים משניים).
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 pb-16 pt-[calc(var(--header-h)+3rem)] text-cream sm:pb-20">
      <div className="warm-grain absolute inset-0 opacity-100" />
      <Container className="relative">
        <Reveal>
          {eyebrow && <span className="eyebrow text-honey">{eyebrow}</span>}
          <h1 className="mt-3 text-4xl font-black text-cream sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-cream/75">{subtitle}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}

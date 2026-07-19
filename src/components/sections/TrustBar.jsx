import Container from '../ui/Container.jsx'
import { trust } from '../../data/trust.js'

// פס הוכחות טיפוגרפי — מספרים ומילים, מפרידי hairline. בלי אייקונים.
export default function TrustBar() {
  return (
    <section className="border-b border-charcoal/10 bg-cream-50 py-7">
      <Container>
        <ul className="grid grid-cols-2 divide-charcoal/10 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse">
          {trust.map((t) => (
            <li key={t.label} className="px-4 py-2 text-center lg:py-0">
              <div className="text-lg font-black leading-tight text-charcoal">{t.label}</div>
              <div className="mt-0.5 text-xs font-bold uppercase tracking-wide text-charcoal-soft">
                {t.note}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

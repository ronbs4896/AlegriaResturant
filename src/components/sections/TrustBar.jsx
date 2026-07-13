import { BadgeCheck, ShieldCheck, Award, Truck } from 'lucide-react'
import Container from '../ui/Container.jsx'
import { trust } from '../../data/trust.js'

const ICONS = { BadgeCheck, ShieldCheck, Award, Truck }

// פס תעודות ואמון — מאופק, קרם, בלי רעש.
export default function TrustBar() {
  return (
    <section className="border-b border-charcoal/10 bg-cream-50 py-6">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
          {trust.map((t) => {
            const Icon = ICONS[t.icon] || BadgeCheck
            return (
              <li key={t.label} className="flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <Icon size={20} />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-black text-charcoal">{t.label}</div>
                  <div className="text-xs text-charcoal-soft">{t.note}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react'
import Container from '../ui/Container.jsx'
import { site } from '../../data/site.js'
import { footerNav } from '../../data/nav.js'
import { buildWaLink } from '../../lib/whatsapp.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="warm-grain bg-charcoal-950 text-cream/85">
      <Container className="relative py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* מותג */}
          <div>
            <img
              src="/images/logo/logo.jpg"
              alt={site.name}
              className="mb-4 h-16 w-16 rounded-full object-cover"
            />
            <p className="text-xl font-black text-cream">{site.name}</p>
            <p className="mt-2 max-w-xs text-cream/60">{site.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a href={buildWaLink()} target="_blank" rel="noopener noreferrer" aria-label="וואטסאפ"
                 className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#25D366]">
                <MessageCircle size={19} />
              </a>
              {site.social.instagram && (
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם"
                   className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-orange">
                  <Instagram size={19} />
                </a>
              )}
              {site.social.facebook && (
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="פייסבוק"
                   className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-orange">
                  <Facebook size={19} />
                </a>
              )}
            </div>
          </div>

          {/* קישורים */}
          {Object.values(footerNav).map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-black text-cream">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-cream/65 transition-colors hover:text-honey">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* פרטי קשר */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <a href={`tel:${site.phone.dial}`} className="flex items-center gap-2 hover:text-honey">
            <Phone size={16} className="text-orange" /> <span dir="ltr" className="num">{site.phone.display}</span>
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-honey">
            <Mail size={16} className="text-orange" /> {site.email}
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-orange" /> {site.serviceArea}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-orange" /> {site.hours[0].days}: {site.hours[0].time}
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-cream/50 sm:flex-row">
          <p>© {year} {site.name}. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <Link to="/accessibility" className="hover:text-honey">הצהרת נגישות</Link>
            <Link to="/privacy" className="hover:text-honey">מדיניות פרטיות</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

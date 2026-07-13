import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import { mainNav } from '../../data/nav.js'
import { site } from '../../data/site.js'
import { useLeadModal } from '../../context/LeadModalContext.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { openLead } = useLeadModal()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setDrawer(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawer])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-50/95 shadow-warm backdrop-blur-md' : 'bg-cream-50/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo size={48} withText />

        {/* ניווט דסקטופ */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="ניווט ראשי">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `link-underline text-[15px] font-bold transition-colors ${
                  isActive ? 'text-orange' : 'text-charcoal hover:text-orange'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.dial}`}
            className="hidden items-center gap-1.5 font-bold text-charcoal hover:text-orange md:flex"
            aria-label="התקשרו אלינו"
          >
            <Phone size={18} />
            <span dir="ltr" className="num">{site.phone.display}</span>
          </a>
          <Button variant="primary" size="sm" onClick={() => openLead()} className="hidden sm:inline-flex">
            קבלו הצעת מחיר
          </Button>
          <button
            className="rounded-lg p-2 text-charcoal lg:hidden"
            onClick={() => setDrawer(true)}
            aria-label="פתיחת תפריט"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* דרואר מובייל */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-charcoal-950/60 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              className="fixed inset-y-0 z-50 flex w-[82%] max-w-xs flex-col bg-cream-50 p-6 shadow-warm-lg lg:hidden inset-inline-start-0"
              style={{ insetInlineStart: 0 }}
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo size={44} />
                <button onClick={() => setDrawer(false)} aria-label="סגירת תפריט" className="rounded-lg p-1">
                  <X size={26} />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="ניווט מובייל">
                {mainNav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-lg font-bold ${
                        isActive ? 'bg-cream-200 text-orange' : 'text-charcoal hover:bg-cream-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-6">
                <Button variant="primary" size="md" onClick={() => { setDrawer(false); openLead() }} className="w-full">
                  קבלו הצעת מחיר
                </Button>
                <a href={`tel:${site.phone.dial}`} className="flex items-center justify-center gap-2 font-bold text-charcoal">
                  <Phone size={18} /> <span dir="ltr" className="num">{site.phone.display}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

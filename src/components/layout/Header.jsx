import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import { mainNav, servicesActivePaths } from '../../data/nav.js'
import { site } from '../../data/site.js'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { trackContact } from '../../lib/analytics.js'

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
        <Logo size={44} withText />

        {/* ניווט דסקטופ */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="ניווט ראשי">
          {mainNav.map((item) =>
            item.children ? (
              <ServicesDropdown key={item.label} item={item} pathname={pathname} />
            ) : (
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
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.dial}`}
            onClick={() => trackContact('phone', { source: 'header' })}
            className="hidden items-center gap-1.5 font-bold text-charcoal hover:text-orange xl:flex"
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

      {/* דרואר מובייל — ב-portal ל-body (backdrop-blur בהדר יוצר containing block) */}
      {createPortal(
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-charcoal-950/60 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              className="fixed inset-y-0 end-0 z-[95] flex h-full w-[82%] max-w-xs flex-col overflow-y-auto bg-cream-50 p-6 shadow-warm-lg lg:hidden"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              role="dialog"
              aria-modal="true"
              aria-label="תפריט ניווט"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo size={42} />
                <button onClick={() => setDrawer(false)} aria-label="סגירת תפריט" className="rounded-lg p-1">
                  <X size={26} />
                </button>
              </div>
              <nav className="flex flex-col gap-0.5" aria-label="ניווט מובייל">
                {mainNav.map((item) =>
                  item.children ? (
                    <div key={item.label} className="py-1">
                      <div className="px-3 pb-1 pt-2 text-xs font-black uppercase tracking-wider text-charcoal-soft">
                        {item.label}
                      </div>
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to + c.label}
                          to={c.to}
                          end
                          className={({ isActive }) =>
                            `block rounded-lg px-4 py-2.5 font-bold ${
                              isActive ? 'bg-cream-200 text-orange' : 'text-charcoal hover:bg-cream-100'
                            }`
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                      <div className="mx-3 mt-2 border-b border-charcoal/10" />
                    </div>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `rounded-lg px-3 py-2.5 text-base font-bold ${
                          isActive ? 'bg-cream-200 text-orange' : 'text-charcoal hover:bg-cream-100'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                )}
              </nav>
              <div className="mt-auto space-y-3 pt-6">
                <Button variant="primary" size="md" onClick={() => { setDrawer(false); openLead() }} className="w-full">
                  קבלו הצעת מחיר
                </Button>
                <a href={`tel:${site.phone.dial}`} onClick={() => trackContact('phone', { source: 'mobile_drawer' })} className="flex items-center justify-center gap-2 font-bold text-charcoal">
                  <Phone size={18} /> <span dir="ltr" className="num">{site.phone.display}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
    </header>
  )
}

// dropdown שירותים — נגיש בעכבר ובמקלדת
function ServicesDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = servicesActivePaths.some((p) => pathname.startsWith(p))

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false) }}
        className={`link-underline inline-flex items-center gap-1 text-[15px] font-bold transition-colors ${
          active ? 'text-orange' : 'text-charcoal hover:text-orange'
        }`}
      >
        {item.label}
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute start-0 top-full z-50 w-60 pt-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-cream-50 p-2 shadow-warm-lg">
              {item.children.map((c, i) => (
                <Link
                  key={c.to + c.label}
                  to={c.to}
                  className={`block rounded-xl px-4 py-2.5 font-bold text-charcoal transition-colors hover:bg-cream-200 hover:text-orange ${
                    i === item.children.length - 1 ? 'mt-1 border-t border-charcoal/10 pt-3 text-orange' : ''
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

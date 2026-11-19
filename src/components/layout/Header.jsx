import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BrandMark from '../brand/BrandMark.jsx'
import LineIcon from '../brand/LineIcon.jsx'
import Button from '../ui/Button.jsx'
import { mainNav, servicesMenu, servicesPromo, servicesActivePaths } from '../../data/nav.js'
import { site } from '../../data/site.js'
import { useLeadModal } from '../../context/LeadModalContext.jsx'
import { trackContact } from '../../lib/analytics.js'

// ============================================================
//  כותרת עליונה — RefHeader.dc.html.
//
//  דסקטופ (lg+): סימן המותג, "השירותים שלנו" שפותח תפריט רחב,
//  ארבעה קישורים וגלולת "הצעת מחיר". התפריט נפתח בלחיצה ולא
//  במעבר עכבר, כדי שיעבוד גם במגע ובמקלדת.
//  מובייל: סימן המותג והמבורגר שפותח מגירה מימין.
// ============================================================
const ease = [0.22, 1, 0.36, 1]

const isServicesPath = (pathname) =>
  servicesActivePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))

function Chevron({ open }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease }}
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

// חץ שמצביע קדימה בכיוון הקריאה (שמאלה ב-RTL)
export function ArrowForward({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const { openLead } = useLeadModal()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const headerRef = useRef(null)
  const menuBtnRef = useRef(null)
  const burgerRef = useRef(null)

  const servicesActive = isServicesPath(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // מעבר עמוד סוגר הכול
  useEffect(() => {
    setMenu(false)
    setDrawer(false)
  }, [pathname])

  // תפריט השירותים: Escape מחזיר את הפוקוס לכפתור, לחיצה בחוץ סוגרת
  useEffect(() => {
    if (!menu) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMenu(false)
      menuBtnRef.current?.focus()
    }
    const onDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenu(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [menu])

  const closeDrawer = () => {
    setDrawer(false)
    burgerRef.current?.focus()
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || menu ? 'shadow-[0_12px_30px_-20px_rgba(46,42,39,0.45)]' : ''
      }`}
    >
      <div className="shell flex min-h-[var(--header-h)] items-center justify-between gap-x-6">
        <BrandMark tagline="הסעדה למפעלים" imgClassName="h-11 w-11 lg:h-[50px] lg:w-[50px]" />

        <nav
          aria-label="ניווט ראשי"
          className="hidden items-center gap-x-6 text-body font-bold lg:flex xl:gap-x-[30px]"
        >
          <button
            ref={menuBtnRef}
            type="button"
            aria-expanded={menu}
            aria-controls="services-menu"
            onClick={() => setMenu((v) => !v)}
            className={`inline-flex min-h-11 items-center gap-1.5 transition-colors ${
              menu || servicesActive ? 'text-olive' : 'text-charcoal hover:text-olive'
            }`}
          >
            השירותים שלנו
            <Chevron open={menu} />
          </button>
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center transition-colors ${
                  isActive ? 'text-olive' : 'text-charcoal hover:text-olive'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="brand"
            shape="pill"
            size="brand"
            onClick={() => openLead()}
            className="hidden lg:inline-flex"
          >
            הצעת מחיר
            <ArrowForward />
          </Button>
          <button
            ref={burgerRef}
            type="button"
            aria-label="פתיחת תפריט"
            aria-expanded={drawer}
            aria-controls="mobile-drawer"
            onClick={() => setDrawer(true)}
            className="-me-2 flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-olive-50 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>{menu && <ServicesMenu onNavigate={() => setMenu(false)} />}</AnimatePresence>

      <MobileDrawer
        open={drawer}
        onClose={closeDrawer}
        onLead={() => {
          setDrawer(false)
          openLead()
        }}
      />
    </header>
  )
}

// ============================================================
//  תפריט השירותים — רשת של שבעה שירותים וכרטיס נטוי.
//  שמונה תאים = 4×2 מלא ב-xl. auto-fit של העיצוב יצר 5+3 עם
//  כותרות שנשברות לשתי שורות.
//  הקצה התחתון הגלי הוא clip-path, ולכן הצל יושב על עטיפה
//  חיצונית (drop-shadow) — box-shadow היה נחתך יחד איתו.
// ============================================================
function ServicesMenu({ onNavigate }) {
  return (
    <motion.div
      id="services-menu"
      className="absolute inset-x-0 top-full hidden lg:block"
      initial={{ opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% -25% 0%)' }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.22, ease: 'easeIn' } }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="shell drop-shadow-[0_22px_26px_rgba(0,0,0,0.16)]">
        <div
          className="bg-paper-200 px-[30px] pb-[54px] pt-[30px]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 82% 97%, 64% 91%, 46% 98%, 28% 92%, 12% 97%, 0 91%)',
          }}
        >
          <motion.ul
            className="m-0 grid list-none grid-cols-3 gap-x-[18px] gap-y-2.5 p-0 xl:grid-cols-4"
            initial="hidden"
            animate="shown"
            transition={{ staggerChildren: 0.04, delayChildren: 0.12 }}
          >
            {servicesMenu.map((item) => (
              <motion.li
                key={item.to}
                variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45, ease }}
              >
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`flex min-h-11 items-start gap-3.5 rounded-md px-[18px] py-4 transition-colors ${
                    item.featured ? 'bg-olive-100' : 'hover:bg-olive-100/60'
                  }`}
                >
                  <LineIcon d={item.icon} size={34} strokeWidth={2} className="mt-0.5 shrink-0 text-olive" />
                  <span className="flex flex-col gap-1">
                    <span className="text-[17px] font-black text-charcoal">{item.title}</span>
                    <span className="text-[14px] font-medium leading-[1.55] text-charcoal-600">
                      {item.text}
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
            <motion.li
              className="self-center"
              variants={{
                hidden: { opacity: 0, rotate: -8, scale: 0.9 },
                shown: { opacity: 1, rotate: -1.5, scale: 1 },
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 13 }}
            >
              <div
                className="flex flex-col gap-3.5 bg-olive px-[22px] pb-5 pt-[22px] text-white"
                style={{ clipPath: 'polygon(0 3%, 100% 0, 98% 100%, 2% 97%)' }}
              >
                <p className="m-0 text-[18px] font-black leading-[1.35]">
                  {servicesPromo.lines[0]}
                  <br />
                  {servicesPromo.lines[1]}
                </p>
                <Link
                  to={servicesPromo.to}
                  onClick={onNavigate}
                  className="inline-flex min-h-11 rotate-[1.5deg] items-center gap-2 self-start bg-white px-[18px] text-[15px] font-extrabold text-charcoal transition-colors hover:bg-olive-50"
                >
                  {servicesPromo.cta}
                  <ArrowForward />
                </Link>
              </div>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
//  מגירת מובייל. דיאלוג מודאלי: הפוקוס נכנס פנימה ונשאר בה
//  עד הסגירה, Escape סוגר, והפוקוס חוזר לכפתור ההמבורגר.
// ============================================================
function MobileDrawer({ open, onClose, onLead }) {
  const panelRef = useRef(null)
  // onClose נוצר מחדש בכל רינדור של הכותרת; ref מונע מהאפקט לרוץ
  // שוב ולהקפיץ את הפוקוס לראש המגירה באמצע ניווט במקלדת.
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const focusables = () => panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? []
    const raf = requestAnimationFrame(() => focusables()[0]?.focus())
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal-950/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeRef.current()}
          />
          <motion.div
            ref={panelRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            className="absolute inset-y-0 start-0 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <BrandMark imgClassName="h-11 w-11" onClick={() => closeRef.current()} />
              <button
                type="button"
                aria-label="סגירת תפריט"
                onClick={() => closeRef.current()}
                className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-olive-50"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="ניווט מובייל" className="flex flex-1 flex-col px-3 pb-4">
              <p className="m-0 px-3 pb-2 pt-1 text-micro font-bold tracking-[0.08em] text-olive-700">
                השירותים שלנו
              </p>
              <ul className="m-0 flex list-none flex-col p-0">
                {servicesMenu.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => closeRef.current()}
                      className="flex min-h-12 items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-olive-50"
                    >
                      <LineIcon d={item.icon} size={28} strokeWidth={2} className="shrink-0 text-olive" />
                      <span className="flex flex-col">
                        <span className="text-[16px] font-black text-charcoal">{item.title}</span>
                        <span className="text-[13px] font-medium leading-snug text-charcoal-600">
                          {item.text}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="m-0 mt-3 flex list-none flex-col border-t border-olive-100 p-0 pt-3">
                {mainNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => closeRef.current()}
                      className={({ isActive }) =>
                        `flex min-h-12 items-center rounded-lg px-3 text-[17px] font-bold hover:bg-olive-50 ${
                          isActive ? 'text-olive' : 'text-charcoal'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-olive-100 px-5 py-5">
              <Button variant="brand" shape="pill" size="brand" onClick={onLead} className="w-full">
                הצעת מחיר
                <ArrowForward />
              </Button>
              <a
                href={`tel:${site.phone.dial}`}
                onClick={() => trackContact('phone', { source: 'mobile_drawer' })}
                className="flex min-h-11 items-center justify-center gap-2 font-bold text-charcoal"
              >
                <span className="text-charcoal-600">או בטלפון</span>
                <span dir="ltr" className="num text-[18px] font-black">
                  {site.phone.display}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

import { Link } from 'react-router-dom'
import BrandMark from '../brand/BrandMark.jsx'
import { site } from '../../data/site.js'
import { footerNav, legalNav } from '../../data/nav.js'
import { googleReviews } from '../../data/reviews.js'
import { buildWaLink } from '../../lib/whatsapp.js'
import { trackContact } from '../../lib/analytics.js'
import { useLeadModal } from '../../context/LeadModalContext.jsx'

// ============================================================
//  פוטר — מתוך Ref-Home.dc.html.
//  אייקוני רשתות מוצגים רק כשיש להם כתובת אמיתית ב-site.js;
//  קישור "תקנון האתר" מהעיצוב לא מוצג כי אין עמוד תקנון.
// ============================================================
const socialPaths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7h4v-7h3l1-4h-4V7.5a1 1 0 0 1 1-1h2z" />,
  whatsapp: (
    <>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1a3.5 3.5 0 0 1-2-2l1-1-1-2z" />
    </>
  ),
  google: (
    <>
      <path d="M20 12.2c0-.6 0-1.1-.1-1.7H12v3.3h4.5a3.9 3.9 0 0 1-1.7 2.5v2.1h2.7c1.6-1.5 2.5-3.6 2.5-6.2z" />
      <path d="M12 20.5c2.3 0 4.2-.8 5.5-2.1l-2.7-2.1a5.1 5.1 0 0 1-7.6-2.7H4.4v2.2A8.5 8.5 0 0 0 12 20.5z" />
      <path d="M7.2 13.6a5 5 0 0 1 0-3.2V8.2H4.4a8.5 8.5 0 0 0 0 7.6z" />
      <path d="M12 6.9c1.3 0 2.4.4 3.3 1.3l2.4-2.4A8.5 8.5 0 0 0 4.4 8.2l2.8 2.2A5.1 5.1 0 0 1 12 6.9z" />
    </>
  ),
}

const linkCls =
  'inline-flex min-h-8 items-center font-semibold text-charcoal-600 transition-colors hover:text-olive-700'

export default function Footer() {
  const { openLead } = useLeadModal()
  const year = new Date().getFullYear()
  const open = site.hours.filter((h) => h.time !== 'סגור')

  const social = [
    { key: 'instagram', label: 'אינסטגרם', href: site.social.instagram },
    { key: 'facebook', label: 'פייסבוק', href: site.social.facebook },
    { key: 'whatsapp', label: 'וואטסאפ', href: buildWaLink(), track: true },
    { key: 'google', label: 'הפרופיל שלנו ב-Google', href: googleReviews.profileUrl },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-olive-100 bg-paper pb-[4.5rem] pt-16 sm:pb-0 lg:pt-24">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="flex max-w-[460px] flex-[1_1_340px] flex-col gap-[22px]">
            <BrandMark imgClassName="h-[52px] w-[52px]" nameClassName="text-[22px]" className="self-start" />
            <p className="m-0 text-[15px] leading-[1.8] text-charcoal-600">
              מטבח בשרי כשר בקרית גת שמבשל כל בוקר כ-3,000 מנות חמות. הסעדה יומית למפעלים, אירועים ומכירת שישי
              בכל הדרום.
            </p>
            <span className="inline-flex items-center gap-2 text-[14px] font-bold text-olive-700">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
              </svg>
              כשרות בהשגחת הרבנות הראשית קרית גת
            </span>
            {social.length > 0 && (
              <ul aria-label="הרשתות שלנו" className="m-0 flex list-none gap-3 p-0">
                {social.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      onClick={s.track ? () => trackContact('whatsapp', { source: 'footer' }) : undefined}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-olive-100 bg-white text-olive transition-colors hover:border-olive hover:bg-olive hover:text-white"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {socialPaths[s.key]}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid flex-[1_1_560px] gap-x-[clamp(24px,4vw,72px)] gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="m-0 mb-4 text-base font-black text-charcoal">{col.title}</h2>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className={linkCls}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="m-0 mb-4 text-base font-black text-charcoal">דברו איתנו</h2>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
                <li>
                  <a
                    href={`tel:${site.phone.dial}`}
                    onClick={() => trackContact('phone', { source: 'footer' })}
                    dir="ltr"
                    className="num inline-flex min-h-9 items-center text-[20px] font-black text-charcoal hover:text-olive-700"
                  >
                    {site.phone.display}
                  </a>
                </li>
                <li className="leading-[1.7] text-charcoal-600">
                  {open.map((h) => (
                    <span key={h.days} className="block">
                      {h.days} <span dir="ltr">{h.time}</span>
                    </span>
                  ))}
                </li>
                <li className="text-charcoal-600">קרית גת וכל הדרום</li>
                <li>
                  <button
                    type="button"
                    onClick={() => openLead()}
                    className="inline-flex min-h-8 items-center font-extrabold text-olive-700 hover:text-olive"
                  >
                    אני רוצה הצעת מחיר
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-olive-100 pb-8 pt-7 text-[13px] font-semibold text-charcoal-600">
          <p className="m-0">
            © <span dir="ltr">{year}</span> {site.name}. כל הזכויות שמורות.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

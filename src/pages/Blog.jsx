// Generated from the approved canvas design (Ref-Blog.html), posts from content/blog. הקופי של העמוד נמצא כאן.
import { Link } from 'react-router-dom'
import { sx } from '../lib/sx.js'
import WaButton from '../components/brand/WaButton.jsx'
import { usePageMotion } from '../lib/motion.js'
import { useLeadForm } from '../lib/useLeadForm.js'
import Seo from '../components/seo/Seo.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { useMemo, useState } from 'react'
import { posts } from '../lib/posts.js'
import PostCard, { coverOf, formatDate, chip } from '../components/brand/PostCard.jsx'


function PostsSection() {
  const [filter, setFilter] = useState('הכל')
  const [featured, ...others] = posts
  const cats = useMemo(() => ['הכל', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))], [])
  const shown = posts.filter((p) => filter === 'הכל' || p.category === filter)
  if (!featured) return null
  return (
    <section aria-label="מאמרים" style={{ padding: '64px clamp(24px, 5vw, 80px) 96px' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 48 }}>
        <article data-a="card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40, width: '100%' }}>
          <Link to={`/blog/${featured.slug}`} style={{ flex: '1 1 480px', display: 'block' }} tabIndex={-1} aria-hidden="true">
            <img src={coverOf(featured)} alt={featured.coverAlt || ''} onError={(e) => { e.currentTarget.src = '/images/site/spread.jpg' }} style={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 26 }} />
          </Link>
          <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {featured.category && <span style={chip}>{featured.category}</span>}
            <h2 style={{ margin: 0, fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)', lineHeight: 1.25, fontWeight: 900 }}>
              <Link to={`/blog/${featured.slug}`} style={{ color: '#2E2A27', textDecoration: 'none' }}>{featured.title}</Link>
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.85 }}>{featured.excerpt || featured.description}</p>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: 13 }}>
              <span>{featured.author}</span><span dir="ltr">{formatDate(featured.date)}</span><span>{featured.readingMinutes} דק׳ קריאה</span>
            </span>
            <Link to={`/blog/${featured.slug}`} style={{ minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 28px', borderRadius: 999, background: 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)', color: '#2E2A27', fontSize: 15, fontWeight: 700, textDecoration: 'none', alignSelf: 'flex-start', marginTop: 6 }}>לקריאת המדריך</Link>
          </div>
        </article>
        {others.length > 0 && (
          <>
            <div style={{ height: 1, background: '#FDEBD3' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', lineHeight: 1.2, fontWeight: 900 }}>כל המאמרים</h2>
                <div role="group" aria-label="סינון לפי נושא" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
                  {cats.map((c) => {
                    const sel = c === filter
                    const n = c === 'הכל' ? posts.length : posts.filter((p) => p.category === c).length
                    return (
                      <button key={c} type="button" aria-pressed={sel} onClick={() => setFilter(c)}
                        style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 18px', borderRadius: 999, border: `1.5px solid ${sel ? '#B4511E' : '#FDEBD3'}`, background: sel ? 'linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)' : '#FFFFFF', color: '#2E2A27', font: 'inherit', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                        <span>{c}</span>
                        <span style={{ minWidth: 24, height: 24, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: sel ? 'rgba(255, 255, 255, 0.55)' : '#FFF5E8', fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <span aria-live="polite" style={{ fontSize: 14 }}>{`מציגים ${shown.length} מאמרים`}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                {posts.map((p) => <PostCard key={p.slug} post={p} hidden={!(filter === 'הכל' || p.category === filter)} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default function Blog({ seoPath }) {
  const root = usePageMotion()
  const { formOpen, sent, sending, idle, send, reset } = useLeadForm("בלוג")
  const seo = getSeo(seoPath)
  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seoPath} />
      <div ref={root} dir="rtl" style={{ background: "#FFFFFF", color: "#2E2A27", fontFamily: "'Birzia', 'Heebo', system-ui, sans-serif", fontWeight: "500" }} data-page="Blog">
      {" "}
      {" "}
      <section data-a="hero" aria-labelledby="h1" style={{ padding: "0" }}>
        <div style={{ width: "100%", margin: "0", position: "relative", minHeight: "480px", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", display: "flex", alignItems: "center" }}>
          <img src="/images/site/tagine_orange.jpg" data-a="hero-img" alt="טאג׳ין כתום עם קוסקוס" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(270deg, rgba(20, 17, 15, 0.82) 0%, rgba(20, 17, 15, 0.58) 50%, rgba(20, 17, 15, 0.25) 100%)" }} />
          <div style={{ position: "relative", width: "100%", padding: "56px clamp(24px, 5vw, 80px) 96px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", color: "#FFFFFF" }}>
            <nav aria-label="פירורי לחם" data-a="hero-fade" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
              <Link to="/" style={{ color: "#FFFFFF" }}>
                {"בית"}
              </Link>
              {" / בלוג"}
            </nav>
            <h1 id="h1" style={{ margin: "0", fontSize: "clamp(2.3rem, 4.2vw, 3.5rem)", lineHeight: "1.12", fontWeight: "900", maxWidth: "760px" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"מה שלמדנו"}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
                <span data-a="hero-line" style={{ display: "block" }}>
                  {"ב-25 שנה של סירים גדולים"}
                </span>
              </span>
            </h1>
            <p data-a="hero-fade" style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px" }}>
              {"מדריכים קצרים למנהלי רכש, למארגני אירועים ולמי שמתכנן שבת. בלי מילים מיותרות, עם המספרים מהמטבח."}
            </p>
          </div>
        </div>
      </section>
      {" "}
      <PostsSection />
      {" "}
      <section id="contact" aria-labelledby="cta-h" style={{ padding: "96px clamp(24px, 5vw, 80px)" }}>
        <div data-a="panel" style={{ width: "100%", background: "#FFF5E8", borderRadius: "26px", padding: "clamp(28px, 4vw, 56px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
          <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 id="cta-h" style={{ margin: "0", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: "1.2", fontWeight: "900", color: "#2E2A27" }}>
              {"יש לכם שאלה שלא מצאתם עליה מאמר?"}
            </h2>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.8", color: "#2E2A27", maxWidth: "480px" }}>
              {"שאלו אותנו. התשובה הכי טובה מגיעה בטלפון, ולפעמים היא הופכת למאמר הבא."}
            </p>
            <a href="tel:+972545437526" dir="ltr" style={{ textAlign: "right", fontSize: "30px", fontWeight: "900", color: "#2E2A27", textDecoration: "none" }}>
              {"054-543-7526"}
            </a>
            <WaButton style={{ alignSelf: "flex-start" }} />
            <span style={{ fontSize: "14px", color: "#2E2A27" }}>
              {"ראשון עד חמישי "}
              <span dir="ltr">
                {"08:00–16:00"}
              </span>
              {", שישי "}
              <span dir="ltr">
                {"07:00–14:00"}
              </span>
            </span>
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4h18l8 8v32H12zM30 4v8h8M18 24h12M18 30h12M18 36h8" />
                  </svg>
                </span>
                {"תשובה אישית, לא תבנית"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 6h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C20 40 8 28 8 10a4 4 0 0 1 4-4z" />
                  </svg>
                </span>
                {"אפשר גם בטלפון"}
              </li>
              <li data-a="perk" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "700", color: "#2E2A27" }}>
                <span style={{ width: "40px", height: "40px", flexShrink: "0", borderRadius: "50%", background: "#FFFFFF", border: "1px solid #FDEBD3", color: "#B4511E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10zM17 24l5 5 9-10" />
                  </svg>
                </span>
                {"בלי רשימות תפוצה"}
              </li>
            </ul>
          </div>
          {formOpen ? (<>
            
            <form style={{ flex: "1.4 1 480px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }} onSubmit={(e) => { e.preventDefault(); send(e) }} noValidate>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"שם "}
                <input type="text" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #FDEBD3", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "500" }} name="שם" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700" }}>
                {"טלפון "}
                <input type="tel" dir="ltr" style={{ minHeight: "50px", borderRadius: "999px", border: "1px solid #FDEBD3", background: "#FFFFFF", padding: "0 18px", font: "inherit", fontWeight: "500", textAlign: "right" }} name="טלפון" required />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "700", gridColumn: "1 / -1" }}>
                {"השאלה שלכם "}
                <textarea rows="3" style={{ borderRadius: "22px", border: "1px solid #FDEBD3", background: "#FFFFFF", padding: "14px 18px", font: "inherit", fontWeight: "500", resize: "vertical" }} name="השאלה שלכם" />
              </label>
              <button type="button" onClick={send} style={{ gridColumn: "1 / -1", minHeight: "52px", border: "0", borderRadius: "999px", background: "linear-gradient(135deg, #FCC50D 0%, #F5871F 100%)", color: "#2E2A27", font: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
                {idle ? (<>
                  <span>
                    {"שלחו לי תשובה"}
                  </span>
                </>) : null}
                {sending ? (<>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                    <span className="spin" aria-hidden="true" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(46, 42, 39, 0.3)", borderTopColor: "#2E2A27" }} />
                    {"שולחים"}
                  </span>
                </>) : null}
              </button>
              <WaButton variant="inline" label="או בוואטסאפ" style={{ gridColumn: "1 / -1", justifySelf: "center" }} />
            </form>
            
          </>) : null}
          {sent ? (<>
            
            <div data-a="thanks" role="status" style={{ flex: "1.4 1 480px", minHeight: "300px", background: "#FFFFFF", border: "1px solid #FDEBD3", borderRadius: "22px", padding: "36px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center" }}>
              <span data-a="tk-badge" style={{ width: "88px", height: "88px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
                  <circle cx="44" cy="44" r="40" fill="#FDEBD3" />
                  <circle data-a="tk-ring" cx="44" cy="44" r="40" stroke="#B4511E" strokeWidth="3" transform="rotate(-90 44 44)" />
                  <path data-a="tk-check" d="M28 45l11 11 22-24" stroke="#B4511E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div data-a="tk-txt" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: "0", fontSize: "24px", fontWeight: "900", color: "#2E2A27" }}>
                  {"השאלה הגיעה אלינו"}
                </h3>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.7", color: "#2E2A27", maxWidth: "420px" }}>
                  {"נחזור אליכם עם תשובה בהקדם. אולי היא תהפוך למאמר הבא."}
                </p>
                <button type="button" onClick={reset} style={{ marginTop: "8px", minHeight: "44px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid #FDEBD3", background: "#FFFFFF", color: "#2E2A27", font: "inherit", fontSize: "15px", fontWeight: "800", cursor: "pointer" }}>
                  {"שליחה נוספת"}
                </button>
              </div>
            </div>
            
          </>) : null}
        </div>
      </section>
      {" "}
      {" "}
    </div>
    </>
  )
}

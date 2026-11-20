// מסמך משפטי ממוספר (סעיפים 1, 1.1, 1.2...) לעמודי התקנון והמדיניות
import Seo from '../seo/Seo.jsx'
import { PageHero } from './Kit.jsx'
import { usePageMotion } from '../../lib/motion.js'
import { getSeo } from '../../data/seoRoutes.js'
import { site } from '../../data/site.js'

// item: מחרוזת או JSX = תת-סעיף ממוספר; { list: [...] } = רשימה תחת התת-סעיף הקודם
export default function LegalDoc({ path, title, intro, preamble, sections }) {
  const root = usePageMotion()
  const seo = getSeo(path)
  return (
    <div ref={root} dir="rtl" style={{ background: '#FFFFFF', color: '#2E2A27' }}>
      <Seo title={seo.title} description={seo.description} path={path} />
      <PageHero crumb={title} title={title} intro={intro} />
      <section style={{ padding: '0 clamp(20px, 5vw, 80px) clamp(56px, 7vw, 96px)' }}>
        <article className="legal-doc">
          {preamble ? <div className="legal-preamble">{preamble}</div> : null}
          <nav aria-label="תוכן המסמך" className="legal-toc">
            <b>תוכן המסמך</b>
            <ol>
              {sections.map((s, i) => (
                <li key={i}><a href={`#s${i + 1}`}>{s.title}</a></li>
              ))}
            </ol>
          </nav>
          {sections.map((s, i) => {
            let n = 0
            return (
              <section key={i} id={`s${i + 1}`} className="legal-sec" aria-labelledby={`s${i + 1}-t`}>
                <h2 id={`s${i + 1}-t`}><span className="legal-num">{i + 1}.</span> {s.title}</h2>
                {s.items.map((it, j) => {
                  if (it && it.list) {
                    return (
                      <ul key={j} className="legal-list">
                        {it.list.map((x, k) => <li key={k}>{x}</li>)}
                      </ul>
                    )
                  }
                  n += 1
                  return (
                    <p key={j} className="legal-p">
                      <span className="legal-num">{i + 1}.{n}</span>
                      <span>{it}</span>
                    </p>
                  )
                })}
              </section>
            )
          })}
          <p className="legal-updated">עדכון אחרון: {site.policiesUpdated}</p>
        </article>
      </section>
    </div>
  )
}

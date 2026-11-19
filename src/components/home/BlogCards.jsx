import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../brand/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Img from '../ui/Img.jsx'
import { posts } from '../../lib/posts.js'
import { blogSection } from '../../data/home.js'

// ============================================================
//  "מהבלוג" — שלושת המאמרים האחרונים, מ-content/blog. בעיצוב
//  הכרטיסים מקושרים ל-"#industrial" ו-"#business-south"; כאן
//  הם המאמרים האמיתיים, וכל מאמר חדש מתעדכן לבד.
// ============================================================
const ease = [0.22, 1, 0.36, 1]

// "2026-07-14" → "14.07.2026", בלי לעבור דרך Date ובלי הזזת אזור זמן
function shortDate(d) {
  const m = String(d ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return `${m[3]}.${m[2]}.${m[1]}`
  const date = new Date(d)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('he-IL')
}

// flushTop: כשהסקשן שלפניו לבן, הריפוד העליון כבר קיים שם —
// אותו כלל שהעיצוב מחיל בין שני סקשנים לבנים צמודים.
export default function BlogCards({ flushTop = false }) {
  const latest = posts.slice(0, 3)
  if (!latest.length) return null

  return (
    <section aria-labelledby="blog-title" className={`shell pb-10 ${flushTop ? 'pt-0' : 'pt-20 lg:pt-24'}`}>
      <div className="flex flex-col items-center">
        <SectionHeading id="blog-title" title={blogSection.title} subtitle={blogSection.subtitle} />

        <motion.ul
          className="m-0 mt-6 grid w-full list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {latest.map((p, i) => (
            <motion.li
              key={p.slug}
              // בשתי עמודות (טאבלט) מאמר שלישי היה נשאר לבד בשורה
              className={i === 2 ? 'sm:max-lg:hidden' : undefined}
              variants={{ hidden: { opacity: 0, y: 70, rotate: 2 }, shown: { opacity: 1, y: 0, rotate: 0 } }}
              transition={{ duration: 0.8, ease }}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-olive-100 bg-white">
                {/* התמונה מקשרת לאותו מאמר כמו הכותרת — מוסתרת מהמקלדת
                    ומקוראי מסך כדי שלא יישמעו שני קישורים זהים */}
                <Link to={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                  <Img src={p.cover} alt="" ratio="4/3" rounded="rounded-t-[18px] rounded-b-none" />
                </Link>
                <div className="flex flex-grow flex-col gap-2.5 px-[22px] pb-6 pt-5">
                  {p.category && (
                    <span className="self-start rounded-full bg-olive-100 px-3 py-[5px] text-[13px] font-extrabold text-olive-700">
                      {p.category}
                    </span>
                  )}
                  <h3 className="m-0 text-[19px] font-black leading-[1.35]">
                    <Link to={`/blog/${p.slug}`} className="text-charcoal hover:text-olive-700">
                      {p.title}
                    </Link>
                  </h3>
                  {p.excerpt && (
                    <p className="m-0 line-clamp-3 text-[15px] leading-[1.7] text-charcoal-600">{p.excerpt}</p>
                  )}
                  <p className="m-0 mt-auto flex flex-wrap gap-x-3.5 gap-y-1.5 pt-1 text-[13px] text-charcoal-600">
                    <span>{p.author}</span>
                    <span dir="ltr" className="num">
                      {shortDate(p.date)}
                    </span>
                    <span>{p.readingMinutes} דק׳ קריאה</span>
                  </p>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <Button variant="brand-outline" shape="pill" size="brand" to="/blog" className="mt-9">
          {blogSection.cta}
        </Button>
      </div>
    </section>
  )
}

// כרטיס מאמר בשפת המותג (מהעיצוב המאושר של עמוד הבלוג)
// ds-normalized
import { Link } from 'react-router-dom'

const FALLBACK = {
  'הסעדה למפעלים': '/images/site/factory.jpg',
  'אירועים': '/images/site/event.jpg',
  'שבת': '/images/site/friday.jpg',
}
export const coverOf = (p) => p.cover || FALLBACK[p.category] || '/images/site/spread.jpg'

export function formatDate(d) {
  if (!d) return ''
  const [y, m, day] = String(d).slice(0, 10).split('-')
  return y && m && day ? `${day}.${m}.${y}` : String(d)
}

export const chip = { alignSelf: 'flex-start', fontSize: 13, fontWeight: 700, color: '#2E2A27', background: '#FFF5E8', borderRadius: 999, padding: '5px 12px' }

export default function PostCard({ post, hidden }) {
  const to = `/blog/${post.slug}`
  return (
    <article data-post="" data-a="card" style={{ background: '#FFFFFF', border: '1px solid #FDEBD3', borderRadius: 18, overflow: 'hidden', display: hidden ? 'none' : 'flex', flexDirection: 'column' }}>
      <Link to={to} style={{ display: 'block' }} tabIndex={-1} aria-hidden="true">
        <img src={coverOf(post)} alt={post.coverAlt || ''} loading="lazy" onError={(e) => { e.currentTarget.src = '/images/site/spread.jpg' }}
          style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '18px 18px 0 0' }} />
      </Link>
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
        {post.category && <span style={chip}>{post.category}</span>}
        <h3 style={{ margin: 0, fontSize: "var(--fs-h4)", lineHeight: '1.3', fontWeight: 700 }}>
          <Link to={to} style={{ color: '#2E2A27', textDecoration: 'none' }}>{post.title}</Link>
        </h3>
        <p style={{ margin: 0, fontSize: "var(--fs-body-sm)", lineHeight: '1.7', color: '#2E2A27' }}>{post.excerpt || post.description}</p>
        <div style={{ marginTop: 'auto' }}>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: 14, color: '#2E2A27' }}>
            <span>{post.author}</span>
            <span dir="ltr">{formatDate(post.date)}</span>
            <span>{post.readingMinutes} דק׳ קריאה</span>
          </span>
        </div>
      </div>
    </article>
  )
}

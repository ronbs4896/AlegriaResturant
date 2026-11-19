import SectionHeading from '../brand/SectionHeading.jsx'
import Marquee from '../brand/Marquee.jsx'
import Button from '../ui/Button.jsx'
import { googleReviews, hasGoogleReviews } from '../../data/reviews.js'
import { reviewsSection } from '../../data/home.js'

// ============================================================
//  "מה כותבים עלינו בגוגל". מוצג רק כשיש ב-reviews.js ביקורות
//  אמיתיות מהפרופיל — בעיצוב הכול כאן מקומות שמורים ("[4.9]",
//  "[שם המבקר 1]"), ולמלא אותם בעצמנו היה המצאת ביקורות.
// ============================================================
function Stars({ value = 5, size = 20 }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} מתוך 5 כוכבים`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={n <= Math.round(value) ? 'fill-star' : 'fill-olive-100'}
        >
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  )
}

export default function GoogleReviews() {
  if (!hasGoogleReviews) return null
  const { rating, count, profileUrl, writeReviewUrl, items } = googleReviews

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-[var(--header-h)] bg-olive-50 py-20 lg:py-24">
      <div className="shell flex flex-col items-center">
        <SectionHeading id="reviews-title" title={reviewsSection.title} subtitle={reviewsSection.subtitle} />
        <div className="mt-[22px] flex flex-wrap items-center justify-center gap-x-8 gap-y-[18px] rounded-[22px] border border-olive-100 bg-white px-[30px] py-[22px]">
          {rating != null && (
            <div className="flex items-center gap-3.5">
              <span dir="ltr" className="num text-[44px] font-black leading-none">
                {rating.toFixed(1)}
              </span>
              <span className="flex flex-col gap-1">
                <Stars value={rating} />
                {count != null && (
                  <span className="text-[14px] text-charcoal-600">
                    <span className="num">{count}</span> ביקורות ב-Google
                  </span>
                )}
              </span>
            </div>
          )}
          {(profileUrl || writeReviewUrl) && (
            <>
              <span aria-hidden="true" className="hidden h-11 w-px bg-olive-100 sm:block" />
              <div className="flex flex-wrap gap-2.5">
                {profileUrl && (
                  <Button variant="brand" shape="pill" size="brand" href={profileUrl} target="_blank" rel="noopener noreferrer">
                    לכל הביקורות בגוגל
                  </Button>
                )}
                {writeReviewUrl && (
                  <Button variant="brand-outline" shape="pill" size="brand" href={writeReviewUrl} target="_blank" rel="noopener noreferrer">
                    כתבו לנו ביקורת
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-9">
        <Marquee
          label="ביקורות מ-Google"
          items={items}
          minCount={6}
          fade="10%"
          getKey={(r, i) => `${r.author}-${i}`}
          renderItem={(r) => (
            <figure className="m-0 flex w-[340px] flex-col gap-3 rounded-[20px] border border-olive-100 bg-white p-[22px]">
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-olive-100 font-black text-olive-700"
                >
                  {r.author?.trim()?.[0] ?? '?'}
                </span>
                <span className="flex flex-col gap-0.5">
                  <b className="text-[15px]">{r.author}</b>
                  <span className="text-micro text-charcoal-600">{r.when} · Google</span>
                </span>
              </figcaption>
              <Stars value={r.rating} size={16} />
              <blockquote className="m-0 line-clamp-5 text-[15px] leading-[1.7] text-charcoal">{r.text}</blockquote>
            </figure>
          )}
        />
      </div>
    </section>
  )
}

// רצועת טקסט נעה — עריכתית ושקטה: קרם, טקסט פחם, נקודות טרקוטה.
const items = [
  'הסעדה למפעלים', 'מכירת שישי', 'קייטרינג לאירועים', 'ארוחות מסובסדות',
  'אוכל ביתי', 'טרי ואיכותי', '25+ שנות ניסיון בדרום',
]

export default function Marquee() {
  // שכפול x2 + הזזה של 50%- = לופ חלק בלי תפר
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-cream-50 py-3.5" aria-hidden="true">
      <div className="no-scrollbar flex w-max animate-marquee whitespace-nowrap" style={{ direction: 'ltr' }}>
        {row.map((t, i) => (
          <span key={i} dir="rtl" className="mx-5 inline-flex items-center gap-5 text-base font-bold text-charcoal/80">
            {t}
            <span className="text-xs text-orange">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}

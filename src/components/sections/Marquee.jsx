// רצועת טקסט נעה — סוגי המוצר / ערכי המותג.
const items = [
  'הסעדה למפעלים', 'מכירת שישי', 'קייטרינג לאירועים', 'ארוחות מסובסדות',
  'אוכל ביתי', 'טרי ואיכותי', '25+ שנות ניסיון',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y-2 border-charcoal/10 bg-honey py-4">
      <div className="no-scrollbar flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6 text-lg font-black text-charcoal-900">
            {t}
            <span className="text-orange">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}

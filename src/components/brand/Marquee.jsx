// ============================================================
//  מרקיזה אינסופית, לכיוון קריאה ימין-לשמאל.
//
//  הקבוצה הראשונה נקראת לקוראי מסך; העותק שאחריה, וכל חזרה
//  שנוספה רק כדי למלא רוחב, מוסתרים מהם. נעצרת במעבר עכבר
//  ובפוקוס, ועם prefers-reduced-motion ה-CSS הגלובלי עוצר אותה.
// ============================================================
export default function Marquee({
  items,
  renderItem,
  getKey = (_, i) => i,
  label,
  duration = 36,
  minCount = 8, //   מספר פריטים מינימלי לקבוצה, כדי שלא ייפתח חור במסך רחב
  fade = '12%',
  itemClassName = 'me-5',
}) {
  if (!items?.length) return null

  const fill = Math.max(1, Math.ceil(minCount / items.length))
  const group = Array.from({ length: fill }).flatMap((_, round) =>
    items.map((item, i) => ({ item, key: `${round}-${getKey(item, i)}`, repeat: round > 0 })),
  )
  const mask = `linear-gradient(90deg, transparent 0, #000 ${fade}, #000 calc(100% - ${fade}), transparent 100%)`

  const renderGroup = (copy) => (
    <ul aria-hidden={copy || undefined} className="m-0 flex shrink-0 list-none p-0">
      {group.map(({ item, key, repeat }) => {
        const hidden = copy || repeat
        return (
          <li key={key} aria-hidden={!copy && repeat ? true : undefined} className={`shrink-0 ${itemClassName}`}>
            {renderItem(item, hidden)}
          </li>
        )
      })}
    </ul>
  )

  return (
    <div
      role="region"
      aria-label={label}
      className="w-full overflow-hidden"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      <div
        className="flex w-max animate-marquee-rtl hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {renderGroup(false)}
        {renderGroup(true)}
      </div>
    </div>
  )
}

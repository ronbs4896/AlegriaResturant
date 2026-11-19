import CountUp from '../ui/CountUp.jsx'
import { stats } from '../../data/home.js'

// ============================================================
//  המטבח במספרים — רצועה בזית. המספרים נספרים פעם אחת כשהם
//  נכנסים למסך; "05:30" היא שעה ולכן מוצגת כמו שהיא.
//  התוויות בלבן מלא: לבן ב-88% על זית יוצא 4.0:1, מתחת ל-AA.
// ============================================================
export default function KitchenStats() {
  return (
    <section aria-label="המטבח במספרים" className="bg-olive text-white">
      <ul className="shell m-0 grid list-none grid-cols-2 gap-x-6 gap-y-9 py-[52px] text-center lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label} className="flex flex-col gap-1.5">
            <span
              dir="ltr"
              className="num text-[clamp(2.25rem,5vw,2.875rem)] font-black leading-none tracking-[-0.02em]"
            >
              {s.n != null ? <CountUp to={s.n} suffix={s.suffix || ''} duration={1800} /> : s.value}
            </span>
            <span className="text-[15px]">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

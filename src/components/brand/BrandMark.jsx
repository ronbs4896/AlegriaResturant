import { Link } from 'react-router-dom'
import { site } from '../../data/site.js'

// ============================================================
//  סימן המותג: פניה של סבתא מהאמבלם, בעיגול, ולצידן השם.
//  הלוגו המלא כתוב "מסעדת אלגריה", ולכן משתמשים רק בדיוקן.
//  התמונה דקורטיבית — השם כבר כתוב בטקסט שלצידה.
// ============================================================
export default function BrandMark({
  tagline,
  imgClassName = 'h-[50px] w-[50px]',
  nameClassName = 'text-[20px]',
  className = '',
  onClick,
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 text-charcoal no-underline ${className}`}
    >
      <img
        src="/images/logo/avatar.jpg"
        alt=""
        width={52}
        height={52}
        className={`shrink-0 rounded-full border border-olive-200 object-cover ${imgClassName}`}
      />
      <span className="flex flex-col leading-[1.1]">
        <span className={`font-black ${nameClassName}`}>{site.name}</span>
        {tagline && (
          <span className="text-micro font-bold tracking-[0.08em] text-olive">{tagline}</span>
        )}
      </span>
    </Link>
  )
}

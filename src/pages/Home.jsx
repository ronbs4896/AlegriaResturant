import Seo from '../components/seo/Seo.jsx'
import HomeHero from '../components/home/HomeHero.jsx'
import ClientsBand from '../components/home/ClientsBand.jsx'
import PromiseCollage from '../components/home/PromiseCollage.jsx'
import ServicesArches from '../components/home/ServicesArches.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import GrowthArch from '../components/home/GrowthArch.jsx'
import KitchenStats from '../components/home/KitchenStats.jsx'
import KitchenGallery from '../components/home/KitchenGallery.jsx'
import GoogleReviews from '../components/home/GoogleReviews.jsx'
import BlogCards from '../components/home/BlogCards.jsx'
import FactoryContact from '../components/home/FactoryContact.jsx'
import { getSeo } from '../data/seoRoutes.js'
import { localBusinessSchema } from '../data/structuredData.js'
import { hasGoogleReviews } from '../data/reviews.js'

// ============================================================
//  דף הבית — Ref-Home.dc.html בקנבס "לפי רפרנס".
//
//  הסדר מדבר למנהל רכש: ההבטחה (הירו), מי כבר אוכל אצלנו,
//  הכאב (200 עובדים ושעה אחת), מה אנחנו מבשלים, איך מתחילים,
//  מה קורה כשגדלים, המספרים, האוכל עצמו, ביקורות, בלוג, טופס.
//  רצועת הלקוחות והביקורות מוסתרות עד שיש להן נתונים אמיתיים.
// ============================================================
export default function Home() {
  const seo = getSeo('/')
  return (
    <div className="bg-white">
      <Seo title={seo.title} description={seo.description} path="/" jsonLd={localBusinessSchema()} />
      <HomeHero />
      <ClientsBand />
      <PromiseCollage />
      <ServicesArches />
      <HowItWorks />
      <GrowthArch />
      <KitchenStats />
      <KitchenGallery />
      <GoogleReviews />
      {/* בלי ביקורות, הבלוג צמוד לגלריה הלבנה ומוותר על הריפוד העליון */}
      <BlogCards flushTop={!hasGoogleReviews} />
      <FactoryContact />
    </div>
  )
}

import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import PageLoader from './components/ui/PageLoader.jsx'
import { LeadModalProvider } from './context/LeadModalContext.jsx'
import AnalyticsTracker from './components/seo/AnalyticsTracker.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Factories = lazy(() => import('./pages/Factories.jsx'))
const Subsidized = lazy(() => import('./pages/Subsidized.jsx'))
const Corporate = lazy(() => import('./pages/Corporate.jsx'))
const PrivateEvents = lazy(() => import('./pages/PrivateEvents.jsx'))
const Friday = lazy(() => import('./pages/Friday.jsx'))
const Kitchen = lazy(() => import('./pages/Kitchen.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Accessibility = lazy(() => import('./pages/Accessibility.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const Cookies = lazy(() => import('./pages/Cookies.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <LeadModalProvider>
      <ScrollToTop />
      <AnalyticsTracker />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home seoPath="/" />} />
            <Route path="/about" element={<About seoPath="/about" />} />
            <Route path="/services" element={<Services />} />
            <Route path="/factories" element={<Factories seoPath="/factories" />} />
            <Route path="/services/subsidized-meals" element={<Subsidized seoPath="/services/subsidized-meals" />} />
            <Route path="/services/corporate-events" element={<Corporate seoPath="/services/corporate-events" />} />
            <Route path="/services/event-catering" element={<PrivateEvents seoPath="/services/event-catering" />} />
            <Route path="/friday" element={<Friday seoPath="/friday" />} />
            <Route path="/kitchen" element={<Kitchen seoPath="/kitchen" />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog seoPath="/blog" />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact seoPath="/contact" />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </LeadModalProvider>
  )
}

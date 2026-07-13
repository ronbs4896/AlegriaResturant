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
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'))
const Factories = lazy(() => import('./pages/Factories.jsx'))
const Friday = lazy(() => import('./pages/Friday.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const Testimonials = lazy(() => import('./pages/Testimonials.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Accessibility = lazy(() => import('./pages/Accessibility.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <LeadModalProvider>
      <ScrollToTop />
      <AnalyticsTracker />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/factories" element={<Factories />} />
            <Route path="/friday" element={<Friday />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </LeadModalProvider>
  )
}

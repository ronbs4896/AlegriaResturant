// ============================================================
//  בוני JSON-LD (Schema.org).
// ============================================================
import { site } from './site.js'

const abs = (path = '') => `${site.siteUrl}${path}`

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  '@id': abs('/#business'),
  name: site.name,
  alternateName: 'Alegria',
  description: site.shortPitch,
  url: site.siteUrl,
  telephone: site.phone.dial,
  email: site.email,
  servesCuisine: ['אוכל ביתי', 'מטבח ים-תיכוני', 'מטבח מרוקאי'],
  areaServed: site.serviceArea,
  priceRange: '₪₪',
  slogan: site.tagline,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '07:00',
      closes: '14:00',
    },
  ],
})

export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.description,
  provider: { '@type': 'FoodEstablishment', name: site.name, url: site.siteUrl },
  areaServed: site.serviceArea,
})

export const faqSchema = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

export const articleSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt || post.seoDescription,
  image: post.cover ? abs(post.cover) : abs('/images/logo/logo.jpg'),
  datePublished: post.date,
  dateModified: post.date,
  author: { '@type': 'Organization', name: post.author || site.name },
  publisher: {
    '@type': 'Organization',
    name: site.name,
    logo: { '@type': 'ImageObject', url: abs('/images/logo/logo.jpg') },
  },
  mainEntityOfPage: abs(`/blog/${post.slug}`),
})

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
})

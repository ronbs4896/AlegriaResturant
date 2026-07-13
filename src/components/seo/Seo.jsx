import { Helmet } from 'react-helmet-async'
import { site } from '../../data/site.js'

// SEO ראש דינמי לכל עמוד (runtime). ה-head הסטטי מוזרק ב-postbuild.
export default function Seo({ title, description, path = '', image, jsonLd }) {
  const url = `${site.siteUrl}${path}`
  const img = image ? `${site.siteUrl}${image}` : `${site.siteUrl}/images/logo/logo.jpg`
  const desc = description || site.shortPitch

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="he_IL" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((obj, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(obj)}
          </script>
        ))}
    </Helmet>
  )
}

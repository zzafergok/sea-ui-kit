import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string
  jsonLd?: object
  locale?: string
  alternates?: Array<{
    hrefLang: string
    href: string
  }>
}

const DEFAULT_SEO = {
  title: 'Sea UI Kit - Modern React Component Library',
  description:
    'Enterprise seviyede React component kütüphanesi. Radix UI tabanlı, erişilebilir ve özelleştirilebilir komponentler.',
  keywords: ['React', 'Next.js', 'UI Kit', 'Component Library', 'TypeScript', 'Radix UI', 'Sea Blue'],
  ogImage: '/images/og-default.jpg',
  twitterCard: 'summary_large_image' as const,
  twitterSite: '@yourcompany',
  locale: 'tr_TR',
}

/**
 * SEO Head Component
 * Next.js projeler için kapsamlı SEO meta tag yönetimi
 */
export function SEOHead({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  canonical,
  noindex = false,
  nofollow = false,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_SEO.ogImage,
  ogType = 'website',
  twitterCard = DEFAULT_SEO.twitterCard,
  twitterSite = DEFAULT_SEO.twitterSite,
  twitterCreator,
  jsonLd,
  locale = DEFAULT_SEO.locale,
  alternates = [],
}: SEOProps) {
  const router = useRouter()

  // URL construction
  const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] || 'https://yourcompany.com'
  const currentUrl = canonical || `${baseUrl}${router.asPath}`

  // Title construction
  const pageTitle = title ? `${title} | ${DEFAULT_SEO.title}` : DEFAULT_SEO.title

  // Open Graph values
  const ogTitleFinal = ogTitle || title || DEFAULT_SEO.title
  const ogDescriptionFinal = ogDescription || description
  const ogImageFinal = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name='description' content={description} />
      {keywords.length > 0 && <meta name='keywords' content={keywords.join(', ')} />}

      {/* Robots */}
      <meta name='robots' content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />

      {/* Canonical URL */}
      <link rel='canonical' href={currentUrl} />

      {/* Language and Locale */}
      <meta httpEquiv='content-language' content={locale} />

      {/* Alternate Languages */}
      {alternates.map((alternate) => (
        <link key={alternate.hrefLang} rel='alternate' hrefLang={alternate.hrefLang} href={alternate.href} />
      ))}

      {/* Open Graph */}
      <meta property='og:title' content={ogTitleFinal} />
      <meta property='og:description' content={ogDescriptionFinal} />
      <meta property='og:image' content={ogImageFinal} />
      <meta property='og:image:alt' content={ogTitleFinal} />
      <meta property='og:url' content={currentUrl} />
      <meta property='og:type' content={ogType} />
      <meta property='og:locale' content={locale} />
      <meta property='og:site_name' content='Sea UI Kit' />

      {/* Twitter Card */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={ogTitleFinal} />
      <meta name='twitter:description' content={ogDescriptionFinal} />
      <meta name='twitter:image' content={ogImageFinal} />
      {twitterSite && <meta name='twitter:site' content={twitterSite} />}
      {twitterCreator && <meta name='twitter:creator' content={twitterCreator} />}

      {/* Favicon and Icons */}
      <link rel='icon' href='/favicon.ico' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <meta name='theme-color' content='#0ea5e9' />
      <meta name='msapplication-TileColor' content='#0ea5e9' />

      {/* Additional Meta Tags */}
      <meta name='author' content='Sea UI Kit Team' />
      <meta name='generator' content='Next.js' />
      <meta name='format-detection' content='telephone=no' />

      {/* Performance and Loading */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      <link rel='dns-prefetch' href='//fonts.googleapis.com' />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...jsonLd,
            }),
          }}
        />
      )}

      {/* Viewport for mobile */}
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0' />
    </Head>
  )
}

/**
 * Sayfa tiplerine göre önceden tanımlanmış SEO konfigürasyonları
 */
export const SEOPresets = {
  homepage: {
    title: 'Ana Sayfa',
    description: 'Modern React component kütüphanesi ile hızlı ve güvenilir web uygulamaları geliştirin.',
    ogType: 'website' as const,
    keywords: ['React', 'UI Kit', 'Component Library', 'Frontend', 'TypeScript'],
  },

  documentation: {
    title: 'Dokümantasyon',
    description: 'Sea UI Kit komponentlerinin detaylı kullanım kılavuzu ve API referansı.',
    ogType: 'article' as const,
    keywords: ['Documentation', 'API', 'Guide', 'Tutorial', 'React Components'],
  },

  examples: {
    title: 'Örnekler',
    description: 'Sea UI Kit komponentlerinin canlı örnekleri ve kod snippetleri.',
    ogType: 'website' as const,
    keywords: ['Examples', 'Demo', 'Code Snippets', 'Components', 'UI Examples'],
  },

  blog: {
    title: 'Blog',
    description: 'React geliştirme, UI/UX tasarım ve modern web teknolojileri hakkında yazılar.',
    ogType: 'website' as const,
    keywords: ['Blog', 'React', 'Web Development', 'UI Design', 'Frontend'],
  },
}

/**
 * Blog post için özel SEO component
 */
interface BlogSEOProps {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  author: string
  tags: string[]
  coverImage?: string
  readingTime?: number
}

export function BlogSEO({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  tags,
  coverImage,
  readingTime,
}: BlogSEOProps) {
  const router = useRouter()
  const baseUrl = process.env['NEXT_PUBLIC_BASE_URL'] || 'https://yourcompany.com'
  const currentUrl = `${baseUrl}${router.asPath}`

  const jsonLd = {
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: currentUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sea UI Kit',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    keywords: tags.join(', '),
    ...(coverImage && {
      image: {
        '@type': 'ImageObject',
        url: coverImage.startsWith('http') ? coverImage : `${baseUrl}${coverImage}`,
      },
    }),
    ...(readingTime && {
      timeRequired: `PT${readingTime}M`,
    }),
  }

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={tags}
      ogType='article'
      {...(coverImage && { ogImage: coverImage })}
      jsonLd={jsonLd}
    />
  )
}

/**
 * E-ticaret ürün sayfası için SEO
 */
interface ProductSEOProps {
  name: string
  description: string
  price: number
  currency: string
  availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand: string
  sku: string
  images: string[]
  rating?: {
    value: number
    count: number
  }
}

export function ProductSEO({
  name,
  description,
  price,
  currency,
  availability,
  brand,
  sku,
  images,
  rating,
}: ProductSEOProps) {
  const router = useRouter()
  const baseUrl = 'https://yourcompany.com'
  const currentUrl = `${baseUrl}${router.asPath}`

  const jsonLd = {
    '@type': 'Product',
    name,
    description,
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    image: images.map((img) => (img.startsWith('http') ? img : `${baseUrl}${img}`)),
    offers: {
      '@type': 'Offer',
      url: currentUrl,
      priceCurrency: currency,
      price: price.toString(),
      availability: `https://schema.org/${availability}`,
      seller: {
        '@type': 'Organization',
        name: 'Sea UI Kit Store',
      },
    },
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value.toString(),
        reviewCount: rating.count.toString(),
      },
    }),
  }

  return (
    <SEOHead
      title={name}
      description={description}
      ogType='product'
      {...(images[0] && { ogImage: images[0] })}
      keywords={[name, brand, 'product']}
      jsonLd={jsonLd}
    />
  )
}

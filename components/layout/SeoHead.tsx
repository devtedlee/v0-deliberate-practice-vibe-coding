import Head from "next/head"
import { baseSeoData } from "@/data/seoData"

interface SeoHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  canonicalUrl?: string
  structuredData?: Record<string, any>
}

export default function SeoHead({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonicalUrl,
  structuredData,
}: SeoHeadProps) {
  const fullTitle = title || baseSeoData.siteName
  const fullDescription = description || ""
  const fullOgTitle = ogTitle || fullTitle
  const fullOgDescription = ogDescription || fullDescription
  const fullOgImage = ogImage || baseSeoData.defaultImage
  const fullOgUrl = `${baseSeoData.siteUrl}${ogUrl || ""}`
  const fullCanonicalUrl = `${baseSeoData.siteUrl}${canonicalUrl || ""}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullOgUrl} />
      <meta property="og:title" content={fullOgTitle} />
      <meta property="og:description" content={fullOgDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={baseSeoData.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullOgUrl} />
      <meta name="twitter:title" content={fullOgTitle} />
      <meta name="twitter:description" content={fullOgDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      {baseSeoData.twitterHandle && <meta name="twitter:creator" content={baseSeoData.twitterHandle} />}

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}

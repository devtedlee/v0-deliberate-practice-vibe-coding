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
  noIndex?: boolean
  structuredData?: object
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
  noIndex = false,
  structuredData,
}: SeoHeadProps) {
  const fullTitle = title || `${baseSeoData.siteName} - 유용한 웹 도구 모음`
  const fullDescription = description || "다양한 온라인 도구를 제공하는 웹사이트입니다."
  const fullOgTitle = ogTitle || fullTitle
  const fullOgDescription = ogDescription || fullDescription
  const fullOgImage = ogImage ? `${baseSeoData.siteUrl}${ogImage}` : `${baseSeoData.siteUrl}${baseSeoData.defaultImage}`
  const fullOgUrl = ogUrl ? `${baseSeoData.siteUrl}${ogUrl}` : baseSeoData.siteUrl
  const fullCanonicalUrl = canonicalUrl ? `${baseSeoData.siteUrl}${canonicalUrl}` : baseSeoData.siteUrl

  return (
    <Head>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={baseSeoData.author} />
      <meta name="language" content={baseSeoData.language} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* 로봇 크롤링 설정 */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph 태그 */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={baseSeoData.siteName} />
      <meta property="og:title" content={fullOgTitle} />
      <meta property="og:description" content={fullOgDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullOgTitle} />
      <meta property="og:url" content={fullOgUrl} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={baseSeoData.twitterHandle} />
      <meta name="twitter:creator" content={baseSeoData.twitterHandle} />
      <meta name="twitter:title" content={fullOgTitle} />
      <meta name="twitter:description" content={fullOgDescription} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* 추가 메타 태그 */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />

      {/* 구조화된 데이터 (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}

      {/* 파비콘 */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  )
}

// 전체 사이트 기본 SEO 정보
export const baseSeoData = {
  siteName: "웹사이트 목록",
  siteUrl: "https://your-domain.com",
  defaultImage: "/og-default.png",
  twitterHandle: "@yourhandle",
  author: "웹사이트 목록",
  language: "ko",
}

// 메인 목록 페이지 SEO 정보
export const mainListPageSeo = {
  title: "유용한 웹 도구 모음 | 웹사이트 목록",
  description:
    "QR 코드 생성기, 이미지 압축기, 글자 수 카운터 등 일상과 업무에 도움이 되는 다양한 온라인 도구들을 무료로 사용해보세요.",
  keywords: "온라인 도구, 웹 도구, QR 코드, 이미지 압축, 글자 수 카운터, 무료 도구",
  ogTitle: "온라인 도구 컬렉션 - 웹사이트 목록",
  ogDescription: "생활과 업무의 효율을 높여주는 다양한 웹 기반 도구들을 제공합니다. 지금 바로 사용해보세요!",
  ogImage: "/og-main-list.png",
  canonicalUrl: "/",
}

// QR 코드 생성기 페이지 SEO 정보
export const qrGeneratorPageSeo = {
  title: "온라인 QR 코드 생성기 | 쉽고 빠른 QR코드 만들기 | 웹사이트 목록",
  description:
    "URL, 텍스트, 연락처 등 원하는 정보를 담은 QR코드를 간편하게 생성하고 다운로드하세요. 다양한 커스터마이징 옵션을 제공합니다.",
  keywords: "QR 코드 생성기, QR코드 만들기, 온라인 QR 생성, 무료 QR 코드, QR 다운로드",
  ogTitle: "무료 QR 코드 생성기 - 나만의 QR코드를 만드세요!",
  ogDescription:
    "URL, 텍스트 등 모든 정보를 QR코드로 변환하세요. 로고 삽입, 색상 변경 등 다양한 옵션으로 맞춤 QR코드 제작이 가능합니다.",
  ogImage: "/og-qr-generator.png",
  canonicalUrl: "/qr-generator",
}

// 이미지 압축기 페이지 SEO 정보 (기존 페이지 개선)
export const imageCompressorPageSeo = {
  title: "온라인 이미지 압축 및 리사이즈 도구 | 웹사이트 목록",
  description:
    "무료 온라인 이미지 압축 도구로 JPEG, PNG, WebP 포맷을 지원하며 파일 크기를 줄이고 이미지를 리사이즈할 수 있습니다. 클라이언트 측 처리로 안전하고 빠릅니다.",
  keywords: "이미지 압축, 이미지 리사이즈, 온라인 이미지 도구, JPEG 압축, PNG 압축, WebP 변환",
  ogTitle: "무료 이미지 압축 도구 - 안전하고 빠른 이미지 최적화",
  ogDescription:
    "브라우저에서 직접 처리되는 안전한 이미지 압축 도구입니다. 다양한 포맷 지원과 고품질 압축을 경험하세요.",
  ogImage: "/og-image-compressor.png",
  canonicalUrl: "/image-compressor",
}

// 기타 페이지들의 SEO 정보도 추가 가능
export const pagesSeoData = {
  "/": mainListPageSeo,
  "/qr-generator": qrGeneratorPageSeo,
  "/image-compressor": imageCompressorPageSeo,
  // 다른 페이지들도 필요에 따라 추가
}

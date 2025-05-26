export interface CompressionOptions {
  outputFormat: "jpeg" | "png" | "webp"
  quality: number // 0 to 1
  maxWidth: number
  maxHeight: number
  maintainAspectRatio: boolean
}

export interface ProcessedImage {
  id: string
  originalFile: File
  processedBlob: Blob
  originalSize: number
  compressedSize: number
  compressionRatio: number
  originalDimensions: { width: number; height: number }
  processedDimensions: { width: number; height: number }
  previewUrl: string
  downloadUrl: string
}

export const defaultOptions: CompressionOptions = {
  outputFormat: "jpeg",
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
  maintainAspectRatio: true,
}

// 지원되는 이미지 포맷
export const supportedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"]

// 출력 포맷 옵션
export const outputFormatOptions = [
  { value: "jpeg", label: "JPEG", description: "높은 압축률, 사진에 적합" },
  { value: "png", label: "PNG", description: "무손실 압축, 투명도 지원" },
  { value: "webp", label: "WebP", description: "최신 포맷, 우수한 압축률" },
] as const

// 품질 프리셋
export const qualityPresets = [
  { value: 0.3, label: "낮음 (30%)", description: "최대 압축" },
  { value: 0.6, label: "보통 (60%)", description: "균형잡힌 품질" },
  { value: 0.8, label: "높음 (80%)", description: "고품질" },
  { value: 0.95, label: "최고 (95%)", description: "최고 품질" },
] as const

// 크기 프리셋
export const sizePresets = [
  { width: 1920, height: 1080, label: "Full HD (1920×1080)" },
  { width: 1280, height: 720, label: "HD (1280×720)" },
  { width: 800, height: 600, label: "중간 (800×600)" },
  { width: 400, height: 300, label: "작음 (400×300)" },
] as const

// SEO 관련 상수
export const seoData = {
  title: "온라인 이미지 압축 및 리사이즈 도구",
  description:
    "무료 온라인 이미지 압축 도구로 JPEG, PNG, WebP 포맷을 지원하며 파일 크기를 줄이고 이미지를 리사이즈할 수 있습니다. 클라이언트 측 처리로 안전하고 빠릅니다.",
  keywords: "이미지 압축, 이미지 리사이즈, 온라인 이미지 도구, JPEG 압축, PNG 압축, WebP 변환",
  ogImageUrl: "/og-image-compressor.png",
}

export interface QrSettings {
  value: string
  size: number
  fgColor: string
  bgColor: string
  level: "L" | "M" | "Q" | "H"
  includeMargin: boolean
  logoImage?: string | null
  logoWidth?: number
  logoHeight?: number
  logoOpacity?: number
}

export const defaultQrSettings: QrSettings = {
  value: "https://example.com",
  size: 256,
  fgColor: "#000000",
  bgColor: "#FFFFFF",
  level: "L",
  includeMargin: false,
  logoImage: null,
  logoWidth: 60,
  logoHeight: 60,
  logoOpacity: 1,
}

// QR 코드 에러 교정 레벨 옵션
export const errorCorrectionLevels = [
  { value: "L", label: "낮음 (L)", description: "~7% 복구 가능" },
  { value: "M", label: "보통 (M)", description: "~15% 복구 가능" },
  { value: "Q", label: "높음 (Q)", description: "~25% 복구 가능" },
  { value: "H", label: "최고 (H)", description: "~30% 복구 가능" },
] as const

// QR 코드 크기 프리셋
export const sizePresets = [
  { value: 128, label: "작음 (128px)" },
  { value: 256, label: "보통 (256px)" },
  { value: 512, label: "큼 (512px)" },
  { value: 1024, label: "매우 큼 (1024px)" },
] as const

// 색상 프리셋
export const colorPresets = [
  { fg: "#000000", bg: "#FFFFFF", name: "기본 (검정/흰색)" },
  { fg: "#1F2937", bg: "#F9FAFB", name: "다크 그레이" },
  { fg: "#1E40AF", bg: "#EFF6FF", name: "블루" },
  { fg: "#059669", bg: "#ECFDF5", name: "그린" },
  { fg: "#DC2626", bg: "#FEF2F2", name: "레드" },
  { fg: "#7C3AED", bg: "#FAF5FF", name: "퍼플" },
] as const

// 입력 데이터 타입
export const dataTypes = [
  { value: "url", label: "웹사이트 URL", placeholder: "https://example.com" },
  { value: "text", label: "일반 텍스트", placeholder: "원하는 텍스트를 입력하세요" },
  { value: "email", label: "이메일", placeholder: "example@email.com" },
  { value: "phone", label: "전화번호", placeholder: "+82-10-1234-5678" },
  { value: "wifi", label: "WiFi 정보", placeholder: "SSID:password:WPA" },
] as const

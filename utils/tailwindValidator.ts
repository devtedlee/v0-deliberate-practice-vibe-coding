/**
 * Tailwind CSS 설정 유효성 검사 결과 인터페이스
 */
export interface TailwindValidationResult {
  isValid: boolean
  error?: string
  missingColors?: string[]
}

/**
 * Tailwind CSS 설정이 올바르게 로드되었는지 확인합니다.
 * 이 함수는 tailwindColors 객체가 올바르게 정의되었는지 검사합니다.
 */
export function validateTailwindConfig(tailwindColors: Record<string, string[]>): TailwindValidationResult {
  // 기본 색상 세트가 있는지 확인
  const requiredColors = ["blue", "red", "green", "gray"]
  const missingColors: string[] = []

  // tailwindColors가 undefined이거나 객체가 아닌 경우
  if (!tailwindColors || typeof tailwindColors !== "object") {
    return {
      isValid: false,
      error: "Tailwind 색상 설정을 불러올 수 없습니다.",
    }
  }

  // 필수 색상이 있는지 확인
  for (const color of requiredColors) {
    if (!tailwindColors[color] || !Array.isArray(tailwindColors[color])) {
      missingColors.push(color)
    }
  }

  // 색상 배열의 길이 확인 (최소 5개 이상의 색조가 있어야 함)
  const hasInvalidColorShades = Object.values(tailwindColors).some(
    (shades) => !Array.isArray(shades) || shades.length < 5,
  )

  if (missingColors.length > 0) {
    return {
      isValid: false,
      error: "일부 필수 Tailwind 색상이 누락되었습니다.",
      missingColors,
    }
  }

  if (hasInvalidColorShades) {
    return {
      isValid: false,
      error: "일부 Tailwind 색상에 충분한 색조가 없습니다.",
    }
  }

  return { isValid: true }
}

/**
 * Tailwind CSS 설정이 올바르게 로드되었는지 확인하고,
 * 문제가 있을 경우 콘솔에 경고를 출력합니다.
 */
export function checkTailwindAvailability(tailwindColors: Record<string, string[]>): boolean {
  const result = validateTailwindConfig(tailwindColors)

  if (!result.isValid) {
    console.warn("Tailwind 설정 오류:", result.error)
    if (result.missingColors && result.missingColors.length > 0) {
      console.warn("누락된 색상:", result.missingColors.join(", "))
    }
    return false
  }

  return true
}

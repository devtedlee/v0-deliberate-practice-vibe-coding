import type { CharacterSet } from "@/data/characterSets"

export interface PasswordOptions {
  length: number
  characterSets: CharacterSet[]
  excludeAmbiguous: boolean
}

export interface PasswordStrength {
  score: number // 0-4
  label: string
  color: string
  description: string
}

export function generatePassword(options: PasswordOptions): string {
  const { length, characterSets, excludeAmbiguous } = options

  // 활성화된 문자셋만 필터링
  const enabledSets = characterSets.filter((set) => set.enabled)

  if (enabledSets.length === 0) {
    throw new Error("최소 하나 이상의 문자 종류를 선택해야 합니다.")
  }

  // 모든 가능한 문자들을 합침
  let allChars = enabledSets.map((set) => set.chars).join("")

  // 유사 문자 제외 옵션이 활성화된 경우
  if (excludeAmbiguous) {
    const ambiguousChars = "Il1O0"
    allChars = allChars
      .split("")
      .filter((char) => !ambiguousChars.includes(char))
      .join("")
  }

  if (allChars.length === 0) {
    throw new Error("사용 가능한 문자가 없습니다.")
  }

  // 각 문자셋에서 최소 하나씩은 포함되도록 보장
  let password = ""
  const guaranteedChars: string[] = []

  enabledSets.forEach((set) => {
    let setChars = set.chars
    if (excludeAmbiguous) {
      const ambiguousChars = "Il1O0"
      setChars = setChars
        .split("")
        .filter((char) => !ambiguousChars.includes(char))
        .join("")
    }
    if (setChars.length > 0) {
      const randomIndex = getSecureRandomInt(setChars.length)
      guaranteedChars.push(setChars[randomIndex])
    }
  })

  // 나머지 길이만큼 랜덤하게 채움
  const remainingLength = length - guaranteedChars.length
  const randomChars: string[] = []

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = getSecureRandomInt(allChars.length)
    randomChars.push(allChars[randomIndex])
  }

  // 보장된 문자와 랜덤 문자를 합치고 섞음
  const allPasswordChars = [...guaranteedChars, ...randomChars]
  password = shuffleArray(allPasswordChars).join("")

  return password
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0
  const feedback: string[] = []

  // 길이 점수
  if (password.length >= 12) score += 2
  else if (password.length >= 8) score += 1
  else feedback.push("8자 이상 권장")

  // 문자 종류 다양성
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSymbols = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)

  const varietyCount = [hasLower, hasUpper, hasNumbers, hasSymbols].filter(Boolean).length
  score += varietyCount

  // 점수에 따른 강도 결정
  if (score >= 6) {
    return {
      score: 4,
      label: "매우 강함",
      color: "bg-green-500",
      description: "매우 안전한 비밀번호입니다.",
    }
  } else if (score >= 4) {
    return {
      score: 3,
      label: "강함",
      color: "bg-blue-500",
      description: "안전한 비밀번호입니다.",
    }
  } else if (score >= 2) {
    return {
      score: 2,
      label: "보통",
      color: "bg-yellow-500",
      description: "더 강한 비밀번호를 권장합니다.",
    }
  } else {
    return {
      score: 1,
      label: "약함",
      color: "bg-red-500",
      description: "더 안전한 비밀번호가 필요합니다.",
    }
  }
}

function getSecureRandomInt(max: number): number {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return array[0] % max
  } else {
    // 폴백: Math.random() 사용 (보안성이 떨어짐)
    return Math.floor(Math.random() * max)
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

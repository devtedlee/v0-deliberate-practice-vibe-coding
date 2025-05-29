export const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"
export const NUMBER_CHARS = "0123456789"
export const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?"

// 유사 문자 제외를 위한 예시
export const AMBIGUOUS_CHARS = "Il1O0"

export interface CharacterSet {
  id: string
  label: string
  chars: string
  enabled: boolean
}

export const defaultCharacterSets: CharacterSet[] = [
  {
    id: "uppercase",
    label: "대문자 (A-Z)",
    chars: UPPERCASE_CHARS,
    enabled: true,
  },
  {
    id: "lowercase",
    label: "소문자 (a-z)",
    chars: LOWERCASE_CHARS,
    enabled: true,
  },
  {
    id: "numbers",
    label: "숫자 (0-9)",
    chars: NUMBER_CHARS,
    enabled: true,
  },
  {
    id: "symbols",
    label: "특수문자 (!@#$%^&*)",
    chars: SYMBOL_CHARS,
    enabled: false,
  },
]

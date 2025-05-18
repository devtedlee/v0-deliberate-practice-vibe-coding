// 단위 유형 정의
export type UnitType = "length" | "weight" | "temperature"

// 단위 정보 인터페이스
export interface UnitInfo {
  value: string
  label: string
  symbol: string
}

// 길이 단위
export const lengthUnits: UnitInfo[] = [
  { value: "mm", label: "밀리미터", symbol: "mm" },
  { value: "cm", label: "센티미터", symbol: "cm" },
  { value: "m", label: "미터", symbol: "m" },
  { value: "km", label: "킬로미터", symbol: "km" },
  { value: "inch", label: "인치", symbol: "in" },
  { value: "feet", label: "피트", symbol: "ft" },
  { value: "yard", label: "야드", symbol: "yd" },
  { value: "mile", label: "마일", symbol: "mi" },
]

// 무게 단위
export const weightUnits: UnitInfo[] = [
  { value: "mg", label: "밀리그램", symbol: "mg" },
  { value: "g", label: "그램", symbol: "g" },
  { value: "kg", label: "킬로그램", symbol: "kg" },
  { value: "oz", label: "온스", symbol: "oz" },
  { value: "lb", label: "파운드", symbol: "lb" },
]

// 온도 단위
export const temperatureUnits: UnitInfo[] = [
  { value: "celsius", label: "섭씨", symbol: "°C" },
  { value: "fahrenheit", label: "화씨", symbol: "°F" },
  { value: "kelvin", label: "켈빈", symbol: "K" },
]

// 단위 유형별 단위 목록 가져오기
export const getUnitsByType = (type: UnitType): UnitInfo[] => {
  switch (type) {
    case "length":
      return lengthUnits
    case "weight":
      return weightUnits
    case "temperature":
      return temperatureUnits
    default:
      return []
  }
}

// 길이 변환 계수 (기준: 미터)
const lengthConversionFactors: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  feet: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
}

// 무게 변환 계수 (기준: 그램)
const weightConversionFactors: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
}

// 단위 변환 함수
export const convertUnit = (value: number, fromUnit: string, toUnit: string, unitType: UnitType): number => {
  // 값이 유효하지 않으면 0 반환
  if (isNaN(value) || value === null) {
    return 0
  }

  // 같은 단위면 그대로 반환
  if (fromUnit === toUnit) {
    return value
  }

  // 온도 변환은 특별한 공식 사용
  if (unitType === "temperature") {
    return convertTemperature(value, fromUnit, toUnit)
  }

  // 길이와 무게는 변환 계수 사용
  const conversionFactors = unitType === "length" ? lengthConversionFactors : weightConversionFactors

  // 기준 단위로 변환 후 목표 단위로 변환
  const standardValue = value * conversionFactors[fromUnit]
  return standardValue / conversionFactors[toUnit]
}

// 온도 변환 함수
const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  // 먼저 켈빈으로 변환
  let kelvin: number

  switch (fromUnit) {
    case "celsius":
      kelvin = value + 273.15
      break
    case "fahrenheit":
      kelvin = ((value - 32) * 5) / 9 + 273.15
      break
    case "kelvin":
      kelvin = value
      break
    default:
      return 0
  }

  // 켈빈에서 목표 단위로 변환
  switch (toUnit) {
    case "celsius":
      return kelvin - 273.15
    case "fahrenheit":
      return ((kelvin - 273.15) * 9) / 5 + 32
    case "kelvin":
      return kelvin
    default:
      return 0
  }
}

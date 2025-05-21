import { memo } from "react"
import { type UnitType, getUnitsByType } from "@/data/units"

interface ResultSectionProps {
  result: number
  fromUnit: string
  toUnit: string
  unitType: UnitType
}

export default function ResultSection({ result, fromUnit, toUnit, unitType }: ResultSectionProps) {
  // 단위 심볼 가져오기
  const getUnitSymbol = (unitValue: string): string => {
    const units = getUnitsByType(unitType)
    const unit = units.find((u) => u.value === unitValue)
    return unit ? unit.symbol : ""
  }

  // 결과 값 포맷팅 (소수점 4자리까지)
  const formattedResult = result.toLocaleString("ko-KR", {
    maximumFractionDigits: 4,
  })

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2">변환 결과</h3>
      <div className="text-3xl font-bold text-gray-900">
        {formattedResult} <span className="text-gray-600">{getUnitSymbol(toUnit)}</span>
      </div>
    </div>
  )
}

export default memo(ResultSection)

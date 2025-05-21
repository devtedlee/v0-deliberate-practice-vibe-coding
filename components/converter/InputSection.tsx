"use client"

import { useState, useEffect, memo } from "react"
import { type UnitInfo, type UnitType, getUnitsByType } from "@/data/units"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InputSectionProps {
  unitType: UnitType
  inputValue: string
  fromUnit: string
  toUnit: string
  onInputChange: (value: string) => void
  onFromUnitChange: (unit: string) => void
  onToUnitChange: (unit: string) => void
}

export default function InputSection({
  unitType,
  inputValue,
  fromUnit,
  toUnit,
  onInputChange,
  onFromUnitChange,
  onToUnitChange,
}: InputSectionProps) {
  const [units, setUnits] = useState<UnitInfo[]>([])

  // 단위 유형이 변경될 때마다 단위 목록 업데이트
  useEffect(() => {
    setUnits(getUnitsByType(unitType))
  }, [unitType])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="input-value">변환할 값</Label>
        <Input
          id="input-value"
          type="number"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="값을 입력하세요"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from-unit">변환 전 단위</Label>
          <Select value={fromUnit} onValueChange={onFromUnitChange}>
            <SelectTrigger id="from-unit" className="w-full">
              <SelectValue placeholder="단위 선택" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={`from-${unit.value}`} value={unit.value}>
                  {unit.label} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to-unit">변환 후 단위</Label>
          <Select value={toUnit} onValueChange={onToUnitChange}>
            <SelectTrigger id="to-unit" className="w-full">
              <SelectValue placeholder="단위 선택" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={`to-${unit.value}`} value={unit.value}>
                  {unit.label} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default memo(InputSection)

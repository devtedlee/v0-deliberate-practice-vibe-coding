"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InputSection from "./InputSection"
import ResultSection from "./ResultSection"
import { type UnitType, convertUnit } from "@/data/units"

export default function UnitConverter() {
  // 상태 관리
  const [unitType, setUnitType] = useState<UnitType>("length")
  const [inputValue, setInputValue] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<string>("")
  const [toUnit, setToUnit] = useState<string>("")
  const [result, setResult] = useState<number>(0)

  // 단위 유형이 변경될 때 기본 단위 설정
  useEffect(() => {
    switch (unitType) {
      case "length":
        setFromUnit("cm")
        setToUnit("m")
        break
      case "weight":
        setFromUnit("g")
        setToUnit("kg")
        break
      case "temperature":
        setFromUnit("celsius")
        setToUnit("fahrenheit")
        break
    }
  }, [unitType])

  // 입력 값, 단위가 변경될 때마다 결과 계산
  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      const value = Number.parseFloat(inputValue)
      const convertedValue = convertUnit(value, fromUnit, toUnit, unitType)
      setResult(convertedValue)
    } else {
      setResult(0)
    }
  }, [inputValue, fromUnit, toUnit, unitType])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">기본 단위 변환기</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="length" onValueChange={(value) => setUnitType(value as UnitType)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="length">길이</TabsTrigger>
            <TabsTrigger value="weight">무게</TabsTrigger>
            <TabsTrigger value="temperature">온도</TabsTrigger>
          </TabsList>

          {/* Single dynamic TabsContent */}
          {["length", "weight", "temperature"].map((currentTabUnitType) => (
            <TabsContent key={currentTabUnitType} value={currentTabUnitType} className="space-y-6">
              {unitType === currentTabUnitType && ( // Only render if the tab is active
                <>
                  <InputSection
                    unitType={unitType} // Pass the active unitType
                    inputValue={inputValue}
                    fromUnit={fromUnit}
                    toUnit={toUnit}
                    onInputChange={setInputValue}
                    onFromUnitChange={setFromUnit}
                    onToUnitChange={setToUnit}
                  />
                  <ResultSection 
                    result={result} 
                    fromUnit={fromUnit} 
                    toUnit={toUnit} 
                    unitType={unitType} // Pass the active unitType
                  />
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

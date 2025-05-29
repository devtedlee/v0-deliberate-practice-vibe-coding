"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import type { CharacterSet } from "@/data/characterSets"

interface PasswordOptionsFormProps {
  length: number
  onLengthChange: (length: number) => void
  characterSets: CharacterSet[]
  onCharacterSetsChange: (sets: CharacterSet[]) => void
  excludeAmbiguous: boolean
  onExcludeAmbiguousChange: (exclude: boolean) => void
  onGenerate: () => void
  isGenerating: boolean
}

export default function PasswordOptionsForm({
  length,
  onLengthChange,
  characterSets,
  onCharacterSetsChange,
  excludeAmbiguous,
  onExcludeAmbiguousChange,
  onGenerate,
  isGenerating,
}: PasswordOptionsFormProps) {
  const [lengthInput, setLengthInput] = useState(length.toString())

  const handleLengthSliderChange = (value: number[]) => {
    const newLength = value[0]
    onLengthChange(newLength)
    setLengthInput(newLength.toString())
  }

  const handleLengthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLengthInput(value)

    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 8 && numValue <= 128) {
      onLengthChange(numValue)
    }
  }

  const handleCharacterSetChange = (setId: string, enabled: boolean) => {
    const updatedSets = characterSets.map((set) => (set.id === setId ? { ...set, enabled } : set))
    onCharacterSetsChange(updatedSets)
  }

  const enabledSetsCount = characterSets.filter((set) => set.enabled).length
  const canGenerate = enabledSetsCount > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>비밀번호 설정</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 비밀번호 길이 */}
        <div className="space-y-3">
          <Label htmlFor="length">비밀번호 길이: {length}자</Label>
          <div className="space-y-2">
            <Slider
              id="length"
              min={8}
              max={128}
              step={1}
              value={[length]}
              onValueChange={handleLengthSliderChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>8자</span>
              <Input
                type="number"
                min={8}
                max={128}
                value={lengthInput}
                onChange={handleLengthInputChange}
                className="w-20 h-8 text-center"
              />
              <span>128자</span>
            </div>
          </div>
        </div>

        {/* 문자 종류 선택 */}
        <div className="space-y-3">
          <Label>포함할 문자 종류</Label>
          <div className="space-y-3">
            {characterSets.map((set) => (
              <div key={set.id} className="flex items-center space-x-2">
                <Checkbox
                  id={set.id}
                  checked={set.enabled}
                  onCheckedChange={(checked) => handleCharacterSetChange(set.id, checked as boolean)}
                />
                <Label htmlFor={set.id} className="text-sm font-normal">
                  {set.label}
                </Label>
              </div>
            ))}
          </div>
          {enabledSetsCount === 0 && <p className="text-sm text-red-500">최소 하나 이상의 문자 종류를 선택해주세요.</p>}
        </div>

        {/* 고급 옵션 */}
        <div className="space-y-3">
          <Label>고급 옵션</Label>
          <div className="flex items-center justify-between">
            <Label htmlFor="exclude-ambiguous" className="text-sm font-normal">
              유사 문자 제외 (I, l, 1, O, 0)
            </Label>
            <Switch id="exclude-ambiguous" checked={excludeAmbiguous} onCheckedChange={onExcludeAmbiguousChange} />
          </div>
        </div>

        {/* 생성 버튼 */}
        <Button onClick={onGenerate} disabled={!canGenerate || isGenerating} className="w-full" size="lg">
          <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "생성 중..." : "비밀번호 생성"}
        </Button>
      </CardContent>
    </Card>
  )
}

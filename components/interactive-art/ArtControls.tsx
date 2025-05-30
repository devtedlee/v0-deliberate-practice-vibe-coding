"use client"

import { useState } from "react"
import { Settings, Palette, Zap, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { colorPalette, interactionModes, type InteractionMode } from "@/data/artConfig"

interface ArtControlsProps {
  color: string
  particleCount: number
  interactionMode: InteractionMode
  onColorChange: (color: string) => void
  onParticleCountChange: (count: number) => void
  onInteractionModeChange: (mode: InteractionMode) => void
  onClear: () => void
}

export default function ArtControls({
  color,
  particleCount,
  interactionMode,
  onColorChange,
  onParticleCountChange,
  onInteractionModeChange,
  onClear,
}: ArtControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClear = () => {
    onClear()
    if (typeof window !== "undefined" && (window as any).clearInteractiveArt) {
      ;(window as any).clearInteractiveArt()
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex gap-2">
        {/* 클리어 버튼 */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleClear}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {/* 컨트롤 패널 */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                인터랙티브 아트 설정
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* 색상 선택 */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  파티클 색상
                </Label>
                <div className="grid grid-cols-5 gap-2">
                  {colorPalette.map((paletteColor) => (
                    <button
                      key={paletteColor}
                      onClick={() => onColorChange(paletteColor)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        color === paletteColor ? "border-gray-900 scale-110" : "border-gray-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: paletteColor }}
                    />
                  ))}
                </div>
              </div>

              {/* 파티클 밀도 */}
              <div className="space-y-3">
                <Label>파티클 밀도: {particleCount}</Label>
                <Slider
                  value={[particleCount]}
                  onValueChange={(value) => onParticleCountChange(value[0])}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* 인터랙션 모드 */}
              <div className="space-y-3">
                <Label>인터랙션 모드</Label>
                <RadioGroup
                  value={interactionMode}
                  onValueChange={(value) => onInteractionModeChange(value as InteractionMode)}
                >
                  {interactionModes.map((mode) => (
                    <div key={mode.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={mode.id} id={mode.id} />
                      <Label htmlFor={mode.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{mode.name}</div>
                        <div className="text-sm text-gray-500">{mode.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 사용법 안내 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">사용법</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 마우스를 움직여 파티클을 생성하세요</li>
                  <li>• 클릭하면 폭발 효과가 나타납니다</li>
                  <li>• 모바일에서는 터치로 조작 가능합니다</li>
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

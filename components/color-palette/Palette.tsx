"use client"

import { useState, useEffect } from "react"
import ColorBlock from "./ColorBlock"
import PaletteOptions from "./PaletteOptions"
import CopyToast from "./CopyToast"
import { generateRandomPalette, generateTailwindPalette } from "@/utils/colorUtils"

export default function Palette() {
  const [colors, setColors] = useState<string[]>([])
  const [paletteType, setPaletteType] = useState<"random" | "tailwind">("random")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  // 팔레트 생성 함수
  const generatePalette = () => {
    const newColors = paletteType === "random" ? generateRandomPalette(5) : generateTailwindPalette(5)
    setColors(newColors)
  }

  // 컴포넌트 마운트 시 초기 팔레트 생성
  useEffect(() => {
    generatePalette()
  }, [paletteType]) // paletteType이 변경될 때마다 새 팔레트 생성

  // 색상 복사 처리
  const handleCopy = (color: string) => {
    setCopiedColor(color)
  }

  // 토스트 닫기
  const handleCloseToast = () => {
    setCopiedColor(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <PaletteOptions paletteType={paletteType} onTypeChange={setPaletteType} onGenerateNew={generatePalette} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {colors.map((color, index) => (
          <ColorBlock key={`${color}-${index}`} color={color} onCopy={handleCopy} />
        ))}
      </div>

      <CopyToast color={copiedColor} onClose={handleCloseToast} />
    </div>
  )
}

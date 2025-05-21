"use client"

import { useState, useEffect } from "react"
import ColorBlock from "./ColorBlock"
import PaletteOptions from "./PaletteOptions"
import CopyToast from "./CopyToast"
import ConfigErrorAlert from "./ConfigErrorAlert"
import { generateRandomPalette, generateTailwindPalette } from "@/utils/colorUtils"
import { validateTailwindConfig } from "@/utils/tailwindValidator"
import { tailwindColors } from "@/utils/colorUtils"

export default function Palette() {
  const [colors, setColors] = useState<string[]>([])
  const [paletteType, setPaletteType] = useState<"random" | "tailwind">("random")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [configError, setConfigError] = useState<string | null>(null)

  // Tailwind 설정 유효성 검사
  useEffect(() => {
    if (paletteType === "tailwind") {
      const validationResult = validateTailwindConfig(tailwindColors)
      if (!validationResult.isValid) {
        setConfigError(validationResult.error || "Tailwind 설정에 문제가 있습니다.")
        // 오류가 있으면 자동으로 랜덤 모드로 전환
        setPaletteType("random")
      } else {
        setConfigError(null)
      }
    } else {
      setConfigError(null)
    }
  }, [paletteType])

  // 팔레트 생성 함수
  const generatePalette = () => {
    try {
      const newColors = paletteType === "random" ? generateRandomPalette(5) : generateTailwindPalette(5)
      setColors(newColors)
    } catch (error) {
      console.error("팔레트 생성 중 오류 발생:", error)
      // 오류 발생 시 랜덤 팔레트로 대체
      setColors(generateRandomPalette(5))
      if (paletteType === "tailwind") {
        setConfigError("Tailwind 팔레트 생성 중 오류가 발생했습니다. 랜덤 팔레트로 대체합니다.")
      }
    }
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

  // 설정 오류 알림 닫기
  const handleCloseError = () => {
    setConfigError(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {configError && <ConfigErrorAlert message={configError} onClose={handleCloseError} />}

      <PaletteOptions
        paletteType={paletteType}
        onTypeChange={setPaletteType}
        onGenerateNew={generatePalette}
        isTailwindDisabled={!!configError}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {colors.map((color, index) => (
          <ColorBlock key={`${color}-${index}`} color={color} onCopy={handleCopy} />
        ))}
      </div>

      <CopyToast color={copiedColor} onClose={handleCloseToast} />
    </div>
  )
}

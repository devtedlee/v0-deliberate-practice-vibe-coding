"use client"

import { useState, useEffect } from "react"
import { defaultCharacterSets, type CharacterSet } from "@/data/characterSets"
import { generatePassword, calculatePasswordStrength, type PasswordStrength } from "@/lib/passwordUtils"
import PasswordOptionsForm from "./PasswordOptionsForm"
import GeneratedPasswordDisplay from "./GeneratedPasswordDisplay"
import PasswordStrengthIndicator from "./PasswordStrengthIndicator"

export default function PasswordGeneratorLayout() {
  const [length, setLength] = useState(16)
  const [characterSets, setCharacterSets] = useState<CharacterSet[]>(defaultCharacterSets)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState<PasswordStrength | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      // 약간의 지연을 추가하여 생성 중 상태를 보여줌
      await new Promise((resolve) => setTimeout(resolve, 200))

      const newPassword = generatePassword({
        length,
        characterSets,
        excludeAmbiguous,
      })

      setPassword(newPassword)
      setStrength(calculatePasswordStrength(newPassword))
    } catch (error) {
      console.error("비밀번호 생성 오류:", error)
      setPassword("")
      setStrength(null)
    } finally {
      setIsGenerating(false)
    }
  }

  // 옵션 변경 시 자동 생성
  useEffect(() => {
    const enabledSets = characterSets.filter((set) => set.enabled)
    if (enabledSets.length > 0) {
      handleGenerate()
    } else {
      setPassword("")
      setStrength(null)
    }
  }, [length, characterSets, excludeAmbiguous])

  // 초기 비밀번호 생성
  useEffect(() => {
    handleGenerate()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 헤더 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">안전한 비밀번호 생성기</h1>
        <p className="text-gray-600">강력하고 사용자 정의 가능한 비밀번호를 만드세요</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: 옵션 설정 */}
        <div className="space-y-6">
          <PasswordOptionsForm
            length={length}
            onLengthChange={setLength}
            characterSets={characterSets}
            onCharacterSetsChange={setCharacterSets}
            excludeAmbiguous={excludeAmbiguous}
            onExcludeAmbiguousChange={setExcludeAmbiguous}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* 오른쪽: 결과 표시 */}
        <div className="space-y-6">
          <GeneratedPasswordDisplay password={password} onCopy={() => console.log("비밀번호 복사됨")} />

          <PasswordStrengthIndicator strength={strength} />
        </div>
      </div>

      {/* 보안 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">보안 안내</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 생성된 비밀번호는 브라우저에서만 처리되며 서버로 전송되지 않습니다.</li>
          <li>• 암호학적으로 안전한 난수 생성기를 사용합니다.</li>
          <li>• 각 계정마다 고유한 비밀번호를 사용하세요.</li>
          <li>• 비밀번호 관리자 사용을 권장합니다.</li>
        </ul>
      </div>
    </div>
  )
}

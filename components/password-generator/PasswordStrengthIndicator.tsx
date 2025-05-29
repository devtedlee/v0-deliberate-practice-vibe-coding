"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PasswordStrength } from "@/lib/passwordUtils"
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react"

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength | null
}

export default function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  if (!strength) {
    return null
  }

  const getIcon = () => {
    switch (strength.score) {
      case 4:
        return <ShieldCheck className="h-5 w-5 text-green-500" />
      case 3:
        return <Shield className="h-5 w-5 text-blue-500" />
      case 2:
        return <ShieldAlert className="h-5 w-5 text-yellow-500" />
      default:
        return <ShieldX className="h-5 w-5 text-red-500" />
    }
  }

  const getTextColor = () => {
    switch (strength.score) {
      case 4:
        return "text-green-700"
      case 3:
        return "text-blue-700"
      case 2:
        return "text-yellow-700"
      default:
        return "text-red-700"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          비밀번호 강도
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 강도 바 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`font-medium ${getTextColor()}`}>{strength.label}</span>
            <span className="text-sm text-gray-500">{strength.score}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${(strength.score / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* 설명 */}
        <p className="text-sm text-gray-600">{strength.description}</p>

        {/* 강도별 권장사항 */}
        {strength.score < 3 && (
          <div className="text-xs text-gray-500 space-y-1">
            <p className="font-medium">더 강한 비밀번호를 위한 권장사항:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>12자 이상 사용</li>
              <li>대문자, 소문자, 숫자, 특수문자 모두 포함</li>
              <li>예측 가능한 패턴 피하기</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

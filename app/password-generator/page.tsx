import type { Metadata } from "next"
import PasswordGeneratorLayout from "@/components/password-generator/PasswordGeneratorLayout"

export const metadata: Metadata = {
  title: "안전한 비밀번호 생성기 | 강력한 비밀번호 만들기",
  description:
    "강력하고 사용자 정의 가능한 비밀번호를 생성하세요. 다양한 옵션으로 맞춤 설정이 가능하며, 클립보드 복사 기능을 제공합니다.",
  keywords: ["비밀번호 생성기", "강력한 비밀번호", "보안", "암호 생성", "랜덤 비밀번호"],
  openGraph: {
    title: "안전한 비밀번호 생성기",
    description: "강력하고 사용자 정의 가능한 비밀번호를 생성하세요.",
    type: "website",
  },
}

export default function PasswordGeneratorPage() {
  return (
    <div className="min-h-screen bg-white">
      <PasswordGeneratorLayout />
    </div>
  )
}

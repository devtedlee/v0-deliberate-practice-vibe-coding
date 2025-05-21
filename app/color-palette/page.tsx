import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Palette from "@/components/color-palette/Palette"

export default function ColorPalettePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">랜덤 색상 팔레트 생성기</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            완전 랜덤 색상 또는 Tailwind CSS 색상 시스템에서 아름다운 색상 팔레트를 생성해보세요. 색상을 클릭하면 HEX
            코드가 클립보드에 복사됩니다.
          </p>
        </header>

        <Palette />

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

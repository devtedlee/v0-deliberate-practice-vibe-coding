import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import UnitConverter from "@/components/converter/UnitConverter"

export default function ConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">기본 단위 변환기</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">길이, 무게, 온도 단위를 쉽고 빠르게 변환해보세요.</p>
        </div>

        <UnitConverter />
      </main>
    </div>
  )
}

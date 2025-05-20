import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import RestaurantMapClientWrapper from "./client"

// 서버 컴포넌트
export default function RestaurantMapPage() {
  // 서버에서 API 키 가져오기 (클라이언트에 노출되지 않음)
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || ""

  // 서버 측에서 환경 변수 상태 로깅 (개발 환경에서만)
  if (process.env.NODE_ENV === "development") {
    console.log("서버 측 환경 변수 상태:")
    console.log(`- GOOGLE_MAPS_API_KEY: ${apiKey ? "설정됨 (길이: " + apiKey.length + ")" : "설정되지 않음"}`)
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">로컬 맛집 지도</h1>
        <p className="text-gray-600 mt-1">내가 추천하는 동네 맛집들을 한눈에 확인해보세요</p>
      </header>

      <main className="flex-1 relative" style={{ minHeight: "600px" }}>
        <RestaurantMapClientWrapper apiKey={apiKey} />
      </main>
    </div>
  )
}

// 정적 생성 비활성화 - 동적 렌더링 사용
export const dynamic = "force-dynamic"

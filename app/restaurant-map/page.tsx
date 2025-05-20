"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { restaurantsData } from "@/data/restaurants"
import RestaurantMapClient from "@/components/restaurant-map/RestaurantMapClient"
import { Suspense } from "react"

// 서버 컴포넌트
export default function RestaurantMapPage() {
  // 서버에서 API 키 가져오기 (클라이언트에 노출되지 않음)
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || ""

  return (
    <div className="flex flex-col min-h-screen">
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

      <main className="flex-1 flex flex-col md:flex-row relative">
        <Suspense fallback={<LoadingUI />}>
          <RestaurantMapClient restaurants={restaurantsData} apiKey={apiKey} />
        </Suspense>
      </main>
    </div>
  )
}

function LoadingUI() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>
  )
}

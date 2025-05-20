"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { restaurantsData } from "@/data/restaurants"

// 로딩 UI 컴포넌트
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

// 클라이언트 컴포넌트를 동적으로 임포트하여 서버 사이드 렌더링 시 window 참조 문제 방지
const RestaurantMapClient = dynamic(
  () => import("@/components/restaurant-map/RestaurantMapClient"),
  { ssr: false }, // 서버 사이드 렌더링 비활성화
)

interface RestaurantMapClientWrapperProps {
  apiKey: string
}

export default function RestaurantMapClientWrapper({ apiKey }: RestaurantMapClientWrapperProps) {
  return (
    <Suspense fallback={<LoadingUI />}>
      <RestaurantMapClient restaurants={restaurantsData} apiKey={apiKey} />
    </Suspense>
  )
}

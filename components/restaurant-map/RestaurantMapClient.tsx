"use client"

import { useState, useEffect } from "react"
import { APIProvider } from "@vis.gl/react-google-maps"
import type { Restaurant } from "@/types/restaurant"
import RestaurantList from "./RestaurantList"
import CategoryFilterSimple from "./CategoryFilterSimple"
import MapSection from "./MapSection"

interface RestaurantMapClientProps {
  restaurants: Restaurant[]
  apiKey: string
}

export default function RestaurantMapClient({ restaurants, apiKey }: RestaurantMapClientProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Array.from(new Set(restaurants.map((r) => r.category))),
  )
  const [isPreviewMode, setIsPreviewMode] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)

  // 필터링된 맛집 목록
  const filteredRestaurants = restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))

  // 컴포넌트 마운트 시 API 키 확인
  useEffect(() => {
    // API 키가 없거나 v0 preview 환경인 경우 프리뷰 모드로 설정
    if (!apiKey || apiKey.length === 0) {
      setIsPreviewMode(true)
      setMapError("Google Maps API 키가 설정되지 않았습니다.")
      return
    }

    // 실제 배포 환경에서는 지도 모드로 설정
    // v0 preview 환경 감지 로직 (URL 기반)
    const isV0Preview =
      typeof window !== "undefined" &&
      (window.location.hostname.includes("v0.dev") || window.location.hostname.includes("localhost"))

    setIsPreviewMode(isV0Preview)
  }, [apiKey])

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
  }

  const handleMapError = (error: string) => {
    setMapError(error)
    setIsPreviewMode(true)
  }

  return (
    <div className="w-full h-full">
      {isPreviewMode ? (
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-blue-600 mb-2">미리보기 모드</h3>
            <p className="text-gray-600 mb-4">
              {mapError ||
                "미리보기 환경에서는 Google Maps API 제한으로 인해 지도가 표시되지 않습니다. 대신 맛집 목록을 확인해보세요."}
            </p>
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">Google Maps API 활성화 방법</h4>
              <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-2">
                <li>
                  <a
                    href="https://console.cloud.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google Cloud Console
                  </a>
                  에 로그인하세요.
                </li>
                <li>프로젝트를 선택하거나 새 프로젝트를 만드세요.</li>
                <li>왼쪽 메뉴에서 "API 및 서비스" &gt; "라이브러리"를 선택하세요.</li>
                <li>"Maps JavaScript API"를 검색하고 선택하세요.</li>
                <li>"사용 설정" 버튼을 클릭하여 API를 활성화하세요.</li>
                <li>API 키가 제한되어 있다면, "사용자 인증 정보" 페이지에서 제한 사항을 확인하세요.</li>
              </ol>
            </div>
          </div>

          <div className="mb-6">
            <CategoryFilterSimple selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories} />
          </div>

          <h2 className="text-2xl font-bold mb-6">맛집 목록</h2>
          <RestaurantList
            restaurants={filteredRestaurants}
            onSelectRestaurant={handleSelectRestaurant}
            selectedRestaurantId={selectedRestaurant?.id}
          />
        </div>
      ) : (
        <APIProvider apiKey={apiKey}>
          <div className="relative h-full">
            <div className="absolute top-4 left-4 z-10 w-full max-w-xs">
              <CategoryFilterSimple selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories} />
            </div>
            <MapSection
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
              setSelectedRestaurant={setSelectedRestaurant}
              onError={handleMapError}
            />
          </div>
        </APIProvider>
      )}
    </div>
  )
}

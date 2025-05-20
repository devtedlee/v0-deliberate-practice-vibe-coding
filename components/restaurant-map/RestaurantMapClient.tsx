"use client"

import { useState, useEffect, useRef } from "react"
import { APIProvider } from "@vis.gl/react-google-maps"
import type { Restaurant } from "@/types/restaurant"
import RestaurantList from "./RestaurantList"
import CategoryFilterSimple from "./CategoryFilterSimple"
import MapSection from "./MapSection"
import SimpleMapTest from "./SimpleMapTest"

interface RestaurantMapClientProps {
  restaurants: Restaurant[]
  apiKey: string
}

export default function RestaurantMapClient({ restaurants, apiKey }: RestaurantMapClientProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Array.from(new Set(restaurants.map((r) => r.category))),
  )
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isDebugMode, setIsDebugMode] = useState(false)
  const [showMapList, setShowMapList] = useState(true)
  const [isV0Preview, setIsV0Preview] = useState(false)
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 }) // 서울 시청 좌표
  const [mapZoom, setMapZoom] = useState(13)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // 필터링된 맛집 목록
  const filteredRestaurants = restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))

  // 컴포넌트 마운트 시 설정
  useEffect(() => {
    // 현재 URL 저장
    const fullUrl = window.location.href
    setCurrentUrl(fullUrl)

    // v0 preview 환경 감지
    const isV0PreviewEnvironment = window.location.hostname.includes("vusercontent.net")
    setIsV0Preview(isV0PreviewEnvironment)

    if (isV0PreviewEnvironment) {
      console.log("v0 preview 환경 감지됨 - 지도 로드를 건너뜁니다")
      setIsPreviewMode(true)
      setMapError("v0 preview 환경에서는 지도가 로드되지 않습니다. API 키 제한 때문입니다.")
    }

    // URL에서 디버그 모드 확인
    const urlParams = new URLSearchParams(window.location.search)
    const debugParam = urlParams.get("debug")
    setIsDebugMode(debugParam === "true")

    // URL에서 모드 확인 (v0 preview가 아닐 때만)
    if (!isV0PreviewEnvironment) {
      const modeParam = urlParams.get("mode")
      if (modeParam === "preview") {
        setIsPreviewMode(true)
      } else if (modeParam === "map") {
        setIsPreviewMode(false)
      }
    }

    // URL에서 보기 모드 확인
    const viewParam = urlParams.get("view")
    if (viewParam === "both") {
      setShowMapList(true)
    } else if (viewParam === "map") {
      setShowMapList(false)
    }

    // 디버그 정보 콘솔에 출력
    console.log("RestaurantMapClient 컴포넌트 마운트됨")
    console.log("API 키:", apiKey ? `유효함 (길이: ${apiKey.length})` : "설정되지 않음")
    console.log("현재 모드:", isPreviewMode ? "목록 모드" : "지도 모드")
    console.log("현재 환경:", isV0PreviewEnvironment ? "v0 preview" : "일반 환경")
    console.log("현재 URL:", fullUrl)
  }, [apiKey, isPreviewMode])

  // API 키 제한 설정에 추가할 패턴 생성
  const getSuggestedPatterns = () => {
    const hostname = window.location.hostname
    const exactPattern = `https://${hostname}/*`
    const wildcardPattern = hostname.includes("vusercontent.net")
      ? "*.lite.vusercontent.net/*"
      : `*.${hostname.split(".").slice(-2).join(".")}/*`

    return {
      exactPattern,
      wildcardPattern,
    }
  }

  // 맛집 선택 처리 - 목록에서 클릭 시
  const handleSelectRestaurant = (restaurant: Restaurant) => {
    console.log("맛집 선택됨 (목록에서):", restaurant.name)
    setSelectedRestaurant(restaurant)

    // 지도 모드로 전환 (목록 모드인 경우)
    if (isPreviewMode) {
      setIsPreviewMode(false)
    }

    // 지도 중심점 및 줌 레벨 변경
    setMapCenter({ lat: restaurant.lat, lng: restaurant.lng })
    setMapZoom(16)
  }

  const handleMapError = (error: string) => {
    console.error("Map Error:", error)
    setMapError(error)

    // 리퍼러 오류인 경우 v0 preview 환경으로 간주
    if (error.includes("RefererNotAllowedMapError")) {
      setIsV0Preview(true)
      setIsPreviewMode(true)
    }
  }

  // 지도 중심점 변경 처리
  const handleMapCenterChange = (center: { lat: number; lng: number }) => {
    setMapCenter(center)
  }

  // 지도 줌 레벨 변경 처리
  const handleMapZoomChange = (zoom: number) => {
    setMapZoom(zoom)
  }

  // 디버그 모드 토글
  const toggleDebugMode = () => {
    const newDebugMode = !isDebugMode
    setIsDebugMode(newDebugMode)

    // URL 파라미터 업데이트
    const url = new URL(window.location.href)
    if (newDebugMode) {
      url.searchParams.set("debug", "true")
    } else {
      url.searchParams.delete("debug")
    }
    window.history.pushState({}, "", url.toString())
  }

  // 보기 모드 토글
  const toggleViewMode = () => {
    const newShowMapList = !showMapList
    setShowMapList(newShowMapList)

    // URL 파라미터 업데이트
    const url = new URL(window.location.href)
    if (newShowMapList) {
      url.searchParams.set("view", "both")
    } else {
      url.searchParams.set("view", "map")
    }
    window.history.pushState({}, "", url.toString())
  }

  // 지도/목록 모드 토글
  const toggleMapMode = () => {
    // v0 preview 환경에서는 지도 모드로 전환 불가
    if (isV0Preview && !isPreviewMode) {
      alert("v0 preview 환경에서는 지도 모드를 사용할 수 없습니다. API 키 제한 때문입니다.")
      return
    }

    const newIsPreviewMode = !isPreviewMode
    setIsPreviewMode(newIsPreviewMode)

    // URL 파라미터 업데이트
    const url = new URL(window.location.href)
    if (newIsPreviewMode) {
      url.searchParams.set("mode", "preview")
    } else {
      url.searchParams.set("mode", "map")
    }
    window.history.pushState({}, "", url.toString())
  }

  // 패턴 제안
  const { exactPattern, wildcardPattern } = getSuggestedPatterns()

  // v0 preview 환경 경고 메시지
  const V0PreviewWarning = () => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>v0 preview 환경 감지됨:</strong> 이 환경에서는 Google Maps API 키 제한으로 인해 지도가 표시되지
            않습니다.
          </p>
          <div className="mt-2 p-2 bg-yellow-100 rounded text-xs font-mono overflow-auto">
            <p className="text-yellow-800">
              <strong>현재 전체 URL:</strong>
            </p>
            <p className="text-yellow-800 break-all">{currentUrl}</p>
          </div>
          <div className="mt-3">
            <p className="text-sm text-yellow-700">
              <strong>API 키 제한 설정에 추가할 패턴:</strong>
            </p>
            <div className="mt-1 space-y-1">
              <div className="flex items-center">
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">{exactPattern}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exactPattern)
                    alert("패턴이 클립보드에 복사되었습니다!")
                  }}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  복사
                </button>
              </div>
              <p className="text-xs text-yellow-700">또는 더 넓은 범위의 와일드카드 패턴:</p>
              <div className="flex items-center">
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">{wildcardPattern}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(wildcardPattern)
                    alert("패턴이 클립보드에 복사되었습니다!")
                  }}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  복사
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full h-full flex flex-col">
      {/* 컨트롤 버튼 그룹 */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={toggleMapMode}
          className={`px-3 py-1 rounded-md text-xs font-medium ${
            isPreviewMode ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isPreviewMode ? "지도 모드로 전환" : "목록 모드로 전환"}
        </button>
        {!isPreviewMode && (
          <button
            onClick={toggleViewMode}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              showMapList ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {showMapList ? "지도만 보기" : "지도+목록 보기"}
          </button>
        )}
        <button
          onClick={toggleDebugMode}
          className={`px-3 py-1 rounded-md text-xs font-medium ${
            isDebugMode ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isDebugMode ? "디버그 끄기" : "디버그 켜기"}
        </button>
      </div>

      {/* 디버그 정보 표시 */}
      {isDebugMode && (
        <div className="absolute top-12 right-4 z-20 bg-white p-3 rounded-md shadow-md text-xs w-64">
          <h4 className="font-bold mb-2">디버그 정보</h4>
          <div className="space-y-1">
            <p>
              <span className="font-medium">API 키:</span>{" "}
              {apiKey ? `설정됨 (길이: ${apiKey.length})` : "설정되지 않음"}
            </p>
            <p>
              <span className="font-medium">API 키 값:</span>{" "}
              <span className="font-mono text-xs break-all">{apiKey ? `${apiKey.substring(0, 8)}...` : "없음"}</span>
            </p>
            <p>
              <span className="font-medium">현재 모드:</span> {isPreviewMode ? "목록 모드" : "지도 모드"}
            </p>
            <p>
              <span className="font-medium">환경:</span> {isV0Preview ? "v0 preview" : "일반 환경"}
            </p>
            <div className="mt-1 p-1 bg-gray-100 rounded">
              <p className="font-medium">현재 URL:</p>
              <p className="font-mono text-xs break-all">{currentUrl}</p>
            </div>
            <p>
              <span className="font-medium">지도 중심점:</span>{" "}
              {`${mapCenter.lat.toFixed(4)}, ${mapCenter.lng.toFixed(4)}`}
            </p>
            <p>
              <span className="font-medium">지도 줌 레벨:</span> {mapZoom}
            </p>
            <p>
              <span className="font-medium">컨테이너 크기:</span>{" "}
              {mapContainerRef.current
                ? `${mapContainerRef.current.offsetWidth}x${mapContainerRef.current.offsetHeight}`
                : "알 수 없음"}
            </p>
            {mapError && (
              <div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md">
                <p className="font-medium">오류 발생:</p>
                <p>{mapError}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isDebugMode && !isV0Preview && (
        <div className="absolute top-64 right-4 z-20 w-64">
          <SimpleMapTest apiKey={apiKey} />
        </div>
      )}

      {isV0Preview && (
        <div className="p-4">
          <V0PreviewWarning />
        </div>
      )}

      {isPreviewMode ? (
        <div className="p-6 w-full h-full overflow-auto">
          {!isV0Preview && (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
              <h3 className="text-lg font-bold text-blue-600 mb-2">맛집 목록 모드</h3>
              <p className="text-gray-600 mb-4">
                {mapError
                  ? `지도 로드 중 오류가 발생했습니다: ${mapError}`
                  : "현재 맛집 목록 모드입니다. 지도를 보려면 '지도 모드로 전환' 버튼을 클릭하세요."}
              </p>
            </div>
          )}

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
        <div className="w-full h-full flex flex-col" ref={mapContainerRef}>
          <div className={`relative ${showMapList ? "h-1/2" : "h-full"}`} style={{ minHeight: "400px" }}>
            <div className="absolute top-4 left-4 z-10 w-full max-w-xs">
              <CategoryFilterSimple selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories} />
            </div>

            <APIProvider apiKey={apiKey}>
              <MapSection
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                setSelectedRestaurant={setSelectedRestaurant}
                onError={handleMapError}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                onMapCenterChange={handleMapCenterChange}
                onMapZoomChange={handleMapZoomChange}
              />
            </APIProvider>
          </div>

          {showMapList && (
            <div className="h-1/2 overflow-auto p-6 bg-gray-50">
              <h2 className="text-2xl font-bold mb-6">맛집 목록</h2>
              <RestaurantList
                restaurants={filteredRestaurants}
                onSelectRestaurant={handleSelectRestaurant}
                selectedRestaurantId={selectedRestaurant?.id}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

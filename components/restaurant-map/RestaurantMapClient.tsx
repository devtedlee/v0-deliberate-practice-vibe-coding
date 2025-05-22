"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { APIProvider } from "@vis.gl/react-google-maps"
import type { Restaurant } from "@/types/restaurant"
import RestaurantList from "./RestaurantList"
import CategoryFilterSimple from "./CategoryFilterSimple"
import MapSection from "./MapSection"
import SimpleMapTest from "./SimpleMapTest"
import DebugInfoDisplay from "./DebugInfoDisplay"
import ModeToggleButtons from "./ModeToggleButtons"
import V0PreviewWarning from "./V0PreviewWarning"

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
  const [isUserControllingMap, setIsUserControllingMap] = useState(true) // 기본값을 true로 변경
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // 개발 환경인지 확인
  // 기존 코드:
  // const isDevelopment = process.env.NODE_ENV === "development"

  // 다음 코드로 변경:
  // v0 프리뷰 환경이나 개발 환경에서 디버그 기능 활성화
  const isDevelopmentOrPreview =
    process.env.NODE_ENV === "development" ||
    (typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net"))

  // 필터링된 맛집 목록
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))
  }, [restaurants, selectedCategories])

  // 컴포넌트 마운트 시 설정 - 클라이언트 사이드에서만 실행
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

    // URL에서 디버그 모드 확인 (개발 환경이나 v0 프리뷰에서만)
    if (isDevelopmentOrPreview) {
      const urlParams = new URLSearchParams(window.location.search)
      const debugParam = urlParams.get("debug")
      setIsDebugMode(debugParam === "true")
    }

    // URL에서 모드 확인 (v0 preview가 아닐 때만)
    if (!isV0PreviewEnvironment) {
      const urlParams = new URLSearchParams(window.location.search)
      const modeParam = urlParams.get("mode")
      if (modeParam === "preview") {
        setIsPreviewMode(true)
      } else if (modeParam === "map") {
        setIsPreviewMode(false)
      }
    }

    // URL에서 보기 모드 확인
    const urlParams = new URLSearchParams(window.location.search)
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
    console.log("개발 환경:", isDevelopmentOrPreview ? "개발" : "운영")
    console.log("현재 URL:", fullUrl)
  }, [apiKey, isPreviewMode, isDevelopmentOrPreview])

  // API 키 제한 설정에 추가할 패턴 생성
  const suggestedPatterns = useMemo(() => {
    if (typeof window === "undefined") {
      return { exactPattern: "", wildcardPattern: "" }
    }
    const hostname = window.location.hostname
    const exactPattern = `https://${hostname}/*`
    const wildcardPattern = hostname.includes("vusercontent.net")
      ? "*.lite.vusercontent.net/*"
      : `*.${hostname.split(".").slice(-2).join(".")}/*`
    return { exactPattern, wildcardPattern }
  }, []) // Empty dependency array as hostname is stable for the component's lifetime

  // 맛집 선택 처리 - 목록에서 클릭 시
  const handleSelectRestaurant = useCallback(
    (restaurant: Restaurant) => {
      console.log("맛집 선택됨 (목록에서):", restaurant.name)
      setSelectedRestaurant(restaurant)

      // 지도 모드로 전환 (목록 모드인 경우)
      if (isPreviewMode) {
        setIsPreviewMode(false)
      }

      // 사용자 지도 조작 상태 비활성화 (프로그래밍 방식 이동)
      setIsUserControllingMap(false)

      // 지도 중심점 및 줌 레벨 변경 (기록용)
      setMapCenter({ lat: restaurant.lat, lng: restaurant.lng })
      setMapZoom(16)
    },
    [isPreviewMode, setIsPreviewMode, setSelectedRestaurant, setIsUserControllingMap, setMapCenter, setMapZoom],
  )

  const handleMapError = useCallback(
    (error: string) => {
      console.error("Map Error:", error)
      setMapError(error)

      // 리퍼러 오류인 경우 v0 preview 환경으로 간주
      if (error.includes("RefererNotAllowedMapError")) {
        setIsV0Preview(true)
        setIsPreviewMode(true)
      }
    },
    [setIsV0Preview, setIsPreviewMode],
  )

  // 지도 중심점 변경 처리 (기록용)
  const handleMapCenterChange = useCallback(
    (center: { lat: number; lng: number }) => {
      setMapCenter(center)
    },
    [setMapCenter],
  )

  // 지도 줌 레벨 변경 처리 (기록용)
  const handleMapZoomChange = useCallback(
    (zoom: number) => {
      setMapZoom(zoom)
    },
    [setMapZoom],
  )

  // 사용자 지도 조작 상태 변경 처리
  const handleUserMapControlChange = useCallback(
    (isControlling: boolean) => {
      console.log(`사용자 지도 조작 상태 변경: ${isControlling ? "조작 중" : "조작 종료"}`)
      setIsUserControllingMap(isControlling)
    },
    [setIsUserControllingMap],
  )

  // 디버그 모드 토글 함수 수정:
  // 디버그 모드 토글 (개발 환경이나 v0 프리뷰에서만 작동)
  const toggleDebugMode = useCallback(() => {
    if (!isDevelopmentOrPreview) return

    const newDebugMode = !isDebugMode
    setIsDebugMode(newDebugMode)

    // URL 파라미터 업데이트 - 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      if (newDebugMode) {
        url.searchParams.set("debug", "true")
      } else {
        url.searchParams.delete("debug")
      }
      window.history.pushState({}, "", url.toString())
    }
  }, [isDevelopmentOrPreview, isDebugMode, setIsDebugMode])

  // 보기 모드 토글
  const toggleViewMode = useCallback(() => {
    const newShowMapList = !showMapList
    setShowMapList(newShowMapList)

    // URL 파라미터 업데이트 - 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      if (newShowMapList) {
        url.searchParams.set("view", "both")
      } else {
        url.searchParams.set("view", "map")
      }
      window.history.pushState({}, "", url.toString())
    }
  }, [showMapList, setShowMapList])

  // 지도/목록 모드 토글
  const toggleMapMode = useCallback(() => {
    // v0 preview 환경에서는 지도 모드로 전환 불가
    if (isV0Preview && !isPreviewMode) {
      if (typeof window !== "undefined") {
        alert("v0 preview 환경에서는 지도 모드를 사용할 수 없습니다. API 키 제한 때문입니다.")
      }
      return
    }

    const newIsPreviewMode = !isPreviewMode
    setIsPreviewMode(newIsPreviewMode)

    // URL 파라미터 업데이트 - 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      if (newIsPreviewMode) {
        url.searchParams.set("mode", "preview")
      } else {
        url.searchParams.set("mode", "map")
      }
      window.history.pushState({}, "", url.toString())
    }
  }, [isV0Preview, isPreviewMode, setIsPreviewMode])

  // 패턴 제안 - 클라이언트 사이드에서만 실행
  const { exactPattern, wildcardPattern } = suggestedPatterns

  return (
    <div className="w-full h-full flex flex-col">
      <ModeToggleButtons
        isPreviewMode={isPreviewMode}
        toggleMapMode={toggleMapMode}
        showMapList={showMapList}
        toggleViewMode={toggleViewMode}
        isDevelopmentOrPreview={isDevelopmentOrPreview}
        isDebugMode={isDebugMode}
        toggleDebugMode={toggleDebugMode}
        isV0Preview={isV0Preview}
      />

      {isDevelopmentOrPreview && isDebugMode && (
        <DebugInfoDisplay
          apiKey={apiKey}
          isPreviewMode={isPreviewMode}
          isV0Preview={isV0Preview}
          currentUrl={currentUrl}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          isUserControllingMap={isUserControllingMap}
          mapContainerRef={mapContainerRef}
          mapError={mapError}
        />
      )}

      {/* 개발 환경이나 v0 프리뷰 & 디버그 모드일 때만 SimpleMapTest 표시 */}
      {isDevelopmentOrPreview && isDebugMode && !isV0Preview && (
        <div className="absolute top-64 right-4 z-20 w-64">
          <SimpleMapTest apiKey={apiKey} />
        </div>
      )}

      {isV0Preview && (
        <div className="p-4">
          <V0PreviewWarning
            currentUrl={currentUrl}
            exactPattern={exactPattern}
            wildcardPattern={wildcardPattern}
          />
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
          <div
            className={`relative ${showMapList ? "h-1/2" : "h-full"}`}
            style={{
              minHeight: "400px",
              position: "relative",
              zIndex: 1, // 명시적으로 z-index 설정
            }}
          >
            <div
              className="absolute top-4 left-4 z-10 w-full max-w-xs"
              style={{ pointerEvents: "none" }} // 필터 컨테이너는 포인터 이벤트를 무시하도록 설정
            >
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
                onUserMapControlChange={handleUserMapControlChange}
                userControllingMap={isUserControllingMap}
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

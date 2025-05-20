"use client"

import { useState, useEffect } from "react"
import { Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps"
import { useMapContext } from "./MapContext"
import RestaurantMarker from "./RestaurantMarker"
import RestaurantInfoWindow from "./RestaurantInfoWindow"
import CategoryFilter from "./CategoryFilter"
import CurrentLocationButton from "./CurrentLocationButton"
import type { Restaurant } from "@/types/restaurant"

interface MapSectionProps {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
}

export default function MapSection({ restaurants, selectedRestaurant, setSelectedRestaurant }: MapSectionProps) {
  const { setMapLoaded, setMapError } = useMapContext()
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 }) // 서울 시청 좌표
  const [mapZoom, setMapZoom] = useState(13)
  const [localMapError, setLocalMapError] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Array.from(new Set(restaurants.map((r) => r.category))),
  )
  const [showCurrentLocation, setShowCurrentLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)

  // 필터링된 맛집 목록
  const filteredRestaurants = restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))

  // 지도 로드 완료 시 호출
  const handleMapLoad = () => {
    setMapLoaded(true)
    setLocalMapError(null)
    setMapError(null)
  }

  // 지도 로드 실패 시 호출
  const handleMapError = (error: Error) => {
    console.error("Google Maps 로드 실패:", error)

    let errorMessage = "Google Maps를 로드하는 중 오류가 발생했습니다."

    // 오류 메시지에 따라 다른 안내 제공
    if (error.message.includes("ApiNotActivatedMapError")) {
      errorMessage =
        "Google Maps JavaScript API가 활성화되지 않았습니다. Google Cloud Console에서 API를 활성화해주세요."
    } else if (error.message.includes("InvalidKeyMapError")) {
      errorMessage = "Google Maps API 키가 유효하지 않습니다. 올바른 API 키를 설정해주세요."
    } else if (error.message.includes("RefererNotAllowedMapError")) {
      errorMessage = "현재 도메인에서 Google Maps API 사용이 허용되지 않았습니다. API 키 제한 설정을 확인해주세요."
    }

    setLocalMapError(errorMessage)
    setMapError(errorMessage)
  }

  // 마커 클릭 시 해당 맛집 선택
  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setMapCenter({ lat: restaurant.lat, lng: restaurant.lng })
    setMapZoom(15)
  }

  // 정보창 닫기
  const handleInfoWindowClose = () => {
    setSelectedRestaurant(null)
  }

  // 현재 위치 찾기
  const handleLocationFound = (position: { lat: number; lng: number }) => {
    setCurrentLocation(position)
    setMapCenter(position)
    setMapZoom(15)
    setShowCurrentLocation(true)
  }

  // 선택된 맛집이 필터링되면 선택 해제
  useEffect(() => {
    if (selectedRestaurant && !selectedCategories.includes(selectedRestaurant.category)) {
      setSelectedRestaurant(null)
    }
  }, [selectedCategories, selectedRestaurant, setSelectedRestaurant])

  if (localMapError) {
    return <MapErrorUI errorMessage={localMapError} />
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-10 w-full max-w-xs">
        <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories} />
      </div>

      <CurrentLocationButton onLocationFound={handleLocationFound} />

      <Map
        mapId="restaurant-map"
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={handleMapLoad}
        onError={handleMapError}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        className="w-full h-full"
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantMarker
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleMarkerClick(restaurant)}
            isSelected={selectedRestaurant?.id === restaurant.id}
          />
        ))}

        {showCurrentLocation && currentLocation && (
          <AdvancedMarker position={currentLocation}>
            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </AdvancedMarker>
        )}

        {selectedRestaurant && (
          <InfoWindow
            position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <RestaurantInfoWindow restaurant={selectedRestaurant} />
          </InfoWindow>
        )}
      </Map>
    </div>
  )
}

// 지도 오류 UI 컴포넌트
function MapErrorUI({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h3 className="text-lg font-bold text-red-600 mb-2">지도 로드 오류</h3>
        <p className="text-gray-600 mb-4">{errorMessage}</p>

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

        <p className="mt-4 text-sm text-gray-500">
          API 활성화 후에는 페이지를 새로고침하세요. 변경사항이 적용되는 데 몇 분 정도 소요될 수 있습니다.
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps"
import RestaurantMarker from "./RestaurantMarker"
import RestaurantInfoWindow from "./RestaurantInfoWindow"
import CurrentLocationButton from "./CurrentLocationButton"
import type { Restaurant } from "@/types/restaurant"

interface MapSectionProps {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  onError: (error: string) => void
}

export default function MapSection({
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
  onError,
}: MapSectionProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 }) // 서울 시청 좌표
  const [mapZoom, setMapZoom] = useState(13)
  const [showCurrentLocation, setShowCurrentLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)

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

    onError(errorMessage)
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

  return (
    <div className="w-full h-full">
      <CurrentLocationButton onLocationFound={handleLocationFound} />

      <Map
        mapId="restaurant-map"
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        center={mapCenter}
        zoom={mapZoom}
        onError={handleMapError}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        className="w-full h-full"
      >
        {restaurants.map((restaurant) => (
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

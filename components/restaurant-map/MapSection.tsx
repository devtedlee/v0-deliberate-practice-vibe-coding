"use client"

import { useState, useEffect, useRef } from "react"
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
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // 컴포넌트 마운트 시 콘솔에 정보 출력
  useEffect(() => {
    console.log("MapSection 컴포넌트 마운트됨")
    console.log("맵 컨테이너 크기:", mapContainerRef.current?.offsetWidth, "x", mapContainerRef.current?.offsetHeight)

    // 맵 컨테이너 크기가 0이면 경고
    if (
      mapContainerRef.current &&
      (mapContainerRef.current.offsetWidth === 0 || mapContainerRef.current.offsetHeight === 0)
    ) {
      console.warn("맵 컨테이너의 크기가 0입니다. 지도가 보이지 않을 수 있습니다.")
    }
  }, [])

  // 지도 로드 완료 시 호출
  const handleMapLoad = () => {
    console.log("Google Maps 로드 성공")
    setIsMapLoaded(true)
  }

  // 지도 로드 실패 시 호출
  const handleMapError = (error: Error) => {
    console.error("Google Maps 로드 실패:", error)
    onError(`지도 로드 실패: ${error.message}`)
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
    <div ref={mapContainerRef} className="w-full h-full relative bg-gray-100 border border-gray-300">
      <CurrentLocationButton onLocationFound={handleLocationFound} />

      {/* 지도 컨테이너 크기 표시 (디버깅용) */}
      <div className="absolute bottom-4 left-4 z-10 bg-white px-2 py-1 text-xs rounded shadow">
        컨테이너: {mapContainerRef.current?.offsetWidth || 0} x {mapContainerRef.current?.offsetHeight || 0}
      </div>

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
        style={{ width: "100%", height: "100%" }}
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

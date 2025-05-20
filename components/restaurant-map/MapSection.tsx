"use client"

import { useState, useEffect, useRef } from "react"
import { Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps"
import RestaurantMarker from "./RestaurantMarker"
import RestaurantInfoWindow from "./RestaurantInfoWindow"
import CurrentLocationButton from "./CurrentLocationButton"
import type { Restaurant } from "@/types/restaurant"
import type { google } from "googlemaps"

interface MapSectionProps {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  onError: (error: string) => void
  mapCenter: { lat: number; lng: number }
  mapZoom: number
  onMapCenterChange: (center: { lat: number; lng: number }) => void
  onMapZoomChange: (zoom: number) => void
}

export default function MapSection({
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
  onError,
  mapCenter,
  mapZoom,
  onMapCenterChange,
  onMapZoomChange,
}: MapSectionProps) {
  const [showCurrentLocation, setShowCurrentLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // 컴포넌트 마운트 시 콘솔에 정보 출력
  useEffect(() => {
    console.log("MapSection 컴포넌트 마운트됨")
    console.log("맵 컨테이너 크기:", mapContainerRef.current?.offsetWidth, "x", mapContainerRef.current?.offsetHeight)
  }, [])

  // 선택된 레스토랑이 변경될 때 지도 중심 이동
  useEffect(() => {
    if (selectedRestaurant && mapRef.current) {
      console.log("선택된 레스토랑으로 지도 이동:", selectedRestaurant.name)
      const newCenter = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }
      onMapCenterChange(newCenter)
      onMapZoomChange(16) // 더 가깝게 확대
    }
  }, [selectedRestaurant, onMapCenterChange, onMapZoomChange])

  // 지도 로드 완료 시 호출
  const handleMapLoad = (map: google.maps.Map) => {
    console.log("Google Maps 로드 성공")
    mapRef.current = map
    setIsMapLoaded(true)

    // 지도 이벤트 리스너 추가
    map.addListener("dragend", () => {
      const center = map.getCenter()
      if (center) {
        onMapCenterChange({ lat: center.lat(), lng: center.lng() })
      }
    })

    map.addListener("zoom_changed", () => {
      onMapZoomChange(map.getZoom() || mapZoom)
    })
  }

  // 지도 로드 실패 시 호출
  const handleMapError = (error: Error) => {
    console.error("Google Maps 로드 실패:", error)
    onError(`지도 로드 실패: ${error.message}`)
  }

  // 마커 클릭 시 해당 맛집 선택
  const handleMarkerClick = (restaurant: Restaurant) => {
    console.log("마커 클릭:", restaurant.name)
    setSelectedRestaurant(restaurant)
  }

  // 정보창 닫기
  const handleInfoWindowClose = () => {
    setSelectedRestaurant(null)
  }

  // 현재 위치 찾기
  const handleLocationFound = (position: { lat: number; lng: number }) => {
    setCurrentLocation(position)
    onMapCenterChange(position)
    onMapZoomChange(15)
    setShowCurrentLocation(true)
  }

  return (
    <div ref={mapContainerRef} className="w-full h-full relative bg-gray-100">
      <CurrentLocationButton onLocationFound={handleLocationFound} />

      <Map
        mapId="restaurant-map"
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={handleMapLoad}
        onError={handleMapError}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        mapTypeControl={false}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        clickableIcons={false}
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

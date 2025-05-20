"use client"

import { useState, useEffect, useRef } from "react"
import { Map, InfoWindow, AdvancedMarker, useMap } from "@vis.gl/react-google-maps"
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
  onUserMapControlChange: (isControlling: boolean) => void
  userControllingMap: boolean
}

// 지도 컨트롤러 컴포넌트 - 지도 인스턴스에 직접 접근하여 설정
function MapController({
  onMapReady,
  onUserMapControlChange,
}: {
  onMapReady: (map: google.maps.Map) => void
  onUserMapControlChange: (isControlling: boolean) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (map) {
      // 지도 옵션 직접 설정
      map.setOptions({
        draggable: true,
        clickableIcons: false,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        keyboardShortcuts: true,
        scrollwheel: true,
      })

      // 사용자 조작 감지를 위한 이벤트 리스너 추가
      const addMapListeners = () => {
        // 드래그 시작 시 사용자 조작 상태를 활성화
        map.addListener("dragstart", () => {
          console.log("사용자 드래그 시작")
          onUserMapControlChange(true)
        })

        // 키보드 조작 감지
        const handleKeyDown = (e: KeyboardEvent) => {
          // 화살표 키는 33, 34, 35, 36, 37, 38, 39, 40 (PageUp, PageDown, End, Home, Left, Up, Right, Down)
          if ([33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
            console.log("사용자 키보드 조작 감지:", e.keyCode)
            onUserMapControlChange(true)
          }
        }

        // 마우스 휠 스크롤 감지
        const handleWheel = () => {
          console.log("사용자 휠 스크롤 감지")
          onUserMapControlChange(true)
        }

        // 마우스 더블 클릭 감지
        map.addListener("dblclick", () => {
          console.log("사용자 더블 클릭 감지")
          onUserMapControlChange(true)
        })

        // 줌 변경 감지
        map.addListener("zoom_changed", () => {
          console.log("줌 레벨 변경 감지")
          onUserMapControlChange(true)
        })

        // 전역 이벤트 리스너 추가
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("wheel", handleWheel, { passive: true })

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          window.removeEventListener("keydown", handleKeyDown)
          window.removeEventListener("wheel", handleWheel)
          // Google Maps 이벤트 리스너는 자동으로 제거됨
        }
      }

      const cleanup = addMapListeners()
      onMapReady(map)

      return cleanup
    }
  }, [map, onMapReady, onUserMapControlChange])

  return null
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
  onUserMapControlChange,
  userControllingMap,
}: MapSectionProps) {
  const [showCurrentLocation, setShowCurrentLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // 내부 프로그래매틱 지도 이동을 위한 상태
  const [internalMapCenter, setInternalMapCenter] = useState(mapCenter)
  const [internalMapZoom, setInternalMapZoom] = useState(mapZoom)

  // 컴포넌트 마운트 시 콘솔에 정보 출력
  useEffect(() => {
    console.log("MapSection 컴포넌트 마운트됨")
    console.log("맵 컨테이너 크기:", mapContainerRef.current?.offsetWidth, "x", mapContainerRef.current?.offsetHeight)
  }, [])

  // 외부 props 변경 시 내부 상태 업데이트 (사용자 조작 중이 아닐 때만)
  useEffect(() => {
    if (!userControllingMap) {
      setInternalMapCenter(mapCenter)
      setInternalMapZoom(mapZoom)
    }
  }, [mapCenter, mapZoom, userControllingMap])

  // 선택된 레스토랑이 변경될 때 지도 중심 이동
  useEffect(() => {
    if (selectedRestaurant && mapRef.current) {
      console.log("선택된 레스토랑으로 지도 이동:", selectedRestaurant.name)

      // 사용자 조작 상태 비활성화 (프로그래밍 방식 이동)
      onUserMapControlChange(false)

      // 내부 상태 업데이트
      const newCenter = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }
      setInternalMapCenter(newCenter)
      setInternalMapZoom(16)

      // 부모 컴포넌트 상태 업데이트
      onMapCenterChange(newCenter)
      onMapZoomChange(16)
    }
  }, [selectedRestaurant, onMapCenterChange, onMapZoomChange, onUserMapControlChange])

  // 지도 인스턴스 준비 완료 시 호출
  const handleMapReady = (map: google.maps.Map) => {
    console.log("Google Maps 인스턴스 준비 완료")
    mapRef.current = map

    // 지도 이벤트 리스너 추가
    map.addListener("dragstart", () => {
      console.log("지도 드래그 시작")
      setIsDragging(true)
    })

    map.addListener("dragend", () => {
      console.log("지도 드래그 종료")
      setIsDragging(false)
      const center = map.getCenter()
      if (center) {
        // 내부 상태 업데이트
        const newCenter = { lat: center.lat(), lng: center.lng() }
        setInternalMapCenter(newCenter)

        // 부모에게 변경 알림
        onMapCenterChange(newCenter)
      }
    })

    map.addListener("zoom_changed", () => {
      const newZoom = map.getZoom() || internalMapZoom
      setInternalMapZoom(newZoom)
      onMapZoomChange(newZoom)
    })

    // 센터 변경 이벤트 추가
    map.addListener("center_changed", () => {
      if (userControllingMap) {
        const center = map.getCenter()
        if (center) {
          // 내부 상태만 업데이트, 부모 상태는 dragend에서 업데이트
          setInternalMapCenter({ lat: center.lat(), lng: center.lng() })
        }
      }
    })
  }

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

    // 사용자 조작 상태 비활성화 (프로그래밍 방식 이동)
    onUserMapControlChange(false)

    // 내부 상태 업데이트
    setInternalMapCenter(position)
    setInternalMapZoom(15)

    // 부모 컴포넌트 상태 업데이트
    onMapCenterChange(position)
    onMapZoomChange(15)

    setShowCurrentLocation(true)
  }

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full relative bg-gray-100"
      style={{
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <CurrentLocationButton onLocationFound={handleLocationFound} />

      <Map
        mapId="restaurant-map"
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        center={userControllingMap ? undefined : internalMapCenter} // 사용자 조작 중이면 center prop을 사용하지 않음
        zoom={userControllingMap ? undefined : internalMapZoom} // 사용자 조작 중이면 zoom prop을 사용하지 않음
        onLoad={handleMapLoad}
        onError={handleMapError}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        clickableIcons={false}
        draggable={true}
      >
        <MapController onMapReady={handleMapReady} onUserMapControlChange={onUserMapControlChange} />

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

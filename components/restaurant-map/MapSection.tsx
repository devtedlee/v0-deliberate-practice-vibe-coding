"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Map, InfoWindow, AdvancedMarker, useMap } from "@vis.gl/react-google-maps"
import RestaurantMarker from "./RestaurantMarker"
import RestaurantInfoWindow from "./RestaurantInfoWindow"
import CurrentLocationButton from "./CurrentLocationButton"
import type { Restaurant } from "@/types/restaurant"
// import type { google } from "googlemaps"; // Removed as @types/google.maps should provide global types

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
  selectedRestaurant,
  onUserMapControlChange,
}: {
  onMapReady: (map: google.maps.Map) => void
  selectedRestaurant: Restaurant | null
  onUserMapControlChange: (isControlling: boolean) => void
}) {
  const map = useMap()
  const previousRestaurantRef = useRef<Restaurant | null>(null)

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

  // 선택된 레스토랑이 변경될 때 지도 이동
  useEffect(() => {
    if (map && selectedRestaurant && selectedRestaurant !== previousRestaurantRef.current) {
      console.log("선택된 레스토랑으로 지도 이동:", selectedRestaurant.name)

      // 지도를 선택된 레스토랑 위치로 부드럽게 이동
      map.panTo({ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng })
      map.setZoom(16)

      // 이동 애니메이션이 완료되면 즉시 사용자 조작 상태로 전환
      // 약 300ms 후에 사용자 조작 상태로 전환 (애니메이션 시간 고려)
      setTimeout(() => {
        console.log("지도 이동 완료, 사용자 조작 상태로 전환")
        onUserMapControlChange(true)
      }, 300)

      previousRestaurantRef.current = selectedRestaurant
    }
  }, [map, selectedRestaurant, onUserMapControlChange])

  return null
}

// Memoize MapController
const MemoizedMapController = memo(MapController)

function MapSection({
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

  // 컴포넌트 마운트 시 콘솔에 정보 출력
  useEffect(() => {
    console.log("MapSection 컴포넌트 마운트됨")
    console.log("맵 컨테이너 크기:", mapContainerRef.current?.offsetWidth, "x", mapContainerRef.current?.offsetHeight)
  }, [])

  // 지도 인스턴스 준비 완료 시 호출
  const handleMapReady = useCallback(
    (map: google.maps.Map) => {
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
          onMapCenterChange({ lat: center.lat(), lng: center.lng() })
        }
      })

      map.addListener("zoom_changed", () => {
        const newZoom = map.getZoom() || mapZoom
        onMapZoomChange(newZoom)
      })

      map.addListener("center_changed", () => {
        const center = map.getCenter()
        if (center) {
          const newCenter = { lat: center.lat(), lng: center.lng() }
          console.log("지도 중심 변경:", newCenter)
        }
      })
    },
    [mapZoom, onMapCenterChange, onMapZoomChange],
  )

  // 지도 로드 완료 시 호출
  const handleMapLoad = useCallback(() => {
    console.log("Google Maps 로드 성공")
    setIsMapLoaded(true)
  }, [setIsMapLoaded])

  // 지도 로드 실패 시 호출
  const handleMapError = useCallback(
    (error: Error) => {
      console.error("Google Maps 로드 실패:", error)
      onError(`지도 로드 실패: ${error.message}`)
    },
    [onError],
  )

  // 마커 클릭 시 해당 맛집 선택
  const handleMarkerClick = useCallback(
    (restaurant: Restaurant) => {
      console.log("마커 클릭:", restaurant.name)
      setSelectedRestaurant(restaurant)
    },
    [setSelectedRestaurant],
  )

  // 정보창 닫기
  const handleInfoWindowClose = useCallback(() => {
    setSelectedRestaurant(null)
  }, [setSelectedRestaurant])

  // 현재 위치 찾기
  const handleLocationFound = useCallback(
    (position: { lat: number; lng: number }) => {
      setCurrentLocation(position)
      setShowCurrentLocation(true)

      if (mapRef.current) {
        mapRef.current.panTo(position)
        mapRef.current.setZoom(15)
        setTimeout(() => {
          console.log("현재 위치로 이동 완료, 사용자 조작 상태로 전환")
          onUserMapControlChange(true)
        }, 300)
      }
      onMapCenterChange(position)
      onMapZoomChange(15)
    },
    [setCurrentLocation, setShowCurrentLocation, mapRef, onUserMapControlChange, onMapCenterChange, onMapZoomChange],
  )

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
        onIdle={handleMapLoad} // Changed from onLoad
        // onError={handleMapError} // Removed, typically handled by APIProvider
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl={false}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        clickableIcons={false}
        draggable={true}
      >
        <MemoizedMapController
          onMapReady={handleMapReady}
          selectedRestaurant={selectedRestaurant}
          onUserMapControlChange={onUserMapControlChange}
        />

        {restaurants.map((restaurant) => (
          <RestaurantMarker
            key={restaurant.id}
            restaurant={restaurant}
            onClick={handleMarkerClick} // Pass memoized handleMarkerClick directly
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

export default memo(MapSection)

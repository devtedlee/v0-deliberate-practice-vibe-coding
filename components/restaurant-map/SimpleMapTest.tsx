"use client"

import { useState } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"

interface SimpleMapTestProps {
  apiKey: string
}

export default function SimpleMapTest({ apiKey }: SimpleMapTestProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  const handleMapLoad = () => {
    console.log("기본 지도 로드 성공!")
    setMapLoaded(true)
  }

  const handleMapError = (error: unknown) => {
    console.error("기본 지도 로드 실패:", error)
    if (error instanceof Error) {
      setMapError(error.message)
    } else {
      setMapError("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">기본 지도 테스트</h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600">API 키: {apiKey ? `설정됨 (길이: ${apiKey.length})` : "설정되지 않음"}</p>
        <p className="text-sm text-gray-600">
          상태: {mapLoaded ? "지도 로드됨" : mapError ? "오류 발생" : "로드 중..."}
        </p>
        {mapError && <p className="text-sm text-red-600 mt-1">오류: {mapError}</p>}
      </div>

      <div className="h-64 w-full border border-gray-300">
        <APIProvider apiKey={apiKey} onError={handleMapError}>
          <Map
            mapId="simple-test-map"
            defaultCenter={{ lat: 37.5665, lng: 126.978 }}
            defaultZoom={12}
            onIdle={handleMapLoad} // Changed from onLoad
            // onError prop removed from Map, moved to APIProvider
            className="w-full h-full"
          />
        </APIProvider>
      </div>
    </div>
  )
}

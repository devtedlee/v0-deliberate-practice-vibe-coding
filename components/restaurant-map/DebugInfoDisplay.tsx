"use client"

import React from "react"

interface DebugInfoDisplayProps {
  apiKey?: string
  isPreviewMode: boolean
  isV0Preview: boolean
  currentUrl: string
  mapCenter: { lat: number; lng: number }
  mapZoom: number
  isUserControllingMap: boolean
  mapContainerRef: React.RefObject<HTMLDivElement | null> // Allow null
  mapError: string | null
}

export default function DebugInfoDisplay({
  apiKey,
  isPreviewMode,
  isV0Preview,
  currentUrl,
  mapCenter,
  mapZoom,
  isUserControllingMap,
  mapContainerRef,
  mapError,
}: DebugInfoDisplayProps) {
  return (
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
          <span className="font-medium">사용자 지도 조작:</span>{" "}
          <span className={isUserControllingMap ? "text-green-600 font-bold" : "text-gray-600"}>
            {isUserControllingMap ? "활성" : "비활성"}
          </span>
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
  )
}

"use client"

import React from "react"

interface ModeToggleButtonsProps {
  isPreviewMode: boolean
  toggleMapMode: () => void
  showMapList: boolean
  toggleViewMode: () => void
  isDevelopmentOrPreview: boolean
  isDebugMode: boolean
  toggleDebugMode: () => void
  isV0Preview: boolean
}

export default function ModeToggleButtons({
  isPreviewMode,
  toggleMapMode,
  showMapList,
  toggleViewMode,
  isDevelopmentOrPreview,
  isDebugMode,
  toggleDebugMode,
  isV0Preview,
}: ModeToggleButtonsProps) {
  return (
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
      {/* 개발 환경이나 v0 프리뷰에서만 디버그 버튼 표시 */}
      {isDevelopmentOrPreview && (
        <button
          onClick={toggleDebugMode}
          className={`px-3 py-1 rounded-md text-xs font-medium ${
            isDebugMode ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isDebugMode ? "디버그 끄기" : "디버그 켜기"}
        </button>
      )}
    </div>
  )
}

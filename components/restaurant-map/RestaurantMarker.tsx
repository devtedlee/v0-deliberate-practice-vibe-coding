"use client"

import { memo } from "react"
import { AdvancedMarker } from "@vis.gl/react-google-maps"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantMarkerProps {
  restaurant: Restaurant
  onClick: (restaurant: Restaurant) => void // Changed to accept restaurant object
  isSelected: boolean
}

function RestaurantMarker({ restaurant, onClick, isSelected }: RestaurantMarkerProps) {
  // 카테고리별 마커 색상 지정
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "한식":
        return "bg-red-500"
      case "양식":
        return "bg-blue-500"
      case "일식":
        return "bg-green-500"
      case "중식":
        return "bg-yellow-500"
      case "카페":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <AdvancedMarker
      position={{ lat: restaurant.lat, lng: restaurant.lng }}
      onClick={() => onClick(restaurant)} // Call prop with restaurant object
      title={restaurant.name}
    >
      <div className="relative cursor-pointer transform transition-transform hover:scale-110">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md border-2 ${
            isSelected ? "border-white scale-125" : "border-transparent"
          } ${getCategoryColor(restaurant.category)}`}
        >
          {getInitial(restaurant.name)}
        </div>
        {isSelected && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium">
            {restaurant.name}
          </div>
        )}
      </div>
    </AdvancedMarker>
  )
}

// 맛집 이름의 첫 글자를 가져오는 함수
function getInitial(name: string): string {
  return name.charAt(0)
}

export default memo(RestaurantMarker)

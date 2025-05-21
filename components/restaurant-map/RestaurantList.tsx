"use client"

import { useEffect, useRef, useMemo, memo } from "react"
// ExternalLink is not used directly in RestaurantList anymore, it's in RestaurantListItemCard
// import { ExternalLink } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"
import RestaurantListItemCard from "./RestaurantListItemCard"

interface RestaurantListProps {
  restaurants: Restaurant[]
  onSelectRestaurant: (restaurant: Restaurant) => void
  selectedRestaurantId?: number
}

function RestaurantList({ restaurants, onSelectRestaurant, selectedRestaurantId }: RestaurantListProps) {
  // 선택된 맛집 요소에 대한 참조
  const selectedItemRef = useRef<HTMLDivElement>(null)

  // 선택된 맛집이 변경되면 해당 요소로 스크롤
  useEffect(() => {
    if (selectedRestaurantId && selectedItemRef.current) {
      // 부드러운 스크롤로 선택된 맛집으로 이동
      selectedItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [selectedRestaurantId])

  // 카테고리별 맛집 그룹화 (useMemo 적용)
  const groupedByCategory = useMemo(() => {
    return restaurants.reduce(
      (acc, restaurant) => {
        if (!acc[restaurant.category]) {
          acc[restaurant.category] = []
        }
        acc[restaurant.category].push(restaurant)
        return acc
      },
      {} as Record<string, Restaurant[]>,
    )
  }, [restaurants])

  // 카테고리별 색상 매핑
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(groupedByCategory).map(([category, categoryRestaurants]) => (
        <div key={category} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <span className={`w-3 h-3 rounded-full mr-2 ${getCategoryColor(category)}`}></span>
            <h3 className="text-lg font-semibold">{category}</h3>
            <span className="text-sm text-gray-500 ml-2">({categoryRestaurants.length})</span>
          </div>

          <div className="space-y-3">
            {categoryRestaurants.map((restaurant) => (
              <RestaurantListItemCard
                key={restaurant.id}
                ref={restaurant.id === selectedRestaurantId ? selectedItemRef : null}
                restaurant={restaurant}
                isSelected={restaurant.id === selectedRestaurantId}
                onSelectRestaurant={onSelectRestaurant}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(RestaurantList)

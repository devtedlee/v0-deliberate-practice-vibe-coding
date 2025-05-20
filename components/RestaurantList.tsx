"use client"

import { ExternalLink } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantListProps {
  restaurants: Restaurant[]
  onSelectRestaurant: (restaurant: Restaurant) => void
  selectedRestaurantId?: number
}

export default function RestaurantList({ restaurants, onSelectRestaurant, selectedRestaurantId }: RestaurantListProps) {
  // 카테고리별 맛집 그룹화
  const groupedByCategory = restaurants.reduce(
    (acc, restaurant) => {
      if (!acc[restaurant.category]) {
        acc[restaurant.category] = []
      }
      acc[restaurant.category].push(restaurant)
      return acc
    },
    {} as Record<string, Restaurant[]>,
  )

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
              <div
                key={restaurant.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRestaurantId === restaurant.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onSelectRestaurant(restaurant)}
              >
                <h4 className="font-medium">{restaurant.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{restaurant.description}</p>
                <div className="text-xs text-gray-500 mt-2">
                  <p>주소: {restaurant.address}</p>
                  <p>메뉴: {restaurant.menu}</p>
                </div>
                {restaurant.link && (
                  <a
                    href={restaurant.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    <span>웹사이트</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

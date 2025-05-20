"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantSidebarProps {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  onSelectRestaurant: (restaurant: Restaurant) => void
  selectedCategories: string[]
}

export default function RestaurantSidebar({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  selectedCategories,
}: RestaurantSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  // 카테고리별 맛집 그룹화
  const filteredRestaurants = restaurants.filter((restaurant) => selectedCategories.includes(restaurant.category))

  const groupedByCategory = filteredRestaurants.reduce(
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
    <div
      className={`absolute top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-20 flex ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-72 h-full overflow-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">맛집 목록</h2>
          <p className="text-sm text-gray-500">총 {filteredRestaurants.length}개의 맛집</p>
        </div>

        <div className="p-4">
          {Object.entries(groupedByCategory).map(([category, categoryRestaurants]) => (
            <div key={category} className="mb-6">
              <div className="flex items-center mb-2">
                <span className={`w-3 h-3 rounded-full mr-2 ${getCategoryColor(category)}`}></span>
                <h3 className="text-sm font-semibold">{category}</h3>
                <span className="text-xs text-gray-500 ml-2">({categoryRestaurants.length})</span>
              </div>

              <div className="space-y-3">
                {categoryRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRestaurant?.id === restaurant.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => onSelectRestaurant(restaurant)}
                  >
                    <h4 className="font-medium">{restaurant.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{restaurant.description}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      <p className="truncate">{restaurant.address}</p>
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
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-r-md shadow-md"
        aria-label={isOpen ? "사이드바 닫기" : "사이드바 열기"}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </div>
  )
}

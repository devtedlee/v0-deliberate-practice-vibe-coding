import { ExternalLink } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantInfoWindowProps {
  restaurant: Restaurant
}

export default function RestaurantInfoWindow({ restaurant }: RestaurantInfoWindowProps) {
  return (
    <div className="p-2 max-w-xs">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
          {restaurant.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mt-1">{restaurant.description}</p>

      <div className="mt-3 space-y-2">
        <div className="text-xs">
          <span className="font-semibold text-gray-700">주소:</span>
          <span className="text-gray-600 ml-1">{restaurant.address}</span>
        </div>

        <div className="text-xs">
          <span className="font-semibold text-gray-700">대표 메뉴:</span>
          <span className="text-gray-600 ml-1">{restaurant.menu}</span>
        </div>

        {restaurant.link && (
          <a
            href={restaurant.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>웹사이트 방문하기</span>
          </a>
        )}
      </div>
    </div>
  )
}

import type { Restaurant } from "@/types/restaurant";
import { ExternalLink } from "lucide-react";
import { memo, forwardRef } from "react";

interface RestaurantListItemCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantListItemCard = forwardRef<HTMLDivElement, RestaurantListItemCardProps>(
  ({ restaurant, isSelected, onSelectRestaurant }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-3 rounded-lg border cursor-pointer transition-all ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md transform scale-102"
            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
        }`}
        onClick={() => onSelectRestaurant(restaurant)}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {restaurant.name}
          </h3>
          {restaurant.url && (
            <a
              href={restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent card click when link is clicked
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{restaurant.address}</p>
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            <span className="font-medium">대표 메뉴:</span> {restaurant.representativeMenu}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium">추천 이유:</span> {restaurant.recommendationReason}
          </p>
        </div>
      </div>
    );
  }
);

RestaurantListItemCard.displayName = 'RestaurantListItemCard';
export default memo(RestaurantListItemCard);

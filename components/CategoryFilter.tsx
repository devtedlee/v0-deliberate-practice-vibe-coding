"use client"
import { restaurantsData } from "@/data/restaurants"

// 모든 카테고리 추출
const allCategories = Array.from(new Set(restaurantsData.map((r) => r.category)))

interface CategoryFilterProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
}

export default function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
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

  // 카테고리 토글 처리
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  // 모든 카테고리 선택/해제
  const toggleAll = () => {
    if (selectedCategories.length === allCategories.length) {
      onCategoryChange([])
    } else {
      onCategoryChange([...allCategories])
    }
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">카테고리 필터</h3>
        <button onClick={toggleAll} className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
          {selectedCategories.length === allCategories.length ? "모두 해제" : "모두 선택"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center ${
              selectedCategories.includes(category)
                ? `${getCategoryColor(category)} text-white`
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-1 ${getCategoryColor(category)}`}></span>
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

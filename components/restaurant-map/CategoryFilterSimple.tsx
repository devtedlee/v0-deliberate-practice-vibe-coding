"use client"

import { useMemo, useCallback, memo } from "react"
import { restaurantsData } from "@/data/restaurants"

interface CategoryFilterSimpleProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
}

function CategoryFilterSimple({ selectedCategories, onCategoryChange }: CategoryFilterSimpleProps) {
  // 모든 카테고리 추출 (useMemo 적용)
  const allCategories = useMemo(() => {
    return Array.from(new Set(restaurantsData.map((r) => r.category)))
  }, [])

  // 카테고리 토글 처리 (useCallback 적용)
  const toggleCategory = useCallback(
    (category: string) => {
      if (selectedCategories.includes(category)) {
        onCategoryChange(selectedCategories.filter((c) => c !== category))
      } else {
        onCategoryChange([...selectedCategories, category])
      }
    },
    [selectedCategories, onCategoryChange],
  )

  // 모든 카테고리 선택/해제 (useCallback 적용)
  const toggleAll = useCallback(() => {
    if (selectedCategories.length === allCategories.length) {
      onCategoryChange([])
    } else {
      onCategoryChange([...allCategories])
    }
  }, [selectedCategories, allCategories, onCategoryChange])

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm"
      style={{ pointerEvents: "auto" }} // 명시적으로 포인터 이벤트 활성화
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">카테고리 필터</h3>
        <button onClick={toggleAll} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          {selectedCategories.length === allCategories.length ? "모두 해제" : "모두 선택"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={(e) => {
              e.stopPropagation() // 이벤트 버블링 방지
              toggleCategory(category)
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center ${
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

// 카테고리별 색상 매핑
// 이 함수는 props나 state에 의존하지 않으므로 컴포넌트 외부에 두거나,
// 컴포넌트 내부에 두더라도 useCallback 등으로 감쌀 필요는 일반적으로 없습니다.
// React.memo는 props가 변경되지 않으면 리렌더링을 방지해주며,
// 이 함수는 렌더링 로직의 일부로 실행되지만 그 자체가 리렌더링의 원인이 되지는 않습니다.
function getCategoryColor(category: string) {
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

export default memo(CategoryFilterSimple)

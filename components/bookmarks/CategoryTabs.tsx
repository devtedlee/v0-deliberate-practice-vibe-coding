"use client"

interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {category === "all" ? "전체" : category}
        </button>
      ))}
    </div>
  )
}

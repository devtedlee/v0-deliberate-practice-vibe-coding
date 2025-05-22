"use client"

interface SortOptionsProps {
  onSortChange: (option: "newest" | "oldest" | "alphabetical") => void
  currentSort: string
}

export default function SortOptions({ onSortChange, currentSort }: SortOptionsProps) {
  return (
    <div className="flex items-center">
      <span className="text-sm text-gray-600 mr-2">정렬:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as "newest" | "oldest" | "alphabetical")}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="newest">최신순</option>
        <option value="oldest">오래된순</option>
        <option value="alphabetical">가나다순</option>
      </select>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { type Bookmark, categories } from "@/data/bookmarksData"
import CategoryTabs from "./CategoryTabs"
import BookmarkList from "./BookmarkList"
import SearchBar from "./SearchBar"
import SortOptions from "./SortOptions"

type SortOption = "newest" | "oldest" | "alphabetical"

interface BookmarkCollectionProps {
  bookmarks: Bookmark[]
}

export default function BookmarkCollection({ bookmarks }: BookmarkCollectionProps) {
  // 상태 관리
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOption, setSortOption] = useState<SortOption>("newest")

  // 필터링된 북마크
  const filteredBookmarks = useMemo(() => {
    // 카테고리 필터링
    let filtered =
      activeCategory === "all" ? bookmarks : bookmarks.filter((bookmark) => bookmark.category === activeCategory)

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(query) ||
          bookmark.description.toLowerCase().includes(query) ||
          bookmark.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // 정렬
    return [...filtered].sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      } else if (sortOption === "oldest") {
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
      } else {
        // alphabetical
        return a.title.localeCompare(b.title)
      }
    })
  }, [bookmarks, activeCategory, searchQuery, sortOption])

  // 검색어 변경 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">나만의 북마크 컬렉션</h1>
        <p className="text-gray-600">주제별로 유용한 링크를 모아보세요</p>
      </header>

      <div className="mb-6">
        <CategoryTabs
          categories={["all", ...categories]}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <SearchBar onSearch={handleSearchChange} />
        <SortOptions onSortChange={handleSortChange} currentSort={sortOption} />
      </div>

      <BookmarkList bookmarks={filteredBookmarks} />

      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? "검색 결과가 없습니다." : "이 카테고리에 북마크가 없습니다."}
          </p>
        </div>
      )}
    </div>
  )
}

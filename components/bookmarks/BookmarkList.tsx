import type { Bookmark } from "@/data/bookmarksData"
import BookmarkCard from "./BookmarkCard"

interface BookmarkListProps {
  bookmarks: Bookmark[]
}

export default function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}

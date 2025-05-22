import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BookmarkCollection from "@/components/bookmarks/BookmarkCollection"
import { bookmarks } from "@/data/bookmarksData"

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
        <BookmarkCollection bookmarks={bookmarks} />
      </div>
    </div>
  )
}

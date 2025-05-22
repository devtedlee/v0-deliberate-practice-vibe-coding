import type { Bookmark } from "@/data/bookmarksData"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface BookmarkCardProps {
  bookmark: Bookmark
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(bookmark.addedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            {bookmark.thumbnail && (
              <div className="w-10 h-10 mr-3 relative flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={bookmark.thumbnail || "/placeholder.svg"}
                  alt={`${bookmark.title} 아이콘`}
                  width={40}
                  height={40}
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{bookmark.title}</h3>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{bookmark.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {bookmark.tags.map((tag) => (
            <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-500">{formattedDate}</span>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          aria-label={`${bookmark.title} 웹사이트 방문하기 (새 탭에서 열림)`}
        >
          방문하기
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

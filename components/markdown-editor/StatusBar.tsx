"use client"

interface StatusBarProps {
  wordCount: number
  charCount: number
  isSaved: boolean
}

export function StatusBar({ wordCount, charCount, isSaved }: StatusBarProps) {
  return (
    <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-600 bg-gray-50 border-t border-gray-200">
      <div>
        <span className="mr-4">{wordCount} 단어</span>
        <span>{charCount} 글자</span>
      </div>
      <div>
        {isSaved && (
          <span className="flex items-center text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            저장됨
          </span>
        )}
      </div>
    </div>
  )
}

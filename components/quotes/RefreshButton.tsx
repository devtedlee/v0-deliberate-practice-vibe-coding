"use client"

import { RefreshCw } from "lucide-react"

interface RefreshButtonProps {
  onClick: () => void
}

export default function RefreshButton({ onClick }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      aria-label="새로운 명언/팁 보기"
    >
      <RefreshCw className="h-4 w-4 mr-2" />
      <span>새로운 명언/팁</span>
    </button>
  )
}

"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface CopyToastProps {
  color: string | null
  onClose: () => void
}

export default function CopyToast({ color, onClose }: CopyToastProps) {
  useEffect(() => {
    if (color) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [color, onClose])

  if (!color) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-50 animate-fade-in-up">
      <CheckCircle className="h-5 w-5 text-green-400" />
      <span>
        <span className="font-medium">{color.toUpperCase()}</span> copied to clipboard!
      </span>
    </div>
  )
}

"use client"

import { useState } from "react"
import { getContrastTextColor } from "@/utils/colorUtils"

interface ColorBlockProps {
  color: string
  onCopy: (color: string) => void
}

export default function ColorBlock({ color, onCopy }: ColorBlockProps) {
  const [isHovered, setIsHovered] = useState(false)
  const textColor = getContrastTextColor(color)

  const handleCopy = () => {
    navigator.clipboard.writeText(color)
    onCopy(color)
  }

  return (
    <div
      className="flex flex-col items-center transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full aspect-square rounded-lg shadow-md cursor-pointer flex items-center justify-center mb-2 relative"
        style={{ backgroundColor: color }}
        onClick={handleCopy}
        aria-label={`Copy color ${color}`}
      >
        {isHovered && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-20"
            style={{ color: textColor }}
          >
            <span className="text-sm font-medium">Click to copy</span>
          </div>
        )}
      </div>
      <button
        className="px-3 py-1 rounded text-sm font-mono transition-colors"
        style={{
          backgroundColor: isHovered ? color : "transparent",
          color: isHovered ? textColor : "currentColor",
        }}
        onClick={handleCopy}
      >
        {color.toUpperCase()}
      </button>
    </div>
  )
}

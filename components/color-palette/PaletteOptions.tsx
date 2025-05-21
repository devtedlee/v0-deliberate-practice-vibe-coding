"use client"

interface PaletteOptionsProps {
  paletteType: "random" | "tailwind"
  onTypeChange: (type: "random" | "tailwind") => void
  onGenerateNew: () => void
  isTailwindDisabled?: boolean
}

export default function PaletteOptions({
  paletteType,
  onTypeChange,
  onGenerateNew,
  isTailwindDisabled = false,
}: PaletteOptionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      <div className="flex items-center bg-gray-100 p-1 rounded-full">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            paletteType === "random" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => onTypeChange("random")}
        >
          Random Colors
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            paletteType === "tailwind"
              ? "bg-white text-gray-800 shadow-sm"
              : isTailwindDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => !isTailwindDisabled && onTypeChange("tailwind")}
          disabled={isTailwindDisabled}
          title={isTailwindDisabled ? "Tailwind 설정에 문제가 있어 사용할 수 없습니다" : ""}
        >
          Tailwind Colors
          {isTailwindDisabled && <span className="ml-1 text-xs">⚠️</span>}
        </button>
      </div>

      <button
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-colors flex items-center justify-center"
        onClick={onGenerateNew}
      >
        Generate New Palette
      </button>
    </div>
  )
}

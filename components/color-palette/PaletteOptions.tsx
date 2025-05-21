"use client"

interface PaletteOptionsProps {
  paletteType: "random" | "tailwind"
  onTypeChange: (type: "random" | "tailwind") => void
  onGenerateNew: () => void
}

export default function PaletteOptions({ paletteType, onTypeChange, onGenerateNew }: PaletteOptionsProps) {
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
            paletteType === "tailwind" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => onTypeChange("tailwind")}
        >
          Tailwind Colors
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

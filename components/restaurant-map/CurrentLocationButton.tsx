"use client"

import { useState, memo } from "react"
import { MapPin } from "lucide-react"

interface CurrentLocationButtonProps {
  onLocationFound: (position: { lat: number; lng: number }) => void
}

function CurrentLocationButton({ onLocationFound }: CurrentLocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("브라우저에서 위치 정보를 지원하지 않습니다.")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        onLocationFound({ lat: latitude, lng: longitude })
        setIsLoading(false)
      },
      (err) => {
        console.error("위치 정보를 가져오는데 실패했습니다:", err)
        setError("위치 정보를 가져오는데 실패했습니다. 권한을 확인해주세요.")
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  }

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="내 위치 찾기"
      >
        <MapPin className={`h-5 w-5 ${isLoading ? "text-gray-400" : "text-blue-600"}`} />
      </button>
      {error && (
        <div className="absolute bottom-14 right-0 bg-red-50 text-red-600 p-2 rounded-md text-xs shadow-md">
          {error}
        </div>
      )}
    </div>
  )
}

export default memo(CurrentLocationButton)

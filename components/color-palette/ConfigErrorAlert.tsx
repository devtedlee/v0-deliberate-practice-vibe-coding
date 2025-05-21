"use client"

import { AlertCircle, X } from "lucide-react"

interface ConfigErrorAlertProps {
  message: string
  onClose: () => void
}

export default function ConfigErrorAlert({ message, onClose }: ConfigErrorAlertProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-md relative">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">설정 오류</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>{message}</p>
            <p className="mt-1 text-xs">랜덤 색상 모드로 자동 전환되었습니다.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-500 hover:text-amber-700"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

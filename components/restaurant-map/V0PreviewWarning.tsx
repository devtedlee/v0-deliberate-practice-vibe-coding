"use client"

import React from "react"

interface V0PreviewWarningProps {
  currentUrl: string
  exactPattern: string
  wildcardPattern: string
}

export default function V0PreviewWarning({
  currentUrl,
  exactPattern,
  wildcardPattern,
}: V0PreviewWarningProps) {
  const handleCopy = (textToCopy: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert("패턴이 클립보드에 복사되었습니다!"))
        .catch(err => console.error("클립보드 복사 실패:", err));
    } else {
      alert("클립보드 기능을 사용할 수 없습니다.");
    }
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>v0 preview 환경 감지됨:</strong> 이 환경에서는 Google Maps API 키 제한으로 인해 지도가 표시되지
            않습니다.
          </p>
          <div className="mt-2 p-2 bg-yellow-100 rounded text-xs font-mono overflow-auto">
            <p className="text-yellow-800">
              <strong>현재 전체 URL:</strong>
            </p>
            <p className="text-yellow-800 break-all">{currentUrl}</p>
          </div>
          <div className="mt-3">
            <p className="text-sm text-yellow-700">
              <strong>API 키 제한 설정에 추가할 패턴:</strong>
            </p>
            <div className="mt-1 space-y-1">
              <div className="flex items-center">
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">{exactPattern}</code>
                <button
                  onClick={() => handleCopy(exactPattern)}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  복사
                </button>
              </div>
              <p className="text-xs text-yellow-700">또는 더 넓은 범위의 와일드카드 패턴:</p>
              <div className="flex items-center">
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">{wildcardPattern}</code>
                <button
                  onClick={() => handleCopy(wildcardPattern)}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  복사
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

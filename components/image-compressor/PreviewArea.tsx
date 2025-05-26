"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { ImageProcessor } from "@/utils/imageProcessor"

interface PreviewAreaProps {
  uploadedFiles: File[]
  isProcessing: boolean
  processingProgress: number
}

export default function PreviewArea({ uploadedFiles, isProcessing, processingProgress }: PreviewAreaProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    // 미리보기 URL 생성
    const urls = uploadedFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)

    // 컴포넌트 언마운트 시 URL 정리
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [uploadedFiles])

  if (uploadedFiles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">📷</div>
        <p>업로드된 이미지가 없습니다.</p>
        <p className="text-sm">이미지를 업로드하여 미리보기를 확인하세요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>이미지 처리 중...</span>
            <span>{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} className="w-full" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadedFiles.map((file, index) => (
          <div key={`${file.name}-${index}`} className="border rounded-lg overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <Image
                src={previewUrls[index] || "/placeholder.svg"}
                alt={file.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm truncate" title={file.name}>
                {file.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{ImageProcessor.formatFileSize(file.size)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

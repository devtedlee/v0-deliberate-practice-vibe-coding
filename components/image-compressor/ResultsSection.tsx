"use client"

import Image from "next/image"
import { Download, Archive, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProcessedImage } from "@/data/imageCompressorDefaults"
import { ImageProcessor } from "@/utils/imageProcessor"

interface ResultsSectionProps {
  processedImages: ProcessedImage[]
  onDownloadSingle: (image: ProcessedImage) => void
  onDownloadAll: () => void
}

export default function ResultsSection({ processedImages, onDownloadSingle, onDownloadAll }: ResultsSectionProps) {
  if (processedImages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">🎯</div>
        <p>압축된 이미지가 없습니다.</p>
        <p className="text-sm">이미지를 업로드하고 압축을 실행하세요.</p>
      </div>
    )
  }

  const totalOriginalSize = processedImages.reduce((sum, img) => sum + img.originalSize, 0)
  const totalCompressedSize = processedImages.reduce((sum, img) => sum + img.compressedSize, 0)
  const totalCompressionRatio = ImageProcessor.calculateCompressionRatio(totalOriginalSize, totalCompressedSize)

  return (
    <div className="space-y-6">
      {/* 전체 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">압축 결과 요약</CardTitle>
          <CardDescription>{processedImages.length}개 이미지 처리 완료</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{ImageProcessor.formatFileSize(totalOriginalSize)}</div>
              <div className="text-sm text-gray-500">원본 크기</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {ImageProcessor.formatFileSize(totalCompressedSize)}
              </div>
              <div className="text-sm text-gray-500">압축 후 크기</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCompressionRatio}%</div>
              <div className="text-sm text-gray-500">압축률</div>
            </div>
            <div className="text-center">
              <Button onClick={onDownloadAll} className="w-full">
                <Archive className="mr-2 h-4 w-4" />
                전체 다운로드
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개별 이미지 결과 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {processedImages.map((image) => (
          <Card key={image.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* 이미지 비교 */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">원본</div>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={URL.createObjectURL(image.originalFile) || "/placeholder.svg"}
                        alt="원본"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">압축 후</div>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={image.previewUrl || "/placeholder.svg"}
                        alt="압축 후"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* 파일 정보 */}
                <div>
                  <h4 className="font-medium text-sm truncate mb-2" title={image.originalFile.name}>
                    {image.originalFile.name}
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">파일 크기:</span>
                      <div className="text-right">
                        <div>{ImageProcessor.formatFileSize(image.originalSize)}</div>
                        <div className="text-green-600">→ {ImageProcessor.formatFileSize(image.compressedSize)}</div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">이미지 크기:</span>
                      <div className="text-right">
                        <div>
                          {image.originalDimensions.width}×{image.originalDimensions.height}
                        </div>
                        <div className="text-blue-600">
                          → {image.processedDimensions.width}×{image.processedDimensions.height}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">압축률:</span>
                      <Badge variant={image.compressionRatio > 0 ? "default" : "secondary"}>
                        <TrendingDown className="mr-1 h-3 w-3" />
                        {image.compressionRatio}%
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* 다운로드 버튼 */}
                <Button onClick={() => onDownloadSingle(image)} className="w-full" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  다운로드
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

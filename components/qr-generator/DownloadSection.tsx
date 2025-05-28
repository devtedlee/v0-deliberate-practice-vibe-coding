"use client"

import { Download, ImageIcon, FileText, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { QrSettings } from "@/data/qrGeneratorDefaults"

interface DownloadSectionProps {
  onDownload: (format: "png" | "svg") => void
  isGenerating: boolean
  qrSettings: QrSettings
}

export default function DownloadSection({ onDownload, isGenerating, qrSettings }: DownloadSectionProps) {
  const estimatedFileSize = Math.round((qrSettings.size * qrSettings.size * 4) / 1024) // KB 단위 추정

  if (!qrSettings.value.trim()) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">📥</div>
        <p>QR 코드를 생성한 후 다운로드할 수 있습니다.</p>
        <p className="text-sm">데이터를 입력하여 QR 코드를 만들어보세요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 다운로드 옵션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" />
              PNG 이미지
            </CardTitle>
            <CardDescription className="text-sm">일반적인 이미지 형식, 대부분의 용도에 적합</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">예상 파일 크기:</span>
                <Badge variant="secondary">{estimatedFileSize}KB</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">해상도:</span>
                <span>
                  {qrSettings.size}×{qrSettings.size}px
                </span>
              </div>
              <Button onClick={() => onDownload("png")} disabled={isGenerating} className="w-full" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "생성 중..." : "PNG 다운로드"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              SVG 벡터
            </CardTitle>
            <CardDescription className="text-sm">확대해도 깨지지 않는 벡터 형식</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">파일 크기:</span>
                <Badge variant="secondary">~2KB</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">확장성:</span>
                <span>무제한</span>
              </div>
              <Button
                onClick={() => onDownload("svg")}
                disabled={isGenerating}
                className="w-full"
                size="sm"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "생성 중..." : "SVG 다운로드"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR 코드 정보 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">QR 코드 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">데이터 길이:</span>
                <span>{qrSettings.value.length}자</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">에러 교정:</span>
                <span>{qrSettings.level} 레벨</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">크기:</span>
                <span>{qrSettings.size}px</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">전경색:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: qrSettings.fgColor }} />
                  <span className="font-mono text-xs">{qrSettings.fgColor}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">배경색:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: qrSettings.bgColor }} />
                  <span className="font-mono text-xs">{qrSettings.bgColor}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">로고:</span>
                <span>{qrSettings.logoImage ? "포함됨" : "없음"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용 팁 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>사용 팁:</strong> 인쇄물에는 PNG 형식을, 웹사이트나 확대가 필요한 용도에는 SVG 형식을 권장합니다. 에러
          교정 레벨이 높을수록 QR 코드가 손상되어도 읽을 수 있는 확률이 높아집니다.
        </AlertDescription>
      </Alert>
    </div>
  )
}

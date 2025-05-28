"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { ArrowLeft, Download, QrCode } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function QrGeneratorPage() {
  const [inputValue, setInputValue] = useState("https://example.com")
  const [inputType, setInputType] = useState("url")
  const [size, setSize] = useState([256])
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const [error, setError] = useState<string | null>(null)

  // 입력 값 유효성 검사
  const validateInput = (value: string, type: string) => {
    if (!value.trim()) {
      setError("입력 값이 필요합니다.")
      return false
    }

    switch (type) {
      case "url":
        try {
          new URL(value)
          setError(null)
          return true
        } catch {
          setError("올바른 URL 형식을 입력해주세요. (예: https://example.com)")
          return false
        }
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          setError("올바른 이메일 형식을 입력해주세요.")
          return false
        }
        break
      case "phone":
        const phoneRegex = /^[+]?[0-9\-\s$$$$]+$/
        if (!phoneRegex.test(value)) {
          setError("올바른 전화번호 형식을 입력해주세요.")
          return false
        }
        break
    }

    setError(null)
    return true
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    validateInput(value, inputType)
  }

  const handleTypeChange = (type: string) => {
    setInputType(type)
    validateInput(inputValue, type)
  }

  // QR 코드 다운로드
  const downloadQrCode = (format: "png" | "svg") => {
    const svg = document.querySelector("#qr-code-svg") as SVGElement
    if (!svg) return

    if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const svgUrl = URL.createObjectURL(svgBlob)
      const downloadLink = document.createElement("a")
      downloadLink.href = svgUrl
      downloadLink.download = `qrcode-${Date.now()}.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(svgUrl)
    } else {
      // PNG 다운로드
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = size[0]
        canvas.height = size[0]
        ctx?.drawImage(img, 0, 0, size[0], size[0])

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const downloadLink = document.createElement("a")
            downloadLink.href = url
            downloadLink.download = `qrcode-${Date.now()}.png`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
            URL.revokeObjectURL(url)
          }
        }, "image/png")
      }

      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(svgBlob)
      img.src = url
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">QR 코드 생성기</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            URL, 텍스트, 연락처 등 원하는 정보를 QR 코드로 변환하세요. 다양한 커스터마이징 옵션으로 나만의 QR 코드를
            만들 수 있습니다.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 max-w-2xl mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 입력 및 설정 영역 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="mr-2 h-5 w-5" />
                  데이터 입력
                </CardTitle>
                <CardDescription>QR 코드에 담을 정보를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="input-type">데이터 타입</Label>
                  <Select value={inputType} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="text">텍스트</SelectItem>
                      <SelectItem value="email">이메일</SelectItem>
                      <SelectItem value="phone">전화번호</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="input-value">
                    {inputType === "url" && "URL"}
                    {inputType === "text" && "텍스트"}
                    {inputType === "email" && "이메일"}
                    {inputType === "phone" && "전화번호"}
                  </Label>
                  <Input
                    id="input-value"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={
                      inputType === "url"
                        ? "https://example.com"
                        : inputType === "email"
                          ? "example@email.com"
                          : inputType === "phone"
                            ? "+82-10-1234-5678"
                            : "텍스트를 입력하세요"
                    }
                    className={error ? "border-red-500" : ""}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>커스터마이징</CardTitle>
                <CardDescription>QR 코드의 모양을 설정하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>크기: {size[0]}px</Label>
                  <Slider value={size} onValueChange={setSize} max={512} min={128} step={32} className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fg-color">전경색</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bg-color">배경색</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>에러 교정 레벨</Label>
                  <Select value={errorLevel} onValueChange={(value: "L" | "M" | "Q" | "H") => setErrorLevel(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">L (낮음, ~7%)</SelectItem>
                      <SelectItem value="M">M (중간, ~15%)</SelectItem>
                      <SelectItem value="Q">Q (높음, ~25%)</SelectItem>
                      <SelectItem value="H">H (최고, ~30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* QR 코드 표시 및 다운로드 영역 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>QR 코드 미리보기</CardTitle>
                <CardDescription>생성된 QR 코드를 확인하고 다운로드하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">미리보기</TabsTrigger>
                    <TabsTrigger value="download">다운로드</TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="mt-6">
                    <div className="flex flex-col items-center space-y-4">
                      {inputValue.trim() && !error ? (
                        <div
                          className="flex items-center justify-center p-4 rounded-lg border"
                          style={{ backgroundColor: bgColor }}
                        >
                          <QRCodeSVG
                            id="qr-code-svg"
                            value={inputValue}
                            size={size[0]}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level={errorLevel}
                            includeMargin={true}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-500">
                            <div className="text-4xl mb-2">📱</div>
                            <p>올바른 데이터를 입력하면 QR 코드가 생성됩니다</p>
                          </div>
                        </div>
                      )}

                      {inputValue.trim() && !error && (
                        <div className="text-center space-y-1">
                          <p className="text-sm text-gray-600">
                            크기: {size[0]}×{size[0]}px
                          </p>
                          <p className="text-sm text-gray-600">에러 교정: {errorLevel} 레벨</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="download" className="mt-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">QR 코드를 이미지 파일로 다운로드하세요</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={() => downloadQrCode("png")}
                            disabled={!inputValue.trim() || !!error}
                            className="flex items-center"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            PNG 다운로드
                          </Button>
                          <Button
                            onClick={() => downloadQrCode("svg")}
                            disabled={!inputValue.trim() || !!error}
                            variant="outline"
                            className="flex items-center"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            SVG 다운로드
                          </Button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">다운로드 정보:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• PNG: 래스터 이미지, 인쇄물에 적합</li>
                          <li>• SVG: 벡터 이미지, 확대/축소 시 품질 유지</li>
                          <li>• 파일명: qrcode-[타임스탬프].확장자</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 간편한 입력</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                URL, 텍스트, 이메일, 전화번호 등 다양한 형태의 데이터를 QR 코드로 변환할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎨 맞춤 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                크기, 색상, 에러 교정 레벨 등 다양한 옵션으로 나만의 QR 코드를 디자인할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💾 고품질 다운로드</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                PNG, SVG 형식으로 고품질 QR 코드를 다운로드하여 인쇄물이나 디지털 매체에 활용하세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

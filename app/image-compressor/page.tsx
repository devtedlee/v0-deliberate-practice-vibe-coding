"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Head from "next/head"
import { ArrowLeft, Upload, Download, Settings, ImageIcon, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageUploader from "@/components/image-compressor/ImageUploader"
import SettingsPanel from "@/components/image-compressor/SettingsPanel"
import PreviewArea from "@/components/image-compressor/PreviewArea"
import ResultsSection from "@/components/image-compressor/ResultsSection"
import { defaultOptions, seoData, type CompressionOptions, type ProcessedImage } from "@/data/imageCompressorDefaults"
import { ImageProcessor } from "@/utils/imageProcessor"
import { DownloadUtils } from "@/utils/downloadUtils"

export default function ImageCompressorPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [options, setOptions] = useState<CompressionOptions>(defaultOptions)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // 파일 업로드 처리
  const handleFilesUpload = useCallback((files: File[]) => {
    setUploadedFiles(files)
    setProcessedImages([])
    setError(null)
  }, [])

  // 이미지 처리 실행
  const handleProcessImages = useCallback(async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setError(null)

    try {
      const results: ProcessedImage[] = []

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i]

        try {
          const { blob, originalDimensions, processedDimensions } = await ImageProcessor.compressImage(file, options)

          const processedImage: ProcessedImage = {
            id: `${file.name}-${Date.now()}-${i}`,
            originalFile: file,
            processedBlob: blob,
            originalSize: file.size,
            compressedSize: blob.size,
            compressionRatio: ImageProcessor.calculateCompressionRatio(file.size, blob.size),
            originalDimensions,
            processedDimensions,
            previewUrl: URL.createObjectURL(blob),
            downloadUrl: URL.createObjectURL(blob),
          }

          results.push(processedImage)
        } catch (fileError) {
          console.error(`파일 처리 실패: ${file.name}`, fileError)
        }

        setProcessingProgress(((i + 1) / uploadedFiles.length) * 100)
      }

      setProcessedImages(results)
    } catch (err) {
      setError("이미지 처리 중 오류가 발생했습니다.")
      console.error("이미지 처리 오류:", err)
    } finally {
      setIsProcessing(false)
      setProcessingProgress(0)
    }
  }, [uploadedFiles, options])

  // 개별 다운로드
  const handleDownloadSingle = useCallback(
    (processedImage: ProcessedImage) => {
      const filename = DownloadUtils.generateFilename(processedImage.originalFile.name, options.outputFormat)
      DownloadUtils.downloadFile(processedImage.processedBlob, filename)
    },
    [options.outputFormat],
  )

  // 전체 ZIP 다운로드
  const handleDownloadAll = useCallback(async () => {
    if (processedImages.length === 0) return

    const files = processedImages.map((img) => ({
      blob: img.processedBlob,
      filename: DownloadUtils.generateFilename(img.originalFile.name, options.outputFormat),
    }))

    await DownloadUtils.downloadAsZip(files)
  }, [processedImages, options.outputFormat])

  // 설정 업데이트
  const handleOptionsUpdate = useCallback((newOptions: Partial<CompressionOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }))
  }, [])

  // 파일 제거
  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    setProcessedImages((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />

        {/* Open Graph 태그 */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImageUrl} />
        <meta property="og:url" content="/image-compressor" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="웹사이트 목록" />

        {/* Twitter Card 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImageUrl} />

        {/* 추가 SEO 태그 */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="웹사이트 목록" />
        <link rel="canonical" href="/image-compressor" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>메인으로 돌아가기</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">이미지 압축 및 리사이즈 도구</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              무료 온라인 이미지 압축 도구로 JPEG, PNG, WebP 포맷을 지원합니다. 클라이언트 측 처리로 안전하고 빠르게
              이미지 크기를 줄이고 리사이즈할 수 있습니다.
            </p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>오류 발생</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 업로드 및 설정 영역 */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    이미지 업로드
                  </CardTitle>
                  <CardDescription>압축할 이미지를 선택하거나 드래그하여 업로드하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader
                    onFilesUpload={handleFilesUpload}
                    uploadedFiles={uploadedFiles}
                    onRemoveFile={handleRemoveFile}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    압축 설정
                  </CardTitle>
                  <CardDescription>출력 포맷, 품질, 크기를 조정하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingsPanel options={options} onOptionsUpdate={handleOptionsUpdate} />
                </CardContent>
              </Card>

              {uploadedFiles.length > 0 && (
                <Button onClick={handleProcessImages} disabled={isProcessing} className="w-full" size="lg">
                  <Zap className="mr-2 h-4 w-4" />
                  {isProcessing ? `처리 중... (${Math.round(processingProgress)}%)` : "이미지 압축 시작"}
                </Button>
              )}
            </div>

            {/* 미리보기 및 결과 영역 */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">미리보기</TabsTrigger>
                  <TabsTrigger value="results">결과</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ImageIcon className="mr-2 h-5 w-5" />
                        이미지 미리보기
                      </CardTitle>
                      <CardDescription>업로드된 이미지를 확인하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PreviewArea
                        uploadedFiles={uploadedFiles}
                        isProcessing={isProcessing}
                        processingProgress={processingProgress}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="results" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Download className="mr-2 h-5 w-5" />
                        압축 결과
                      </CardTitle>
                      <CardDescription>처리된 이미지를 확인하고 다운로드하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResultsSection
                        processedImages={processedImages}
                        onDownloadSingle={handleDownloadSingle}
                        onDownloadAll={handleDownloadAll}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* 기능 소개 섹션 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔒 안전한 처리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  모든 이미지 처리는 브라우저에서 직접 수행되어 서버로 업로드되지 않습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⚡ 빠른 처리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  클라이언트 측 처리로 네트워크 지연 없이 빠르게 이미지를 압축할 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 다양한 포맷</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  JPEG, PNG, WebP 등 다양한 포맷으로 출력하고 품질을 세밀하게 조정할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageProcessor } from "@/utils/imageProcessor"

interface ImageUploaderProps {
  onFilesUpload: (files: File[]) => void
  uploadedFiles: File[]
  onRemoveFile: (index: number) => void
}

export default function ImageUploader({ onFilesUpload, uploadedFiles, onRemoveFile }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        setError("지원되지 않는 파일 형식입니다. JPEG, PNG, WebP, GIF, BMP 파일만 업로드 가능합니다.")
        return
      }

      // 파일 크기 제한 (10MB)
      const maxSize = 10 * 1024 * 1024
      const oversizedFiles = acceptedFiles.filter((file) => file.size > maxSize)

      if (oversizedFiles.length > 0) {
        setError("파일 크기가 너무 큽니다. 10MB 이하의 파일만 업로드 가능합니다.")
        return
      }

      onFilesUpload(acceptedFiles)
    },
    [onFilesUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif", ".bmp"],
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">파일을 여기에 놓으세요...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">이미지를 드래그하여 놓거나 클릭하여 선택하세요</p>
            <p className="text-sm text-gray-500">JPEG, PNG, WebP, GIF, BMP (최대 10MB)</p>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">업로드된 파일 ({uploadedFiles.length}개)</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <FileImage className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{ImageProcessor.formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onRemoveFile(index)} className="flex-shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

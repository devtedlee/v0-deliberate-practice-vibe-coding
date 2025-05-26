export class ImageProcessor {
  static async compressImage(
    file: File,
    options: {
      outputFormat: string
      quality: number
      maxWidth: number
      maxHeight: number
      maintainAspectRatio: boolean
    },
  ): Promise<{
    blob: Blob
    originalDimensions: { width: number; height: number }
    processedDimensions: { width: number; height: number }
  }> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        try {
          const originalDimensions = { width: img.width, height: img.height }

          // 리사이즈 계산
          const { width, height } = this.calculateDimensions(
            img.width,
            img.height,
            options.maxWidth,
            options.maxHeight,
            options.maintainAspectRatio,
          )

          canvas.width = width
          canvas.height = height

          // 이미지 그리기
          ctx?.drawImage(img, 0, 0, width, height)

          // MIME 타입 결정
          const mimeType = this.getMimeType(options.outputFormat)

          // Blob 생성
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  blob,
                  originalDimensions,
                  processedDimensions: { width, height },
                })
              } else {
                reject(new Error("이미지 압축에 실패했습니다."))
              }
            },
            mimeType,
            options.quality,
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error("이미지를 로드할 수 없습니다."))
      }

      img.src = URL.createObjectURL(file)
    })
  }

  private static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number,
    maintainAspectRatio: boolean,
  ): { width: number; height: number } {
    if (!maintainAspectRatio) {
      return {
        width: Math.min(originalWidth, maxWidth),
        height: Math.min(originalHeight, maxHeight),
      }
    }

    const aspectRatio = originalWidth / originalHeight
    let width = originalWidth
    let height = originalHeight

    // 최대 너비 제한
    if (width > maxWidth) {
      width = maxWidth
      height = width / aspectRatio
    }

    // 최대 높이 제한
    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }

    return {
      width: Math.round(width),
      height: Math.round(height),
    }
  }

  private static getMimeType(format: string): string {
    switch (format) {
      case "jpeg":
        return "image/jpeg"
      case "png":
        return "image/png"
      case "webp":
        return "image/webp"
      default:
        return "image/jpeg"
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  static calculateCompressionRatio(originalSize: number, compressedSize: number): number {
    if (originalSize === 0) return 0
    return Math.round(((originalSize - compressedSize) / originalSize) * 100)
  }
}

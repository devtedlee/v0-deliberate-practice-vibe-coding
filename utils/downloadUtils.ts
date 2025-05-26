import JSZip from "jszip"

export class DownloadUtils {
  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  static async downloadAsZip(files: Array<{ blob: Blob; filename: string }>): Promise<void> {
    const zip = new JSZip()

    files.forEach(({ blob, filename }) => {
      zip.file(filename, blob)
    })

    const zipBlob = await zip.generateAsync({ type: "blob" })
    this.downloadFile(zipBlob, "compressed-images.zip")
  }

  static generateFilename(originalName: string, format: string, suffix = "_compressed"): string {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "")
    const extension = format === "jpeg" ? "jpg" : format
    return `${nameWithoutExt}${suffix}.${extension}`
  }
}

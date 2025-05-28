// QR 코드 관련 유틸리티 함수들

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[0-9\-\s$$$$]+$/
  return phoneRegex.test(phone)
}

export const generateFilename = (prefix: string): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  return `${prefix}-${timestamp}`
}

export const downloadQrCode = (element: HTMLElement, filename: string, format: "png" | "svg"): void => {
  const svg = element.querySelector("svg")
  if (!svg) throw new Error("SVG element not found")

  if (format === "svg") {
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = `${filename}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
  } else {
    // PNG 변환 로직
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      const rect = svg.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      if (ctx) {
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const downloadLink = document.createElement("a")
            downloadLink.href = url
            downloadLink.download = `${filename}.png`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
            URL.revokeObjectURL(url)
          }
        }, "image/png")
      }
    }

    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
  }
}

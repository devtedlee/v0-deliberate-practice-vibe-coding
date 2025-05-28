import type React from "react"
import { QRCodeSVG } from "qrcode.react"

interface QrCodeDisplayProps {
  settings: {
    value: string
    size: number
    fgColor: string
    bgColor: string
    level: "L" | "M" | "Q" | "H"
    includeMargin: boolean
    logoImage: string | null
    logoHeight: number | null
    logoWidth: number | null
    logoOpacity: number | null
  }
}

const QrCodeDisplay: React.FC<QrCodeDisplayProps> = ({ settings }) => {
  return (
    <QRCodeSVG
      value={settings.value}
      size={settings.size}
      fgColor={settings.fgColor}
      bgColor={settings.bgColor}
      level={settings.level}
      includeMargin={settings.includeMargin}
      imageSettings={
        settings.logoImage
          ? {
              src: settings.logoImage,
              x: undefined,
              y: undefined,
              height: settings.logoHeight || 60,
              width: settings.logoWidth || 60,
              opacity: settings.logoOpacity || 1,
              excavate: true,
            }
          : undefined
      }
    />
  )
}

export default QrCodeDisplay

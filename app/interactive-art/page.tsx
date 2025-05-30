import type { Metadata } from "next"
import InteractiveArtLayout from "@/components/interactive-art/InteractiveArtLayout"

export const metadata: Metadata = {
  title: "인터랙티브 아트 데모 | 마우스 움직임 애니메이션",
  description:
    "마우스 움직임에 반응하는 시각적 애니메이션을 경험해보세요. 아름다운 파티클 효과와 다양한 인터랙션 모드를 제공합니다.",
  keywords: ["인터랙티브 아트", "파티클 애니메이션", "마우스 인터랙션", "시각적 효과", "Canvas"],
  openGraph: {
    title: "인터랙티브 아트 데모 - 마우스 움직임 애니메이션",
    description: "마우스 움직임에 반응하는 아름다운 파티클 애니메이션을 경험해보세요.",
    type: "website",
    images: [
      {
        url: "/og-interactive-art.png",
        width: 1200,
        height: 630,
        alt: "인터랙티브 아트 데모",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "인터랙티브 아트 데모",
    description: "마우스 움직임에 반응하는 시각적 애니메이션",
    images: ["/og-interactive-art.png"],
  },
}

export default function InteractiveArtPage() {
  return <InteractiveArtLayout />
}

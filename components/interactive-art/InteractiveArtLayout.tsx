"use client"

import { useState } from "react"
import InteractiveCanvas from "./InteractiveCanvas"
import ArtControls from "./ArtControls"
import { colorPalette, type InteractionMode } from "@/data/artConfig"

export default function InteractiveArtLayout() {
  const [color, setColor] = useState(colorPalette[0])
  const [particleCount, setParticleCount] = useState(50)
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("follow")

  const handleClear = () => {
    // 클리어 로직은 InteractiveCanvas에서 처리
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <InteractiveCanvas
        color={color}
        particleCount={particleCount}
        interactionMode={interactionMode}
        onClear={handleClear}
      />
      <ArtControls
        color={color}
        particleCount={particleCount}
        interactionMode={interactionMode}
        onColorChange={setColor}
        onParticleCountChange={setParticleCount}
        onInteractionModeChange={setInteractionMode}
        onClear={handleClear}
      />
    </div>
  )
}

export interface ParticleOptions {
  color: string
  size: number
  speed: number
  lifeSpan: number // 프레임 수
}

export const defaultParticleConfig: ParticleOptions = {
  color: "#4A90E2",
  size: 5,
  speed: 0.5,
  lifeSpan: 120, // 약 2초 (60fps 기준)
}

export const colorPalette = [
  "#4A90E2", // 파란색
  "#F5A623", // 주황색
  "#7ED321", // 초록색
  "#BD10E0", // 보라색
  "#D0021B", // 빨간색
]

export const initialParticleCount = 50

export const interactionModes = [
  { id: "follow", name: "마우스 따라다니기", description: "파티클이 마우스를 따라다닙니다" },
  { id: "connect", name: "연결선", description: "파티클들이 선으로 연결됩니다" },
  { id: "gravity", name: "중력", description: "파티클이 마우스로 끌려갑니다" },
] as const

export type InteractionMode = (typeof interactionModes)[number]["id"]

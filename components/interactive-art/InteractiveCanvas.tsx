"use client"

import { useEffect, useRef, useCallback } from "react"
import { ParticleSystem } from "@/lib/animationUtils"

interface InteractiveCanvasProps {
  color: string
  particleCount: number
  interactionMode: string
  onClear?: () => void
}

export default function InteractiveCanvas({ color, particleCount, interactionMode, onClear }: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleSystemRef = useRef<ParticleSystem | null>(null)
  const animationIdRef = useRef<number>()
  const lastParticleTimeRef = useRef<number>(0)

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const animate = useCallback(() => {
    const particleSystem = particleSystemRef.current
    if (!particleSystem) return

    const now = Date.now()

    // 자동 파티클 생성 (밀도에 따라)
    if (now - lastParticleTimeRef.current > 100 / particleCount) {
      if (particleSystem.particles.length < particleCount) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        particleSystem.addParticle(x, y)
      }
      lastParticleTimeRef.current = now
    }

    particleSystem.updateParticles()
    particleSystem.drawParticles()

    animationIdRef.current = requestAnimationFrame(animate)
  }, [particleCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    // ParticleSystem 초기화
    particleSystemRef.current = new ParticleSystem(canvas, {
      color,
      particleCount,
      interactionMode,
    })

    // 이벤트 리스너
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      particleSystemRef.current?.updateMousePosition(x, y)
      particleSystemRef.current?.addParticle(x, y)
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      particleSystemRef.current?.addParticle(x, y, true) // burst effect
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      particleSystemRef.current?.updateMousePosition(x, y)
      particleSystemRef.current?.addParticle(x, y)
    }

    const handleResize = () => {
      resizeCanvas()
    }

    // 이벤트 등록
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("resize", handleResize)

    // 애니메이션 시작
    animate()

    return () => {
      // 정리
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [animate, resizeCanvas])

  // 설정 변경 시 업데이트
  useEffect(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.config = {
        color,
        particleCount,
        interactionMode,
      }
    }
  }, [color, particleCount, interactionMode])

  // 클리어 함수 노출
  useEffect(() => {
    if (onClear) {
      const clearCanvas = () => {
        particleSystemRef.current?.clear()
      }
      // 외부에서 클리어 함수를 호출할 수 있도록 설정
      window.clearInteractiveArt = clearCanvas
    }
  }, [onClear])

  return <canvas ref={canvasRef} className="fixed inset-0 bg-slate-900" style={{ touchAction: "none" }} />
}

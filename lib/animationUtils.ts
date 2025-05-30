export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  alpha: number
}

export class ParticleSystem {
  particles: Particle[] = []
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  mouseX = 0
  mouseY = 0
  config: {
    color: string
    particleCount: number
    interactionMode: string
  }

  constructor(canvas: HTMLCanvasElement, config: any) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.config = config
  }

  createParticle(x: number, y: number, burst = false): Particle {
    const angle = burst ? Math.random() * Math.PI * 2 : Math.random() * 0.5 - 0.25
    const speed = burst ? Math.random() * 3 + 1 : Math.random() * 0.5 + 0.2

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 2,
      color: this.config.color,
      life: burst ? 180 : 120,
      maxLife: burst ? 180 : 120,
      alpha: 1,
    }
  }

  addParticle(x: number, y: number, burst = false) {
    if (burst) {
      // 클릭 시 여러 파티클 생성
      for (let i = 0; i < 15; i++) {
        this.particles.push(this.createParticle(x, y, true))
      }
    } else {
      this.particles.push(this.createParticle(x, y))
    }

    // 파티클 수 제한
    const maxParticles = this.config.particleCount * 2
    if (this.particles.length > maxParticles) {
      this.particles = this.particles.slice(-maxParticles)
    }
  }

  updateParticles() {
    this.particles = this.particles.filter((particle) => {
      // 생명주기 감소
      particle.life--
      particle.alpha = particle.life / particle.maxLife

      // 인터랙션 모드에 따른 움직임
      switch (this.config.interactionMode) {
        case "gravity":
          const dx = this.mouseX - particle.x
          const dy = this.mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance > 0) {
            const force = 0.0001
            particle.vx += (dx / distance) * force * distance
            particle.vy += (dy / distance) * force * distance
          }
          break
        case "follow":
          const followDx = this.mouseX - particle.x
          const followDy = this.mouseY - particle.y
          particle.vx += followDx * 0.0001
          particle.vy += followDy * 0.0001
          break
      }

      // 위치 업데이트
      particle.x += particle.vx
      particle.y += particle.vy

      // 속도 감쇠
      particle.vx *= 0.99
      particle.vy *= 0.99

      // 화면 경계 처리
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -0.5
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -0.5

      return particle.life > 0
    })
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // 연결선 그리기 (connect 모드)
    if (this.config.interactionMode === "connect") {
      this.drawConnections()
    }

    // 파티클 그리기
    this.particles.forEach((particle) => {
      this.ctx.save()
      this.ctx.globalAlpha = particle.alpha
      this.ctx.fillStyle = particle.color
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()
    })
  }

  drawConnections() {
    const maxDistance = 100
    this.ctx.strokeStyle = this.config.color
    this.ctx.lineWidth = 0.5

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i]
        const p2 = this.particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          this.ctx.save()
          this.ctx.globalAlpha = (1 - distance / maxDistance) * 0.3 * Math.min(p1.alpha, p2.alpha)
          this.ctx.beginPath()
          this.ctx.moveTo(p1.x, p1.y)
          this.ctx.lineTo(p2.x, p2.y)
          this.ctx.stroke()
          this.ctx.restore()
        }
      }
    }
  }

  updateMousePosition(x: number, y: number) {
    this.mouseX = x
    this.mouseY = y
  }

  clear() {
    this.particles = []
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type CharPoint = {
  x: number
  y: number
}

type CharPhysics = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  scale: number
  vs: number
}

type DustParticle = {
  kind: "dot" | "shard"
  color: [number, number, number]
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  va: number
  life: number
  maxLife: number
  size: number
  alpha: number
}

type DustHeadingProps = {
  text: string
  className?: string
}

const DUST_COLORS: [number, number, number][] = [
  [247, 237, 216],
  [237, 205, 160],
  [212, 170, 117],
  [188, 146, 96],
]

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function DustHeading({ text, className }: DustHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const basePointsRef = useRef<CharPoint[]>([])
  const charPhysicsRef = useRef<CharPhysics[]>([])
  const particlesRef = useRef<DustParticle[]>([])
  const reducedMotionRef = useRef(false)
  const boundsRef = useRef({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    dpr: 1,
  })
  const pointerStateRef = useRef({
    x: 0,
    y: 0,
    t: 0,
    speed: 0,
  })
  const words = text.split(" ")
  const totalChars = words.reduce((count, word) => count + Array.from(word).length, 0)

  const spawnParticles = (
    particles: DustParticle[],
    x: number,
    y: number,
    force: number,
    nx: number,
    ny: number
  ) => {
    const emissionCount = 2 + Math.min(7, Math.floor(force * 4.5))
    const tangentX = -ny
    const tangentY = nx

    for (let particleIndex = 0; particleIndex < emissionCount; particleIndex += 1) {
      const life = 14 + Math.random() * 18
      const swirl = (Math.random() - 0.5) * 1.4
      const impulse = 0.85 + Math.random() * 1.5
      const kind: DustParticle["kind"] = Math.random() > 0.32 ? "dot" : "shard"
      const color = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)]

      particles.push({
        kind,
        color,
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: nx * impulse * force * 3.2 + tangentX * swirl * force + (Math.random() - 0.5) * 0.9,
        vy:
          ny * impulse * force * 2.7 +
          tangentY * swirl * force -
          force * 0.55 +
          (Math.random() - 0.5) * 0.9,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.26,
        life,
        maxLife: life,
        size: kind === "dot" ? 0.7 + Math.random() * 2.4 : 0.8 + Math.random() * 3.2,
        alpha: 0.28 + Math.random() * 0.5,
      })
    }
  }

  useEffect(() => {
    const heading = headingRef.current
    const canvas = canvasRef.current
    if (!heading || !canvas) return

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const rect = heading.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      boundsRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        dpr,
      }

      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const activeCharRefs = charRefs.current.slice(0, totalChars)
      basePointsRef.current = activeCharRefs.map((node) => {
        if (!node) return { x: 0, y: 0 }
        const nodeRect = node.getBoundingClientRect()
        return {
          x: nodeRect.left - rect.left + nodeRect.width / 2,
          y: nodeRect.top - rect.top + nodeRect.height / 2,
        }
      })

      charPhysicsRef.current = basePointsRef.current.map(() => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rot: 0,
        vr: 0,
        scale: 1,
        vs: 0,
      }))
    }

    const disturb = (
      clientX: number,
      clientY: number,
      intensity: number,
      pointerSpeed: number
    ) => {
      if (reducedMotionRef.current) return

      const { left, top, width, height } = boundsRef.current
      const localX = clientX - left
      const localY = clientY - top

      if (localX < -40 || localY < -40 || localX > width + 40 || localY > height + 40) {
        return
      }

      const radius = clamp(width * 0.16 + pointerSpeed * 0.35, 74, 186)
      const points = basePointsRef.current
      const physics = charPhysicsRef.current
      const particles = particlesRef.current
      const forceScale = intensity * (1 + clamp(pointerSpeed * 0.08, 0, 2.1))

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index]
        const charState = physics[index]
        if (!point || !charState) continue

        const px = point.x + charState.x
        const py = point.y + charState.y

        const dx = px - localX
        const dy = py - localY
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.001

        if (distance > radius) continue

        const force = ((radius - distance) / radius) ** 1.9 * forceScale
        const nx = dx / distance
        const ny = dy / distance
        const tx = -ny
        const ty = nx
        const swirl = index % 2 === 0 ? 1 : -1
        const random = Math.random() - 0.5

        charState.vx += nx * force * 3.4 + tx * force * 1.3 * swirl + random * 0.45
        charState.vy += ny * force * 2.55 + ty * force * 1.2 * swirl - force * 0.34 + random * 0.45
        charState.vr += (Math.random() - 0.5) * force * 7.5
        charState.vs += force * 0.028

        spawnParticles(particles, px, py, force, nx, ny)
      }

      if (particles.length > 960) {
        particles.splice(0, particles.length - 960)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now()
      const prev = pointerStateRef.current
      const dt = Math.max(12, now - prev.t)
      const dx = event.clientX - prev.x
      const dy = event.clientY - prev.y
      const speed = Math.sqrt(dx * dx + dy * dy) / dt

      pointerStateRef.current = {
        x: event.clientX,
        y: event.clientY,
        t: now,
        speed,
      }

      disturb(event.clientX, event.clientY, 1, speed * 16)
    }

    const onPointerDown = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, 1.75, pointerStateRef.current.speed * 16 + 2)
    }

    const onPointerLeave = () => {
      pointerStateRef.current.speed = 0
    }

    const animate = () => {
      const context = canvas.getContext("2d")
      if (!context) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const { dpr } = boundsRef.current
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const charPhysics = charPhysicsRef.current
      for (let index = 0; index < charPhysics.length; index += 1) {
        const charState = charPhysics[index]
        const span = charRefs.current[index]
        if (!charState || !span) continue

        charState.vx += -charState.x * 0.08
        charState.vy += -charState.y * 0.08
        charState.vr += -charState.rot * 0.11
        charState.vs += (1 - charState.scale) * 0.18

        charState.vx *= 0.82
        charState.vy *= 0.82
        charState.vr *= 0.78
        charState.vs *= 0.75

        charState.x += charState.vx
        charState.y += charState.vy
        charState.rot += charState.vr
        charState.scale += charState.vs

        span.style.transform = `translate3d(${charState.x.toFixed(2)}px, ${charState.y.toFixed(
          2
        )}px, 0) rotate(${charState.rot.toFixed(2)}deg) scale(${charState.scale.toFixed(3)})`
      }

      const particles = particlesRef.current
      context.save()
      context.globalCompositeOperation = "screen"

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.life -= 1
        if (particle.life <= 0) {
          particles.splice(index, 1)
          continue
        }

        const lifeProgress = particle.life / particle.maxLife
        particle.x += particle.vx
        particle.y += particle.vy
        particle.angle += particle.va
        particle.vx *= 0.915
        particle.vy = particle.vy * 0.915 + 0.028

        const [red, green, blue] = particle.color
        const alpha = particle.alpha * lifeProgress
        context.fillStyle = `rgba(${red},${green},${blue},${alpha.toFixed(3)})`

        if (particle.kind === "dot") {
          context.beginPath()
          context.arc(
            particle.x,
            particle.y,
            Math.max(0.35, particle.size * lifeProgress),
            0,
            Math.PI * 2
          )
          context.fill()
          continue
        }

        const length = Math.max(0.9, particle.size * (0.75 + lifeProgress * 0.85))
        const thickness = Math.max(0.5, length * 0.23)
        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.angle)
        context.fillRect(-length * 0.5, -thickness * 0.5, length, thickness)
        context.restore()
      }

      context.restore()
      frameRef.current = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(heading)
    window.addEventListener("resize", resize)
    if (!reducedMotionRef.current) {
      heading.addEventListener("pointermove", onPointerMove)
      heading.addEventListener("pointerdown", onPointerDown)
      heading.addEventListener("pointerleave", onPointerLeave)
    }

    document.fonts?.ready.then(() => {
      resize()
    })

    resize()
    if (!reducedMotionRef.current) {
      frameRef.current = requestAnimationFrame(animate)
    }

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", resize)
      heading.removeEventListener("pointermove", onPointerMove)
      heading.removeEventListener("pointerdown", onPointerDown)
      heading.removeEventListener("pointerleave", onPointerLeave)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      for (const node of charRefs.current) {
        if (node) node.style.transform = ""
      }
    }
  }, [text, totalChars])

  let charIndex = 0

  return (
    <h1
      ref={headingRef}
      className={cn("relative hyphens-none [word-break:keep-all] [overflow-wrap:normal]", className)}
    >
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className={cn("inline-block whitespace-nowrap", wordIndex < words.length - 1 && "mr-[0.28em]")}
          >
            {Array.from(word).map((letter) => {
              const currentIndex = charIndex
              charIndex += 1

              return (
                <span
                  key={`${letter}-${currentIndex}`}
                  ref={(node) => {
                    charRefs.current[currentIndex] = node
                  }}
                  className="inline-block will-change-transform"
                >
                  {letter}
                </span>
              )
            })}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </h1>
  )
}

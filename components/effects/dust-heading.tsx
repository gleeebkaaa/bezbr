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
}

type DustParticle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  alpha: number
}

type DustHeadingProps = {
  text: string
  className?: string
}

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
  const particlesEnabledRef = useRef(true)

  const letters = Array.from(text)

  useEffect(() => {
    const heading = headingRef.current
    const canvas = canvasRef.current
    if (!heading || !canvas) return

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    particlesEnabledRef.current = !reducedMotionRef.current

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

      basePointsRef.current = charRefs.current.map((node) => {
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
      }))
    }

    const disturb = (clientX: number, clientY: number, intensity: number) => {
      if (reducedMotionRef.current) return

      const { left, top, width, height } = boundsRef.current
      const localX = clientX - left
      const localY = clientY - top

      if (localX < -40 || localY < -40 || localX > width + 40 || localY > height + 40) {
        return
      }

      const radius = Math.max(64, Math.min(160, width * 0.2))
      const points = basePointsRef.current
      const physics = charPhysicsRef.current

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

        const force = ((radius - distance) / radius) ** 2 * 1.8 * intensity
        const nx = dx / distance
        const ny = dy / distance

        charState.vx += nx * force * 2 + (Math.random() - 0.5) * 0.35
        charState.vy += ny * force * 1.7 + (Math.random() - 0.5) * 0.35
        charState.vr += (Math.random() - 0.5) * force * 5

        if (!particlesEnabledRef.current) continue

        const particleCount = 1 + Math.min(3, Math.floor(force * 3))
        for (let particleIndex = 0; particleIndex < particleCount; particleIndex += 1) {
          const lifetime = 14 + Math.random() * 12
          particlesRef.current.push({
            x: px + (Math.random() - 0.5) * 3,
            y: py + (Math.random() - 0.5) * 3,
            vx: nx * (0.8 + Math.random() * 1.6) * force * 2.8 + (Math.random() - 0.5) * 0.7,
            vy: ny * (0.8 + Math.random() * 1.6) * force * 2.8 + (Math.random() - 0.5) * 0.7,
            life: lifetime,
            maxLife: lifetime,
            size: 0.9 + Math.random() * 2,
            alpha: 0.45 + Math.random() * 0.35,
          })
        }
      }

      if (particlesRef.current.length > 650) {
        particlesRef.current.splice(0, particlesRef.current.length - 650)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, 1)
    }

    const onPointerDown = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, 1.35)
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

        charState.vx *= 0.84
        charState.vy *= 0.84
        charState.vr *= 0.8

        charState.x += charState.vx
        charState.y += charState.vy
        charState.rot += charState.vr

        span.style.transform = `translate3d(${charState.x.toFixed(2)}px, ${charState.y.toFixed(
          2
        )}px, 0) rotate(${charState.rot.toFixed(2)}deg)`
      }

      const particles = particlesRef.current
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
        particle.vx *= 0.93
        particle.vy = particle.vy * 0.93 + 0.04

        context.fillStyle = `rgba(214,91,69,${(particle.alpha * lifeProgress).toFixed(3)})`
        context.beginPath()
        context.arc(
          particle.x,
          particle.y,
          Math.max(0.35, particle.size * lifeProgress),
          0,
          Math.PI * 2
        )
        context.fill()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(heading)
    window.addEventListener("resize", resize)
    heading.addEventListener("pointermove", onPointerMove)
    heading.addEventListener("pointerdown", onPointerDown)

    document.fonts?.ready.then(() => {
      resize()
    })

    resize()
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", resize)
      heading.removeEventListener("pointermove", onPointerMove)
      heading.removeEventListener("pointerdown", onPointerDown)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      for (const node of charRefs.current) {
        if (node) node.style.transform = ""
      }
    }
  }, [text])

  return (
    <h1 ref={headingRef} className={cn("relative", className)}>
      <span aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            ref={(node) => {
              charRefs.current[index] = node
            }}
            className="inline-block whitespace-pre will-change-transform"
          >
            {letter}
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

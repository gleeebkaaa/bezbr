"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Particle = {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
  size: number
  colorIndex: number
  charIndex: number
}

type Bounds = {
  width: number
  height: number
  left: number
  top: number
  dpr: number
}

type PointerState = {
  x: number
  y: number
  t: number
  speed: number
}

type CharMotion = {
  x: number
  y: number
  vx: number
  vy: number
}

type DustHeadingProps = {
  text: string
  className?: string
}

const DUST_COLORS: [number, number, number][] = [
  [36, 32, 30],
  [82, 71, 64],
  [124, 105, 95],
  [158, 133, 121],
]

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function DustHeading({ text, className }: DustHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const particlesRef = useRef<Particle[]>([])
  const charEnergyRef = useRef<number[]>([])
  const charMotionRef = useRef<CharMotion[]>([])
  const boundsRef = useRef<Bounds>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    dpr: 1,
  })
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    t: 0,
    speed: 0,
  })
  const reducedMotionRef = useRef(false)
  const words = text.split(" ")
  const charCount = words.reduce((acc, word) => acc + Array.from(word).length, 0)

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
      particlesRef.current = []
      charEnergyRef.current = new Array(charCount).fill(0)
      charMotionRef.current = Array.from({ length: charCount }, () => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      }))

      const refs = charRefs.current.slice(0, charCount)
      refs.forEach((node, charIndex) => {
        if (!node) return
        const nodeRect = node.getBoundingClientRect()
        const relX = nodeRect.left - rect.left
        const relY = nodeRect.top - rect.top
        const width = nodeRect.width
        const height = nodeRect.height
        if (width <= 0 || height <= 0) return

        const area = width * height
        const particleCount = clamp(Math.round(area / 78), 8, 24)

        for (let index = 0; index < particleCount; index += 1) {
          const spreadX = Math.random() * 0.78 + 0.11
          const spreadY = Math.random() * 0.74 + 0.13
          const x = relX + width * spreadX
          const y = relY + height * spreadY

          particlesRef.current.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            size: 0.45 + Math.random() * 1.6,
            colorIndex: Math.floor(Math.random() * DUST_COLORS.length),
            charIndex,
          })
        }
      })
    }

    const disturb = (clientX: number, clientY: number, baseIntensity: number, speed: number) => {
      const { left, top, width, height } = boundsRef.current
      const localX = clientX - left
      const localY = clientY - top

      if (localX < -40 || localY < -40 || localX > width + 40 || localY > height + 40) return

      const radius = clamp(width * 0.11 + speed * 30, 70, 180)
      const speedBoost = 1 + clamp(speed * 0.85, 0, 2.2)
      const particles = particlesRef.current
      const charEnergy = charEnergyRef.current
      const charMotion = charMotionRef.current
      const impulseX = new Array(charCount).fill(0)
      const impulseY = new Array(charCount).fill(0)

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const dx = particle.x - localX
        const dy = particle.y - localY
        const distance = Math.hypot(dx, dy) || 0.001
        if (distance > radius) continue

        const nx = dx / distance
        const ny = dy / distance
        const tx = -ny
        const ty = nx
        const falloff = ((radius - distance) / radius) ** 1.8
        const force = falloff * baseIntensity * speedBoost
        const swirl = ((particle.charIndex % 2 === 0 ? 1 : -1) * force) / 1.4

        particle.vx += nx * force * 3 + tx * swirl + (Math.random() - 0.5) * 0.3
        particle.vy += ny * force * 2.5 + ty * swirl - force * 0.26 + (Math.random() - 0.5) * 0.3

        const ci = particle.charIndex
        charEnergy[ci] = clamp(charEnergy[ci] + force * 0.07, 0, 1.25)
        impulseX[ci] += nx * force * 0.17 + tx * swirl * 0.09
        impulseY[ci] += ny * force * 0.15 + ty * swirl * 0.09 - force * 0.04
      }

      for (let index = 0; index < charCount; index += 1) {
        const motion = charMotion[index]
        if (!motion) continue

        motion.vx += clamp(impulseX[index], -1.35, 1.35)
        motion.vy += clamp(impulseY[index], -1.1, 1.1)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now()
      const previous = pointerRef.current
      const dt = Math.max(12, now - previous.t)
      const dx = event.clientX - previous.x
      const dy = event.clientY - previous.y
      const speed = Math.hypot(dx, dy) / dt

      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        t: now,
        speed,
      }

      disturb(event.clientX, event.clientY, 1.05, speed * 15)
    }

    const onPointerDown = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, 1.9, pointerRef.current.speed * 20 + 2.5)
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
      context.globalCompositeOperation = "source-over"

      const particles = particlesRef.current
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const pullX = particle.ox - particle.x
        const pullY = particle.oy - particle.y

        particle.vx += pullX * 0.065
        particle.vy += pullY * 0.065
        particle.vx *= 0.84
        particle.vy *= 0.84
        particle.x += particle.vx
        particle.y += particle.vy

        const speed = Math.hypot(particle.vx, particle.vy)
        const displacement = Math.hypot(particle.x - particle.ox, particle.y - particle.oy)
        const visualEnergy = speed * 2.1 + displacement * 0.9
        if (visualEnergy < 0.09) continue

        const [red, green, blue] = DUST_COLORS[particle.colorIndex]
        const alpha = clamp((visualEnergy - 0.09) * 0.26, 0.02, 0.72)
        const radius = particle.size * (1 + clamp(speed * 0.24 + displacement * 0.1, 0, 0.82))

        context.fillStyle = `rgba(${red},${green},${blue},${alpha.toFixed(3)})`
        context.beginPath()
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        context.fill()
      }

      const charEnergy = charEnergyRef.current
      const charMotion = charMotionRef.current
      for (let index = 0; index < charCount; index += 1) {
        const node = charRefs.current[index]
        if (!node) continue

        const motion = charMotion[index]
        if (motion) {
          motion.vx += -motion.x * 0.19
          motion.vy += -motion.y * 0.19
          motion.vx *= 0.77
          motion.vy *= 0.77
          motion.x = clamp(motion.x + motion.vx, -11, 11)
          motion.y = clamp(motion.y + motion.vy, -8, 8)
        }

        const energy = charEnergy[index] ?? 0
        const mx = motion?.x ?? 0
        const my = motion?.y ?? 0
        const travel = Math.hypot(mx, my)
        const opacity = clamp(1 - energy * 0.37 - travel * 0.022, 0.58, 1)
        const rotate = clamp(mx * 0.45, -4.5, 4.5)
        node.style.opacity = opacity.toFixed(3)
        node.style.transform = `translate3d(${mx.toFixed(2)}px, ${(my - energy * 0.35).toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`
        charEnergy[index] = energy * 0.82
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(heading)
    window.addEventListener("resize", resize)

    if (!reducedMotionRef.current) {
      heading.addEventListener("pointermove", onPointerMove)
      heading.addEventListener("pointerdown", onPointerDown)
    }

    document.fonts?.ready.then(resize)
    resize()

    if (!reducedMotionRef.current) {
      frameRef.current = requestAnimationFrame(animate)
    } else {
      canvas.style.display = "none"
    }

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", resize)
      heading.removeEventListener("pointermove", onPointerMove)
      heading.removeEventListener("pointerdown", onPointerDown)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      for (let index = 0; index < charCount; index += 1) {
        const node = charRefs.current[index]
        if (!node) continue
        node.style.opacity = ""
        node.style.transform = ""
      }
    }
  }, [charCount, text])

  let cursor = 0

  return (
    <h1
      ref={headingRef}
      className={cn("relative hyphens-none [word-break:keep-all] [overflow-wrap:normal]", className)}
    >
      <span aria-hidden="true" className="relative z-[1] inline">
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className={cn("inline-block whitespace-nowrap", wordIndex < words.length - 1 && "mr-[0.28em]")}
          >
            {Array.from(word).map((letter) => {
              const index = cursor
              cursor += 1
              return (
                <span
                  key={`${letter}-${index}`}
                  ref={(node) => {
                    charRefs.current[index] = node
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
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        aria-hidden="true"
      />
    </h1>
  )
}

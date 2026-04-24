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

type CharState = {
  cx: number
  cy: number
  x: number
  y: number
  vx: number
  vy: number
  sensitivity: number
  returnForce: number
  damping: number
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
  vx: number
  vy: number
  speed: number
  t: number
  inside: boolean
}

type DustHeadingProps = {
  text: string
  className?: string
}

const DUST_COLORS: [number, number, number][] = [
  [40, 35, 31],
  [88, 74, 65],
  [132, 109, 95],
  [169, 142, 125],
]

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function DustHeading({ text, className }: DustHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const particlesRef = useRef<Particle[]>([])
  const charStateRef = useRef<CharState[]>([])
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
    vx: 0,
    vy: 0,
    speed: 0,
    t: 0,
    inside: false,
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

      const nextParticles: Particle[] = []
      const nextChars: CharState[] = []
      const refs = charRefs.current.slice(0, charCount)

      refs.forEach((node, charIndex) => {
        if (!node) return
        const nodeRect = node.getBoundingClientRect()
        const relX = nodeRect.left - rect.left
        const relY = nodeRect.top - rect.top
        const width = nodeRect.width
        const height = nodeRect.height
        if (width <= 0 || height <= 0) return

        nextChars[charIndex] = {
          cx: relX + width * 0.5,
          cy: relY + height * 0.52,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          sensitivity: 0.7 + Math.random() * 0.85,
          returnForce: 0.036 + Math.random() * 0.032,
          damping: 0.74 + Math.random() * 0.12,
        }

        const area = width * height
        const particleCount = clamp(Math.round(area / 54), 12, 40)

        for (let index = 0; index < particleCount; index += 1) {
          const spreadX = Math.random() * 0.8 + 0.1
          const spreadY = Math.random() * 0.8 + 0.1
          const x = relX + width * spreadX
          const y = relY + height * spreadY

          nextParticles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            size: 0.45 + Math.random() * 1.9,
            colorIndex: Math.floor(Math.random() * DUST_COLORS.length),
            charIndex,
          })
        }
      })

      particlesRef.current = nextParticles
      charStateRef.current = nextChars
    }

    const disturb = (clientX: number, clientY: number, baseIntensity: number, burst = false) => {
      const { left, top, width, height } = boundsRef.current
      const localX = clientX - left
      const localY = clientY - top
      if (localX < -64 || localY < -64 || localX > width + 64 || localY > height + 64) return

      const pointer = pointerRef.current
      const velocityBoost = 1 + clamp(pointer.speed * 1.15, 0, 3.2)
      const radius = clamp(width * 0.16 + pointer.speed * 56 + (burst ? 48 : 0), 92, 260)
      const radiusSq = radius * radius

      const charStates = charStateRef.current
      for (let index = 0; index < charStates.length; index += 1) {
        const state = charStates[index]
        if (!state) continue

        const dx = state.cx + state.x - localX
        const dy = state.cy + state.y - localY
        const distSq = dx * dx + dy * dy
        if (distSq > radiusSq || distSq < 0.05) continue

        const dist = Math.sqrt(distSq)
        const normalized = dist / radius
        const personalFalloff = Math.pow(1 - normalized, 1.6 + (index % 7) * 0.08)
        const force = baseIntensity * personalFalloff * state.sensitivity * velocityBoost
        const invDist = 1 / dist
        const nx = dx * invDist
        const ny = dy * invDist
        const swirlSign = index % 2 === 0 ? 1 : -1
        const swirl = force * 0.34 * swirlSign
        const transfer = 0.24 + (index % 5) * 0.05

        state.vx += nx * force * 1.4 + -ny * swirl + pointer.vx * personalFalloff * transfer
        state.vy += ny * force * 1.26 + nx * swirl + pointer.vy * personalFalloff * transfer
      }

      const particles = particlesRef.current
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const dx = particle.x - localX
        const dy = particle.y - localY
        const distSq = dx * dx + dy * dy
        if (distSq > radiusSq || distSq < 0.08) continue

        const dist = Math.sqrt(distSq)
        const invDist = 1 / dist
        const falloff = Math.pow((radius - dist) / radius, 1.65)
        const force = baseIntensity * (burst ? 2.2 : 1.5) * falloff * velocityBoost
        const nx = dx * invDist
        const ny = dy * invDist
        const tx = -ny
        const ty = nx
        const swirl = force * 0.46 * (particle.charIndex % 2 === 0 ? 1 : -1)

        particle.vx += nx * force * 2.4 + tx * swirl + pointer.vx * falloff * 0.17 + (Math.random() - 0.5) * 0.35
        particle.vy += ny * force * 2.1 + ty * swirl + pointer.vy * falloff * 0.17 + (Math.random() - 0.5) * 0.35
      }
    }

    const onPointerEnter = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        vx: 0,
        vy: 0,
        speed: 0,
        t: performance.now(),
        inside: true,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now()
      const previous = pointerRef.current
      const dt = Math.max(8, now - previous.t)
      const dx = event.clientX - previous.x
      const dy = event.clientY - previous.y
      const speed = Math.hypot(dx, dy) / dt
      const normalizedDt = dt / 16.67

      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        vx: dx / normalizedDt,
        vy: dy / normalizedDt,
        speed,
        t: now,
        inside: true,
      }

      disturb(event.clientX, event.clientY, 1.34 + speed * 18)
    }

    const onPointerLeave = () => {
      pointerRef.current.inside = false
      pointerRef.current.vx *= 0.5
      pointerRef.current.vy *= 0.5
    }

    const onPointerDown = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, 3.8 + pointerRef.current.speed * 30, true)
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

      const particles = particlesRef.current
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const pullX = particle.ox - particle.x
        const pullY = particle.oy - particle.y

        particle.vx += pullX * 0.084
        particle.vy += pullY * 0.084
        particle.vx *= 0.84
        particle.vy *= 0.84
        particle.x += particle.vx
        particle.y += particle.vy

        const speed = Math.hypot(particle.vx, particle.vy)
        const displacement = Math.hypot(particle.x - particle.ox, particle.y - particle.oy)
        const visualEnergy = speed * 2.2 + displacement * 1.08
        if (visualEnergy < 0.14) continue

        const [red, green, blue] = DUST_COLORS[particle.colorIndex]
        const alpha = clamp((visualEnergy - 0.14) * 0.2, 0.02, 0.74)
        const radius = particle.size * (1 + clamp(speed * 0.28 + displacement * 0.1, 0, 0.95))

        context.fillStyle = `rgba(${red},${green},${blue},${alpha.toFixed(3)})`
        context.beginPath()
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        context.fill()
      }

      const charStates = charStateRef.current
      for (let index = 0; index < charCount; index += 1) {
        const node = charRefs.current[index]
        const state = charStates[index]
        if (!node || !state) continue

        state.vx += -state.x * state.returnForce
        state.vy += -state.y * state.returnForce
        state.vx *= state.damping
        state.vy *= state.damping
        state.x = clamp(state.x + state.vx, -52, 52)
        state.y = clamp(state.y + state.vy, -34, 34)

        const travel = Math.hypot(state.x, state.y)
        const rotate = clamp(state.x * 0.9 + state.vx * 0.38, -12, 12)
        const scale = 1 + clamp(travel * 0.0035, 0, 0.12)
        const opacity = clamp(1 - travel * 0.018, 0.4, 1)

        node.style.opacity = opacity.toFixed(3)
        node.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      }

      pointerRef.current.vx *= 0.9
      pointerRef.current.vy *= 0.9
      frameRef.current = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(heading)
    window.addEventListener("resize", resize)

    if (!reducedMotionRef.current) {
      heading.addEventListener("pointerenter", onPointerEnter)
      heading.addEventListener("pointermove", onPointerMove)
      heading.addEventListener("pointerleave", onPointerLeave)
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
      heading.removeEventListener("pointerenter", onPointerEnter)
      heading.removeEventListener("pointermove", onPointerMove)
      heading.removeEventListener("pointerleave", onPointerLeave)
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

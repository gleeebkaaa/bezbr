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
  energy: number
  offsetX: number
  offsetY: number
  vx: number
  vy: number
  dirX: number
  dirY: number
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
}

type CharBox = {
  x: number
  y: number
  w: number
  h: number
  charIndex: number
  glyph: string
  font: string
}

type DustHeadingProps = {
  text: string
  className?: string
}

const DUST_COLORS: [number, number, number][] = [
  [38, 33, 30],
  [72, 61, 55],
  [116, 96, 85],
  [160, 136, 120],
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
  })
  const reducedMotionRef = useRef(false)

  const words = text.split(" ")
  const charCount = words.reduce((total, word) => total + Array.from(word).length, 0)

  useEffect(() => {
    const heading = headingRef.current
    const canvas = canvasRef.current
    if (!heading || !canvas) return

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const buildFontString = (style: CSSStyleDeclaration) => {
      const fontStyle = style.fontStyle || "normal"
      const fontVariant = style.fontVariant || "normal"
      const fontWeight = style.fontWeight || "400"
      const fontSize = style.fontSize || "16px"
      const lineHeight = style.lineHeight || "normal"
      const fontFamily = style.fontFamily || "serif"
      return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`
    }

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

      const maskWidth = Math.max(1, Math.floor(rect.width))
      const maskHeight = Math.max(1, Math.floor(rect.height))
      const maskCanvas = document.createElement("canvas")
      maskCanvas.width = maskWidth
      maskCanvas.height = maskHeight
      const maskCtx = maskCanvas.getContext("2d")
      if (!maskCtx) return

      maskCtx.clearRect(0, 0, maskWidth, maskHeight)
      maskCtx.fillStyle = "#ffffff"
      maskCtx.textAlign = "left"
      maskCtx.textBaseline = "alphabetic"

      const charBoxes: CharBox[] = []
      const nextCharStates: CharState[] = new Array(charCount)
      const refs = charRefs.current.slice(0, charCount)

      refs.forEach((node, charIndex) => {
        if (!node) return
        const glyph = node.textContent ?? ""
        if (!glyph) return

        const nodeRect = node.getBoundingClientRect()
        const relX = nodeRect.left - rect.left
        const relY = nodeRect.top - rect.top
        const relW = nodeRect.width
        const relH = nodeRect.height
        if (relW <= 0 || relH <= 0) return

        const style = window.getComputedStyle(node)
        const font = buildFontString(style)
        maskCtx.font = font
        maskCtx.fillText(glyph, relX, relY + relH * 0.82)

        const angle = Math.random() * Math.PI * 2
        nextCharStates[charIndex] = {
          energy: 0,
          offsetX: 0,
          offsetY: 0,
          vx: 0,
          vy: 0,
          dirX: Math.cos(angle),
          dirY: Math.sin(angle),
        }

        charBoxes.push({
          x: relX,
          y: relY,
          w: relW,
          h: relH,
          charIndex,
          glyph,
          font,
        })
      })

      const imageData = maskCtx.getImageData(0, 0, maskWidth, maskHeight).data
      const nextParticles: Particle[] = []
      const step = 2

      for (let boxIndex = 0; boxIndex < charBoxes.length; boxIndex += 1) {
        const box = charBoxes[boxIndex]
        const sx = clamp(Math.floor(box.x), 0, maskWidth - 1)
        const ex = clamp(Math.ceil(box.x + box.w), 0, maskWidth)
        const sy = clamp(Math.floor(box.y), 0, maskHeight - 1)
        const ey = clamp(Math.ceil(box.y + box.h), 0, maskHeight)

        for (let y = sy; y < ey; y += step) {
          for (let x = sx; x < ex; x += step) {
            const alpha = imageData[(y * maskWidth + x) * 4 + 3]
            if (alpha < 20) continue
            if (Math.random() < 0.14) continue

            nextParticles.push({
              x: x + (Math.random() - 0.5) * 0.55,
              y: y + (Math.random() - 0.5) * 0.55,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              size: 0.4 + Math.random() * 0.95,
              colorIndex: Math.floor(Math.random() * DUST_COLORS.length),
              charIndex: box.charIndex,
            })
          }
        }
      }

      if (nextParticles.length < 450) {
        for (let boxIndex = 0; boxIndex < charBoxes.length; boxIndex += 1) {
          const box = charBoxes[boxIndex]
          const fallbackCount = clamp(Math.round((box.w * box.h) / 45), 8, 48)
          for (let index = 0; index < fallbackCount; index += 1) {
            const px = box.x + Math.random() * box.w
            const py = box.y + Math.random() * box.h
            nextParticles.push({
              x: px,
              y: py,
              ox: px,
              oy: py,
              vx: 0,
              vy: 0,
              size: 0.45 + Math.random() * 0.9,
              colorIndex: Math.floor(Math.random() * DUST_COLORS.length),
              charIndex: box.charIndex,
            })
          }
        }
      }

      particlesRef.current = nextParticles
      charStateRef.current = nextCharStates
    }

    const disturb = (clientX: number, clientY: number, intensity: number) => {
      const { left, top, width, height } = boundsRef.current
      const localX = clientX - left
      const localY = clientY - top
      if (localX < -56 || localY < -56 || localX > width + 56 || localY > height + 56) return

      const pointer = pointerRef.current
      const radius = clamp(width * 0.14 + pointer.speed * 42, 86, 220)
      const radiusSq = radius * radius
      const velocityBoost = 1 + clamp(pointer.speed * 1.05, 0, 2.6)

      const particles = particlesRef.current
      const charStates = charStateRef.current

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const dx = particle.x - localX
        const dy = particle.y - localY
        const distSq = dx * dx + dy * dy
        if (distSq > radiusSq || distSq < 0.08) continue

        const dist = Math.sqrt(distSq)
        const nx = dx / dist
        const ny = dy / dist
        const tx = -ny
        const ty = nx
        const falloff = Math.pow((radius - dist) / radius, 1.65)
        const force = intensity * falloff * velocityBoost
        const swirl = force * 0.52 * (particle.charIndex % 2 === 0 ? 1 : -1)

        particle.vx += nx * force * 2.2 + tx * swirl + pointer.vx * falloff * 0.2 + (Math.random() - 0.5) * 0.3
        particle.vy += ny * force * 2.0 + ty * swirl + pointer.vy * falloff * 0.2 + (Math.random() - 0.5) * 0.3

        const charState = charStates[particle.charIndex]
        if (charState) {
          charState.energy = clamp(charState.energy + force * 0.5, 0, 3.3)
          charState.vx += nx * force * 0.42 + tx * swirl * 0.22
          charState.vy += ny * force * 0.36 + ty * swirl * 0.22
        }
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now()
      const prev = pointerRef.current
      const dt = Math.max(8, now - prev.t)
      const dx = event.clientX - prev.x
      const dy = event.clientY - prev.y
      const speed = Math.hypot(dx, dy) / dt
      const frameDt = dt / 16.67

      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        vx: dx / frameDt,
        vy: dy / frameDt,
        speed,
        t: now,
      }

      disturb(event.clientX, event.clientY, 1.9 + speed * 24)
    }

    const onPointerDown = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, 4.1 + pointerRef.current.speed * 28)
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

        particle.vx += pullX * 0.105
        particle.vy += pullY * 0.105
        particle.vx *= 0.82
        particle.vy *= 0.82
        particle.x += particle.vx
        particle.y += particle.vy

        const speed = Math.hypot(particle.vx, particle.vy)
        const displacement = Math.hypot(particle.x - particle.ox, particle.y - particle.oy)
        const visualEnergy = speed * 2.0 + displacement * 1.12
        if (visualEnergy < 0.1) continue

        const [red, green, blue] = DUST_COLORS[particle.colorIndex]
        const alpha = clamp((visualEnergy - 0.1) * 0.24, 0.03, 0.85)
        const radius = particle.size * (1 + clamp(speed * 0.2 + displacement * 0.07, 0, 0.78))

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

        state.vx += -state.offsetX * 0.22 + state.dirX * state.energy * 0.04
        state.vy += -state.offsetY * 0.22 + state.dirY * state.energy * 0.04
        state.vx *= 0.74
        state.vy *= 0.74
        state.offsetX = clamp(state.offsetX + state.vx, -28, 28)
        state.offsetY = clamp(state.offsetY + state.vy, -18, 18)
        state.energy *= 0.8

        const travel = Math.hypot(state.offsetX, state.offsetY)
        const opacity = clamp(1 - state.energy * 1.1 - travel * 0.02, 0.02, 1)
        const rotate = clamp(state.offsetX * 0.7 + state.vx * 0.5, -11, 11)

        node.style.opacity = opacity.toFixed(3)
        node.style.transform = `translate3d(${state.offsetX.toFixed(2)}px, ${state.offsetY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`
      }

      pointerRef.current.vx *= 0.9
      pointerRef.current.vy *= 0.9
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

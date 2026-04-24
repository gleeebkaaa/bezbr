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
  inside: boolean
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
  preset?: "cinematic" | "aggressive"
}

type DustPresetConfig = {
  maskDropChance: number
  pointJitter: number
  moveBaseIntensity: number
  moveSpeedIntensity: number
  downBaseIntensity: number
  downSpeedIntensity: number
  radiusScale: number
  radiusSpeedScale: number
  radiusBurstAdd: number
  radiusMin: number
  radiusMax: number
  velocityBoostSpeed: number
  velocityBoostMax: number
  velocityBoostBurstAdd: number
  forceScale: number
  swirlScale: number
  pointerTrailBase: number
  pointerTrailDirectional: number
  randomImpulse: number
  charEnergyGain: number
  charEnergyMax: number
  charPushScale: number
  particleSpring: number
  particleDamping: number
  particleVisualThreshold: number
  particleAlphaScale: number
  particleAlphaMax: number
  particleStretchScale: number
  particleStretchMax: number
  charSpring: number
  charDamping: number
  charEnergyDrive: number
  charEnergyDecay: number
  charMaxOffsetX: number
  charMaxOffsetY: number
  charOpacityEnergy: number
  charOpacityTravel: number
  charOpacityMin: number
  charRotateOffset: number
  charRotateVelocity: number
  charRotateMax: number
  letterSplitForce: number
  letterSplitRandom: number
  letterFadeBoost: number
  pointerDecay: number
}

const DUST_COLORS: [number, number, number][] = [
  [38, 33, 30],
  [72, 61, 55],
  [116, 96, 85],
  [160, 136, 120],
]

const DUST_PRESETS: Record<"cinematic" | "aggressive", DustPresetConfig> = {
  cinematic: {
    maskDropChance: 0.14,
    pointJitter: 0.55,
    moveBaseIntensity: 1.6,
    moveSpeedIntensity: 20,
    downBaseIntensity: 3.9,
    downSpeedIntensity: 24,
    radiusScale: 0.14,
    radiusSpeedScale: 42,
    radiusBurstAdd: 28,
    radiusMin: 86,
    radiusMax: 236,
    velocityBoostSpeed: 1.05,
    velocityBoostMax: 2.6,
    velocityBoostBurstAdd: 0.35,
    forceScale: 1,
    swirlScale: 0.52,
    pointerTrailBase: 0.52,
    pointerTrailDirectional: 0.34,
    randomImpulse: 0.24,
    charEnergyGain: 0.46,
    charEnergyMax: 2.85,
    charPushScale: 0.08,
    particleSpring: 0.105,
    particleDamping: 0.82,
    particleVisualThreshold: 0.1,
    particleAlphaScale: 0.24,
    particleAlphaMax: 0.8,
    particleStretchScale: 0.28,
    particleStretchMax: 1.6,
    charSpring: 0.2,
    charDamping: 0.76,
    charEnergyDrive: 0.035,
    charEnergyDecay: 0.82,
    charMaxOffsetX: 26,
    charMaxOffsetY: 16,
    charOpacityEnergy: 0.7,
    charOpacityTravel: 0.016,
    charOpacityMin: 0.02,
    charRotateOffset: 0.54,
    charRotateVelocity: 0.4,
    charRotateMax: 9,
    letterSplitForce: 0.44,
    letterSplitRandom: 0.1,
    letterFadeBoost: 1.18,
    pointerDecay: 0.86,
  },
  aggressive: {
    maskDropChance: 0.08,
    pointJitter: 0.62,
    moveBaseIntensity: 2.15,
    moveSpeedIntensity: 28,
    downBaseIntensity: 5.2,
    downSpeedIntensity: 34,
    radiusScale: 0.165,
    radiusSpeedScale: 54,
    radiusBurstAdd: 44,
    radiusMin: 98,
    radiusMax: 268,
    velocityBoostSpeed: 1.2,
    velocityBoostMax: 3.2,
    velocityBoostBurstAdd: 0.65,
    forceScale: 1.18,
    swirlScale: 0.66,
    pointerTrailBase: 0.64,
    pointerTrailDirectional: 0.46,
    randomImpulse: 0.32,
    charEnergyGain: 0.62,
    charEnergyMax: 3.8,
    charPushScale: 0.14,
    particleSpring: 0.088,
    particleDamping: 0.79,
    particleVisualThreshold: 0.08,
    particleAlphaScale: 0.3,
    particleAlphaMax: 0.92,
    particleStretchScale: 0.38,
    particleStretchMax: 2.2,
    charSpring: 0.165,
    charDamping: 0.79,
    charEnergyDrive: 0.052,
    charEnergyDecay: 0.85,
    charMaxOffsetX: 36,
    charMaxOffsetY: 22,
    charOpacityEnergy: 0.84,
    charOpacityTravel: 0.022,
    charOpacityMin: 0,
    charRotateOffset: 0.72,
    charRotateVelocity: 0.52,
    charRotateMax: 13,
    letterSplitForce: 0.68,
    letterSplitRandom: 0.14,
    letterFadeBoost: 1.36,
    pointerDecay: 0.88,
  },
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function DustHeading({ text, className, preset = "cinematic" }: DustHeadingProps) {
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
  const config = DUST_PRESETS[preset]

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
          cx: relX + relW * 0.5,
          cy: relY + relH * 0.5,
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
            if (Math.random() < config.maskDropChance) continue

            nextParticles.push({
              x: x + (Math.random() - 0.5) * config.pointJitter,
              y: y + (Math.random() - 0.5) * config.pointJitter,
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

    const disturb = (clientX: number, clientY: number, intensity: number, burst = false) => {
      const { left, top, width, height } = boundsRef.current
      const localX = clientX - left
      const localY = clientY - top
      if (localX < -56 || localY < -56 || localX > width + 56 || localY > height + 56) return

      const pointer = pointerRef.current
      const radius = clamp(
        width * config.radiusScale + pointer.speed * config.radiusSpeedScale + (burst ? config.radiusBurstAdd : 0),
        config.radiusMin,
        config.radiusMax,
      )
      const radiusSq = radius * radius
      const velocityBoost =
        1 + clamp(pointer.speed * config.velocityBoostSpeed, 0, config.velocityBoostMax) + (burst ? config.velocityBoostBurstAdd : 0)

      const particles = particlesRef.current
      const charStates = charStateRef.current

      const pointerLen = Math.hypot(pointer.vx, pointer.vy) || 1
      const pvx = pointer.vx / pointerLen
      const pvy = pointer.vy / pointerLen

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
        const force = intensity * falloff * velocityBoost * config.forceScale
        const swirl = force * config.swirlScale * (particle.charIndex % 2 === 0 ? 1 : -1)
        const directional = clamp(nx * pvx + ny * pvy, -1, 1)
        const trailBoost = config.pointerTrailBase + directional * config.pointerTrailDirectional

        particle.vx +=
          nx * force * 2.2 + tx * swirl + pointer.vx * falloff * trailBoost + (Math.random() - 0.5) * config.randomImpulse
        particle.vy +=
          ny * force * 2.0 + ty * swirl + pointer.vy * falloff * trailBoost + (Math.random() - 0.5) * config.randomImpulse

        const charState = charStates[particle.charIndex]
        if (charState) {
          charState.energy = clamp(charState.energy + force * config.charEnergyGain, 0, config.charEnergyMax)
          charState.vx += nx * force * 0.4 + tx * swirl * 0.2 + pointer.vx * falloff * config.charPushScale
          charState.vy += ny * force * 0.34 + ty * swirl * 0.2 + pointer.vy * falloff * config.charPushScale
        }
      }

      for (let index = 0; index < charStates.length; index += 1) {
        const state = charStates[index]
        if (!state) continue

        const dx = state.cx + state.offsetX - localX
        const dy = state.cy + state.offsetY - localY
        const distSq = dx * dx + dy * dy
        if (distSq > radiusSq || distSq < 0.01) continue

        const dist = Math.sqrt(distSq)
        const nx = dx / dist
        const ny = dy / dist
        const falloff = Math.pow((radius - dist) / radius, 1.5)
        const force = intensity * falloff * velocityBoost

        state.energy = clamp(state.energy + force * (config.charEnergyGain * 0.95), 0, config.charEnergyMax)
        state.vx += nx * force * 0.65 + pointer.vx * falloff * (config.charPushScale * 2.3)
        state.vy += ny * force * 0.58 + pointer.vy * falloff * (config.charPushScale * 2.3)
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
        inside: true,
      }

      disturb(event.clientX, event.clientY, config.moveBaseIntensity + speed * config.moveSpeedIntensity)
    }

    const onPointerDown = (event: PointerEvent) => {
      disturb(event.clientX, event.clientY, config.downBaseIntensity + pointerRef.current.speed * config.downSpeedIntensity, true)
    }

    const onPointerLeave = () => {
      pointerRef.current.inside = false
      pointerRef.current.vx = 0
      pointerRef.current.vy = 0
      pointerRef.current.speed = 0
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
      const charStates = charStateRef.current
      const charDisplacement = new Array(charCount).fill(0)
      const charVelocity = new Array(charCount).fill(0)
      const charParticleCount = new Array(charCount).fill(0)

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const charState = charStates[particle.charIndex]
        if (charState && charState.energy > 0.01) {
          const splitFactor = charState.energy / config.charEnergyMax
          const splitForce = splitFactor * config.letterSplitForce
          const swirlSign = particle.charIndex % 2 === 0 ? 1 : -1
          particle.vx +=
            charState.dirX * splitForce + swirlSign * charState.dirY * splitForce * 0.34 + (Math.random() - 0.5) * config.letterSplitRandom
          particle.vy +=
            charState.dirY * splitForce - swirlSign * charState.dirX * splitForce * 0.34 + (Math.random() - 0.5) * config.letterSplitRandom
        }

        const pullX = particle.ox - particle.x
        const pullY = particle.oy - particle.y

        particle.vx += pullX * config.particleSpring
        particle.vy += pullY * config.particleSpring
        particle.vx *= config.particleDamping
        particle.vy *= config.particleDamping
        particle.x += particle.vx
        particle.y += particle.vy

        const speed = Math.hypot(particle.vx, particle.vy)
        const displacement = Math.hypot(particle.x - particle.ox, particle.y - particle.oy)
        const ci = particle.charIndex
        charDisplacement[ci] += displacement
        charVelocity[ci] += speed
        charParticleCount[ci] += 1

        const visualEnergy = speed * 2.0 + displacement * 1.12
        if (visualEnergy < config.particleVisualThreshold) continue

        const [red, green, blue] = DUST_COLORS[particle.colorIndex]
        const alpha = clamp((visualEnergy - config.particleVisualThreshold) * config.particleAlphaScale, 0.03, config.particleAlphaMax)
        const radius = particle.size * (1 + clamp(speed * 0.2 + displacement * 0.07, 0, 0.78))
        const stretch = 1 + clamp(speed * config.particleStretchScale, 0, config.particleStretchMax)
        const angle = Math.atan2(particle.vy, particle.vx)

        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(angle)
        context.fillStyle = `rgba(${red},${green},${blue},${alpha.toFixed(3)})`
        context.beginPath()
        context.ellipse(0, 0, radius * stretch, radius * (1 / stretch), 0, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }

      for (let index = 0; index < charCount; index += 1) {
        const node = charRefs.current[index]
        const state = charStates[index]
        if (!node || !state) continue

        state.vx += -state.offsetX * config.charSpring + state.dirX * state.energy * config.charEnergyDrive
        state.vy += -state.offsetY * config.charSpring + state.dirY * state.energy * config.charEnergyDrive
        state.vx *= config.charDamping
        state.vy *= config.charDamping
        state.offsetX = clamp(state.offsetX + state.vx, -config.charMaxOffsetX, config.charMaxOffsetX)
        state.offsetY = clamp(state.offsetY + state.vy, -config.charMaxOffsetY, config.charMaxOffsetY)
        state.energy *= config.charEnergyDecay

        const travel = Math.hypot(state.offsetX, state.offsetY)
        const pCount = Math.max(1, charParticleCount[index])
        const avgDisp = charDisplacement[index] / pCount
        const avgVel = charVelocity[index] / pCount
        const splitLevel = clamp(
          (state.energy / config.charEnergyMax) * 0.82 + avgDisp * 0.052 + avgVel * 0.11,
          0,
          1,
        )
        const opacity = clamp(
          1 - splitLevel * config.letterFadeBoost - travel * config.charOpacityTravel - state.energy * config.charOpacityEnergy * 0.35,
          config.charOpacityMin,
          1,
        )
        const rotate = clamp(
          state.offsetX * config.charRotateOffset + state.vx * config.charRotateVelocity,
          -config.charRotateMax,
          config.charRotateMax,
        )
        const scale = clamp(1 - splitLevel * 0.24, 0.72, 1)

        node.style.opacity = opacity.toFixed(3)
        node.style.transform = `translate3d(${state.offsetX.toFixed(2)}px, ${state.offsetY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      }

      pointerRef.current.vx *= config.pointerDecay
      pointerRef.current.vy *= config.pointerDecay
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
  }, [charCount, config, text])

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

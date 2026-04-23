"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

const PARTICLE_COUNT = 90

export function DustField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let width = 0
    let height = 0
    let rafId = 0

    const particles: Particle[] = []

    const random = (min: number, max: number) => Math.random() * (max - min) + min

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * window.devicePixelRatio)
      canvas.height = Math.floor(height * window.devicePixelRatio)
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    const seedParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        particles.push({
          x: random(0, width),
          y: random(0, height),
          vx: random(0.08, 0.42),
          vy: random(-0.09, 0.14),
          size: random(0.7, 2.2),
          alpha: random(0.08, 0.26),
        })
      }
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      const pointer = pointerRef.current
      const influenceRadius = 110

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (pointer.active) {
          const dx = pointer.x - particle.x
          const dy = pointer.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < influenceRadius && distance > 0) {
            const force = (influenceRadius - distance) / influenceRadius
            particle.x -= (dx / distance) * force * 0.75
            particle.y -= (dy / distance) * force * 0.75
          }
        }

        if (particle.x > width + 8) particle.x = -8
        if (particle.x < -8) particle.x = width + 8
        if (particle.y > height + 8) particle.y = -8
        if (particle.y < -8) particle.y = height + 8

        context.beginPath()
        context.fillStyle = `rgba(160, 118, 92, ${particle.alpha})`
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }

      rafId = window.requestAnimationFrame(draw)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }

    resize()
    seedParticles()
    draw()

    window.addEventListener("resize", resize)
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}


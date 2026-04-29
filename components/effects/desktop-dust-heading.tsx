"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const DustHeading = dynamic(
  () => import("./dust-heading").then((mod) => mod.DustHeading),
  { ssr: false },
)

type DesktopDustHeadingProps = {
  text: string
  className?: string
  preset?: "cinematic" | "aggressive"
}

export function DesktopDustHeading({
  text,
  className,
  preset = "cinematic",
}: DesktopDustHeadingProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const update = () => setEnabled(media.matches)

    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  if (!enabled) return null

  return <DustHeading text={text} className={className} preset={preset} />
}

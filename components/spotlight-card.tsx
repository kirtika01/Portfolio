"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Enable subtle 3D tilt toward the cursor */
  tilt?: boolean
  /** Radius of the spotlight glow in px */
  radius?: number
  /** Optional label shown by the custom cursor while hovering */
  cursorLabel?: string
}

export default function SpotlightCard({ children, className, tilt = false, radius = 360, cursorLabel }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 150, damping: 16 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 150, damping: 16 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  // Purple spotlight + a brighter "glare" reflection that reads as depth under tilt.
  const spotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, rgba(168,85,247,0.18), transparent 72%)`
  const glare = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(255,255,255,0.10), transparent 60%)`

  return (
    <motion.div
      ref={ref}
      data-cursor={cursorLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-purple-500/40 hover:shadow-[0_18px_40px_-18px_rgba(168,85,247,0.45)]",
        className,
      )}
    >
      {/* Mouse-following spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: spotlight }}
      />
      {/* Moving glare reflection */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: glare }}
      />
      {/* Top hairline highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}

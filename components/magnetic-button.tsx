"use client"

import { useRef, useState, type ReactNode, type MouseEvent, type PointerEvent } from "react"
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode
  strength?: number
  shimmer?: boolean
}

interface Ripple {
  id: number
  x: number
  y: number
}

/** Button with magnetic pull, tactile press spring, click ripple and optional shimmer sweep. */
export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  shimmer = false,
  onPointerDown,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.3 })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const handleDown = (e: PointerEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const id = idRef.current++
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    }
    onPointerDown?.(e)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onPointerDown={handleDown}
      whileTap={{ scale: 0.94 }}
      style={{ x: sx, y: sy }}
      className={cn("group relative overflow-hidden", className)}
      {...rest}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute z-0 rounded-full bg-white/30"
          style={{ left: r.x, top: r.y }}
          initial={{ width: 0, height: 0, x: "-50%", y: "-50%", opacity: 0.5 }}
          animate={{ width: 360, height: 360, x: "-50%", y: "-50%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() => setRipples((list) => list.filter((it) => it.id !== r.id))}
        />
      ))}
      {shimmer && (
        <span className="pointer-events-none absolute inset-0 z-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}

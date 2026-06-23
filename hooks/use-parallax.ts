"use client"

import { useEffect } from "react"
import { useMotionValue, useSpring, type MotionValue } from "framer-motion"

interface ParallaxValues {
  x: MotionValue<number>
  y: MotionValue<number>
}

/**
 * Returns spring-smoothed x/y in roughly [-1, 1] driven by the pointer on
 * desktop and the device's gyroscope on mobile. Disabled under reduced motion.
 */
export function useParallax(): ParallaxValues {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onMouse = (e: MouseEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }

    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    const onOrient = (e: DeviceOrientationEvent) => {
      // gamma: left/right [-90,90], beta: front/back [-180,180]
      x.set(clamp((e.gamma ?? 0) / 45))
      y.set(clamp((e.beta ?? 0) / 45))
    }

    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("deviceorientation", onOrient)
    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("deviceorientation", onOrient)
    }
  }, [x, y])

  return { x: sx, y: sy }
}

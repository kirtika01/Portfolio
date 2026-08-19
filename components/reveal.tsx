"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { DURATION, EASE, gsap, prefersReducedMotion, registerGsap } from "@/lib/motion"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds of delay — use for staggering a list of cards. */
  delay?: number
  /** Distance in px the element travels upward as it fades in. */
  y?: number
}

/**
 * The site-wide scroll reveal: fade in + slide up, once, on enter.
 *
 * Runs on GSAP ScrollTrigger so it shares a frame with the Lenis smooth
 * scroll. Under reduced motion the content is simply visible.
 */
export default function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    registerGsap()

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: DURATION,
          delay,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            // once: never re-animates, including on scroll up.
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, y])

  // Starts hidden so there is no flash before GSAP takes over; the reduced
  // motion branch above restores it immediately.
  return (
    <div ref={ref} data-reveal className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

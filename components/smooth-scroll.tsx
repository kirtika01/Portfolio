"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap } from "@/lib/motion"

/**
 * Site-wide smooth scrolling.
 *
 * Lenis drives the scroll position and GSAP's ticker drives Lenis, so
 * ScrollTrigger and the smooth scroll stay on the same frame — without this
 * they fight each other and scroll-linked animations jitter.
 *
 * Disabled entirely under `prefers-reduced-motion`, where native scrolling is
 * the correct behaviour.
 */
export default function SmoothScroll() {
  useEffect(() => {
    registerGsap()
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle ease-out; keeps the page feeling natural rather than "floaty".
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native scrolling on touch — smoothing there feels laggy, not smooth.
      touchMultiplier: 1.6,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}

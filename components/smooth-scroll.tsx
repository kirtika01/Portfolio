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
 * In-page links are plain `<a href="#id">` (so they work from the keyboard and
 * without JS). One delegated click handler here turns them into a Lenis scroll,
 * updates the URL hash and moves focus to the target section. Lenis honours
 * `scroll-padding-top` from globals.css, so targets clear the fixed navbar.
 *
 * Disabled entirely under `prefers-reduced-motion`, where native scrolling
 * (an instant jump to the anchor) is the correct behaviour.
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

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return

      const url = new URL(link.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return

      e.preventDefault()
      lenis.scrollTo(target)
      if (window.location.hash !== url.hash) history.pushState(null, "", url.hash)

      // Move keyboard focus with the scroll, so Tab continues from the section.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
      target.focus({ preventScroll: true })
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}

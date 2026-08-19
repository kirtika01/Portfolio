/**
 * Shared motion primitives.
 *
 * Everything animated on this site funnels through here so that a single
 * `prefers-reduced-motion` check governs the whole experience.
 */
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let registered = false

/** Registers GSAP plugins exactly once (safe to call from any client component). */
export function registerGsap() {
  if (registered || typeof window === "undefined") return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/** True when the visitor has asked their OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Shared timing so every animation on the site feels like one system. */
export const EASE = "power2.out"
export const DURATION = 0.7
export const STAGGER = 0.08

export { gsap, ScrollTrigger }

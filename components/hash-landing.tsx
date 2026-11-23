"use client"

import { useEffect } from "react"
import { onIntroDone } from "@/components/intro-screen"
import { ScrollTrigger } from "@/lib/motion"

/**
 * Lands on the section named in the URL hash once the intro has cleared — e.g.
 * "Back to Projects" on a project page sends the visitor to /#work. A plain
 * jump, not a smooth scroll: they are returning to a place they already were.
 */
export default function HashLanding() {
  useEffect(
    () =>
      onIntroDone(() => {
        const id = decodeURIComponent(window.location.hash.slice(1))
        const target = id ? document.getElementById(id) : null
        if (!target) return
        requestAnimationFrame(() => {
          target.scrollIntoView()
          ScrollTrigger.refresh()
        })
      }),
    [],
  )
  return null
}

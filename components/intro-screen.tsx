"use client"

import { useEffect, useState } from "react"

/** How long the branded intro holds before fading out, in ms. */
const HOLD_MS = 900
const FADE_MS = 400

export const INTRO_DONE_EVENT = "intro:done"

/** True once the intro has finished (or was skipped). Safe to call anywhere on the client. */
export function introIsDone() {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "played"
}

/** Runs `cb` once the intro is out of the way — immediately if it already is. */
export function onIntroDone(cb: () => void): () => void {
  if (introIsDone()) {
    cb()
    return () => {}
  }
  window.addEventListener(INTRO_DONE_EVENT, cb, { once: true })
  return () => window.removeEventListener(INTRO_DONE_EVENT, cb)
}

/**
 * Branded intro, shown once per browser session.
 *
 * Unlike the old loader it is an overlay: the page underneath is already
 * server-rendered, so search engines, link previews and no-JS visitors get the
 * full content. An inline script in app/layout.tsx sets data-intro="played" on
 * <html> before first paint when the intro should be skipped (already seen this
 * session, or reduced motion), and CSS then hides this element outright.
 */
export default function IntroScreen() {
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const finish = () => {
      document.documentElement.dataset.intro = "played"
      window.dispatchEvent(new Event(INTRO_DONE_EVENT))
    }

    if (introIsDone()) {
      setGone(true)
      finish()
      return
    }

    try {
      sessionStorage.setItem("intro-played", "1")
    } catch {
      /* storage blocked — the intro will simply play again next visit */
    }

    const html = document.documentElement
    const previousOverflow = html.style.overflow
    html.style.overflow = "hidden"

    const leave = window.setTimeout(() => setLeaving(true), HOLD_MS)
    const done = window.setTimeout(() => {
      html.style.overflow = previousOverflow
      setGone(true)
      finish()
    }, HOLD_MS + FADE_MS)

    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
      html.style.overflow = previousOverflow
    }
  }, [])

  if (gone) return null

  return (
    <div
      id="intro-screen"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#070503] transition-opacity ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#9a6c44]/20 blur-[120px]" />

      <div className="relative flex flex-col items-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#b98a5e,#8a5a34,#e0c9ad,#b98a5e)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
          <div className="absolute inset-[9px] flex items-center justify-center rounded-full bg-[#0a0806]">
            <span className="font-display text-4xl font-bold text-gradient">K</span>
          </div>
        </div>

        <div className="mt-7 h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-[#b98a5e] via-[#a9764c] to-[#8a5a34]"
            style={{ animation: `intro-progress ${HOLD_MS}ms ease-out forwards` }}
          />
        </div>

        <p className="mt-4 font-display text-xs tracking-[0.35em] text-stone-400">G. KIRTIKA</p>
      </div>
    </div>
  )
}

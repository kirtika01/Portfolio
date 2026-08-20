"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

type Mode = "default" | "hover" | "text"
interface Ripple {
  id: number
  x: number
  y: number
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>("default")
  const [label, setLabel] = useState("")
  const [down, setDown] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Outer ring trails with a softer spring; the dot tracks tightly.
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 })
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.4 })
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || reduce.matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t?.closest) return
      if (t.closest("input, textarea, select, [contenteditable='true']")) {
        setMode("text")
        setLabel("")
        return
      }
      const labelled = t.closest("[data-cursor]") as HTMLElement | null
      if (labelled) {
        setMode("hover")
        setLabel(labelled.dataset.cursor || "")
        return
      }
      if (t.closest("a, button, [role='button']")) {
        setMode("hover")
        setLabel("")
        return
      }
      setMode("default")
      setLabel("")
    }
    const dn = (e: MouseEvent) => {
      setDown(true)
      const id = idRef.current++
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }])
    }
    const up = () => setDown(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseover", over)
    window.addEventListener("mousedown", dn)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", over)
      window.removeEventListener("mousedown", dn)
      window.removeEventListener("mouseup", up)
    }
  }, [x, y])

  if (!enabled) return null
  const isText = mode === "text"
  const isHover = mode === "hover"

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body,
          a,
          button,
          [role="button"] {
            cursor: none;
          }
        }
      `}</style>

      {/* Outer ring / label capsule */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[120]" style={{ x: ringX, y: ringY }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex items-center justify-center rounded-full border"
            animate={{
              width: isHover ? (label ? 72 : 46) : isText ? 5 : 36,
              height: isHover ? (label ? 72 : 46) : isText ? 26 : 36,
              borderRadius: isText ? 4 : 999,
              backgroundColor: isHover && label ? "rgba(185,138,94,0.85)" : isHover ? "rgba(185,138,94,0.12)" : "rgba(255,255,255,0)",
              borderColor: isText ? "rgba(138,90,52,0.9)" : isHover ? "rgba(185,138,94,0.7)" : "rgba(255,255,255,0.4)",
              scale: down ? 0.82 : 1,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <AnimatePresence mode="wait">
              {label && (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-white"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[120]" style={{ x: dotX, y: dotY }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="rounded-full bg-gradient-to-r from-[#b98a5e] to-[#8a5a34] mix-blend-difference"
            animate={{
              width: isHover || isText ? 0 : down ? 14 : 8,
              height: isHover || isText ? 0 : down ? 14 : 8,
              opacity: isHover || isText ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
        </div>
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none fixed z-[119] rounded-full border border-[#cba982]/70"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 8, height: 8, x: "-50%", y: "-50%", opacity: 0.7 }}
            animate={{ width: 80, height: 80, x: "-50%", y: "-50%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() => setRipples((list) => list.filter((it) => it.id !== r.id))}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

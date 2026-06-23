"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1500 // ms — matches the unmount timer in page.tsx
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#07070b]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative flex flex-col items-center">
        {/* Spinning gradient ring + monogram */}
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#a855f7,#ec4899,#22d3ee,#a855f7)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-[10px] flex items-center justify-center rounded-full bg-[#0b0b12]"
          >
            <span className="font-display text-4xl font-bold text-gradient">K</span>
          </motion.div>
        </div>

        {/* Thin progress track */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm tracking-[0.3em] text-gray-500">
          <span className="font-display">LOADING</span>
          <span className="tabular-nums text-gray-400">{progress}%</span>
        </div>
      </div>
    </div>
  )
}

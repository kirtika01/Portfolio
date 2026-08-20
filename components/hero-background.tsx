"use client"

import { motion, useTransform } from "framer-motion"
import { useParallax } from "@/hooks/use-parallax"

/**
 * Layered hero backdrop: a faint grid, three drifting aurora blobs and a
 * radial vignette — all reacting to the pointer (or device tilt on mobile)
 * for a parallax depth field.
 */
export default function HeroBackground() {
  const { x, y } = useParallax()

  const gridX = useTransform(x, (v) => v * -10)
  const gridY = useTransform(y, (v) => v * -10)
  const blob1X = useTransform(x, (v) => v * 45)
  const blob1Y = useTransform(y, (v) => v * 45)
  const blob2X = useTransform(x, (v) => v * -35)
  const blob2Y = useTransform(y, (v) => v * -35)
  const blob3X = useTransform(x, (v) => v * 28)
  const blob3Y = useTransform(y, (v) => v * 28)

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Grid */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-[-2rem] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_55%,transparent_100%)]"
      />

      {/* Aurora blobs */}
      <motion.div className="absolute left-1/4 top-1/4" style={{ x: blob1X, y: blob1Y }}>
        <div className="h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9a6c44]/30 blur-[120px] animate-aurora" />
      </motion.div>
      <motion.div className="absolute right-1/4 top-1/3" style={{ x: blob2X, y: blob2Y }}>
        <div
          className="h-[26rem] w-[26rem] translate-x-1/2 rounded-full bg-[#b98a5e]/25 blur-[120px] animate-aurora"
          style={{ animationDelay: "-6s" }}
        />
      </motion.div>
      <motion.div className="absolute bottom-1/4 left-1/2" style={{ x: blob3X, y: blob3Y }}>
        <div
          className="h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px] animate-aurora"
          style={{ animationDelay: "-12s" }}
        />
      </motion.div>

      {/* Vignette to keep edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#000_95%)]" />
    </div>
  )
}

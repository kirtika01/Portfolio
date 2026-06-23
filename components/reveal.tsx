"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Fades + lifts children into place with a subtle 3D rotateX as they enter the viewport. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}

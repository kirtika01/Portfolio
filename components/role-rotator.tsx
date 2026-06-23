"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface RoleRotatorProps {
  roles: string[]
  interval?: number
}

/** Cycles through a list of roles with a vertical flip transition. */
export default function RoleRotator({ roles, interval = 2200 }: RoleRotatorProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval)
    return () => clearInterval(id)
  }, [roles.length, interval])

  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="whitespace-nowrap font-semibold text-gradient-static"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

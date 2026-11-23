"use client"

import { useEffect, useState } from "react"

/**
 * The current year, worked out in the browser so a statically built page
 * doesn't keep showing the year it was deployed in.
 */
export default function CurrentYear({ initial = new Date().getFullYear() }: { initial?: number }) {
  const [year, setYear] = useState(initial)
  useEffect(() => setYear(new Date().getFullYear()), [])
  return <span suppressHydrationWarning>{year}</span>
}

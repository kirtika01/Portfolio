"use client"

import type React from "react"
import Link from "next/link"
import type { ReactNode } from "react"
import Magnetic from "@/components/magnetic"

interface SocialIconProps {
  icon: ReactNode
  href: string
  label: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function SocialIcon({ icon, href, label, className = "", onClick }: SocialIconProps) {
  return (
    <Magnetic strength={0.5} className="inline-block">
      <Link
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-gradient-to-r hover:from-[#b98a5e] hover:to-[#8a5a34] hover:shadow-lg hover:shadow-[#b98a5e]/30 active:scale-95 ${className}`}
        onClick={onClick}
      >
        <span>{icon}</span>
        <span className="sr-only">{label}</span>
      </Link>
    </Magnetic>
  )
}

"use client"

import { Award, ExternalLink } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"
import Reveal from "@/components/reveal"

interface CertificateCardProps {
  title: string
  issuer: string
  date: string
  image?: string
  link?: string
}

const issuerStyles: Record<string, { ring: string; icon: string }> = {
  "Google Cloud": { ring: "from-blue-500/30 to-green-500/30", icon: "text-blue-400" },
  IEEE: { ring: "from-blue-500/30 to-blue-700/30", icon: "text-blue-400" },
  NPTEL: { ring: "from-orange-500/30 to-red-500/30", icon: "text-orange-400" },
}

export default function CertificateCard({ title, issuer, date, link }: CertificateCardProps) {
  const style = issuerStyles[issuer] ?? { ring: "from-[#b98a5e]/30 to-[#8a5a34]/30", icon: "text-[#cba982]" }

  return (
    <Reveal className="h-full">
      <SpotlightCard className="h-full" cursorLabel={link ? "View" : undefined}>
      <div className="flex h-full flex-col items-center gap-4 p-6 text-center md:flex-row md:items-start md:text-left">
        {/* Badge */}
        <div className="relative flex-shrink-0">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${style.ring} ring-1 ring-white/10`}>
            <Award className={`h-8 w-8 ${style.icon}`} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-display text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-[#cba982]">{issuer}</p>
          <p className="mb-2 text-xs text-stone-500">{date}</p>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-stone-300 transition-colors hover:text-white"
            >
              <span>View Certificate</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      </SpotlightCard>
    </Reveal>
  )
}

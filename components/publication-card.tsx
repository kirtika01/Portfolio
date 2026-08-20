"use client"

import { BookOpen, ExternalLink } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"

interface PublicationCardProps {
  title: string
  authors: string
  journal: string
  date: string
  link?: string
  abstract?: string
}

export default function PublicationCard({ title, authors, journal, date, link, abstract }: PublicationCardProps) {
  return (
    <SpotlightCard className="p-6 md:p-8" cursorLabel={link ? "Read" : undefined}>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b98a5e]/25 to-[#8a5a34]/25 ring-1 ring-white/10">
          <BookOpen className="h-6 w-6 text-[#e0c9ad]" />
        </div>
        <div className="flex-1">
          <span className="mb-3 inline-flex items-center rounded-full border border-[#b98a5e]/20 bg-[#b98a5e]/10 px-3 py-1 text-xs uppercase tracking-wide text-[#e0c9ad]">
            Published · {date}
          </span>
          <h3 className="mb-2 font-display text-xl font-bold text-white md:text-2xl">{title}</h3>
          <p className="mb-1 text-stone-300">{authors}</p>
          <p className="mb-3 text-[#cba982]">{journal}</p>
          {abstract && <p className="mb-4 text-sm leading-relaxed text-stone-400">{abstract}</p>}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#cba982] transition-colors hover:text-[#dcc0a0]"
            >
              <span>Read Publication</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

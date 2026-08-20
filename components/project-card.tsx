"use client"

import Link from "next/link"
import { ArrowRight, Github, Radio } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"
import Reveal from "@/components/reveal"
import type { Project } from "@/lib/projectsData"

interface ProjectCardProps {
  project: Project
  /** Seconds of stagger delay within the grid. */
  delay?: number
}

/** Brief teaser card: title, one-line summary, tags, and a link to the detail page. */
export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const { slug, title, summary, tags, period, featured, liveUrl, githubUrl, stats } = project

  return (
    <Reveal className={project.span} delay={delay}>
      <Link href={`/projects/${slug}`} data-cursor="View details" className="block h-full">
        <SpotlightCard className="group/card h-full">
          <div className="flex h-full flex-col p-6 md:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {liveUrl && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  Live
                </span>
              )}
              {period && (
                <span className="inline-flex w-fit items-center rounded-full border border-[#b98a5e]/20 bg-[#b98a5e]/10 px-3 py-1 text-xs text-[#e0c9ad]">
                  {period}
                </span>
              )}
            </div>

            <h3
              className={`mb-2 font-display font-bold text-white transition-colors duration-300 group-hover/card:text-[#f0e2d0] ${
                featured ? "text-2xl md:text-3xl" : "text-xl"
              }`}
            >
              {title}
            </h3>

            <p className={`mb-5 leading-relaxed text-stone-400 ${featured ? "max-w-2xl text-base" : "text-sm"}`}>
              {summary}
            </p>

            {featured && stats && (
              <div className="mb-6 flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                    <p className="font-display text-lg font-bold text-gradient">{s.value}</p>
                    <p className="text-xs text-stone-500">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto">
              <div className="mb-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gradient-to-r from-[#b98a5e]/15 to-[#8a5a34]/15 px-2.5 py-1 text-xs text-[#f0e2d0] ring-1 ring-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e0c9ad] transition-colors group-hover/card:text-[#dcc0a0]">
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-1" />
                </span>
                <span className="flex items-center gap-3 text-stone-600">
                  {githubUrl && <Github className="h-4 w-4" />}
                  {liveUrl && <Radio className="h-4 w-4" />}
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </Reveal>
  )
}

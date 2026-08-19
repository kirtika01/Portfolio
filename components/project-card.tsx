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
                <span className="inline-flex w-fit items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                  {period}
                </span>
              )}
            </div>

            <h3
              className={`mb-2 font-display font-bold text-white transition-colors duration-300 group-hover/card:text-purple-200 ${
                featured ? "text-2xl md:text-3xl" : "text-xl"
              }`}
            >
              {title}
            </h3>

            <p className={`mb-5 leading-relaxed text-gray-400 ${featured ? "max-w-2xl text-base" : "text-sm"}`}>
              {summary}
            </p>

            {featured && stats && (
              <div className="mb-6 flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                    <p className="font-display text-lg font-bold text-gradient">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto">
              <div className="mb-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 px-2.5 py-1 text-xs text-purple-200 ring-1 ring-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 transition-colors group-hover/card:text-pink-300">
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-1" />
                </span>
                <span className="flex items-center gap-3 text-gray-600">
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

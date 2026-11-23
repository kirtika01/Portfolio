"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { PROJECT_FILTERS, projects, type ProjectFilter } from "@/lib/projectsData"
import { cn } from "@/lib/utils"

type Filter = "All" | ProjectFilter

// Featured projects first; otherwise the order in lib/projectsData.ts.
const ORDERED = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("All")
  const reduceMotion = useReducedMotion()

  const visible = useMemo(
    () => (filter === "All" ? ORDERED : ORDERED.filter((p) => p.filters.includes(filter))),
    [filter],
  )

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length }
    for (const f of PROJECT_FILTERS) c[f] = projects.filter((p) => p.filters.includes(f)).length
    return c
  }, [])

  const filters: Filter[] = ["All", ...PROJECT_FILTERS.filter((f) => counts[f] > 0)]

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative bg-gradient-to-b from-black via-[#0b0806] to-black py-14 md:py-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          id="work-title"
          eyebrow="Projects"
          title={
            <>
              Selected <span className="text-gradient">Work</span>
            </>
          }
          description="Production products, AI agents and published research. Open any project for the full write-up: features, architecture and stack."
        />

        <Reveal className="mb-10">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                    active
                      ? "border-[#cba982]/60 bg-[#b98a5e]/20 text-white"
                      : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/25 hover:text-white",
                  )}
                >
                  {f}
                  <span className={cn("ml-1.5 tabular-nums", active ? "text-[#e0c9ad]" : "text-stone-400")}>
                    {counts[f]}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {filter === "All" ? `Showing all ${visible.length} projects` : `Showing ${visible.length} ${filter} projects`}
          </p>
        </Reveal>

        <Reveal>
          <motion.ul layout={!reduceMotion} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project) => (
                <motion.li
                  key={project.slug}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </Reveal>
      </div>
    </section>
  )
}

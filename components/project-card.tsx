import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Github, Package, Radio } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"
import ProjectStatusBadge, { NeedsReview } from "@/components/project-status"
import type { Project } from "@/lib/projectsData"

const MAX_TECH = 5

/**
 * Project teaser card.
 *
 * The "View Details" link is stretched over the whole card (its ::after covers
 * it), so the card is one big click target while the GitHub / Live / PyPI links
 * sit above that layer as their own, separately focusable links — no links
 * nested inside links.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, category, status, problem, solution, githubUrl, liveUrl, pypiUrl, needsReview } = project
  const tech = project.techStack.length ? project.techStack : project.tags
  const shown = tech.slice(0, MAX_TECH)
  const more = tech.length - shown.length

  return (
    <SpotlightCard className="group/card h-full" cursorLabel="View details">
      <article className="relative flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-[#cba982]">{category}</p>
          <ProjectStatusBadge status={status} className="flex-shrink-0" />
        </div>

        <h3 className="mb-2 font-display text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover/card:text-[#f0e2d0]">
          {title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-stone-300">{summary}</p>

        <dl className="mb-5 space-y-3 text-sm">
          <div>
            <dt className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Problem</dt>
            <dd className="line-clamp-3 leading-relaxed text-stone-300">{problem}</dd>
          </div>
          <div>
            <dt className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Solution</dt>
            <dd className="line-clamp-3 leading-relaxed text-stone-300">{solution}</dd>
          </div>
        </dl>

        <NeedsReview items={needsReview} className="mb-4" />

        <div className="mt-auto">
          <ul className="mb-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {shown.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
            {more > 0 && <li className="chip text-stone-400">+{more} more</li>}
          </ul>

          <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <Link
              href={`/projects/${slug}`}
              aria-label={`View details: ${title}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e0c9ad] transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover/card:text-[#f0e2d0]"
            >
              View Details
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-1" />
            </Link>

            <div className="relative z-10 flex items-center gap-1">
              {liveUrl && (
                <ExternalIcon href={liveUrl} label={`${title} — live site`}>
                  <Radio className="h-4 w-4" aria-hidden="true" />
                </ExternalIcon>
              )}
              {pypiUrl && (
                <ExternalIcon href={pypiUrl} label={`${title} — PyPI package`}>
                  <Package className="h-4 w-4" aria-hidden="true" />
                </ExternalIcon>
              )}
              {githubUrl && (
                <ExternalIcon href={githubUrl} label={`${title} — source on GitHub`}>
                  <Github className="h-4 w-4" aria-hidden="true" />
                </ExternalIcon>
              )}
            </div>
          </div>
        </div>
      </article>
    </SpotlightCard>
  )
}

function ExternalIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-stone-300 transition-colors hover:border-[#b98a5e]/50 hover:text-white"
    >
      {children}
    </a>
  )
}

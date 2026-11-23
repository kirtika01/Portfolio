import Link from "next/link"
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react"

interface PublicationCardProps {
  title: string
  authors: string
  venue: string
  year: string
  abstract?: string
  /** Publisher page (e.g. IEEE Xplore). The link renders only when set. */
  url?: string
  /** Slug of the related project page, if there is one. */
  relatedProjectSlug?: string
}

export default function PublicationCard({ title, authors, venue, year, abstract, url, relatedProjectSlug }: PublicationCardProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-[#b98a5e]/25 bg-gradient-to-br from-[#b98a5e]/[0.09] via-white/[0.02] to-transparent p-6 md:p-9">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#b98a5e]/15 blur-[90px]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:gap-8">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b98a5e]/30 to-[#6b4527]/25 text-[#f0e2d0] ring-1 ring-[#b98a5e]/35">
          <BookOpen aria-hidden="true" className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="mb-3 inline-flex items-center rounded-full border border-[#b98a5e]/30 bg-[#b98a5e]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#e0c9ad]">
            Peer-reviewed publication · {year}
          </p>
          <h3 className="mb-3 font-display text-xl font-bold leading-snug text-white md:text-2xl">{title}</h3>
          <p className="text-stone-200">
            <span className="sr-only">Authors: </span>
            {authors}
          </p>
          <p className="mb-4 text-[#cba982]">
            <span className="sr-only">Published in: </span>
            {venue}
          </p>
          {abstract && <p className="mb-6 max-w-3xl leading-relaxed text-stone-300">{abstract}</p>}

          <div className="flex flex-wrap gap-3">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-2.5 text-sm"
              >
                Read on IEEE Xplore
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {relatedProjectSlug && (
              <Link href={`/projects/${relatedProjectSlug}`} className="btn-secondary px-5 py-2.5 text-sm">
                View the project
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

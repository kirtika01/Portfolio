import type { ProjectStatus } from "@/lib/projectsData"
import { cn } from "@/lib/utils"

const STYLES: Record<ProjectStatus, { badge: string; dot: string }> = {
  Live: { badge: "border-green-500/30 bg-green-500/10 text-green-300", dot: "bg-green-400" },
  "In Progress": { badge: "border-amber-400/30 bg-amber-400/10 text-amber-200", dot: "bg-amber-300" },
  Research: { badge: "border-[#b98a5e]/40 bg-[#b98a5e]/10 text-[#e0c9ad]", dot: "bg-[#cba982]" },
  Completed: { badge: "border-white/15 bg-white/[0.05] text-stone-200", dot: "bg-stone-300" },
}

/** Small pill showing a project's real status: Live, In Progress, Research or Completed. */
export default function ProjectStatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const s = STYLES[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        s.badge,
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
        {status === "Live" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", s.dot)} />
      </span>
      <span className="sr-only">Status: </span>
      {status}
    </span>
  )
}

/**
 * Lists facts still to be confirmed for a project. Development only — it
 * renders nothing in a production build, so it can never reach visitors.
 */
export function NeedsReview({ items, className }: { items?: string[]; className?: string }) {
  if (process.env.NODE_ENV === "production" || !items?.length) return null
  return (
    <p
      className={cn(
        "rounded-lg border border-dashed border-amber-400/50 bg-amber-400/5 px-2.5 py-1.5 text-[11px] leading-snug text-amber-200",
        className,
      )}
    >
      <strong className="font-semibold">Needs review (dev only):</strong> {items.join(", ")}
    </p>
  )
}

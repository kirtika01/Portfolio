import type { ReactNode } from "react"
import Reveal from "@/components/reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** id for the <h2>, so the section can be labelled by it. */
  id?: string
  align?: "center" | "left"
  className?: string
}

/** The one heading style every home-page section uses. Renders an <h2>. */
export default function SectionHeading({ eyebrow, title, description, id, align = "center", className }: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <Reveal className={cn("mb-10 md:mb-12", centered && "text-center", className)}>
      <p
        className={cn(
          "mb-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#cba982] md:text-base",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-[#b98a5e]" />
        {eyebrow}
        <span aria-hidden="true" className={cn("h-px w-8 bg-gradient-to-l from-transparent to-[#b98a5e]", !centered && "hidden")} />
      </p>
      <h2 id={id} className="font-display text-[2.1rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg", centered && "mx-auto")}>{description}</p>
      )}
    </Reveal>
  )
}

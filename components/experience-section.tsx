import Link from "next/link"
import { ArrowRight, Briefcase, CalendarDays, MapPin, Star } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { EXPERIENCE } from "@/lib/content"

/** Work history as a vertical timeline. Content lives in lib/content.ts. */
export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-black pb-8 pt-14 md:pb-10 md:pt-16">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">Worked</span>
            </>
          }
          description="AI and backend engineering, applied research, and product work — most recent first."
        />

        <ol className="relative mx-auto max-w-4xl">
          {/* Timeline rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[11px] top-2 w-px bg-gradient-to-b from-[#cba982] via-[#8a5a34]/60 to-transparent md:left-[15px]"
          />

          {EXPERIENCE.map((job, i) => (
            <li key={`${job.company}-${job.title}`} className="relative pb-8 pl-10 last:pb-0 md:pl-14">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-[#b98a5e]/50 bg-black md:h-8 md:w-8"
              >
                <span
                  className={`h-2 w-2 rounded-full md:h-2.5 md:w-2.5 ${
                    job.current || job.highlight ? "bg-[#cba982] shadow-[0_0_12px_rgba(203,169,130,0.8)]" : "bg-[#8a5a34]"
                  }`}
                />
              </span>

              <Reveal delay={Math.min(i, 3) * 0.05}>
                <article
                  className={
                    job.highlight
                      ? "surface relative overflow-hidden border-[#b98a5e]/45 p-6 shadow-[0_24px_70px_-40px_rgba(185,138,94,0.7)] md:p-7"
                      : "surface p-6 transition-colors duration-300 hover:border-[#b98a5e]/30 md:p-7"
                  }
                >
                  {job.highlight && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#cba982] to-transparent"
                    />
                  )}
                  <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-white md:text-xl">{job.title}</h3>
                      <p className="mt-0.5 text-[#e0c9ad]">{job.company}</p>
                    </div>
                    {job.highlight ? (
                      <span className="inline-flex w-fit flex-shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ecdcc6] to-[#b98a5e] px-2.5 py-0.5 text-xs font-semibold text-[#1a120b]">
                        <Star aria-hidden="true" className="h-3 w-3 fill-current" />
                        Client project
                      </span>
                    ) : (
                      job.current && (
                        <span className="w-fit flex-shrink-0 rounded-full border border-[#b98a5e]/40 bg-[#b98a5e]/10 px-2.5 py-0.5 text-xs font-medium text-[#e0c9ad]">
                          Current
                        </span>
                      )
                    )}
                  </header>

                  <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-stone-300">
                    <li className="flex items-center gap-1.5">
                      <CalendarDays aria-hidden="true" className="h-4 w-4 text-stone-400" />
                      <span className="sr-only">Dates: </span>
                      {job.dates}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="h-4 w-4 text-stone-400" />
                      <span className="sr-only">Location: </span>
                      {job.location}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Briefcase aria-hidden="true" className="h-4 w-4 text-stone-400" />
                      <span className="sr-only">Type: </span>
                      {job.type}
                    </li>
                  </ul>

                  <ul className="mb-5 space-y-2 text-sm leading-relaxed text-stone-300 md:text-[15px]">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-[#b98a5e]" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                    {job.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>

                  {job.projectSlug && (
                    <Link
                      href={`/projects/${job.projectSlug}`}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#e0c9ad] transition-colors hover:text-white"
                    >
                      Read the case study
                      <span className="sr-only">: {job.company}</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

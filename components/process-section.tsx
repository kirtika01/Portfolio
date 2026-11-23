import { ClipboardList, Code2, Compass, Rocket } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { PROCESS_STEPS } from "@/lib/content"

const ICONS = [Compass, ClipboardList, Code2, Rocket]

/**
 * Four-step collaboration process: a vertical timeline on mobile, a horizontal
 * one from the md breakpoint up.
 */
export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative bg-gradient-to-b from-black via-[#0b0806] to-black py-14 md:py-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          title={
            <>
              How We&apos;ll <span className="text-gradient">Work Together</span>
            </>
          }
        />

        <ol className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-4 md:gap-6">
          {/* Rail: vertical on mobile, horizontal on md+ (runs through the step markers). */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-[#cba982] via-[#8a5a34]/60 to-[#8a5a34]/10 md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-6 md:h-px md:w-auto md:bg-gradient-to-r"
          />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
                <Reveal delay={i * 0.08} className="flex gap-5 md:flex-col md:items-center md:gap-0">
                  <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#b98a5e]/50 bg-[#0b0806] text-[#e0c9ad] shadow-[0_0_24px_-6px_rgba(185,138,94,0.6)]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div className="pt-1 md:mt-5 md:pt-0">
                    <p className="mb-1 font-mono text-xs tracking-widest text-[#cba982]">
                      <span className="sr-only">Step </span>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mb-2 font-display text-lg font-semibold text-white">{step.title}</h3>
                    <p className="max-w-xs leading-relaxed text-stone-300">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

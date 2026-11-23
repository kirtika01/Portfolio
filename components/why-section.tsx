import { BrainCircuit, Layers, Lightbulb, MessagesSquare, Workflow } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { WHY_POINTS } from "@/lib/content"

const ICONS = [Workflow, BrainCircuit, Lightbulb, MessagesSquare, Layers]

export default function WhySection() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden bg-black py-14 md:py-16">
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#9a6c44]/10 blur-[110px]" />
      <div className="container relative mx-auto px-4 md:px-8">
        <SectionHeading
          id="why-title"
          eyebrow="Why me"
          title={
            <>
              Why <span className="text-gradient">Work With Me?</span>
            </>
          }
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {WHY_POINTS.map((point, i) => {
            const Icon = ICONS[i % ICONS.length]
            // 3 + 2 layout on large screens: first row thirds, second row halves.
            const span = i < 3 ? "lg:col-span-2" : "lg:col-span-3"
            return (
              <li key={point.title} className={`${span} ${i === WHY_POINTS.length - 1 ? "sm:col-span-2" : ""}`}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <div className="surface group h-full p-6 transition-colors duration-300 hover:border-[#b98a5e]/35">
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b98a5e]/25 to-[#6b4527]/20 text-[#e0c9ad] ring-1 ring-[#b98a5e]/30">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mb-2 font-display text-lg font-semibold text-white">{point.title}</h3>
                    <p className="leading-relaxed text-stone-300">{point.body}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

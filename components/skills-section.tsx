import { Boxes, BrainCircuit, Code2, Database, LayoutTemplate, Server, Wrench } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { PRIMARY_STACK, SKILL_GROUPS } from "@/lib/content"

const ICONS = [Code2, Server, BrainCircuit, LayoutTemplate, Database, Wrench]

/** Skills as grouped chips — no proficiency percentages. */
export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative bg-gradient-to-b from-black via-[#0b0806] to-black py-14 md:py-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title={
            <>
              Tools &amp; <span className="text-gradient">Technologies</span>
            </>
          }
        />

        <Reveal className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
            <Boxes aria-hidden="true" className="h-4 w-4 text-[#cba982]" />
            Primary stack
          </span>
          <ul className="flex flex-wrap justify-center gap-2">
            {PRIMARY_STACK.map((s) => (
              <li
                key={s}
                className="rounded-full border border-[#b98a5e]/45 bg-[#b98a5e]/10 px-3 py-1 text-sm font-medium text-[#f0e2d0]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={group.title} delay={(i % 3) * 0.05} className="h-full">
                <div className="surface h-full p-6">
                  <h3 className="mb-4 flex items-center gap-3 font-display text-base font-semibold text-white">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b98a5e]/10 text-[#cba982] ring-1 ring-[#b98a5e]/25">
                      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                    </span>
                    {group.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="chip text-[13px]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { BrainCircuit, Cable, Layers, MapPin, Server, Workflow } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { ABOUT_HIGHLIGHTS, ABOUT_PARAGRAPHS } from "@/lib/content"
import { SITE } from "@/lib/site"

const HIGHLIGHT_ICONS = [Server, Layers, BrainCircuit, Workflow, Cable]

/** About: portrait, positioning copy and the five professional highlights. */
export default function AboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative bg-gradient-to-b from-black via-[#0b0806] to-black py-14 md:py-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading id="about-title" eyebrow="About" title="Engineering Ideas Into Intelligent Products." />

        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="group relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[#9a6c44] via-[#a9764c] to-[#8a5a34] opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative rounded-3xl bg-gradient-to-tr from-[#b98a5e] via-[#a9764c] to-[#8a5a34] p-[2px]">
                <div className="relative aspect-[720/667] overflow-hidden rounded-3xl bg-stone-900">
                  <Image
                    src="/kirtika-portrait.jpg"
                    alt="Portrait of G. Kirtika, AI & Backend Engineer"
                    fill
                    sizes="(min-width: 1024px) 384px, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-stone-300">
              <MapPin aria-hidden="true" className="h-4 w-4 text-[#cba982]" />
              {SITE.location}
            </p>
          </Reveal>

          {/* Copy + highlights */}
          <div>
            <Reveal className="space-y-5 text-base leading-relaxed text-stone-300 md:text-lg">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <p key={i} className={i === 0 ? "text-stone-100" : undefined}>
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">Professional highlights</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {ABOUT_HIGHLIGHTS.map((item, i) => {
                  const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
                  return (
                    <li
                      key={item}
                      className={`surface flex items-center gap-3 px-4 py-3 text-sm text-stone-100 ${
                        i === ABOUT_HIGHLIGHTS.length - 1 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#b98a5e]/10 text-[#cba982] ring-1 ring-[#b98a5e]/25">
                        <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                      </span>
                      {item}
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

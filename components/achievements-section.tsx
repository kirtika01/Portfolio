import { ExternalLink, Presentation } from "lucide-react"
import CertificateCard from "@/components/certificate-card"
import PublicationCard from "@/components/publication-card"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { ACHIEVEMENTS, PUBLICATION, TRAINING, type AchievementKind } from "@/lib/content"

const GROUPS: { kind: AchievementKind; title: string }[] = [
  { kind: "award", title: "Awards" },
  { kind: "certification", title: "Certifications" },
  { kind: "conference", title: "Conferences" },
]

/** Research publication, awards, certifications, conferences and workshops. */
export default function AchievementsSection() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative bg-black py-14 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          id="achievements-title"
          eyebrow="Recognition"
          title={
            <>
              Research, Achievements <span className="text-gradient">&amp; Certifications</span>
            </>
          }
        />

        <div className="mx-auto max-w-6xl space-y-14">
          {/* id kept so older links to /#publications still land here */}
          <Reveal>
            <div id="publications">
              <PublicationCard {...PUBLICATION} />
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-6">
            {GROUPS.map((group) => {
              const items = ACHIEVEMENTS.filter((a) => a.kind === group.kind)
              if (!items.length) return null
              return (
                <Reveal key={group.kind}>
                  <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">{group.title}</h3>
                  <ul className="space-y-3">
                    {items.map((a) => (
                      <li key={a.title}>
                        <CertificateCard {...a} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>

          <Reveal>
            <div className="surface p-6 md:p-8">
              <div className="mb-6 flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#b98a5e]/10 text-[#cba982] ring-1 ring-[#b98a5e]/25">
                  <Presentation aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">Workshops &amp; Training</h3>
                  <p className="mt-1 text-stone-300">{TRAINING.summary}</p>
                </div>
              </div>
              <ul className="grid gap-3 md:grid-cols-3">
                {TRAINING.sessions.map((s) => (
                  <li key={s.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="font-medium text-stone-100">{s.title}</p>
                    <p className="mt-1 text-sm text-stone-300">{s.body}</p>
                    {s.recordingUrl && (
                      <a
                        href={s.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm text-[#cba982] hover:text-[#e0c9ad]"
                      >
                        Session recording
                        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

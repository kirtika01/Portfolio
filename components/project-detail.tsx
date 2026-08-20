"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Github, Linkedin, Radio } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"
import Reveal from "@/components/reveal"
import MagneticButton from "@/components/magnetic-button"
import { DURATION, EASE, STAGGER, gsap, prefersReducedMotion, registerGsap } from "@/lib/motion"
import type { Project } from "@/lib/projectsData"

export default function ProjectDetail({ project }: { project: Project }) {
  const { title, tagline, tags, period, role, liveUrl, githubUrl, stats, features, techStack, sections } =
    project

  // Hero content fades in on load, matching the home page's entrance.
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    registerGsap()

    const items = el.querySelectorAll("[data-hero-item]")
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: DURATION, ease: EASE, stagger: STAGGER * 1.4 },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Slim header — the main navbar's hash links only work on the home page. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="font-display text-xl font-bold text-white">
            Kirtika<span className="text-[#8a5a34]">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/#work" className="text-sm text-stone-400 transition-colors hover:text-[#e0c9ad]">
              Projects
            </Link>
            <Link href="/#contact" className="text-sm text-stone-400 transition-colors hover:text-[#e0c9ad]">
              Contact
            </Link>
            <a
              href="https://github.com/kirtika01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-stone-400 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/g-kirtika-426687254/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone-400 transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 select-none opacity-40 [background:radial-gradient(circle_at_25%_15%,rgba(185,138,94,0.18),transparent_60%),radial-gradient(circle_at_75%_10%,rgba(138,90,52,0.14),transparent_55%)]" />

        <div ref={heroRef} className="container relative z-10 mx-auto px-4">
          <Link
            href="/#work"
            data-hero-item
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-[#e0c9ad]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="max-w-4xl">
            <div data-hero-item className="mb-5 flex flex-wrap items-center gap-2">
              {liveUrl && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  Live project
                </span>
              )}
              {period && (
                <span className="rounded-full border border-[#b98a5e]/20 bg-[#b98a5e]/10 px-3 py-1 text-xs text-[#e0c9ad]">
                  {period}
                </span>
              )}
              {role && (
                <span className="rounded-full border border-white/[0.06] bg-white/5 px-3 py-1 text-xs text-stone-300">
                  {role}
                </span>
              )}
            </div>

            <h1 data-hero-item className="mb-5 font-display text-3xl font-bold leading-tight md:text-5xl">
              <span className="text-gradient">{title}</span>
            </h1>
            <p data-hero-item className="mb-8 max-w-3xl text-lg leading-relaxed text-stone-300">
              {tagline}
            </p>

            {/* GitHub button only when a repo link exists; live button only when a
                deployment link exists. Never an empty or broken button. */}
            {(githubUrl || liveUrl) && (
              <div data-hero-item className="flex flex-wrap gap-3">
                {liveUrl && (
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <MagneticButton
                      shimmer
                      className="rounded-full bg-gradient-to-r from-[#b98a5e] to-[#8a5a34] px-6 py-3 font-medium text-white shadow-lg shadow-[#b98a5e]/25"
                    >
                      <Radio className="h-4 w-4" />
                      Visit Live Project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </MagneticButton>
                  </a>
                )}
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <MagneticButton className="rounded-full border border-[#b98a5e]/60 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#cba982] hover:bg-[#b98a5e]/10">
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </MagneticButton>
                  </a>
                )}
              </div>
            )}
          </div>

          {stats && (
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <SpotlightCard className="p-5 text-center">
                    <p className="font-display text-3xl font-bold text-gradient">{s.value}</p>
                    <p className="mt-1 text-sm text-stone-400">{s.label}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="relative pb-24">
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              {/* Overview first, then the full feature list, then the rest — so a
                  trailing section like Licence stays at the end of the page. */}
              {sections.slice(0, 1).map((section, i) => (
                <Reveal key={section.heading} delay={i * 0.06}>
                  <SpotlightCard className="p-6 md:p-8">
                    <h2 className="mb-4 font-display text-2xl font-semibold">
                      <span className="text-gradient">{section.heading}</span>
                    </h2>
                    {section.body && <p className="leading-relaxed text-stone-300">{section.body}</p>}
                    {section.bullets && (
                      <ul className={`space-y-3 ${section.body ? "mt-4" : ""}`}>
                        {section.bullets.map((b) => (
                          <li key={b} className="flex gap-3 leading-relaxed text-stone-300">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#cba982] to-[#c09468]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </SpotlightCard>
                </Reveal>
              ))}

              {/* Every feature, listed in full. */}
              <Reveal delay={0.06}>
                <SpotlightCard className="p-6 md:p-8">
                  <h2 className="mb-5 font-display text-2xl font-semibold">
                    <span className="text-gradient">Features</span>
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-3 leading-relaxed text-stone-300">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#cba982]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>

              {sections.slice(1).map((section, i) => (
                <Reveal key={section.heading} delay={i * 0.06}>
                  <SpotlightCard className="p-6 md:p-8">
                    <h2 className="mb-4 font-display text-2xl font-semibold">
                      <span className="text-gradient">{section.heading}</span>
                    </h2>
                    {section.body && <p className="leading-relaxed text-stone-300">{section.body}</p>}
                    {section.bullets && (
                      <ul className={`space-y-3 ${section.body ? "mt-4" : ""}`}>
                        {section.bullets.map((b) => (
                          <li key={b} className="flex gap-3 leading-relaxed text-stone-300">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#cba982] to-[#c09468]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={0.1}>
                <SpotlightCard className="p-6">
                  <h2 className="mb-5 font-display text-xl font-semibold">
                    <span className="text-gradient">Tech stack</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-gradient-to-r from-[#b98a5e]/15 to-[#8a5a34]/15 px-2.5 py-1 text-xs text-[#f0e2d0] ring-1 ring-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>

              <Reveal delay={0.15}>
                <SpotlightCard className="p-6">
                  <h2 className="mb-4 font-display text-xl font-semibold">
                    <span className="text-gradient">Tagged</span>
                  </h2>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.06] bg-white/5 px-2.5 py-1 text-xs text-stone-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#8a5a34]/50 bg-[#8a5a34]/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8a5a34]/20"
                  >
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </SpotlightCard>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-[#e0c9ad]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

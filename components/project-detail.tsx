"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Check, Copy, Github, Linkedin, MapPin, Package, Radio, Terminal } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"
import Reveal from "@/components/reveal"
import ProjectStatusBadge, { NeedsReview } from "@/components/project-status"
import { DURATION, EASE, STAGGER, gsap, prefersReducedMotion, registerGsap } from "@/lib/motion"
import type { Project, ProjectInstall, ProjectScreenshot } from "@/lib/projectsData"
import { LINKS } from "@/lib/site"

/** One command with a copy button. Falls back silently if the clipboard is blocked. */
function CommandLine({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard unavailable (insecure context, permissions) — the text is still selectable.
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/60 py-1.5 pl-4 pr-1.5">
      <span className="select-none font-mono text-sm text-[#8a5a34]">$</span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-[#f0e2d0]">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy ${command}`}
        className="shrink-0 rounded-lg p-2 text-stone-400 transition-colors hover:bg-white/5 hover:text-[#e0c9ad]"
      >
        {copied ? <Check className="h-4 w-4 text-[#cba982]" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

function GetStarted({ install, pypiUrl }: { install: ProjectInstall; pypiUrl?: string }) {
  return (
    <SpotlightCard className="p-6 md:p-8">
      <h2 className="mb-2 flex items-center gap-3 font-display text-2xl font-semibold">
        <Terminal className="h-5 w-5 text-[#cba982]" />
        <span className="text-gradient">Get started</span>
      </h2>
      <p className="mb-6 text-sm text-stone-400">
        Install it
        {pypiUrl && (
          <>
            {" "}from{" "}
            <a
              href={pypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e0c9ad] underline decoration-[#8a5a34] underline-offset-4 hover:text-white"
            >
              PyPI
            </a>
          </>
        )}{" "}
        and get it running.
      </p>

      {install.requirements && install.requirements.length > 0 && (
        <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">You'll need</p>
          <ul className="space-y-1.5">
            {install.requirements.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-stone-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#cba982]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ol className="space-y-5">
        {install.steps.map((step, i) => (
          <li key={step.command} className="flex gap-4">
            <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#b98a5e]/25 to-[#8a5a34]/25 text-xs font-semibold text-[#f0e2d0] ring-1 ring-white/10">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <CommandLine command={step.command} />
              {step.note && <p className="mt-2 text-sm leading-relaxed text-stone-400">{step.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </SpotlightCard>
  )
}

function Screenshot({ shot, href }: { shot: ProjectScreenshot; href?: string }) {
  const cls =
    "h-auto w-full rounded-xl ring-1 ring-white/10 transition-transform duration-500 group-hover/shot:scale-[1.01]"
  // An animated screenshot swaps to its still frame for reduced-motion visitors.
  // <picture> does that before any frame loads; next/image can't take a <source>.
  const img = shot.still ? (
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcSet={shot.still} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" className={cls} />
    </picture>
  ) : (
    <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className={cls} />
  )

  return (
    <SpotlightCard className="p-3 md:p-4">
      <figure>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="group/shot block overflow-hidden rounded-xl">
            {img}
          </a>
        ) : (
          img
        )}
        {shot.caption && (
          <figcaption className="flex items-center justify-between gap-3 px-2 pb-1 pt-3 text-sm text-stone-400">
            <span>{shot.caption}</span>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#e0c9ad] hover:text-white"
              >
                Open
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </figcaption>
        )}
      </figure>
    </SpotlightCard>
  )
}

export default function ProjectDetail({ project }: { project: Project }) {
  const {
    title,
    tagline,
    tags,
    period,
    role,
    location,
    liveUrl,
    githubUrl,
    pypiUrl,
    install,
    screenshot,
    stats,
    features,
    techStack,
    sections,
    category,
    status,
    problem,
    solution,
    needsReview,
  } = project

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
            Kirtika<span className="text-[#b98a5e]">.</span>
            <span className="sr-only"> (home)</span>
          </Link>
          <nav aria-label="Main" className="flex items-center gap-4">
            <Link href="/#work" className="text-sm text-stone-300 transition-colors hover:text-[#e0c9ad]">
              Projects
            </Link>
            <Link href="/#contact" className="text-sm text-stone-300 transition-colors hover:text-[#e0c9ad]">
              Contact
            </Link>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="text-stone-400 transition-colors hover:text-white"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="text-stone-400 transition-colors hover:text-white"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 select-none opacity-40 [background:radial-gradient(circle_at_25%_15%,rgba(185,138,94,0.18),transparent_60%),radial-gradient(circle_at_75%_10%,rgba(138,90,52,0.14),transparent_55%)]" />

        <div ref={heroRef} className="container relative z-10 mx-auto px-4">
          <Link
            href="/#work"
            data-hero-item
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-[#e0c9ad]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="max-w-4xl">
            <div data-hero-item className="mb-5 flex flex-wrap items-center gap-2">
              <ProjectStatusBadge status={status} />
              <span className="rounded-full border border-[#b98a5e]/30 bg-[#b98a5e]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#e0c9ad]">
                {category}
              </span>
              {pypiUrl && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cba982]/30 bg-[#cba982]/10 px-3 py-1 text-xs font-medium text-[#f0e2d0]">
                  <Package aria-hidden="true" className="h-3.5 w-3.5" />
                  Published on PyPI
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
              {location && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/5 px-3 py-1 text-xs text-stone-300">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#cba982]" />
                  <span className="sr-only">Location: </span>
                  {location}
                </span>
              )}
            </div>

            <h1 data-hero-item className="mb-5 font-display text-3xl font-bold leading-tight md:text-5xl">
              <span className="text-gradient">{title}</span>
            </h1>
            <p data-hero-item className="mb-8 max-w-3xl text-lg leading-relaxed text-stone-300">
              {tagline}
            </p>

            {/* Each button renders only when its link exists — GitHub, live deployment,
                PyPI. Never an empty or broken button. */}
            {(githubUrl || liveUrl || pypiUrl) && (
              <div data-hero-item className="flex flex-wrap gap-3">
                {pypiUrl && (
                  <a href={pypiUrl} target="_blank" rel="noopener noreferrer" className="btn-primary group px-6 py-3 text-base">
                    <Package aria-hidden="true" className="h-4 w-4" />
                    View on PyPI
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {liveUrl && (
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={pypiUrl ? "btn-secondary group px-6 py-3 text-base" : "btn-primary group px-6 py-3 text-base"}>
                    <Radio aria-hidden="true" className="h-4 w-4" />
                    Visit Live Project
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-3 text-base">
                    <Github aria-hidden="true" className="h-4 w-4" />
                    View on GitHub
                    <span className="sr-only">(opens in a new tab)</span>
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
              <Reveal>
                <SpotlightCard className="p-6 md:p-8">
                  <dl className="grid gap-6 md:grid-cols-2">
                    <div>
                      <dt className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#cba982]">The problem</dt>
                      <dd className="leading-relaxed text-stone-300">{problem}</dd>
                    </div>
                    <div>
                      <dt className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#cba982]">The solution</dt>
                      <dd className="leading-relaxed text-stone-300">{solution}</dd>
                    </div>
                  </dl>
                  <NeedsReview items={needsReview} className="mt-6" />
                </SpotlightCard>
              </Reveal>

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

              {/* How to install and reach the project, then what it looks like. */}
              {install && (
                <Reveal delay={0.06}>
                  <GetStarted install={install} pypiUrl={pypiUrl} />
                </Reveal>
              )}

              {screenshot && (
                <Reveal delay={0.06}>
                  <Screenshot shot={screenshot} href={pypiUrl ?? liveUrl} />
                </Reveal>
              )}

              {/* Every feature, listed in full. */}
              {features.length > 0 && (
              <Reveal delay={0.06}>
                <SpotlightCard className="p-6 md:p-8">
                  <h2 className="mb-5 font-display text-2xl font-semibold">
                    <span className="text-gradient">Features</span>
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-3 leading-relaxed text-stone-300">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#cba982]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
              )}

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
              {techStack.length > 0 && (
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
              )}

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
                  <p className="mb-4 text-sm leading-relaxed text-stone-300">Building something similar?</p>
                  <Link href="/#contact" className="btn-primary px-5 py-2.5 text-sm">
                    Let&apos;s Discuss Your Project
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
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
      </main>
    </div>
  )
}

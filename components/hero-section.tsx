"use client"

import { useEffect, useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import HeroBackground from "@/components/hero-background"
import HeroVisual from "@/components/hero-visual"
import { onIntroDone } from "@/components/intro-screen"
import { useParallax } from "@/hooks/use-parallax"
import { DURATION, EASE, STAGGER, gsap, prefersReducedMotion, registerGsap } from "@/lib/motion"
import { SITE } from "@/lib/site"

const CREDIBILITY = ["Python", "FastAPI", "AI/ML", "LLMs", "SaaS", "API Integrations"]

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Staggered entrance once the intro overlay has cleared.
  useEffect(() => {
    registerGsap()
    const root = heroRef.current
    if (!root) return
    const items = root.querySelectorAll("[data-hero-item]")

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    let ctx: gsap.Context | undefined
    const cancel = onIntroDone(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: DURATION, ease: EASE, stagger: STAGGER * 1.2 },
        )
      }, root)
    })

    return () => {
      cancel()
      ctx?.revert()
    }
  }, [])

  // Subtle pointer/gyro parallax on the copy.
  const { x: pointerX, y: pointerY } = useParallax()
  const heroX = useTransform(pointerX, (v) => v * 10)
  const heroY = useTransform(pointerY, (v) => v * 10)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <HeroBackground />

      <div ref={heroRef} className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <motion.div style={{ x: heroX, y: heroY }} className="min-w-0 text-center lg:text-left">
            <p data-hero-item className="mb-4 font-display text-lg text-stone-200 md:text-xl">
              <span className="text-gradient font-semibold">{SITE.name}</span>
              <span className="mx-2 text-stone-500" aria-hidden="true">
                ·
              </span>
              {SITE.role}
            </p>

            <h1
              id="hero-title"
              data-hero-item
              className="mx-auto max-w-3xl font-display text-[2.15rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:mx-0 lg:text-[3.4rem] xl:text-6xl"
            >
              I Build <span className="text-gradient">AI-Powered Products</span>, Scalable Backends &amp; Intelligent
              Automation.
            </h1>

            <p
              data-hero-item
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg lg:mx-0"
            >
              I&apos;m an AI &amp; Backend Engineer who turns complex ideas into reliable, production-ready software
              for startups and businesses.
            </p>

            <p
              data-hero-item
              className="mt-5 flex flex-wrap justify-center gap-y-1 text-sm font-medium tracking-wide text-[#cba982] lg:justify-start"
            >
              <span className="sr-only">Core stack: </span>
              {CREDIBILITY.map((item, i) => (
                <span key={item} className="whitespace-nowrap">
                  {i > 0 && (
                    <span className="mx-2 text-stone-500" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </p>

            <div data-hero-item className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href="#contact" className="btn-primary group w-full px-7 py-3.5 sm:w-auto">
                Let&apos;s Discuss Your Project
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a href="#work" className="btn-secondary group w-full px-7 py-3.5 sm:w-auto">
                Explore My Work
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          <div data-hero-item className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-stone-400 transition-colors hover:text-white md:flex"
      >
        <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-stone-600 p-1">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-gradient-to-b from-[#cba982] to-[#c09468]" />
        </span>
      </a>
    </section>
  )
}

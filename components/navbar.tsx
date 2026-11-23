"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Menu, X, Github, Linkedin, ArrowUpRight } from "lucide-react"
import { LINKS, NAV_LINKS } from "@/lib/site"

/**
 * Sticky home-page navigation.
 *
 * Every item is a plain in-page anchor (`#about`, `#work`, …); the smooth
 * scroll itself is handled once, globally, in components/smooth-scroll.tsx.
 * The mobile menu closes on link click, on Escape, and when the viewport
 * grows past the mobile breakpoint.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const toggleRef = useRef<HTMLButtonElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Highlight the link for the section currently in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Mobile menu: lock page scroll, close on Escape, close if resized to desktop.
  useEffect(() => {
    if (!isOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    const mq = window.matchMedia("(min-width: 1024px)")
    const onMq = () => mq.matches && setIsOpen(false)

    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onMq)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onMq)
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "glass-strong py-3 shadow-lg shadow-black/30" : "bg-transparent py-5"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-[#b98a5e] via-[#a9764c] to-[#8a5a34]"
      />

      <nav aria-label="Main" className="container mx-auto flex items-center justify-between gap-4 px-4 md:px-8">
        <a href="#home" onClick={close} className="relative z-50 font-display text-2xl font-bold text-white">
          Kirtika<span className="text-[#b98a5e]">.</span>
          <span className="sr-only"> — back to top</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                      isActive ? "text-white" : "text-stone-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/10"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-1.5 text-stone-300 transition-colors duration-300 hover:text-white"
              aria-label="GitHub (opens in a new tab)"
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-1.5 text-stone-300 transition-colors duration-300 hover:text-white"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <LetsTalk />
          </div>
        </div>

        {/* Mobile: Let's Talk stays visible, plus the menu toggle */}
        <div className="relative z-50 flex items-center gap-3 lg:hidden">
          <LetsTalk onClick={close} compact />
          <button
            ref={toggleRef}
            type="button"
            className="rounded-full p-2 text-white"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col items-center justify-center bg-[#070503]/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col items-center gap-5">
              {NAV_LINKS.map((link, index) => {
                const isActive = active === link.id
                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.12 + index * 0.05 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={close}
                      aria-current={isActive ? "location" : undefined}
                      className={`font-display text-3xl font-semibold transition-colors ${
                        isActive ? "text-gradient-static" : "text-stone-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center gap-6"
            >
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                className="text-stone-300 hover:text-white"
              >
                <Github size={26} aria-hidden="true" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                className="text-stone-300 hover:text-white"
              >
                <Linkedin size={26} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function LetsTalk({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  return (
    <a
      href="#contact"
      onClick={onClick}
      className={`btn-primary group text-sm ${compact ? "px-4 py-2" : "px-5 py-2"}`}
    >
      Let&apos;s Talk
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}

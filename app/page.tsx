"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { Github, Linkedin, ArrowUpRight, Sparkles } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import SocialIcon from "@/components/social-icon"
import AboutMe from "@/components/about-me"
import Loading from "@/components/loading"
import InteractiveShapes from "@/components/InteractiveShapes"
import HeroBackground from "@/components/hero-background"
import RoleRotator from "@/components/role-rotator"
import MagneticButton from "@/components/magnetic-button"
import CertificateCard from "@/components/certificate-card"
import PublicationCard from "@/components/publication-card"
import ServicesSection from "@/components/services-section"
import BackToTop from "@/components/back-to-top"
import ContactSection from "@/components/contact-section"
import ContactEmail from "@/components/contact-email"
import ProjectCard from "@/components/project-card"
import { projects } from "@/lib/projectsData"
import { useParallax } from "@/hooks/use-parallax"
import { DURATION, EASE, STAGGER, ScrollTrigger, gsap, prefersReducedMotion, registerGsap } from "@/lib/motion"

const sectionTitle = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    // The branded intro plays once per browser session. Coming back from a
    // project page should feel like returning, not like loading the site again.
    if (sessionStorage.getItem("intro-played")) {
      setLoading(false)
      return
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("intro-played", "1")
      setLoading(false)
    }, 1500) // Branded intro duration

    return () => clearTimeout(timer)
  }, [])

  // Land on the section named in the URL hash — e.g. "Back to Projects" sends
  // the visitor to /#work, which should drop them back where they left off.
  useEffect(() => {
    if (loading) return
    const hash = window.location.hash
    if (hash.length < 2) return

    const target = document.querySelector(hash)
    if (!target) return

    // One frame for layout to settle, then jump (not smooth-scroll — the
    // visitor is returning to a place they already were).
    requestAnimationFrame(() => {
      target.scrollIntoView()
      ScrollTrigger.refresh()
    })
  }, [loading])

  // Gentle staggered hero entrance once the intro screen clears.
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading || !heroRef.current) return
    registerGsap()

    const items = heroRef.current.querySelectorAll("[data-hero-item]")
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
    }, heroRef)

    return () => ctx.revert()
  }, [loading])

  // Subtle pointer/gyro parallax for the hero content.
  const { x: pointerX, y: pointerY } = useParallax()
  const heroX = useTransform(pointerX, (v) => v * 14)
  const heroY = useTransform(pointerY, (v) => v * 14)

  if (!mounted) return null
  if (loading) return <Loading />

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <CustomCursor />
      <Navbar />
      <InteractiveShapes />
      <BackToTop />

      {/* Hero Section */}
      <section id="home" className="relative flex h-screen items-center justify-center overflow-hidden">
        <HeroBackground />
        <motion.div style={{ x: heroX, y: heroY }} className="container relative z-10 mx-auto px-4">
          <div ref={heroRef} className="relative text-center">
            {/* Soft accent glow behind the name */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[46rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,138,94,0.16),rgba(138,90,52,0.08)_45%,transparent_70%)] blur-2xl"
            />

            {/* Availability pill */}
            <div
              data-hero-item
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-stone-300 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for work
            </div>

            <h1 data-hero-item className="mb-4 font-display text-4xl font-bold md:text-6xl lg:text-7xl">
              Hey! It's <span className="text-gradient">G. Kirtika</span>
            </h1>

            <h2 data-hero-item className="mb-8 flex flex-wrap items-center justify-center gap-x-2 text-xl text-stone-300 md:text-2xl">
              <span aria-hidden="true">🚀</span>
              <RoleRotator roles={["Senior Backend Developer", "AI Engineer", "Building Intelligent Agents", "Tech Explorer"]} />
            </h2>

            <div data-hero-item className="flex flex-wrap justify-center gap-4">
              <ScrollLink to="work" smooth={true} duration={500}>
                <MagneticButton
                  shimmer
                  className="rounded-full bg-gradient-to-r from-[#b98a5e] to-[#8a5a34] px-7 py-3 font-medium text-white shadow-lg shadow-[#b98a5e]/25"
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <MagneticButton className="rounded-full border border-[#b98a5e]/60 bg-white/5 px-7 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#cba982] hover:bg-[#b98a5e]/10">
                  Contact Me
                </MagneticButton>
              </ScrollLink>
            </div>
          </div>
        </motion.div>

        {/* Scroll-down indicator */}
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-stone-500 transition-colors hover:text-white md:flex"
        >
          <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-stone-600 p-1">
            <span className="h-2 w-1 animate-scroll-dot rounded-full bg-gradient-to-b from-[#cba982] to-[#c09468]" />
          </span>
        </ScrollLink>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-b from-black to-stone-900 py-20">
        <div className="container mx-auto px-4">
          <AboutMe />
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Work Section */}
      <section id="work" className="bg-gradient-to-b from-stone-900 to-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={sectionTitle.hidden}
            whileInView={sectionTitle.visible}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="What I've Built" emoji="🏗️" />
            <p className="mx-auto mb-12 -mt-6 max-w-2xl text-center leading-relaxed text-stone-400">
              From a production marketplace serving web and mobile to research-grade models. Tap any
              project to read the full story.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} delay={i * 0.06} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements/Certificates Section */}
      <section id="achievements" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={sectionTitle.hidden}
            whileInView={sectionTitle.visible}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Achievements & Certifications" emoji="🏆" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CertificateCard title="Google Jams" issuer="Google Cloud" date="2023" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="IEEE WIE ILS, Raipur" issuer="IEEE" date="2023" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="Database Management Systems (DBMS)" issuer="NPTEL" date="2024" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="Management Information System (MIS)" issuer="NPTEL" date="2024" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="Algorithmic Game Theory (AGT)" issuer="NPTEL" date="2024" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="IEEE ICECCT" issuer="IEEE" date="2024" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="GECR Avesh '23 HACKATHON-4 Winner" issuer="GECR" date="2023" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="Winner, Technorollix Hackathon" issuer="Technorollix" date="2024" image="/placeholder.svg?height=64&width=64" />
              <CertificateCard title="Winner, Inter-Zone Chess Tournament" issuer="Inter-Zone Chess" date="2024" image="/placeholder.svg?height=64&width=64" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Publications Section */}
      <section id="publications" className="bg-gradient-to-b from-black to-stone-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={sectionTitle.hidden}
            whileInView={sectionTitle.visible}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Research Publications" emoji="📚" />
            <div className="mx-auto max-w-4xl space-y-8">
              <PublicationCard
                title="Deep Learning and Natural Language Processing Integrated Gold Price Forecasting"
                authors="G Kirtika, Rahul Pandya, Sridher Iyer"
                journal="IATMSI IEEE IIIT Gwalior 3rd International Conference 2025"
                date="2025"
                abstract="Predicted gold prices using advanced deep learning and natural language processing techniques."
                link="https://ieeexplore.ieee.org/document/10985530"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-t from-stone-900 to-black py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 w-[40rem] max-w-full -translate-y-1/2 rounded-full bg-[#9a6c44]/10 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#cba982]">
            <Sparkles className="h-4 w-4" /> Let's connect
          </p>
          <h3 className="mx-auto mb-8 max-w-2xl font-display text-3xl font-bold md:text-4xl">
            Let's <span className="text-gradient">build something</span> intelligent together
          </h3>

          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <SocialIcon icon={<Github />} href="https://github.com/kirtika01" label="GitHub" />
            <SocialIcon icon={<Linkedin />} href="https://www.linkedin.com/in/g-kirtika-426687254/" label="LinkedIn" />
          </div>

          <div className="text-sm text-stone-500">
            <p>© {new Date().getFullYear()} G. Kirtika. All rights reserved.</p>
            <ContactEmail />
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({ title, emoji }: { title: string; emoji: string }) {
  return (
    <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">
      <span className="text-gradient">{title}</span>
      <span className="ml-2">{emoji}</span>
    </h2>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, useTransform } from "framer-motion"
import { Github, Linkedin, Download, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import SocialIcon from "@/components/social-icon"
import AboutMe from "@/components/about-me"
import Loading from "@/components/loading"
import InteractiveShapes from "@/components/InteractiveShapes"
import HeroBackground from "@/components/hero-background"
import RoleRotator from "@/components/role-rotator"
import SpotlightCard from "@/components/spotlight-card"
import MagneticButton from "@/components/magnetic-button"
import Reveal from "@/components/reveal"
import CertificateCard from "@/components/certificate-card"
import PublicationCard from "@/components/publication-card"
import ServicesSection from "@/components/services-section"
import BackToTop from "@/components/back-to-top"
import { useParallax } from "@/hooks/use-parallax"

const sectionTitle = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // Branded intro duration

    return () => clearTimeout(timer)
  }, [])

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for work
            </motion.div>

            <h1 className="mb-4 font-display text-4xl font-bold md:text-6xl lg:text-7xl">
              Hey! It's <span className="text-gradient">G. Kirtika</span>
            </h1>

            <h2 className="mb-8 flex flex-wrap items-center justify-center gap-x-2 text-xl text-gray-300 md:text-2xl">
              <span aria-hidden="true">🚀</span>
              <RoleRotator roles={["Senior Backend Developer", "AI Engineer", "Building Intelligent Agents", "Tech Explorer"]} />
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <ScrollLink to="work" smooth={true} duration={500}>
                <MagneticButton
                  shimmer
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3 font-medium text-white shadow-lg shadow-purple-500/25"
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <MagneticButton className="rounded-full border border-purple-500/60 bg-white/5 px-7 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-purple-400 hover:bg-purple-500/10">
                  Contact Me
                </MagneticButton>
              </ScrollLink>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll-down indicator */}
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-gray-500 transition-colors hover:text-white md:flex"
        >
          <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-600 p-1">
            <span className="h-2 w-1 animate-scroll-dot rounded-full bg-gradient-to-b from-purple-400 to-pink-400" />
          </span>
        </ScrollLink>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <AboutMe />
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Work Section */}
      <section id="work" className="bg-gradient-to-b from-gray-900 to-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={sectionTitle.hidden}
            whileInView={sectionTitle.visible}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="What I've Built" emoji="🏗️" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              <ProjectCard
                featured
                className="md:col-span-4"
                title="YouTube Video Analyzer | AI Agent"
                description="A powerful tool designed to help educators, content creators, and learners analyze and compare educational videos on YouTube. It provides in-depth insights into video performance, content quality, and audience engagement through various metrics and AI-powered analysis."
                tags={["AI", "Python", "NLP", "Data Analysis"]}
                link="https://github.com/kirtika01/multiple"
                period="January 2025 – February 2025"
              />
              <ProjectCard
                className="md:col-span-2"
                title="Video Mirror Detection Using Motion Cues"
                description="Implemented mirror detection using advanced deep learning models, YOLO v8 and v11, to accurately identify and segment reflective surfaces in videos."
                tags={["Computer Vision", "Deep Learning", "YOLO", "Object Detection"]}
                period="Present"
              />
              <ProjectCard
                className="md:col-span-2"
                title="Road Connectivity Analysis in Rural Hilly Terrains"
                description="Analyzed 433 slopes in Durg, Chhattisgarh, using DEM data and implemented machine learning models to identify priority areas for road development and upgrades."
                tags={["Machine Learning", "Geospatial Analysis", "Data Science"]}
                link="https://github.com/kirtika01/Hack_a_sol_"
                period="August 2024 – September 2024"
              />
              <ProjectCard
                className="md:col-span-2"
                title="Deep Learning and NLP Integrated Gold Price Forecasting"
                description="Achieved 97.12% accuracy in predicting gold prices using NLP models combined with deep learning frameworks, facilitating investment strategy optimization based on financial dataset analysis. Leveraged time series forecasting techniques (LSTM, GRU) and feature engineering to analyze financial datasets from over 200 articles."
                tags={["Deep Learning", "NLP", "Time Series", "LSTM", "GRU"]}
                link="https://github.com/kirtika01/Gold_price"
                period="April 2024 – June 2024"
              />
              <ProjectCard
                className="md:col-span-2"
                title="Rice Diseases Identification & Classification"
                description="Implemented CNN algorithms to classify rice diseases with 98% accuracy, contributing to a 20% productivity improvement for local farmers by advancing crop health monitoring techniques. Elevated crop health monitoring, driving a 20% productivity increase for farmers."
                tags={["CNN", "Image Classification", "Agriculture Tech", "Deep Learning"]}
                link="https://github.com/kirtika01/rice-disease-identification"
                period="June 2023 – October 2023"
              />
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
      <section id="publications" className="bg-gradient-to-b from-black to-gray-900 py-20">
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
      <section id="contact" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={sectionTitle.hidden}
            whileInView={sectionTitle.visible}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Ping Me" emoji="🚀" />
            <div className="mx-auto max-w-3xl">
              <SpotlightCard className="p-6 md:p-8">
                <form action="https://formsubmit.co/gkirtika01@gmail.com" method="POST" className="space-y-5">
                  <FloatingField id="name" name="name" label="Your Name" type="text" />
                  <FloatingField id="email" name="email" label="Your Email" type="email" />
                  <FloatingField id="message" name="message" label="Your Message" textarea />

                  {/* Hidden fields for FormSubmit configuration */}
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_next" value="http://localhost:3000/thankyou" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_autoresponse" value="Thank you for your message! I'll get back to you soon." />
                  <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />

                  <MagneticButton
                    type="submit"
                    shimmer
                    strength={0.12}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3.5 font-medium text-white shadow-lg shadow-purple-500/20"
                  >
                    Send Message
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </MagneticButton>
                </form>

                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                  <p className="mb-3 text-gray-400">Download my CV to learn more about my experience</p>
                  <div className="flex justify-center">
                    <a
                      href="https://drive.google.com/file/d/1B3Z6YGiznEulMhQaMVUdJQlE8tReYWFY/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-pink-500/50 bg-pink-500/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-pink-500/20"
                    >
                      <Download className="h-4 w-4" />
                      Download CV
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-t from-gray-900 to-black py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 w-[40rem] max-w-full -translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-purple-400">
            <Sparkles className="h-4 w-4" /> Let's connect
          </p>
          <h3 className="mx-auto mb-8 max-w-2xl font-display text-3xl font-bold md:text-4xl">
            Let's <span className="text-gradient">build something</span> intelligent together
          </h3>

          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <SocialIcon icon={<Github />} href="https://github.com/kirtika01" label="GitHub" />
            <SocialIcon icon={<Linkedin />} href="https://www.linkedin.com/in/g-kirtika-426687254/" label="LinkedIn" />
          </div>

          <div className="text-sm text-gray-500">
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

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link?: string
  period?: string
  featured?: boolean
  className?: string
}

function ProjectCard({ title, description, tags, link, period, featured, className }: ProjectCardProps) {
  return (
    <Reveal className={className}>
      <SpotlightCard tilt cursorLabel="View" className="h-full">
        <div className="flex h-full flex-col p-6">
        {period && (
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
            {period}
          </span>
        )}
        <h3 className={`mb-2 font-display font-bold text-white ${featured ? "text-2xl" : "text-xl"}`}>{title}</h3>
        <p className={`mb-4 text-gray-400 ${featured ? "text-base" : "text-sm"}`}>{description}</p>
        <div className="mt-auto">
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 px-2.5 py-1 text-xs text-purple-200 ring-1 ring-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-purple-400 transition-colors hover:text-pink-300"
            >
              <span>View Project</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

interface FloatingFieldProps {
  id: string
  name: string
  label: string
  type?: string
  textarea?: boolean
}

function FloatingField({ id, name, label, type = "text", textarea }: FloatingFieldProps) {
  const shared =
    "peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2.5 pt-6 text-white placeholder-transparent outline-none transition-colors focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
  const labelCls =
    "pointer-events-none absolute left-4 top-2 text-xs text-purple-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-300"

  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={name} rows={4} required placeholder={label} className={shared} />
      ) : (
        <input id={id} name={name} type={type} required placeholder={label} className={shared} />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
    </div>
  )
}

function ContactEmail() {
  return (
    <div className="mt-2">
      <a href="mailto:gkirtika01@gmail.com" className="text-purple-400 transition-colors hover:text-pink-300">
        gkirtika01@gmail.com
      </a>
    </div>
  )
}

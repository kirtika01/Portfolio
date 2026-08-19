"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"
import MagneticButton from "@/components/magnetic-button"
import SocialIcon from "@/components/social-icon"
import Reveal from "@/components/reveal"

const EMAIL = "gkirtika01@gmail.com"
const PHONE_DISPLAY = "+91 93401 60822"
const PHONE_INTL = "919340160822"
const WHATSAPP_MESSAGE = "Hi Kirtika! I came across your portfolio and would love to connect."
const CV_URL = "https://drive.google.com/file/d/1B3Z6YGiznEulMhQaMVUdJQlE8tReYWFY/view?usp=sharing"

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23z" />
    </svg>
  )
}

const quickContacts = [
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    note: "Message me — fastest reply",
    href: `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    icon: WhatsAppIcon,
  },
  {
    label: "Email",
    value: EMAIL,
    note: "Replies within 24 hours",
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
]

const details = [
  { icon: MapPin, label: "Location", value: "India · Remote worldwide" },
  { icon: Clock, label: "Timezone", value: "IST · GMT+5:30" },
  { icon: Mail, label: "Response time", value: "Usually within a day" },
]

export default function ContactSection() {
  // FormSubmit needs an absolute redirect URL — build it from the live origin
  // so submissions don't bounce to localhost in production.
  const [redirect, setRedirect] = useState("")

  useEffect(() => {
    setRedirect(`${window.location.origin}/thankyou`)
  }, [])

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-20">
      <div className="pointer-events-none absolute inset-0 select-none opacity-30 [background:radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.12),transparent_60%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={fadeIn.hidden}
          whileInView={fadeIn.visible}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 text-center font-display text-3xl font-bold md:text-4xl">
            <span className="text-gradient">Ping Me</span>
            <span className="ml-2">🚀</span>
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-gray-300">
            Have a project, a role, or an idea you want to build? Pick whichever way is easiest for
            you — I read every message.
          </p>

          {/* Quick ways to reach me */}
          <div className="mb-10 grid gap-6 md:grid-cols-2">
            {quickContacts.map(({ label, value, note, href, icon: Icon }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor="Open"
                  className="block h-full"
                >
                  <SpotlightCard className="group h-full p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 ring-1 ring-white/10 transition-all duration-300 group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                        <Icon className="h-5 w-5 text-purple-300" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-400">{label}</p>
                        <p className="truncate font-medium text-white">{value}</p>
                        <p className="mt-1 text-xs text-gray-500">{note}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-300" />
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            {/* Availability & socials */}
            <Reveal>
              <SpotlightCard className="h-full p-6 md:p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Available for work
                </div>

                <h3 className="mb-3 font-display text-2xl font-semibold">
                  <span className="text-gradient">Let's work together</span>
                </h3>
                <p className="mb-8 leading-relaxed text-gray-400">
                  Open to full-time roles, freelance builds, and AI training sessions — anywhere in
                  the world.
                </p>

                <ul className="mb-8 space-y-4">
                  {details.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 ring-1 ring-white/10">
                        <Icon className="h-4 w-4 text-purple-300" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-wider text-gray-500">
                          {label}
                        </span>
                        <span className="block text-sm text-gray-200">{value}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-6">
                  <p className="mb-4 text-sm text-gray-400">Find me online</p>
                  <div className="mb-6 flex gap-3">
                    <SocialIcon icon={<Github className="h-5 w-5" />} href="https://github.com/kirtika01" label="GitHub" />
                    <SocialIcon
                      icon={<Linkedin className="h-5 w-5" />}
                      href="https://www.linkedin.com/in/g-kirtika-426687254/"
                      label="LinkedIn"
                    />
                    <SocialIcon
                      icon={<WhatsAppIcon className="h-5 w-5" />}
                      href={`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                      label="WhatsApp"
                    />
                  </div>
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-pink-500/50 bg-pink-500/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-pink-500/20"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Message form */}
            <Reveal delay={0.1}>
              <SpotlightCard className="h-full p-6 md:p-8">
                <h3 className="mb-2 font-display text-2xl font-semibold">
                  <span className="text-gradient">Send a message</span>
                </h3>
                <p className="mb-6 text-sm text-gray-400">
                  Tell me a little about what you're building.
                </p>

                <form action={`https://formsubmit.co/${EMAIL}`} method="POST" className="space-y-5">
                  <FloatingField id="name" name="name" label="Your Name" type="text" />
                  <FloatingField id="email" name="email" label="Your Email" type="email" />
                  <FloatingField id="message" name="message" label="Your Message" textarea />

                  {/* Hidden fields for FormSubmit configuration */}
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_next" value={redirect} />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="hidden"
                    name="_autoresponse"
                    value="Thank you for your message! I'll get back to you soon."
                  />
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

                  <p className="text-center text-xs text-gray-500">
                    Your message comes straight to my inbox — never shared.
                  </p>
                </form>
              </SpotlightCard>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
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
        <textarea id={id} name={name} rows={5} required placeholder={label} className={shared} />
      ) : (
        <input id={id} name={name} type={type} required placeholder={label} className={shared} />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
    </div>
  )
}

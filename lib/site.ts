/**
 * ============================================================================
 *  SITE CONFIG — names, links and switches used across the whole site.
 * ============================================================================
 *  Change a link here and every button, the footer, the JSON-LD and the
 *  social previews pick it up.
 * ============================================================================
 */

export const SITE_URL = "https://kirtikadev.in"

export const SITE = {
  name: "G. Kirtika",
  role: "AI & Backend Engineer",
  tagline: "Building intelligent products and reliable software systems.",
  title: "G. Kirtika | AI & Backend Engineer | SaaS, Python & AI Automation",
  description:
    "G. Kirtika is an AI and Backend Engineer building AI-powered applications, scalable backend systems, SaaS products, and intelligent workflow automation.",
  location: "India · Remote worldwide",
  timezone: "IST · GMT+5:30",
  responseTime: "Usually within one business day",
}

export const LINKS = {
  email: "gkirtika01@gmail.com",
  linkedin: "https://www.linkedin.com/in/g-kirtika-426687254/",
  github: "https://github.com/kirtika01",
  /** Opens the résumé in Google Drive's viewer. */
  resumeView: "https://drive.google.com/file/d/1B3Z6YGiznEulMhQaMVUdJQlE8tReYWFY/view?usp=sharing",
  /** Same file, served as a direct download. */
  resumeDownload: "https://drive.google.com/uc?export=download&id=1B3Z6YGiznEulMhQaMVUdJQlE8tReYWFY",
  phoneDisplay: "+91 93401 60822",
  phoneIntl: "919340160822",
  whatsappMessage: "Hi Kirtika, I came across your portfolio and would like to discuss a project.",
}

/**
 * Shows the "Available for Select International Projects" pill on the
 * "Prefer a Quick Conversation?" card in the contact section.
 * Set to false when you are fully booked; the pill simply disappears.
 */
export const AVAILABLE_FOR_PROJECTS = true

/**
 * ---------------------------------------------------------------------------
 *  SCHEDULING LINK — paste your Calendly / Cal.com / Google booking URL here.
 * ---------------------------------------------------------------------------
 *  Empty string = the "Book a call" button is hidden and the quick-conversation
 *  card offers email and LinkedIn instead. Nothing else needs changing.
 */
export const SCHEDULING_URL = ""

/** Contact-form endpoint: our own route, which emails via Resend. See .ai-brain/DEPLOYMENT.md. */
export const CONTACT_ENDPOINT = "/api/contact"

/** Options for "What do you need help with?" — the services CTAs preselect these. */
export const SERVICE_OPTIONS = [
  "AI Product Development",
  "Backend & API Development",
  "AI Agents & Automation",
  "SaaS / Full-Stack Development",
  "Other",
] as const

export type ServiceOption = (typeof SERVICE_OPTIONS)[number]

/** Options for "Project budget". Edit freely; the field is optional. */
export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
]

/** Main navigation. Hrefs are in-page anchors on the home page. */
export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
]

/**
 * Contact-form rules shared by the form (components/contact-section.tsx) and the
 * API route that emails the enquiry (app/api/contact/route.ts). Keep them in one
 * place so the browser and the server can never disagree about what is valid.
 */
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/site"

export type ContactFields = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  details: string
}
export type ContactErrors = Partial<Record<keyof ContactFields, string>>

export const CONTACT_FIELDS: (keyof ContactFields)[] = ["name", "email", "company", "service", "budget", "details"]
export const EMPTY_CONTACT: ContactFields = { name: "", email: "", company: "", service: "", budget: "", details: "" }

export const MIN_DETAILS = 20
/** Submissions faster than this after the form appeared are treated as bots. */
export const MIN_FILL_MS = 2500
/** Upper bounds, enforced on the server so nobody can mail a novel. */
export const MAX_LENGTH: Record<keyof ContactFields, number> = {
  name: 100,
  email: 254,
  company: 200,
  service: 100,
  budget: 100,
  details: 5000,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {}
  if (f.name.trim().length < 2) e.name = "Please enter your full name."
  if (!f.email.trim()) e.email = "Please enter your work email."
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "That email address doesn't look right."
  if (!f.service) e.service = "Please choose what you need help with."
  else if (!(SERVICE_OPTIONS as readonly string[]).includes(f.service)) e.service = "Please choose one of the listed services."
  if (f.budget && !BUDGET_OPTIONS.includes(f.budget)) e.budget = "Please choose one of the listed budgets."
  if (f.details.trim().length < MIN_DETAILS)
    e.details = `A few more details, please (at least ${MIN_DETAILS} characters).`

  for (const k of CONTACT_FIELDS) {
    if (!e[k] && f[k].length > MAX_LENGTH[k]) e[k] = `Please keep this under ${MAX_LENGTH[k]} characters.`
  }
  return e
}

/** What POST /api/contact answers with. */
export type ContactResponse = { ok: true } | { ok: false; error: string; fieldErrors?: ContactErrors }

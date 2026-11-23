"use client"

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import {
  ArrowUpRight,
  CalendarClock,
  CircleAlert,
  CircleCheck,
  ChevronDown,
  Clock,
  Download,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { PREFILL_SERVICE_EVENT } from "@/components/service-cta"
import {
  AVAILABLE_FOR_PROJECTS,
  BUDGET_OPTIONS,
  CONTACT_ENDPOINT,
  LINKS,
  SCHEDULING_URL,
  SERVICE_OPTIONS,
  SITE,
} from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  CONTACT_FIELDS as ORDER,
  EMPTY_CONTACT as EMPTY,
  MIN_FILL_MS,
  validateContact as validate,
  type ContactErrors as FieldErrors,
  type ContactFields as Fields,
  type ContactResponse,
} from "@/lib/contact"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23z" />
    </svg>
  )
}

const WHATSAPP_URL = `https://wa.me/${LINKS.phoneIntl}?text=${encodeURIComponent(LINKS.whatsappMessage)}`

const OPTIONS = [
  { label: "Email Me", value: LINKS.email, href: `mailto:${LINKS.email}`, icon: Mail, external: false },
  { label: "Connect on LinkedIn", value: "linkedin.com/in/g-kirtika", href: LINKS.linkedin, icon: Linkedin, external: true },
  { label: "View GitHub", value: "github.com/kirtika01", href: LINKS.github, icon: Github, external: true },
  { label: "Download Resume", value: "PDF · Google Drive", href: LINKS.resumeDownload, icon: Download, external: true },
]

const DETAILS = [
  { icon: MapPin, label: "Location", value: SITE.location },
  { icon: Clock, label: "Timezone", value: SITE.timezone },
  { icon: Mail, label: "Response time", value: SITE.responseTime },
]

/* --------------------------------- form --------------------------------- */

type Status = "idle" | "submitting" | "success" | "error"

function ProjectEnquiryForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [serverMessage, setServerMessage] = useState("")
  const honeypot = useRef<HTMLInputElement>(null)
  const shownAt = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    shownAt.current = Date.now()

    // "Discuss This Service" buttons preselect the service.
    const onPrefill = (e: Event) => {
      const service = (e as CustomEvent<string>).detail
      if (!(SERVICE_OPTIONS as readonly string[]).includes(service)) return
      setFields((f) => ({ ...f, service }))
      setErrors((err) => ({ ...err, service: undefined }))
      setStatus((s) => (s === "success" ? "idle" : s))
    }
    window.addEventListener(PREFILL_SERVICE_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_SERVICE_EVENT, onPrefill)
  }, [])

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus()
  }, [status])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Fields
    setFields((f) => ({ ...f, [name]: e.target.value }))
    // Clear a field's error as soon as it's fixed.
    if (errors[name]) setErrors((err) => ({ ...err, [name]: validate({ ...fields, [name]: e.target.value })[name] }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return

    const found = validate(fields)
    setErrors(found)
    const firstBad = ORDER.find((k) => found[k])
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }

    // Spam traps: a filled honeypot or an instant submit. Nothing is sent.
    if (honeypot.current?.value || Date.now() - shownAt.current < MIN_FILL_MS) {
      setStatus("error")
      setServerMessage("Something went wrong. Please wait a moment and try again.")
      return
    }

    setStatus("submitting")
    setServerMessage("")
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          _honey: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - shownAt.current,
        }),
      })
      const data = (await res.json().catch(() => null)) as ContactResponse | null
      if (!data?.ok) {
        // The server re-validates; show its field errors where they belong.
        if (data?.fieldErrors && Object.keys(data.fieldErrors).length) {
          setErrors(data.fieldErrors)
          setStatus("idle")
          const bad = ORDER.find((k) => data.fieldErrors?.[k])
          if (bad) formRef.current?.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus()
          return
        }
        throw new Error(data?.error || `Request failed (${res.status})`)
      }

      setStatus("success")
      setFields(EMPTY)
      setErrors({})
    } catch (err) {
      setStatus("error")
      setServerMessage(err instanceof TypeError ? "The network request failed. Check your connection." : err instanceof Error ? err.message : "")
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex h-full flex-col items-center justify-center py-10 text-center outline-none"
      >
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30">
          <CircleCheck aria-hidden="true" className="h-7 w-7" />
        </span>
        <h3 className="mb-2 font-display text-2xl font-semibold text-white">Enquiry sent. Thank you!</h3>
        <p className="mb-6 max-w-sm text-stone-300">
          I&apos;ve received your message and will get back to you {SITE.responseTime.toLowerCase()}, replying to
          the email address you gave.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary px-5 py-2.5 text-sm">
          Send another enquiry
        </button>
      </div>
    )
  }

  const submitting = status === "submitting"

  return (
    <form
      ref={formRef}
      action={CONTACT_ENDPOINT}
      method="POST"
      noValidate
      onSubmit={onSubmit}
      aria-describedby="form-note"
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" name="name" label="Full Name" required error={errors.name}>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={onChange}
            {...fieldA11y("cf-name", errors.name)}
            className={inputCls(errors.name)}
          />
        </Field>
        <Field id="cf-email" name="email" label="Work Email" required error={errors.email}>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={fields.email}
            onChange={onChange}
            {...fieldA11y("cf-email", errors.email)}
            className={inputCls(errors.email)}
          />
        </Field>
      </div>

      <Field id="cf-company" name="company" label="Company / Website" optional error={errors.company}>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={fields.company}
          onChange={onChange}
          {...fieldA11y("cf-company", errors.company)}
          className={inputCls(errors.company)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-service" name="service" label="What do you need help with?" required error={errors.service}>
          <div className="relative">
            <select
              id="cf-service"
              name="service"
              required
              value={fields.service}
              onChange={onChange}
              {...fieldA11y("cf-service", errors.service)}
              className={cn(inputCls(errors.service), "appearance-none pr-10", !fields.service && "text-stone-400")}
            >
              <option value="" disabled className="bg-[#0b0806] text-stone-400">
                Select a service
              </option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-[#0b0806] text-white">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#cba982]" />
          </div>
        </Field>
        <Field id="cf-budget" name="budget" label="Project Budget" optional error={errors.budget}>
          <div className="relative">
            <select
              id="cf-budget"
              name="budget"
              value={fields.budget}
              onChange={onChange}
              {...fieldA11y("cf-budget", errors.budget)}
              className={cn(inputCls(errors.budget), "appearance-none pr-10", !fields.budget && "text-stone-400")}
            >
              <option value="" className="bg-[#0b0806] text-stone-400">
                Prefer not to say
              </option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b} className="bg-[#0b0806] text-white">
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#cba982]" />
          </div>
        </Field>
      </div>

      <Field id="cf-details" name="details" label="Project Details" required error={errors.details}>
        <textarea
          id="cf-details"
          name="details"
          rows={5}
          required
          value={fields.details}
          onChange={onChange}
          placeholder="What are you building, where are you now, and what does success look like?"
          {...fieldA11y("cf-details", errors.details)}
          className={cn(inputCls(errors.details), "resize-y placeholder:text-stone-500")}
        />
      </Field>

      {/* Spam honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-honey">Leave this field empty</label>
        <input ref={honeypot} id="cf-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100 outline-none"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-300" />
          <div>
            <p className="font-medium">Your enquiry couldn&apos;t be sent.</p>
            <p className="mt-1 text-red-100/90">
              {serverMessage && <span className="block">{serverMessage}</span>}
              Please try again, or email me directly at{" "}
              <a href={`mailto:${LINKS.email}`} className="font-medium text-white underline underline-offset-2">
                {LINKS.email}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 disabled:cursor-wait disabled:opacity-75">
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Project Enquiry
            <Send aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </button>
      <p id="form-note" className="text-center text-xs text-stone-400">
        Fields marked * are required. Your details go straight to my inbox and are never shared.
      </p>
      <span className="sr-only" aria-live="polite">
        {submitting ? "Sending your enquiry" : ""}
      </span>
    </form>
  )
}

function fieldA11y(id: string, error?: string) {
  return { "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined }
}

function inputCls(error?: string) {
  return cn(
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors",
    "focus:border-[#cba982] focus:ring-2 focus:ring-[#b98a5e]/25",
    error ? "border-red-400/60" : "border-white/10 hover:border-white/20",
  )
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string
  name: string
  label: string
  required?: boolean
  optional?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-stone-200">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-[#cba982]">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-stone-400">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-300">
          <CircleAlert aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* -------------------------------- section -------------------------------- */

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-black py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 select-none opacity-30 [background:radial-gradient(circle_at_30%_20%,rgba(185,138,94,0.15),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(138,90,52,0.12),transparent_60%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title={
            <>
              Have a Project in Mind? <span className="text-gradient">Let&apos;s Build Something Great.</span>
            </>
          }
          description="Whether you're a startup founder, business owner, or agency looking for an engineering partner, I'd love to hear what you're building."
        />

        <ul className="mx-auto mb-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map(({ label, value, href, icon: Icon, external }, i) => (
            <li key={label}>
              <Reveal delay={i * 0.06} className="h-full">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="surface group flex h-full items-center gap-4 p-5 transition-colors duration-300 hover:border-[#b98a5e]/40"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#b98a5e]/10 text-[#e0c9ad] ring-1 ring-[#b98a5e]/25 transition-colors group-hover:bg-[#b98a5e]/20">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-white">{label}</span>
                    <span className="block truncate text-sm text-stone-400">{value}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 flex-shrink-0 text-stone-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e0c9ad]"
                  />
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="surface relative h-full p-6 md:p-8">
              <h3 className="mb-1 font-display text-2xl font-semibold text-white">Tell me about your project</h3>
              <p className="mb-6 text-sm text-stone-300">A few details now means a more useful first reply.</p>
              <ProjectEnquiryForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface flex flex-col p-6 md:p-8 lg:sticky lg:top-28">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b98a5e]/25 to-[#6b4527]/20 text-[#e0c9ad] ring-1 ring-[#b98a5e]/30">
                  <CalendarClock aria-hidden="true" className="h-5 w-5" />
                </span>
                {AVAILABLE_FOR_PROJECTS && (
                  <p className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-100">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Available for Select International Projects
                  </p>
                )}
              </div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-white">
                Prefer a Quick Conversation? <span className="text-gradient">Let&apos;s Connect.</span>
              </h3>
              <p className="mb-6 leading-relaxed text-stone-300">
                {SCHEDULING_URL
                  ? "Pick a time that suits you for a short call about your project."
                  : "Send a short message on WhatsApp, LinkedIn or email and we'll find a time for a call."}
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                {SCHEDULING_URL ? (
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5 text-sm">
                    Book a Call
                    <CalendarClock aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5 text-sm">
                    <WhatsAppIcon className="h-4 w-4" />
                    Message on WhatsApp
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary px-5 py-2.5 text-sm">
                  <Linkedin aria-hidden="true" className="h-4 w-4" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>

              <ul className="mt-8 space-y-4 border-t border-white/10 pt-6">
                {DETAILS.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#b98a5e]/10 ring-1 ring-[#b98a5e]/20">
                      <Icon aria-hidden="true" className="h-4 w-4 text-[#e0c9ad]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-stone-400">{label}</span>
                      <span className="block text-sm text-stone-200">{value}</span>
                    </span>
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

/**
 * POST /api/contact — emails a project enquiry to the site owner.
 *
 * Sender: Resend when RESEND_API_KEY is set; otherwise FormSubmit
 * (formsubmit.co, no key, the service the old site used). FormSubmit needs a
 * one-time "Activate Form" click in the inbox the first time it is used for an
 * address + site; until then it answers "needs Activation" and nothing is sent.
 *
 * Accepts JSON (the normal fetch from the form) or a native form post (the
 * no-JavaScript fallback, which is redirected to /thankyou on success).
 *
 * Env (set in .env.local and in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      optional (FormSubmit is used without it). Never commit it.
 *   CONTACT_FROM_EMAIL  sender on a domain verified in Resend,
 *                       e.g. "Portfolio Enquiries <enquiries@kirtikadev.in>".
 *                       Until the domain is verified, leave it unset: Resend's
 *                       onboarding@resend.dev sender then works, but only to the
 *                       email address that owns the Resend account.
 *   CONTACT_TO_EMAIL    optional, defaults to LINKS.email.
 *
 * See .ai-brain/DEPLOYMENT.md → "The contact form".
 */
import { NextResponse, type NextRequest } from "next/server"
import {
  CONTACT_FIELDS,
  MIN_FILL_MS,
  validateContact,
  type ContactFields,
  type ContactResponse,
} from "@/lib/contact"
import { LINKS, SITE_URL } from "@/lib/site"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RESEND_URL = "https://api.resend.com/emails"
const FORMSUBMIT_URL = "https://formsubmit.co/ajax"
const DEFAULT_FROM = "Portfolio Enquiries <onboarding@resend.dev>"
const SEND_TIMEOUT_MS = 8000

/* Best-effort rate limit: per server instance, so it slows a burst, not a botnet. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim()

export async function POST(req: NextRequest) {
  const isJson = (req.headers.get("content-type") ?? "").includes("application/json")

  const reply = (body: ContactResponse, status: number) => {
    if (isJson) return NextResponse.json(body, { status })
    if (body.ok) return NextResponse.redirect(new URL("/thankyou", req.url), 303)
    return new NextResponse(fallbackPage(body.error), { status, headers: { "Content-Type": "text/html; charset=utf-8" } })
  }

  let raw: Record<string, unknown>
  try {
    raw = isJson ? await req.json() : Object.fromEntries(await req.formData())
  } catch {
    return reply({ ok: false, error: "The form data couldn't be read." }, 400)
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "")
  const fields = Object.fromEntries(CONTACT_FIELDS.map((k) => [k, str(raw[k])])) as ContactFields

  // Spam traps. Answer "ok" so a bot learns nothing, and send nothing.
  const elapsed = Number(raw.elapsedMs)
  if (str(raw._honey) || (isJson && (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS))) {
    return reply({ ok: true }, 200)
  }

  const fieldErrors = validateContact(fields)
  if (Object.keys(fieldErrors).length) {
    return reply({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 400)
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown"
  if (rateLimited(ip)) {
    return reply({ ok: false, error: "Too many enquiries from this connection. Please try again later." }, 429)
  }

  const f = {
    name: oneLine(fields.name),
    email: oneLine(fields.email),
    company: oneLine(fields.company) || "—",
    service: fields.service,
    budget: fields.budget || "—",
    details: fields.details.trim(),
  }
  const rows: [string, string][] = [
    ["Name", f.name],
    ["Email", f.email],
    ["Company / website", f.company],
    ["Needs help with", f.service],
    ["Budget", f.budget],
  ]
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject details:\n${f.details}\n\n— Sent from the contact form on kirtikadev.in`
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table><p style="font:14px/1.5 sans-serif;white-space:pre-wrap">${escapeHtml(f.details)}</p><p style="font:12px sans-serif;color:#888">Sent from the contact form on kirtikadev.in. Reply to answer ${escapeHtml(f.name)} directly.</p>`

  const to = process.env.CONTACT_TO_EMAIL || LINKS.email
  const subject = `Project enquiry: ${f.service} — ${f.name}`
  const apiKey = process.env.RESEND_API_KEY

  try {
    const sent = apiKey
      ? await sendViaResend(apiKey, { to, subject, replyTo: f.email, text, html })
      : await sendViaFormSubmit({ to, subject, replyTo: f.email, rows, details: f.details })
    if (!sent) return reply({ ok: false, error: "The email service couldn't send your enquiry." }, 502)
  } catch (err) {
    console.error("[contact] Send request failed:", err)
    return reply({ ok: false, error: "The email service didn't respond in time." }, 504)
  }

  return reply({ ok: true }, 200)
}

type Mail = { to: string; subject: string; replyTo: string }

async function sendViaResend(apiKey: string, m: Mail & { text: string; html: string }) {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: [m.to],
      reply_to: m.replyTo,
      subject: m.subject,
      text: m.text,
      html: m.html,
    }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  })
  if (!res.ok) console.error(`[contact] Resend answered ${res.status}: ${await res.text().catch(() => "")}`)
  return res.ok
}

/**
 * FormSubmit's AJAX endpoint. It answers 200 even on failure, so read
 * `success`. Its activation is tied to the site, so send the live site as the
 * Referer/Origin (Node's fetch lets a server set both).
 */
async function sendViaFormSubmit(m: Mail & { rows: [string, string][]; details: string }) {
  const site = SITE_URL.replace(/\/$/, "")
  const res = await fetch(`${FORMSUBMIT_URL}/${encodeURIComponent(m.to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: site, Referer: `${site}/` },
    body: JSON.stringify({
      _subject: m.subject,
      _replyto: m.replyTo,
      _template: "table",
      _captcha: "false",
      ...Object.fromEntries(m.rows),
      "Project details": m.details,
    }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  })
  const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null
  const ok = res.ok && String(data?.success) === "true"
  if (!ok) console.error(`[contact] FormSubmit answered ${res.status}: ${data?.message ?? ""}`)
  return ok
}

/** Shown only to visitors without JavaScript whose enquiry failed. */
function fallbackPage(error: string) {
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Enquiry not sent</title>
<body style="background:#000;color:#e7e5e4;font:16px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px">
<main style="max-width:32rem"><h1 style="color:#fff">Your enquiry couldn't be sent</h1><p>${escapeHtml(error)}</p>
<p>Please go back and try again, or email <a style="color:#e0c9ad" href="mailto:${LINKS.email}">${LINKS.email}</a>.</p>
<p><a style="color:#e0c9ad" href="/#contact">← Back to the site</a></p></main></body>`
}

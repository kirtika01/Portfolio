# Decisions — why it's built this way

Newest first. Each entry records the choice, the reason, and what was rejected.

## 2026-08-20 — Coffee on black, not purple

Purple → pink is the default palette of nearly every AI/backend portfolio, so it made the
site blend in. Seven alternatives were rendered on the real pages and compared side by
side. Coffee won for being warm and distinctive while keeping the black ground and the
existing contrast relationships. See [THEME.md](THEME.md) for the full comparison.

## 2026-08-20 — Domain metadata lives in code, DNS does not

`metadataBase`, canonical, OG tags, sitemap and robots hardcode `https://kirtikadev.in`.
Deliberate: social previews and canonical URLs must be absolute and must not depend on
which host serves the build. Cost: three files to edit if the domain changes.

## 2026-08-19 — Next.js App Router, not React Router

The request was for React Router for the project detail pages. Rejected: this is a Next.js
app, and React Router would have broken static generation and given client-only routes.
Next's own router already delivers the requested shape — real pages at
`/projects/<slug>`, prerendered, each with its own `<title>` — so the requirement was met
without the library.

## 2026-08-19 — GSAP for scroll, framer-motion left in place

GSAP + ScrollTrigger + Lenis were requested. Rather than rip out the working framer-motion
animations, GSAP took over the pieces where it is genuinely better: the shared `Reveal`
(so every section and card runs on ScrollTrigger), the hero entrance, the scrubbed timeline
line (framer cannot scrub as cleanly), and the skill bars. framer-motion kept the hover,
tap and spotlight interactions it already handled well. Cost: ~50 kB of extra first-load JS
and two animation systems in one codebase.

## 2026-08-19 — One data file for all project content

`lib/projectsData.ts` holds every field for every project, with a commented field guide at
the top. The goal was that adding a project means editing one file and nothing else.
The card grid and the detail route both read from it.

## 2026-08-19 — GitHub/live buttons are conditional, never placeholders

A project renders a GitHub button only with `githubUrl`, a live button only with `liveUrl`,
and nothing when it has neither. A dead or empty button is worse than no button.

## 2026-08-19 — Intro screen plays once per session

The branded loading screen replayed on every return from a project page, which made
navigation feel like a reload. Now gated on `sessionStorage`. Paired with a hash-landing
effect so `/#work` returns the visitor to the projects grid.

## 2026-08-19 — Security details omitted from the Listurad case study

The source material included an internal audit (secrets in git history, missing backups, a
readiness score). None of it is on the public page. A portfolio is the wrong place to
publish a live system's weak points. The page carries the architecture and engineering
decisions instead.

# PROJECT SUMMARY — read me first (2 min)

> The fastest way to orient. **Last synced:** 2026-08-20.

## In one paragraph

This is **G. Kirtika's personal portfolio** — a single-page Next.js 14 App Router site
(dark theme, coffee-on-black) with a set of prerendered project detail pages. The home
page stacks hero → about → services → work → achievements → publications → contact.
Every project has its own page at `/projects/<slug>`, generated from one data file.
Motion runs on GSAP ScrollTrigger + Lenis smooth scroll, all gated behind a single
`prefers-reduced-motion` check. The contact form posts to FormSubmit (no backend).
Deployed on Vercel from `main`; the domain `kirtikadev.in` is being pointed at it.

## Repo layout

```
Portfolio/
├── app/
│   ├── page.tsx              home page — every section lives here
│   ├── layout.tsx            fonts, metadata, SmoothScroll, background
│   ├── globals.css           theme variables + utility classes
│   ├── projects/[slug]/      prerendered project detail pages
│   ├── thankyou/             contact form redirect target
│   ├── sitemap.ts robots.ts  SEO, both hardcode the domain
├── components/               31 components + components/ui (50 shadcn files)
├── lib/
│   ├── projectsData.ts       ← ALL project content lives here
│   ├── motion.ts             GSAP registration + reduced-motion check
│   └── utils.ts              cn() helper
├── hooks/                    use-parallax, use-mobile, use-toast, useThree
└── .ai-brain/                ← this knowledge base
```

## The 8 things to know before editing

1. **All project content is in [`lib/projectsData.ts`](../lib/projectsData.ts).** One
   array of objects. Adding a project = adding an object. Nothing else to touch.
   See [CONTENT.md](CONTENT.md).
2. **The home page is one big file** — `app/page.tsx` holds every section inline except
   About, Services, Contact and the project cards, which are components.
3. **Theme is coffee on black**, driven by four CSS variables at the top of
   `app/globals.css` plus Tailwind arbitrary-value classes. See [THEME.md](THEME.md).
4. **`Reveal` is the site-wide scroll animation** (GSAP ScrollTrigger, fires once).
   It renders children at `opacity: 0` until GSAP takes over — so if reveals ever break,
   the page looks *blank*, not unanimated. See [MOTION.md](MOTION.md).
5. **Never run `next build` while the dev server is running.** They share `.next` and
   dev/prod chunk names differ — the dev server then 500s with `Cannot find module
   './xxx.js'`. See [GOTCHAS.md](GOTCHAS.md).
6. **`pnpm dev` fails** on this repo (ignored build scripts). Use
   `./node_modules/.bin/next dev` or run `pnpm approve-builds` once.
7. **The GitHub button on a project page only renders if `githubUrl` exists**, and the
   live button only if `liveUrl` exists. This is deliberate — never show a dead button.
8. **TypeScript and ESLint errors do not fail the build** (`next.config.mjs` ignores
   both). Some dead three.js/tsparticles files have type errors permanently.

## Where to look

| I want to… | Go to |
|---|---|
| Add or edit a project | [CONTENT.md](CONTENT.md) → `lib/projectsData.ts` |
| Change colours | [THEME.md](THEME.md) |
| Understand the animations | [MOTION.md](MOTION.md) |
| Deploy, or set up the domain | [DEPLOYMENT.md](DEPLOYMENT.md) |
| Know why something is built this way | [DECISIONS.md](DECISIONS.md) |
| Know what's broken or fragile | [GOTCHAS.md](GOTCHAS.md) |
| Find a component | [COMPONENTS.md](COMPONENTS.md) |

## Personal details used across the site

| Field | Value | Where |
|---|---|---|
| Email | gkirtika01@gmail.com | contact-section, contact-email, FormSubmit target |
| Phone / WhatsApp | +91 93401 60822 (`919340160822`) | contact-section |
| GitHub | github.com/kirtika01 | navbar, footer, project detail header |
| LinkedIn | linkedin.com/in/g-kirtika-426687254 | navbar, footer, project detail header |
| CV | Google Drive link | contact-section |
| Domain | kirtikadev.in | layout metadata, sitemap, robots |

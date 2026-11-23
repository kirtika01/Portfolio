# PROJECT SUMMARY — read me first (2 min)

> The fastest way to orient. **Last synced:** 2026-11-23 (client-acquisition redesign).

## In one paragraph

This is **G. Kirtika's portfolio**, built to win freelance and contract work from
international clients. It is a single-page Next.js 14 App Router site (dark, coffee/gold
on black) plus a prerendered detail page per project. The home page runs hero → about →
services → projects → experience → skills → why work with me → process → research &
achievements → contact → footer. Projects live at `/projects/<slug>`, generated from one
data file. Motion uses GSAP ScrollTrigger and Lenis, and a single
`prefers-reduced-motion` check gates all of it. The contact form posts to one API route,
`/api/contact`, which emails the enquiry through Resend. Vercel deploys from `main` to `kirtikadev.in`.

## Repo layout

```
Portfolio/
├── app/
│   ├── page.tsx              home page: a server component that composes the sections
│   ├── layout.tsx            fonts, metadata, JSON-LD, pre-paint script, skip link
│   ├── globals.css           theme variables, .surface / .btn-* / .chip utilities
│   ├── opengraph-image.tsx   generated 1200×630 social card (twitter-image re-exports it)
│   ├── icon.svg              "K" favicon
│   ├── projects/[slug]/      prerendered project detail pages
│   ├── thankyou/             target of the form's no-JS fallback
│   ├── api/contact/          contact-form route → Resend (needs RESEND_API_KEY)
│   ├── sitemap.ts robots.ts  both read SITE_URL from lib/site.ts
├── components/               one file per home-page section, plus shared pieces
├── lib/
│   ├── projectsData.ts       ← ALL project content
│   ├── content.ts            ← about, experience, skills, services, why, process, achievements
│   ├── site.ts               ← name, role, links, form endpoint, nav, availability flag
│   ├── contact.ts            contact-form validation, shared by the form and the API route
│   ├── motion.ts             GSAP registration + reduced-motion check
│   └── utils.ts              cn() helper
├── hooks/                    use-parallax, use-mobile, use-toast, useThree (dead)
└── .ai-brain/                ← this knowledge base
```

## The 9 things to know before editing

1. **Content is data.** Projects are in [`lib/projectsData.ts`](../lib/projectsData.ts),
   every other home-page section is in [`lib/content.ts`](../lib/content.ts), and links
   and contact details are in [`lib/site.ts`](../lib/site.ts). See [CONTENT.md](CONTENT.md).
2. **Nothing invented.** The brief behind the redesign said no fake testimonials, metrics,
   clients or links. Where a fact is missing, the project carries `needsReview`, which
   shows a dashed chip **in development only**.
3. **Theme is coffee/gold on black.** The tokens are in `app/globals.css`, and primary
   buttons are `.btn-primary`, which puts dark text on a gold gradient for contrast.
   See [THEME.md](THEME.md).
4. **`Reveal` renders children at `opacity: 0`** until GSAP reveals them. A broken reveal
   shows up as a *blank* section. See [MOTION.md](MOTION.md).
5. **The intro is an overlay, not a gate.** The page is server-rendered underneath, and an
   inline script in `layout.tsx` hides the intro before first paint if it has already
   played or the visitor prefers reduced motion.
6. **Never run `next build` while the dev server is running.** See [GOTCHAS.md](GOTCHAS.md).
7. **`pnpm dev` fails.** Use `./node_modules/.bin/next dev`.
8. **Project buttons are conditional.** GitHub, Live and PyPI each render only when their
   URL exists, so the site never shows a dead button.
9. **Type and lint errors don't fail the build.** There is also no ESLint config, so
   `next lint` only starts its setup wizard. Run `tsc --noEmit` yourself; the only errors
   it reports are in dead three.js files.

## Where to look

| I want to… | Go to |
|---|---|
| Add or edit a project, service, skill, job, award | [CONTENT.md](CONTENT.md) |
| Change colours | [THEME.md](THEME.md) |
| Understand the animations / intro | [MOTION.md](MOTION.md) |
| Deploy, domain, contact form, scheduling link | [DEPLOYMENT.md](DEPLOYMENT.md) |
| Know why something is built this way | [DECISIONS.md](DECISIONS.md) |
| Know what's broken or fragile | [GOTCHAS.md](GOTCHAS.md) |
| Find a component | [COMPONENTS.md](COMPONENTS.md) |

## Personal details used across the site

All of these are in `lib/site.ts` (`SITE` and `LINKS`). Change them there and nowhere else.

| Field | Value |
|---|---|
| Email / contact-form recipient | gkirtika01@gmail.com |
| WhatsApp | +91 93401 60822 (`919340160822`) |
| GitHub | github.com/kirtika01 |
| LinkedIn | linkedin.com/in/g-kirtika-426687254 |
| Resume | Google Drive link (view + direct download) |
| Domain | kirtikadev.in (`SITE_URL`) |
| Scheduling link | `SCHEDULING_URL`, **empty** until the owner has one |

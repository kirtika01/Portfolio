# Portfolio — G. Kirtika

Next.js 14 (App Router) personal portfolio. Dark, coffee-on-black, deployed on Vercel.

**Start with [`.ai-brain/PROJECT_SUMMARY.md`](.ai-brain/PROJECT_SUMMARY.md)** — it maps the
repo and links to the rest of the knowledge base:

| Doc | Covers |
|---|---|
| `.ai-brain/CONTENT.md` | Adding/editing projects (all content is in `lib/projectsData.ts`) |
| `.ai-brain/THEME.md` | The colour system and how to retheme |
| `.ai-brain/MOTION.md` | GSAP / Lenis / Reveal and the reduced-motion gate |
| `.ai-brain/DEPLOYMENT.md` | Vercel, the kirtikadev.in domain, the contact form |
| `.ai-brain/DECISIONS.md` | Why things are built the way they are |
| `.ai-brain/GOTCHAS.md` | Traps that have already cost time |
| `.ai-brain/COMPONENTS.md` | What each component does |

## Fast facts

- **Run it:** `./node_modules/.bin/next dev` — `pnpm dev` fails (ignored build scripts).
- **Never** run `next build` while the dev server is running; they share `.next` and it
  breaks the dev server.
- **All project content** lives in `lib/projectsData.ts`. One object per project.
- **Reveal renders children at `opacity: 0`** until GSAP reveals them — a broken reveal
  looks like a blank page.
- Type errors do **not** fail the build; run `tsc --noEmit` deliberately.
- Keep the `.ai-brain/` docs current when you change how something works.

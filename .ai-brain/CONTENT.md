# Content — adding and editing projects

Everything visible in the Work section and on every `/projects/<slug>` page comes from
one file: [`lib/projectsData.ts`](../lib/projectsData.ts). No other file needs touching
to add a project — the card grid maps over the array, and the detail route generates a
static page per slug via `generateStaticParams`.

## The shape

```ts
{
  slug: "briefcase",             // URL: /projects/briefcase
  title: "Briefcase",
  tagline: "One line, under the title on the detail page.",
  summary: "One line, on the card. Keep it short — the card is a teaser.",
  tags: ["Node.js", "Express"],  // chips on the card, 3–5 works best
  features: [ "every feature, flat list" ],
  techStack: [ "flat list of technologies" ],
  sections: [ { heading, body?, bullets? } ],
  githubUrl?: "...",             // present → "View on GitHub" button renders
  liveUrl?: "...",               // present → "Visit Live Project" button + Live badge
  pypiUrl?: "...",               // present → "View on PyPI" button + "On PyPI" badge
  install?: {                    // present → "Get started" card after Overview
    requirements?: ["Python 3.11+"],
    steps: [{ command: "pip install x", note?: "..." }],  // each gets a copy button
  },
  screenshot?: { src, alt, width, height, caption?, still? },  // file in public/projects/
                                 // still = static frame of an animated GIF, shown under reduced motion
  period?: "2026 – Present",
  role?: "Senior AI Backend Developer",
  location?: "San Francisco · Remote",   // chip with a pin icon on the detail hero
  stats?: [{ label, value }],    // up to 3 number cards on the detail hero
  featured?: true,               // listed first in the grid
  // Added for the client-facing redesign (2026-11):
  category: "Marketplace · SaaS",            // label on the card + detail badge
  status: "Live",                            // "Live" | "In Progress" | "Research" | "Completed"
  filters: ["SaaS", "Backend"],              // filter tabs: AI/ML, Backend, SaaS, Automation, Research
  problem: "One or two sentences.",          // card + detail Problem / Solution card
  solution: "One or two sentences.",
  needsReview?: ["tech stack", "dates"],     // facts to confirm; dev-only dashed chip
}
```

## Rules that are easy to get wrong

- **The button rule is load-bearing.** `githubUrl`, `liveUrl` and `pypiUrl` are all
  optional and independently rendered. A project with none shows no buttons at all — that
  is correct, never add a placeholder link.
- **Vaani has no `githubUrl` on purpose.** The owner wants it reachable through PyPI
  only — no repo link anywhere on its page. Don't "helpfully" add one from the README.
- **The grid is uniform now** (1 / 2 / 3 columns, equal-height cards). The old `span`
  field is gone, so there is no row arithmetic to keep. `featured` only sorts a project
  to the front.
- **Never fill a gap with a guess.** If a fact isn't known, leave it out and list it in
  `needsReview`. The chip shows in `next dev` and is stripped in production.
- **Filter counts are computed** from `filters`, so a new project needs at least one.
- **Section order on the detail page with the new blocks:** first section → Get started
  (`install`) → screenshot → Features → remaining sections.
- `tailwind.config.js` still scans `./lib/**/*.{ts,tsx}`. Keep it, because any class
  name written in a data file would otherwise be purged.
- **Section order on the detail page is:** first section → Features → all remaining
  sections. So a trailing section like "Licence" stays at the end. That ordering lives in
  `components/project-detail.tsx`, not the data.
- **Code blocks are not supported** in `sections`. Bullets and prose only. README code
  samples get flattened into bullets with the identifiers inline.

## Where the rest of the content lives

| Content | File |
|---|---|
| Name, role, tagline, email, socials, resume, WhatsApp, domain | `lib/site.ts` (`SITE`, `LINKS`, `SITE_URL`) |
| "Available for Select International Projects" pill (contact section, "Prefer a Quick Conversation?" card; moved out of the hero in round 2) | `lib/site.ts` → `AVAILABLE_FOR_PROJECTS` |
| Nav items | `lib/site.ts` → `NAV_LINKS` (footer reuses them) |
| Form service + budget options | `lib/site.ts` → `SERVICE_OPTIONS`, `BUDGET_OPTIONS` |
| Scheduling ("Book a Call") link | `lib/site.ts` → `SCHEDULING_URL` (empty = WhatsApp/LinkedIn shown instead) |
| Hero headline, intro, credibility line | `components/hero-section.tsx` |
| About paragraphs + highlights | `lib/content.ts` → `ABOUT_PARAGRAPHS`, `ABOUT_HIGHLIGHTS` |
| Experience timeline | `lib/content.ts` → `EXPERIENCE` (copied verbatim from the old site, except PromptliAI: dates from LinkedIn, points from the owner's commits in `~/Documents/personal/promptli/promptli-mvp`). `highlight: true` gives a gold card with a "Client project" badge; `projectSlug` adds a "Read the case study" link. |
| Skills | `lib/content.ts` → `PRIMARY_STACK`, `SKILL_GROUPS` (no percentages, by request) |
| Services | `lib/content.ts` → `SERVICES` (text is the owner's, verbatim) |
| Why Work With Me / Process | `lib/content.ts` → `WHY_POINTS`, `PROCESS_STEPS` |
| Publication, awards, certifications, conferences, training | `lib/content.ts` → `PUBLICATION`, `ACHIEVEMENTS`, `TRAINING` |
| SEO title / description / keywords | `lib/site.ts` (`SITE`) → read by `app/layout.tsx` |

`CertificateCard` accepts an optional `link`, but the `Achievement` type doesn't have one
yet. Add `link?: string` to it when there is a real certificate URL. `TRAINING.sessions`
take an optional `recordingUrl`. Each link renders only when it is set. The old Google Drive recording links
returned 404, so they were removed. Re-add them once they are shared publicly.

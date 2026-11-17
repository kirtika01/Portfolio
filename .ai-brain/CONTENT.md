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
  screenshot?: { src, alt, width, height, caption? },  // file in public/projects/
  period?: "2026 – Present",
  role?: "Senior AI Backend Developer",
  stats?: [{ label, value }],    // up to 3 number cards on the detail hero
  featured?: true,               // renders as the large hero card in the grid
  span?: "md:col-span-3",        // grid width out of 6 columns
}
```

## Rules that are easy to get wrong

- **The button rule is load-bearing.** `githubUrl`, `liveUrl` and `pypiUrl` are all
  optional and independently rendered. A project with none shows no buttons at all — that
  is correct, never add a placeholder link.
- **Vaani has no `githubUrl` on purpose.** The owner wants it reachable through PyPI
  only — no repo link anywhere on its page. Don't "helpfully" add one from the README.
- **`span` must keep rows full.** The grid is 6 columns. Current layout is
  `6 | 6 | 3+3 | 3+3 | 3+3 | 3+3` (Listurad, Vaani, then eight half cards). If you add a
  project, re-check the arithmetic or a card will sit alone in a ragged row.
- **Section order on the detail page with the new blocks:** first section → Get started
  (`install`) → screenshot → Features → remaining sections.
- **Span strings live in `lib/`,** so `tailwind.config.js` includes `./lib/**/*.{ts,tsx}`
  in its `content` globs. Without that, Tailwind purges the `md:col-span-*` classes and
  every card silently collapses to one column.
- **Section order on the detail page is:** first section → Features → all remaining
  sections. So a trailing section like "Licence" stays at the end. That ordering lives in
  `components/project-detail.tsx`, not the data.
- **Code blocks are not supported** in `sections`. Bullets and prose only. README code
  samples get flattened into bullets with the identifiers inline.

## Where the rest of the content lives

| Content | File |
|---|---|
| Hero name, roles, buttons | `app/page.tsx` |
| Work experience timeline, skills | `components/about-me.tsx` |
| Services, training sessions, Live AI Projects, What I Offer | `components/services-section.tsx` |
| Achievements / certificates | `app/page.tsx` (inline `CertificateCard` list) |
| Publications | `app/page.tsx` (inline `PublicationCard`) |
| Contact details, quick-contact cards | `components/contact-section.tsx` |
| Footer | `app/page.tsx` |

Note the overlap to watch: **Listurad appears twice** — as a project card and in the
"Live AI Projects" block of `services-section.tsx`. Update both if its description changes.

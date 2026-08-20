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
  period?: "2026 – Present",
  role?: "Senior AI Backend Developer",
  stats?: [{ label, value }],    // up to 3 number cards on the detail hero
  featured?: true,               // renders as the large hero card in the grid
  span?: "md:col-span-3",        // grid width out of 6 columns
}
```

## Rules that are easy to get wrong

- **The button rule is load-bearing.** `githubUrl` and `liveUrl` are both optional and
  independently rendered. A project with neither shows no buttons at all — that is
  correct, never add a placeholder link.
- **`span` must keep rows full.** The grid is 6 columns. Current layout is
  `6 | 3+3 | 2+2+2 | 3+3`. If you add a project, re-check the arithmetic or a card will
  sit alone in a ragged row.
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

# Component map

`app/page.tsx` is a server component. It renders the sections below in order, and each
section is its own file in `components/`. Unless a component is marked *client*, it is a
server component.

## Chrome

| Component | Role |
|---|---|
| `navbar.tsx` (client) | Sticky nav: Home, About, Services, Projects, Experience, Contact, plus "Let's Talk". Tracks the active section. The mobile menu closes on link click or Escape, and focus returns to the toggle. Links are bare `#id` from `NAV_LINKS`, so it is home-page only; project pages have their own header. |
| `intro-screen.tsx` (client) | Branded overlay, played once per session. Exports `onIntroDone(cb)` / `introIsDone()` for anything that must wait for it. |
| `hash-landing.tsx` (client) | After the intro, scrolls to `location.hash` (this is how "Back to Projects" → `/#work` works). |
| `smooth-scroll.tsx` (client) | Lenis + GSAP ticker; one delegated click handler turns `#hash` links into Lenis scrolls and moves focus. Mounted in `layout.tsx`. |
| `custom-cursor.tsx`, `back-to-top.tsx` | Unchanged from before the redesign. |
| `site-footer.tsx` | Name, role, tagline, nav, socials, `© <CurrentYear />`. Also used on project pages. |
| `current-year.tsx` (client) | Year that stays correct on a statically built page. |

## Home sections (in page order)

| Component | Data from |
|---|---|
| `hero-section.tsx` (client) + `hero-visual.tsx` (client slider: 3 SVG workflow diagrams — architecture, AI agent, RAG — in a native scroll-snap track; each slide is its own diagram component (`ArchitectureDiagram`, `AgentDiagram`, `RagDiagram`) listed in `SLIDES`; autoplay 4.5 s even under reduced motion, pauses only on the button or keyboard focus) + `hero-background.tsx` | `lib/site.ts` (`SITE`) |
| `about-me.tsx` | `ABOUT_PARAGRAPHS`, `ABOUT_HIGHLIGHTS` |
| `services-section.tsx` + `service-cta.tsx` (client) | `SERVICES`. Grid is 1 / 2 / 4 columns (`xl` = all four in one row, compact padding, single-column checklist). The CTA scrolls to the form and preselects the service via the `PREFILL_SERVICE_EVENT` window event. |
| `projects-section.tsx` (client) + `project-card.tsx` + `project-status.tsx` | `projectsData.ts`. Filter tabs come from `PROJECT_FILTERS` and are `aria-pressed` buttons. |
| `experience-section.tsx` | `EXPERIENCE` |
| `skills-section.tsx` | `PRIMARY_STACK`, `SKILL_GROUPS` |
| `why-section.tsx` | `WHY_POINTS` |
| `process-section.tsx` | `PROCESS_STEPS`. Horizontal on `lg`, vertical timeline below that. |
| `achievements-section.tsx` + `publication-card.tsx` + `certificate-card.tsx` | `PUBLICATION`, `ACHIEVEMENTS`, `TRAINING`. Keeps `id="publications"` for old links. |
| `contact-section.tsx` (client) | `lib/site.ts`: links, `SERVICE_OPTIONS`, `BUDGET_OPTIONS`, `CONTACT_ENDPOINT`, `SCHEDULING_URL`; validation from `lib/contact.ts`; posts to `app/api/contact/route.ts` |

## Project pages

`project-detail.tsx` is the whole `/projects/<slug>` page, including its own slim header.
It shows the status and category badges, a Problem / Solution card, conditional
GitHub/Live/PyPI buttons, install, screenshot and sections. `NeedsReview` (from
`project-status.tsx`) renders only when `NODE_ENV !== "production"`.

## Building blocks

| Component | Role |
|---|---|
| `section-heading.tsx` | Eyebrow + h2 + optional description; every section uses it. Round 2 made both large (eyebrow `text-sm md:text-base`, h2 up to `lg:text-[3.5rem]`). Sections use `py-14 md:py-16` (Experience has a shorter bottom, `pb-8 md:pb-10`, because its timeline rail fades out and looked like a hole before Skills). |
| `reveal.tsx` | **The site-wide scroll reveal.** GSAP ScrollTrigger, fires once. |
| `spotlight-card.tsx` | Mouse-following spotlight card, used by project cards, service cards and project detail. |
| `magnetic.tsx` | Magnetic pull wrapper. |

CSS utilities in `globals.css`: `.surface` (the plain card), `.btn-primary`,
`.btn-secondary`, `.chip`, `.text-gradient`.

## Not rendered anywhere (dead)

Verified with an import grep on 2026-11-23:

- **No longer used after the redesign:** `loading.tsx` (replaced by `intro-screen`),
  `interactive-background.tsx`, `InteractiveShapes.tsx`, `interactive-shapes.tsx`,
  `role-rotator.tsx`, `magnetic-button.tsx`, `social-icon.tsx`, `contact-email.tsx`.
- **Already dead before it:** `three-scene.tsx`, `particles-animation.tsx`,
  `ParticleAnimation.tsx`, `ParticleBackground.tsx`, `AnimatedBoxes.tsx`,
  `AnimatedBoxes3D.tsx`, `header-particles.tsx`.

They were left in place so the redesign diff stays reviewable, and they are safe to delete.

## Conventions

- Plain cards use `.surface`; interactive cards use `SpotlightCard`.
- Primary action = `.btn-primary`, secondary = `.btn-secondary`. Never nest a `<button>`
  inside an `<a>`.
- External links: `target="_blank" rel="noopener noreferrer"` plus an sr-only
  "(opens in a new tab)".
- Body text on black is `text-stone-300` or lighter; `stone-400` is the floor (contrast).

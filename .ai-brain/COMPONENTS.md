# Component map

31 components in `components/`, plus 50 unused-ish shadcn primitives in `components/ui/`.
Only the ones below are actually wired into the site.

## Layout & chrome

| Component | Role |
|---|---|
| `navbar.tsx` | Fixed nav, blurs on scroll, tracks the active section with an IntersectionObserver. Links are bare `#hash` — **they only work on the home page**. |
| `custom-cursor.tsx` | Replaces the pointer; reads `data-cursor` attributes for its label. |
| `back-to-top.tsx` | Appears after scrolling. |
| `loading.tsx` | Branded intro screen, once per session. |
| `interactive-background.tsx` / `hero-background.tsx` / `InteractiveShapes.tsx` | Ambient background layers. |

## Content sections

| Component | Role |
|---|---|
| `about-me.tsx` | Photo, "The Road So Far" timeline (scrubbed line), skills bars. |
| `services-section.tsx` | Training sessions, Live AI Projects, What I Offer. |
| `contact-section.tsx` | Quick-contact cards, availability panel, FormSubmit form. |
| `project-card.tsx` | Teaser card in the Work grid, links to the detail page. |
| `project-detail.tsx` | The whole `/projects/<slug>` page, including its own slim header. |
| `certificate-card.tsx`, `publication-card.tsx` | Achievements and publications. |

## Building blocks

| Component | Role |
|---|---|
| `reveal.tsx` | **The site-wide scroll reveal.** GSAP ScrollTrigger, fires once. |
| `smooth-scroll.tsx` | Lenis, wired to the GSAP ticker. Mounted in `layout.tsx`. |
| `spotlight-card.tsx` | The card surface everywhere — hover lift, mouse-following spotlight, optional 3D tilt. |
| `magnetic-button.tsx` / `magnetic.tsx` | Buttons that pull toward the cursor; ripple on press. |
| `social-icon.tsx` | Round social links with a gradient hover. |
| `role-rotator.tsx` | Cycles the hero's job titles. |
| `contact-email.tsx` | The footer mailto link. |

## Not rendered anywhere (dead)

Verified by import graph, 2026-08-20 — nothing in `app/` or `components/` imports these:

`three-scene.tsx`, `ParticleAnimation.tsx`, `ParticleBackground.tsx`, `AnimatedBoxes.tsx`,
`AnimatedBoxes3D.tsx`, `header-particles.tsx`, and `interactive-shapes.tsx` (a lowercase
duplicate of the `InteractiveShapes.tsx` that *is* used).

`particles-animation.tsx` is imported only by `three-scene.tsx`, which is itself dead — so
the whole three.js chain is unreachable. `theme-provider.tsx` *is* mounted in
`layout.tsx`, though the site only ever renders dark. See [GOTCHAS.md](GOTCHAS.md) #7.

## Conventions

- Cards use `SpotlightCard`, never a bare `div` with borders.
- Scroll-in animation uses `Reveal`, with `delay={i * 0.06}` for staggered lists.
- Section headings are `font-display` + `.text-gradient`.
- Interactive elements that the custom cursor should label carry `data-cursor="…"`.

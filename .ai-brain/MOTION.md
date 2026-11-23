# Motion system

Three libraries share the work, deliberately:

| Library | Owns |
|---|---|
| **Lenis** | Site-wide smooth scrolling |
| **GSAP + ScrollTrigger** | The shared `Reveal`, hero entrance, timeline line, skill bars |
| **framer-motion** | Pre-existing section fades, hover/tap states, card spotlight |

## The single reduced-motion gate

[`lib/motion.ts`](../lib/motion.ts) exports `prefersReducedMotion()` and `registerGsap()`.
Every GSAP animation and Lenis itself check it. Under reduced motion, animations set their
**end state immediately** rather than being skipped — content must never be left hidden.

## Reveal — the important one

[`components/reveal.tsx`](../components/reveal.tsx) is the site-wide scroll reveal: fade +
24px slide up, 0.7s, `power2.out`, `once: true` so it never re-animates on scroll up.

**It renders its children at `opacity: 0` and relies on GSAP to reveal them.** That means
a JS failure or a mis-registered ScrollTrigger shows a *blank page*, not a static one.
Two safeguards exist:

- reduced motion sets `opacity: 1` synchronously in the effect;
- a `<noscript>` block in `app/layout.tsx` forces `[data-reveal] { opacity: 1 }`.

If a section ever renders blank, check the Reveal wrappers' inline `opacity` first.

## Lenis ↔ ScrollTrigger

[`components/smooth-scroll.tsx`](../components/smooth-scroll.tsx) drives Lenis from GSAP's
ticker and calls `ScrollTrigger.update` on every Lenis scroll event. Without that pairing
the two run on different frames and scroll-linked animation jitters. Lenis is not
initialised at all under reduced motion — native scrolling is correct there.

## The rest

- **Hero entrance**: `components/hero-section.tsx` runs a GSAP stagger over
  `[data-hero-item]` from inside `onIntroDone()`. Until then, the CSS rule
  `.js [data-hero-item]{opacity:0}` keeps those items hidden. The `js` class is added by
  the pre-paint script, so a visitor without JS still sees the hero.
- **Hero slider** (`components/hero-visual.tsx`, shown at `lg` and up only): a native
  scroll-snap track of three SVG slides, each its own composition (architecture = layered
  stack, AI agent = execution trace with tool calls, RAG = index lane + ask lane → answer).
  It auto-advances every 4.5 s (`INTERVAL`) for everyone, reduced motion included. The
  change is an eased 800 ms slide driven by rAF (native smooth `scrollTo` on a
  snap-mandatory track is uneven, Safari especially; snap is switched off while it runs).
  Under reduced motion it is a 300 ms crossfade instead, and the `.flow-dash` connector
  animation is off. The fade sets its transition inline with `!important`, because the
  global reduced-motion block in `globals.css` zeroes every transition with `!important`.
  Only the pause button and *keyboard* focus inside the slider (`:focus-visible`) stop it.
  Mouse hover deliberately does not: a visitor on a Mac with Reduce Motion on, mouse
  resting over the hero, used to see it never move.
- **Animated screenshots**: a project `screenshot` with a `still` renders as `<picture>`
  with a `(prefers-reduced-motion: reduce)` source, so reduced-motion visitors get the
  still frame and the GIF is never downloaded (PromptliAI's product tour).
- **Experience timeline** (`components/experience-section.tsx`): entries use `Reveal`.
- **Projects grid**: framer `layout` animation on filter change, turned off under
  reduced motion.
- **Cards** — `SpotlightCard` lifts 6px on hover with a mouse-following spotlight
  (framer `useMotionValue`). **Buttons** — `MagneticButton` scales to 1.03 on hover, 0.96
  on tap, with a magnetic pull toward the cursor.

## Intro screen and hash landing

`components/intro-screen.tsx` is an **overlay** on top of a page that is already
server-rendered, so crawlers, link previews and no-JS visitors get the full content.

1. An inline `PRE_PAINT` script in `app/layout.tsx` runs before first paint. It adds the
   `js` class to `<html>`, and it sets `data-intro="played"` if `sessionStorage` has
   `intro-played` or the visitor prefers reduced motion.
2. CSS hides `#intro-screen` when `html[data-intro="played"]`, so returning visitors never
   see a flash of it.
3. When the intro finishes it dispatches `intro:done`. Anything that has to wait for it
   (the hero entrance, `HashLanding`) uses `onIntroDone(cb)`, which runs `cb` immediately
   if the intro has already finished.

`components/hash-landing.tsx` waits for the intro, scrolls to `location.hash` and refreshes
ScrollTrigger. That is how "Back to Projects" (`/#work`) lands on the grid. The jump is
instant, because the visitor is going back somewhere they have already been.

## In-page links

`components/smooth-scroll.tsx` has one delegated click handler. It turns same-page
`#hash` links into Lenis scrolls with an 80px offset for the sticky nav, updates the URL,
and moves keyboard focus to the target section. Links stay real `href="#id"` anchors, so
they still work without JS.

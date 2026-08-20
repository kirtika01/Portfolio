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

- **Hero entrance** — `app/page.tsx` runs a GSAP stagger over `[data-hero-item]` once the
  intro screen clears. Keyed on `loading`, not mount, because the hero isn't in the DOM yet.
- **Timeline** (`components/about-me.tsx`) — items reveal on enter; the vertical line uses
  a **scrubbed** ScrollTrigger so it fills in step with scroll position.
- **Skill bars** — width animates 0 → value on first enter.
- **Cards** — `SpotlightCard` lifts 6px on hover with a mouse-following spotlight
  (framer `useMotionValue`). **Buttons** — `MagneticButton` scales to 1.03 on hover, 0.96
  on tap, with a magnetic pull toward the cursor.

## Intro screen and hash landing

The branded `Loading` screen plays **once per browser session** (`sessionStorage`
`intro-played`). Returning from a project page skips it. A second effect reads
`window.location.hash` after loading clears and jumps to that section — this is what makes
"Back to Projects" (`/#work`) land on the grid instead of the top of the page. The jump is
instant, not smooth: the visitor is returning somewhere they already were.

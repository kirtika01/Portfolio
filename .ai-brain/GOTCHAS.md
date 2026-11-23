# Gotchas — things that have actually bitten

Ordered by how much time each one costs when you hit it cold.

## 1. `next build` while `next dev` is running corrupts the dev server

Both write to `.next`, and dev and production emit **different chunk filenames**. After a
build, the running dev server starts requesting chunks that only exist in the production
manifest and every route 500s:

```
Error: Cannot find module './566.js'
```

**Fix:** stop the dev server, `rm -rf .next`, start it again. **Avoid:** never run a build
while dev is up.

## 2. `pnpm dev` fails outright

```
ERR_PNPM_IGNORED_BUILDS  Ignored build scripts: react-tsparticles, tsparticles-engine
```

pnpm's pre-run dependency check exits non-zero. **Fix:** run `pnpm approve-builds` once,
or bypass with `./node_modules/.bin/next dev`.

## 3. Rewriting many files at once wedges HMR

A scripted edit across ~23 files (a theme swap, say) can leave the dev server in a broken
module state — `TypeError: __webpack_modules__[moduleId] is not a function`. **Fix:**
restart the dev server after any bulk rewrite. It is not a code error.

## 4. Tailwind purges classes it can't see

`md:col-span-*` values live in `lib/projectsData.ts`. `tailwind.config.js` must keep
`./lib/**/*.{ts,tsx}` in `content` or the project grid silently collapses to one column.
Same trap for any class name constructed in a data file.

## 5. Headless screenshots of isolated preview routes render blank

Rendering a single section in a throwaway `app/preview-*/page.tsx` and screenshotting it
headlessly produces a black image, because framer-motion's `whileInView` observers don't
fire in that context. **The real page is fine.** Verify against the actual route and check
the DOM for `style="opacity:0"` before concluding anything is broken — a wrong diagnosis
here once led to unnecessary edits to viewport thresholds.

Related: headless Chrome composites its capture from the top of the document, so a
programmatically scrolled page also photographs as empty.

## 6. Headless Chrome forces `prefers-reduced-motion: reduce`

Screenshots therefore exercise the **reduced-motion branch** of every animation. To test
the animated path, temporarily stub `prefersReducedMotion()` to return `false`.

## 7. Dead code with permanent type errors

(See [COMPONENTS.md](COMPONENTS.md) for the full dead list after the redesign.)

`three-scene.tsx`, `particles-animation.tsx`, `ParticleAnimation.tsx`,
`ParticleBackground.tsx`, `AnimatedBoxes3D.tsx` and `hooks/useThree.ts` are **not rendered
anywhere** (`header-particles.tsx`, their only entry point, is unused). They carry
permanent `tsc` errors. The build ignores type errors, so they are inert — but they make
`tsc --noEmit` noisy. Safe to delete if anyone wants a clean typecheck.

## 8. The lockfile churns on every install

`package.json` pins several dependencies as `"latest"` (framer-motion, react-scroll, three,
expo-*). Any `pnpm add` re-resolves them and produces a large `pnpm-lock.yaml` diff that
has nothing to do with the package you installed.

## 9. Reveal hides content by default

See [MOTION.md](MOTION.md). A broken reveal is a *blank* section, not an unanimated one.

## 10. Satori (`next/og`) rejects a colour in the `background` shorthand

`background: "#000"` alongside a gradient makes `/opengraph-image` return a 500 with
`Invalid background image: "#000"`. Use `backgroundColor` and `backgroundImage` as
separate properties.

## 11. CSS grid items overflow narrow screens

Grid items default to `min-width: auto`, so a long unbreakable line inside them (like the
hero's credibility line) stretches the column past the viewport. The root
`overflow-x-clip` hides the scrollbar, so the only symptom is clipped text at 320px.
**Fix:** `grid-cols-1` on the base breakpoint and `min-w-0` on the item.

## 12. `cn()` (tailwind-merge) can silently drop a background colour

Arbitrary `bg-[…]` classes look like colours to tailwind-merge, so combining them with
`bg-white/[0.04]` dropped the colour. That left the native `<select>` grey under the dark
color-scheme. Also, Tailwind never generated the inline-SVG `bg-[url(...)]` class. The
select chevron is now a positioned `<ChevronDown>` icon. Label arbitrary values
(`bg-[position:…]`, `bg-[length:…]`) whenever you use them with `cn()`.

## 13. Hero items are hidden by CSS until GSAP runs

`.js [data-hero-item]{opacity:0}` in `globals.css`. If the hero ever renders empty, the
entrance tween didn't run. Check `onIntroDone` and the console before anything else.

## 14. There is no ESLint config

`next lint` launches an interactive setup prompt instead of linting. Adding a config is
a separate decision (it pulls in dependencies), so it hasn't been done.

## 15. Dev-only console noise under reduced motion

framer-motion logs "You have Reduced Motion enabled on your device" in development when
reduced motion is on, which includes every headless Chrome run. It is not a site error.

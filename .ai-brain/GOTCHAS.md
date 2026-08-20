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

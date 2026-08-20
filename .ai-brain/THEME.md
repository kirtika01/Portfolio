# Theme — coffee on black

Current palette: **roasted coffee accents on a pure black ground**, with warm `stone`
greys for body text. Chosen 2026-08-20, replacing the original purple → pink.

## The four variables

Top of [`app/globals.css`](../app/globals.css):

```css
--accent-a: #b98a5e;        /* coffee — primary accent   */
--accent-mid: #a9764c;      /* roast — gradient midpoint */
--accent-b: #8a5a34;        /* dark roast — secondary    */
--accent-deep: #6b4527;     /* bitter — deepest shade    */
--accent-a-rgb: 185, 138, 94;
--accent-b-rgb: 138, 90, 52;
```

These drive: the animated gradient text (`.text-gradient`), the scrollbar thumb, the
`.border-gradient` hairline, and `.glow-accent`.

## But they are not the whole story

Tailwind utility classes carry the accent as **arbitrary values** — `text-[#b98a5e]`,
`from-[#b98a5e]`, `shadow-[#b98a5e]/25`, `border-[#8a5a34]/50` and so on, roughly 130
occurrences across `app/` and `components/`. A full retheme is therefore:

1. Change the four variables above (plus the `--background` / `--card` / `--popover`
   HSL tokens if the ground moves).
2. Find-replace the arbitrary hex values across `app/`, `components/`, `lib/`.
3. Check the four **gradient-filled buttons** — hero "View Projects", contact "Send
   Message", project detail "Visit Live Project", and back-to-top. Their text colour must
   contrast with the fill. On coffee (mid-dark) cream text works; on a light fill like
   cream-gold the text must flip to dark brown.

A scripted version of exactly this lives in the session history; the mapping approach is
a regex over `\b(purple|fuchsia|pink)-(\d{2,3})\b` plus a hex table.

## Deliberate exceptions

- **Green status colours stay green.** `Available for work`, the `Live` badge and the
  pulsing dots use `green-400/500`. They signal state, not brand, and they read as status
  precisely because they sit outside the palette.
- **Neutral greys are `stone`, not `gray`.** Warm greys sit with browns; cool greys fight
  them. If you add a component, use `stone-300/400/500`, not `gray-*`.
- **The ground is true black** (`bg-black`), not a tinted near-black. Cards sit on
  `bg-white/[0.03]` with `border-white/[0.06]` hairlines.

## Palettes considered and rejected (2026-08-20)

| Palette | Verdict |
|---|---|
| Purple → Pink | The original. Rejected as the AI-portfolio default. |
| Indigo → Cyan | Rejected — too close in mood to purple. |
| Amber → Orange | Strong contender, warmer and louder than coffee. |
| Lime → Emerald | Rejected — loudest, and it swallows the green status badges. |
| Rose → Amber | Rejected. |
| Espresso & Cream | Rejected — the only option that moved the ground to brown. |
| **Black & Coffee** | **Chosen.** Understated, warm, keeps the black ground. |

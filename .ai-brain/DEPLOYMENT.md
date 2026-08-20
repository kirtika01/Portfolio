# Deployment

## Hosting

**Vercel, building from `main`.** There is no `vercel.json` and no CI workflow — the
project is linked through the Vercel dashboard, so a push to `main` is the deploy.

## Local development

```bash
./node_modules/.bin/next dev        # NOT `pnpm dev` — see GOTCHAS.md
```

Ports 3000 and 3001 are usually taken by other projects on this machine; the portfolio has
been running on **3002**.

Build check: `./node_modules/.bin/next build` — but **stop the dev server first**, they
share `.next`. See [GOTCHAS.md](GOTCHAS.md).

## Build characteristics

- 11 static pages: home, `/thankyou`, `/_not-found`, and 9 prerendered project pages via
  `generateStaticParams`.
- `next.config.mjs` sets `ignoreBuildErrors` and `ignoreDuringBuilds` — **TypeScript and
  ESLint errors will not fail the build.** Run `tsc --noEmit` yourself.
- `images.unoptimized: true`, so no image optimisation service is needed.

## Domain — kirtikadev.in

Registrar **Hostinger**, host **Vercel**. Status as of 2026-08-20: metadata is committed;
DNS was still to be configured.

**In code** (done): `app/layout.tsx` sets `metadataBase`, canonical and OG/Twitter tags;
`app/sitemap.ts` and `app/robots.ts` hardcode `https://kirtikadev.in`. **If the domain ever
changes, those three files are the places to edit.**

**In the dashboards** (manual):

1. Vercel → Settings → Domains → add `kirtikadev.in` and `www.kirtikadev.in`; pick which
   one is primary. Vercel then displays the exact DNS records to use.
2. Hostinger → Domains → DNS records. **Delete the parking `A @` and `CNAME www` records
   first**, then add:
   - `A` `@` → the IP Vercel shows (classically `76.76.21.21`)
   - `CNAME` `www` → `cname.vercel-dns.com`
3. SSL is automatic once DNS resolves. Ready when Vercel shows *Valid Configuration*.

Alternative: point Hostinger's nameservers at `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.
Simpler, but it moves **all** DNS — only do it if the domain carries no email records.

Historical note: a `CNAME` file for `kirtika.io` used to exist in the repo (GitHub Pages
era) and was deleted in `cf39189`. If `kirtika.io` is still live, redirect it to the new
domain rather than serving both.

## The contact form

No backend. `components/contact-section.tsx` posts to
`https://formsubmit.co/gkirtika01@gmail.com` with hidden config fields, and `_next`
redirects to `/thankyou`. **That redirect URL is built from `window.location.origin` at
runtime** — it used to be hardcoded to `localhost:3000`, which would have sent real
visitors to their own machine. Keep it origin-derived.

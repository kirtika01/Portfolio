import { Github, Linkedin, Mail } from "lucide-react"
import CurrentYear from "@/components/current-year"
import { LINKS, NAV_LINKS, SITE } from "@/lib/site"

const SOCIALS = [
  { label: "LinkedIn", href: LINKS.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", href: LINKS.github, icon: Github, external: true },
  { label: "Email", href: `mailto:${LINKS.email}`, icon: Mail, external: false },
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-gradient-to-t from-[#0b0806] to-black pb-10 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 w-[40rem] max-w-full -translate-y-1/2 rounded-full bg-[#9a6c44]/10 blur-[100px]" />
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold text-white">{SITE.name}</p>
            <p className="mt-1 text-[#cba982]">{SITE.role}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-stone-300">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">Navigate</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`/#${l.id}`} className="text-stone-300 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">Connect</h2>
            <ul className="space-y-2.5">
              {SOCIALS.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2.5 text-stone-300 transition-colors hover:text-white"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4 text-[#cba982]" />
                    {label === "Email" ? LINKS.email : label}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pb-14 pt-6 text-sm text-stone-400 sm:flex-row sm:pb-0 sm:pr-16 sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  )
}

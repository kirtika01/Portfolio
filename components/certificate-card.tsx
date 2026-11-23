import { Award, ExternalLink, Trophy, Users } from "lucide-react"
import type { AchievementKind } from "@/lib/content"

interface CertificateCardProps {
  title: string
  issuer: string
  year: string
  kind: AchievementKind
  /** Certificate URL. The link renders only when set. */
  link?: string
}

const KIND: Record<AchievementKind, { icon: typeof Award; label: string }> = {
  award: { icon: Trophy, label: "Award" },
  certification: { icon: Award, label: "Certification" },
  conference: { icon: Users, label: "Conference" },
}

/** Compact achievement / certification row. */
export default function CertificateCard({ title, issuer, year, kind, link }: CertificateCardProps) {
  const { icon: Icon, label } = KIND[kind]
  return (
    <div className="surface flex h-full items-start gap-4 p-5 transition-colors duration-300 hover:border-[#b98a5e]/35">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#b98a5e]/10 text-[#cba982] ring-1 ring-[#b98a5e]/25">
        <Icon aria-hidden="true" className="h-5 w-5" />
        <span className="sr-only">{label}</span>
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="font-display font-semibold leading-snug text-white">{title}</h4>
        <p className="mt-1 text-sm text-stone-300">
          {issuer}
          <span aria-hidden="true" className="mx-1.5 text-stone-500">
            ·
          </span>
          {year}
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-[#cba982] transition-colors hover:text-[#e0c9ad]"
          >
            View certificate
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  )
}

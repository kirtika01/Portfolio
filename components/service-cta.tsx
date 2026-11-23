"use client"

import { ArrowRight } from "lucide-react"

export const PREFILL_SERVICE_EVENT = "prefill-service"

/**
 * "Discuss This Service": jumps to the contact form and preselects the
 * service. A plain #contact link underneath, so it still works without JS.
 */
export default function ServiceCta({ service, label = "Discuss This Service" }: { service: string; label?: string }) {
  return (
    <a
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent(PREFILL_SERVICE_EVENT, { detail: service }))}
      aria-label={`${label}: ${service}`}
      className="group inline-flex items-center gap-2 rounded-full border border-[#b98a5e]/40 bg-[#b98a5e]/10 px-5 py-2.5 text-sm font-medium text-[#f0e2d0] transition-colors duration-300 hover:border-[#cba982] hover:bg-[#b98a5e]/20"
    >
      {label}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  )
}

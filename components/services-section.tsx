import { BrainCircuit, Check, Layers, Server, Workflow } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import ServiceCta from "@/components/service-cta"
import SpotlightCard from "@/components/spotlight-card"
import { SERVICES, type ServiceIcon } from "@/lib/content"

const ICONS: Record<ServiceIcon, typeof Server> = {
  brain: BrainCircuit,
  server: Server,
  workflow: Workflow,
  layers: Layers,
}

/** Four service cards. Each CTA preselects its service in the contact form. */
export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden bg-black py-14 md:py-16">
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-[#9a6c44]/10 blur-[120px]" />

      <div className="container relative mx-auto px-4 md:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title={
            <>
              How I Can <span className="text-gradient">Help You Build</span>
            </>
          }
          description="Engineering support for founders and teams — from a first AI-powered MVP to the backend and automation that keep a product running."
        />

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon]
            return (
              <li key={service.title} className="h-full">
                <Reveal delay={i * 0.06} className="h-full">
                  <SpotlightCard className="h-full">
                    <article className="flex h-full flex-col p-7 md:p-8 xl:p-6">
                      <div className="mb-6 flex items-center gap-4 xl:mb-4 xl:flex-col xl:items-start xl:gap-3">
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b98a5e]/25 to-[#6b4527]/20 text-[#e0c9ad] ring-1 ring-[#b98a5e]/30">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </span>
                        <h3 className="font-display text-xl font-semibold leading-snug text-white md:text-[1.35rem] xl:text-lg">
                          {service.title}
                        </h3>
                      </div>

                      <p className="mb-6 leading-relaxed text-stone-300 xl:mb-5 xl:text-[0.95rem]">{service.description}</p>

                      <ul className="mb-8 grid gap-2.5 sm:grid-cols-2 xl:mb-6 xl:grid-cols-1 xl:gap-2">
                        {service.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-stone-200">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#cba982]" />
                            {cap}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        <ServiceCta service={service.formOption} />
                      </div>
                    </article>
                  </SpotlightCard>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

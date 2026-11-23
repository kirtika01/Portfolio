import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProjectDetail from "@/components/project-detail"
import SiteFooter from "@/components/site-footer"
import { getProject, projects } from "@/lib/projectsData"
import { SITE } from "@/lib/site"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug)
  if (!project) return { title: "Project not found" }
  const title = `${project.title} | ${SITE.name}`
  return {
    // Absolute, so the layout's "%s | G. Kirtika" template isn't applied twice.
    title: { absolute: title },
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title,
      description: project.tagline,
      siteName: SITE.name,
    },
    twitter: { card: "summary_large_image", title, description: project.tagline },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()
  return (
    <>
      <ProjectDetail project={project} />
      <SiteFooter />
    </>
  )
}

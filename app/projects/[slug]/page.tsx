import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProjectDetail from "@/components/project-detail"
import { getProject, projects } from "@/lib/projectsData"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.title} | G. Kirtika`,
    description: project.tagline,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}

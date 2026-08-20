"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import React from "react"
import SpotlightCard from "@/components/spotlight-card"

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

interface ResourceLinkProps {
    href: string
    children: React.ReactNode
}

function ResourceLink({ href, children }: ResourceLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-[#e0c9ad] transition-colors hover:text-[#dcc0a0]"
        >
            {children}
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>
    )
}

export default function ServicesSection() {
    return (
        <section id="services" className="relative overflow-hidden bg-black py-20">
            <div className="absolute inset-0 pointer-events-none select-none opacity-30 [background:radial-gradient(circle_at_30%_50%,rgba(185,138,94,0.15),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(138,90,52,0.12),transparent_60%)]" />
            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={fadeIn.hidden}
                    whileInView={fadeIn.visible}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="mb-6 text-center font-display text-3xl font-bold md:text-4xl">
                        <span className="text-gradient">Services</span>
                        <span className="ml-2">🧠</span>
                    </h2>
                    <p className="mx-auto mb-14 max-w-3xl text-center leading-relaxed text-stone-300">
                        I provide AI Education, Training, and Custom Automation Solutions tailored for students, teachers, professionals, and organizations. My services are designed to bridge the gap between theory and practical implementation of AI.
                    </p>

                    {/* Pre-Demo Training Sessions */}
                    <motion.div
                        className="mb-16"
                        initial={fadeIn.hidden}
                        whileInView={fadeIn.visible}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold">
                            <span className="text-gradient">Pre-Demo Training Sessions</span>
                            <span className="text-xl">🎤</span>
                        </h3>
                        <p className="mb-4 text-stone-400">
                            I have successfully trained <span className="font-medium text-[#e0c9ad]">300+ teachers</span> through structured sessions, covering:
                        </p>
                        <ul className="space-y-4">
                            <li>
                                <SpotlightCard className="p-4">
                                    <p className="mb-1 font-medium text-stone-200">Building AI Agents with No-Code Tools – live, interactive training with Q&amp;A.</p>
                                    <ResourceLink href="https://drive.google.com/file/d/1A8re9M89Oi5NTKe1OuEi-94XFpeXYNIJ/view?usp=sharing">Session Recording</ResourceLink>
                                </SpotlightCard>
                            </li>
                            <li>
                                <SpotlightCard className="p-4">
                                    <p className="mb-1 font-medium text-stone-200">AI Tools for Automating Teachers’ Daily Workflows – grading, scheduling, content preparation, and more.</p>
                                    <ResourceLink href="https://drive.google.com/file/d/1ADs7119Nggv11O5zJhdb0pLqM8OHB1Vs/view?usp=sharing">Session Recording</ResourceLink>
                                </SpotlightCard>
                            </li>
                            <li>
                                <SpotlightCard className="p-4">
                                    <p className="mb-1 font-medium text-stone-200">Agentic AI vs. Normal AI – understanding the difference between traditional AI and the future of agentic AI.</p>
                                    <ResourceLink href="https://drive.google.com/file/d/1VKwigYXF96WIW7O1N_JxgPrMyeyBDCZD/view?usp=sharing">Session Recording</ResourceLink>
                                </SpotlightCard>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Live AI Projects */}
                    <motion.div
                        className="mb-16"
                        initial={fadeIn.hidden}
                        whileInView={fadeIn.visible}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <h3 className="mb-4 font-display text-2xl font-semibold">
                            <span className="text-gradient">Live AI Projects</span>
                        </h3>
                        <p className="mb-6 text-stone-400">I have designed and deployed AI-powered automation agents for different organizations, including:</p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <SpotlightCard className="p-5">
                                <h4 className="mb-1 font-display text-lg font-semibold text-white">Check-In/Check-Out Agent – <ResourceLink href="https://checkin.oll.co">checkin.oll.co</ResourceLink></h4>
                                <p className="mt-2 text-sm leading-relaxed text-stone-400">An automated attendance system that records entries and exits, reduces manual effort, and ensures accurate, efficient activity tracking.</p>
                            </SpotlightCard>
                            <SpotlightCard className="p-5">
                                <h4 className="mb-1 font-display text-lg font-semibold text-white">Listurad – <ResourceLink href="https://dev.listurad.com">dev.listurad.com</ResourceLink></h4>
                                <p className="mt-2 text-sm leading-relaxed text-stone-400">A classified-ads and social marketplace serving a Next.js web app and a Flutter mobile app from one FastAPI backend, with AI ad posting, moderation, translation, and an in-product support assistant.</p>
                                <Link
                                    href="/projects/listurad"
                                    className="mt-3 inline-flex items-center gap-1 text-sm text-[#e0c9ad] transition-colors hover:text-[#dcc0a0]"
                                >
                                    View Details
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </SpotlightCard>
                        </div>
                        <p className="mt-6 text-stone-400">These solutions demonstrate how AI can simplify workflows, save time, and create smarter systems for businesses, educators, and learners.</p>
                    </motion.div>

                    {/* What I Offer */}
                    <motion.div
                        initial={fadeIn.hidden}
                        whileInView={fadeIn.visible}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="mb-6 font-display text-2xl font-semibold">
                            <span className="text-gradient">What I Offer</span>
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <OfferCard
                                title="AI Product Development"
                                body="Build and deploy AI-powered products using LLMs, AI agents, RAG, and modern backend technologies."
                            />
                            <OfferCard
                                title="AI Backend Engineering"
                                body="Design production-ready APIs and backend systems using Python, FastAPI, Supabase, AWS, and scalable AI infrastructure."
                            />
                            <OfferCard
                                title="AI Agents & Automation"
                                body="Build agentic workflows and automation systems that connect LLMs with tools, APIs, databases, and business processes."
                            />
                            <OfferCard
                                title="AI Research & Deep Learning"
                                body="Explore NLP, deep learning, and applied AI, with an IEEE-published research paper in NLP and Deep Learning."
                            />
                            <OfferCard
                                title="For Students & Professionals"
                                body="Help students and professionals learn practical AI, build projects, improve their portfolios, and understand how AI can be applied to real-world problems."
                            />
                            <OfferCard
                                title="Students & Young Innovators"
                                body="Learn how to build AI chatbots and automation tools using both code and no-code platforms, empowering you to create real-world solutions."
                            />
                            <OfferCard
                                title="Teachers & Professionals"
                                body="Discover how to automate repetitive tasks, save valuable time, and streamline daily workflows using AI-powered tools."
                            />
                            <OfferCard
                                title="Job Seekers"
                                body="Guidance on using AI for resume building, interview preparation, job search optimization, and portfolio creation to stand out in the competitive job market."
                            />
                            <OfferCard
                                className="md:col-span-2"
                                title="Custom Resume & Portfolio Services"
                                body="I also take personal orders for creating professional resumes and portfolios tailored to highlight your skills and achievements."
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

interface OfferCardProps {
    title: string
    body: string
    /** Optional grid span, e.g. "md:col-span-2" to fill a trailing row. */
    className?: string
}

function OfferCard({ title, body, className }: OfferCardProps) {
    return (
        <SpotlightCard tilt className={`h-full p-5 ${className ?? ""}`}>
            <h4 className="mb-2 font-display text-lg font-semibold text-white">{title}</h4>
            <p className="text-sm leading-relaxed text-stone-400">{body}</p>
        </SpotlightCard>
    )
}

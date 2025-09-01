"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import React from "react"

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
            className="inline-flex items-center text-sm text-purple-300 hover:text-pink-300 transition-colors"
        >
            {children}
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>
    )
}

export default function ServicesSection() {
    return (
        <section id="services" className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none select-none opacity-30 [background:radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.15),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.12),transparent_60%)]" />
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={fadeIn.hidden}
                    whileInView={fadeIn.visible}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Services</span>
                        <span className="ml-2">🧠</span>
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-center leading-relaxed mb-14">
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
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Pre-Demo Training Sessions</span>
                            <span className="text-xl">🎤</span>
                        </h3>
                        <p className="text-gray-400 mb-4">
                            I have successfully trained <span className="text-purple-300 font-medium">300+ teachers</span> through structured sessions, covering:
                        </p>
                        <ul className="space-y-4">
                            <li className="p-4 rounded-lg bg-gray-900/60 border border-gray-800 hover:border-purple-500 transition-colors">
                                <p className="text-gray-200 font-medium mb-1">Building AI Agents with No-Code Tools – live, interactive training with Q&amp;A.</p>
                                <ResourceLink href="https://drive.google.com/file/d/1A8re9M89Oi5NTKe1OuEi-94XFpeXYNIJ/view?usp=sharing">Session Recording</ResourceLink>
                            </li>
                            <li className="p-4 rounded-lg bg-gray-900/60 border border-gray-800 hover:border-purple-500 transition-colors">
                                <p className="text-gray-200 font-medium mb-1">AI Tools for Automating Teachers’ Daily Workflows – grading, scheduling, content preparation, and more.</p>
                                <ResourceLink href="https://drive.google.com/file/d/1ADs7119Nggv11O5zJhdb0pLqM8OHB1Vs/view?usp=sharing">Session Recording</ResourceLink>
                            </li>
                            <li className="p-4 rounded-lg bg-gray-900/60 border border-gray-800 hover:border-purple-500 transition-colors">
                                <p className="text-gray-200 font-medium mb-1">Agentic AI vs. Normal AI – understanding the difference between traditional AI and the future of agentic AI.</p>
                                <ResourceLink href="https://drive.google.com/file/d/1VKwigYXF96WIW7O1N_JxgPrMyeyBDCZD/view?usp=sharing">Session Recording</ResourceLink>
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
                        <h3 className="text-2xl font-semibold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Live AI Projects</span>
                        </h3>
                        <p className="text-gray-400 mb-6">I have designed and deployed AI-powered automation agents for different organizations, including:</p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-5 rounded-lg bg-gray-900/60 border border-gray-800 hover:border-pink-500 transition-colors">
                                <h4 className="text-lg font-semibold mb-1 text-white">AI-Powered Learning Agent – <ResourceLink href="https://preview--adaptive-ai-path.lovable.app">preview--adaptive-ai-path.lovable.app</ResourceLink></h4>
                                <p className="text-sm text-gray-400 mt-2 leading-relaxed">A four-week structured program that guides students, parents, and professionals in learning AI with interactive lessons, daily schedules, and real-time query handling.</p>
                            </div>
                            <div className="p-5 rounded-lg bg-gray-900/60 border border-gray-800 hover:border-pink-500 transition-colors">
                                <h4 className="text-lg font-semibold mb-1 text-white">Check-In/Check-Out Agent – <ResourceLink href="https://checkin.oll.co">checkin.oll.co</ResourceLink></h4>
                                <p className="text-sm text-gray-400 mt-2 leading-relaxed">An automated attendance system that records entries and exits, reduces manual effort, and ensures accurate, efficient activity tracking.</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mt-6">These solutions demonstrate how AI can simplify workflows, save time, and create smarter systems for businesses, educators, and learners.</p>
                    </motion.div>

                    {/* What I Offer */}
                    <motion.div
                        initial={fadeIn.hidden}
                        whileInView={fadeIn.visible}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">What I Offer</span>
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
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
}

function OfferCard({ title, body }: OfferCardProps) {
    return (
        <div className="group p-5 rounded-lg bg-gray-900/60 border border-gray-800 hover:border-purple-500 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent" />
            <h4 className="text-lg font-semibold mb-2 text-white relative z-10">{title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed relative z-10">{body}</p>
        </div>
    )
}

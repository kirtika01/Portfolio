"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Building2, Server, Bot, FlaskConical, Code2, Palette } from "lucide-react"
import SpotlightCard from "@/components/spotlight-card"

const timelineData = [
  {
    id: 1,
    company: "Aashita Technosoft Pvt Ltd",
    icon: Server,
    role: "Senior AI Backend Developer",
    period: "December 2025 – Present",
    location: "Remote",
    type: "Full time",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Engineered an AI ad-classification engine with Python, FastAPI, and Supabase, automating multilingual NLP category mapping through hierarchical LLM reasoning across large-scale ad datasets.",
  },
  {
    id: 2,
    company: "Clone Futura",
    icon: Bot,
    role: "AI Agent Developer",
    period: "Feb 2025 – present",
    location: "Mumbai",
    type: "Full time",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Designing and deploying intelligent AI agents using LangChain, RAG, vector databases, and APIs. Building scalable chatbot systems with Firebase integrations and optimizing deployment across Vercel, Render, and Replit. Work focuses on creating automation workflows and LLM-powered solutions that improve efficiency and scalability.",
  },
  {
    id: 3,
    company: "IIT Dharwad",
    icon: FlaskConical,
    role: "Research Intern",
    period: "April 2024 – June 2024",
    location: "Dharwad",
    type: "Internship",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Developed an advanced gold price prediction model employing Deep Learning and NLP methods; integrated historical market data with sentiment analysis from 500+ news articles, achieving a predictive accuracy rate of 97.12%",
  },
  {
    id: 4,
    company: "Zivaka LLP",
    icon: Code2,
    role: "Junior Python and AI Developer",
    period: "February 2024 – June 2024",
    location: "Kolkata",
    type: "Part-time",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Engineered AI-driven customer support systems, improving response efficiency by 20%, empowering cross-functional teams to streamline client interactions. Designed and deployed automation workflows for predictive analytics, optimizing decision-making processes in business operations.",
  },
  {
    id: 5,
    company: "Ayodhaya Webosoft",
    icon: Palette,
    role: "Junior Frontend Designer",
    period: "August 2023 – September 2023",
    location: "Bhilai",
    type: "Internship",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Crafted 15+ graphic layouts for web and mobile products, boosting visual communication efficiency by 30% and enhancing team collaboration on design projects.",
  },
]

const skillsData = {
  "Soft Skills": [
    { name: "Teamwork", proficiency: 90 },
    { name: "Leadership", proficiency: 85 },
    { name: "Multi-tasking", proficiency: 80 },
    { name: "Problem Solving", proficiency: 95 },
  ],
  Languages: [
    { name: "Python", proficiency: 90 },
    { name: "Java", proficiency: 75 },
    { name: "C", proficiency: 70 },
    { name: "MySQL", proficiency: 80 },
  ],
  "Technologies/Frameworks": [
    { name: "Machine Learning", proficiency: 85 },
    { name: "Deep Learning", proficiency: 80 },
    { name: "Data Analysis", proficiency: 90 },
    { name: "UI/UX Design", proficiency: 75 },
    { name: "DBMS", proficiency: 80 },
    { name: "Github", proficiency: 85 },
    { name: "Firebase", proficiency: 70 },
  ],
  "Developer Tools": [
    { name: "Jupyter Notebook", proficiency: 95 },
    { name: "VS Code", proficiency: 90 },
    { name: "Google Colab", proficiency: 85 },
    { name: "Figma", proficiency: 75 },
    { name: "Power BI", proficiency: 70 },
    { name: "Anaconda", proficiency: 80 },
    { name: "Langchain", proficiency: 75 },
  ],
}

export default function AboutMe() {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">
        <span className="text-gradient">Code, Coffee &amp; Me</span>
        <span className="ml-2">☕💻</span>
      </h2>

      {/* Profile Section */}
      <div className="mb-16 flex flex-col items-center gap-10 md:flex-row-reverse">
        <div className="md:w-1/3">
          <div className="group relative mx-auto h-64 w-64">
            {/* Glow */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
            {/* Gradient ring frame */}
            <div className="relative h-full w-full rounded-3xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-pink-500 p-[2px]">
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <Image
                  src="/IMG_20221224_20003544.jpg"
                  alt="G Kirtika"
                  fill
                  sizes="256px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="prose prose-invert max-w-none text-center md:text-left">
            {/* Mobile description */}
            <p className="text-lg leading-relaxed md:hidden">
              🧠 AI Alchemist 🤖 and Creative Developer 💡. Crafting intelligent, impactful solutions with Machine
              Learning & Deep Learning. From real-time emotion detection to terrain analysis — turning data into action.
              📊🧬✨
            </p>
            {/* Desktop description */}
            <div className="hidden md:block">
              <p className="mb-4 text-xl">
                🚀 <strong>Hey, I'm G. Kirtika!</strong>
              </p>
              <p className="mb-4">
                <strong>AI Sorceress 🧠</strong> and <strong>Creative Developer 💡</strong>, turning
                <strong> data and models</strong> into <strong> intelligent magic</strong>! Whether it's
                <strong>GANs</strong>, <strong>LSTMs</strong>, or <strong>emotion-recognition spells</strong>, I love
                building smart systems that make a real-world impact. ⚙️✨📊
              </p>
              <p className="mb-4">
                I spend my days{" "}
                <strong>training neural nets, building ML pipelines, and tweaking model parameters</strong>—and my nights
                wondering why my loss function still isn't behaving. 😅 When I'm not coding, I'm probably diving into{" "}
                <strong>AI research papers</strong>, experimenting with <strong>GAN magic</strong>, or explaining machine
                learning to anyone who asks (or makes eye contact). 🤖📚✨
              </p>
              <p>
                Let's <strong>connect, create, and innovate</strong>—because the{" "}
                <strong>future is intelligent, and I'm here to shape it!</strong> 🤖🚀💡
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-20">
        <h3 className="mb-10 text-center font-display text-2xl font-bold md:text-3xl">
          <span className="text-gradient">The Road So Far</span>
          <span className="ml-2 text-white">🛤️</span>
        </h3>
        <div className="relative">
          {/* Drawn vertical line (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-pink-500 md:block"
          />

          <div className="space-y-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col gap-8 md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="md:w-1/2">
                  <SpotlightCard className="p-6">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                      <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 ring-1 ring-white/10 md:mx-0 md:h-14 md:w-14">
                        <item.icon className="h-7 w-7 text-purple-300 md:h-6 md:w-6" aria-hidden="true" />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-display text-xl font-bold text-white">{item.role}</h3>
                        <h4 className="text-lg text-purple-400">{item.company}</h4>
                        <div className="mt-2 flex flex-col items-center gap-1.5 text-sm text-gray-400 md:items-start">
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {item.period}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {item.location}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-300 md:text-left">{item.description}</p>
                  </SpotlightCard>
                </div>

                {/* Spacer for the other half on desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Timeline dot */}
                <div className="absolute left-1/2 top-7 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-black md:block">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-purple-500/60" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="mb-10 text-center font-display text-2xl font-bold md:text-3xl">
          <span className="text-gradient">Code Arsenal</span>
          <span className="ml-2 text-white">⚔️</span>
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(skillsData).map(([category, skills]) => (
            <SpotlightCard key={category} className="p-6">
              <h4 className="mb-5 text-center font-display text-xl font-bold text-purple-400 md:text-left">{category}</h4>
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex justify-between">
        <span className="text-sm text-gray-200">{name}</span>
        <span className="text-sm text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
        />
      </div>
    </div>
  )
}

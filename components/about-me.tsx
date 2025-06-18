"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Building2 } from "lucide-react"

const timelineData = [
  {
    id: 1,
    company: "IIT Dharwad",
    role: "Research Intern",
    period: "April 2024 – June 2024",
    location: "Dharwad",
    type: "Internship",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Developed an advanced gold price prediction model employing Deep Learning and NLP methods; integrated historical market data with sentiment analysis from 500+ news articles, achieving a predictive accuracy rate of 97.12%",
  },
  {
    id: 2,
    company: "Zivaka LLP",
    role: "Junior Python and AI Developer",
    period: "February 2024 – June 2024",
    location: "Kolkata",
    type: "Part-time",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Engineered AI-driven customer support systems, improving response efficiency by 20%, empowering cross-functional teams to streamline client interactions. Designed and deployed automation workflows for predictive analytics, optimizing decision-making processes in business operations.",
  },
  {
    id: 3,
    company: "Ayodhaya Webosoft",
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
    <section id="about" className="py-12 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Code, Coffee & Me
            </span>
            <span className="ml-2">☕💻</span>
          </h2>
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  src="../IMG_20221224_20003544.jpg"
                  alt="G Kirtika"
                  fill
                  className="rounded-lg object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="prose prose-invert max-w-none text-center md:text-left">
                {/* Mobile description */}
                <p className="text-lg leading-relaxed md:hidden">
                  🧠 AI Alchemist 🤖 and Creative Developer 💡. Crafting intelligent, impactful solutions with Machine
                  Learning & Deep Learning. From real-time emotion detection to terrain analysis — turning data into
                  action. 📊🧬✨
                </p>
                {/* Desktop description */}
                <div className="hidden md:block">
                  <p className="text-xl mb-4">
                    🚀 <strong>Hey, I'm G. Kirtika!</strong>
                  </p>
                  <p className="mb-4">
                    <strong>AI Sorceress 🧠</strong> and <strong>Creative Developer 💡</strong>, turning
                    <strong> data and models</strong> into <strong> intelligent magic</strong>! Whether it's
                    <strong>GANs</strong>, <strong>LSTMs</strong>, or <strong>emotion-recognition spells</strong>, I
                    love building smart systems that make a real-world impact. ⚙️✨📊
                  </p>
                  <p className="mb-4">
                    I spend my days{" "}
                    <strong>training neural nets, building ML pipelines, and tweaking model parameters</strong>—and my
                    nights wondering why my loss function still isn't behaving. 😅 When I'm not coding, I'm probably
                    diving into <strong>AI research papers</strong>, experimenting with <strong>GAN magic</strong>, or
                    explaining machine learning to anyone who asks (or makes eye contact). 🤖📚✨
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
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                The Road So Far
              </span>
              <span className="ml-2 text-white">🛤️</span>
            </h3>
            <div className="relative">
              {/* Vertical Line (only visible on larger screens) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 relative`}
                  >
                    {/* Content */}
                    <div className="md:w-1/2 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-16 h-16 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-4 md:mb-0 mx-auto md:mx-0">
                          <Image
                            src={item.logo || "/placeholder.svg"}
                            alt={item.company}
                            width={56}
                            height={56}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold text-white">{item.role}</h3>
                          <h4 className="text-lg text-purple-400">{item.company}</h4>
                          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mt-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{item.period}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{item.type}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-300 text-sm text-center md:text-left">{item.description}</p>
                    </div>

                    {/* Timeline Point (hidden on mobile) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hidden md:block"></div>

                    {/* Timeline Connector (hidden on mobile) */}
                    {index < timelineData.length - 1 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"
                        style={{ top: "100%", height: "100px" }}
                      ></motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Code Arsenal
              </span>
              <span className="ml-2 text-white">⚔️</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skillsData).map(([category, skills]) => (
                <div key={category} className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                  <h4 className="text-xl font-bold mb-4 text-purple-400 text-center md:text-left">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillBar({ name, proficiency }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
    </div>
  )
}

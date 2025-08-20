"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, MessageSquare, Smartphone, PenTool, Download, ExternalLink } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import SocialIcon from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import AboutMe from "@/components/about-me"
import Loading from "@/components/loading"
import InteractiveShapes from "@/components/InteractiveShapes"
import AnimatedBoxes from "@/components/AnimatedBoxes"
import CertificateCard from "@/components/certificate-card"
import PublicationCard from "@/components/publication-card"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Show loading for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null
  if (loading) return <Loading />

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // You can add a console.log here if you want to verify it's working
    console.log("Form submission prevented")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <Navbar />
      <InteractiveShapes />

      {/* Hero Section with Animated Boxes */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBoxes />
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Hey! It's G. Kirtika
            </h1>
            <h2 className="text-xl md:text-2xl mb-8 text-gray-300">
              🚀 AI Developer | Building Intelligent Agents | Tech Explorer
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <ScrollLink to="work" smooth={true} duration={500}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  View Projects
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-purple-500 text-white hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Contact Me
                </Button>
              </ScrollLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 mx-auto">
          <AboutMe />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                What I've Built
              </span>
              <span className="ml-2 text-white">🏗️</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                title="YouTube Video Analyzer | AI Agent"
                description="A powerful tool designed to help educators, content creators, and learners analyze and compare educational videos on YouTube. It provides in-depth insights into video performance, content quality, and audience engagement through various metrics and AI-powered analysis."
                tags={["AI", "Python", "NLP", "Data Analysis"]}
                link="https://github.com/kirtika01/multiple"
                period="January 2025 – February 2025"
              />
              <ProjectCard
                title="Video Mirror Detection Using Motion Cues"
                description="Implemented mirror detection using advanced deep learning models, YOLO v8 and v11, to accurately identify and segment reflective surfaces in videos."
                tags={["Computer Vision", "Deep Learning", "YOLO", "Object Detection"]}
                period="Present"
              />
              <ProjectCard
                title="Road Connectivity Analysis in Rural Hilly Terrains"
                description="Analyzed 433 slopes in Durg, Chhattisgarh, using DEM data and implemented machine learning models to identify priority areas for road development and upgrades."
                tags={["Machine Learning", "Geospatial Analysis", "Data Science"]}
                link="https://github.com/kirtika01/Hack_a_sol_"
                period="August 2024 – September 2024"
              />
              <ProjectCard
                title="Deep Learning and NLP Integrated Gold Price Forecasting"
                description="Achieved 97.12% accuracy in predicting gold prices using NLP models combined with deep learning frameworks, facilitating investment strategy optimization based on financial dataset analysis. Leveraged time series forecasting techniques (LSTM, GRU) and feature engineering to analyze financial datasets from over 200 articles."
                tags={["Deep Learning", "NLP", "Time Series", "LSTM", "GRU"]}
                link="https://github.com/kirtika01/Gold_price"
                period="April 2024 – June 2024"
              />
              <ProjectCard
                title="Rice Diseases Identification & Classification"
                description="Implemented CNN algorithms to classify rice diseases with 98% accuracy, contributing to a 20% productivity improvement for local farmers by advancing crop health monitoring techniques. Elevated crop health monitoring, driving a 20% productivity increase for farmers."
                tags={["CNN", "Image Classification", "Agriculture Tech", "Deep Learning"]}
                link="https://github.com/kirtika01/rice-disease-identification"
                period="June 2023 – October 2023"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements/Certificates Section */}
      <section id="achievements" className="py-20 bg-black">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Achievements & Certifications
              </span>
              <span className="ml-2 text-white">🏆</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CertificateCard
                title="Google Jams"
                issuer="Google Cloud"
                date="2023"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="IEEE WIE ILS, Raipur"
                issuer="IEEE"
                date="2023"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="Database Management Systems (DBMS)"
                issuer="NPTEL"
                date="2024"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="Management Information System (MIS)"
                issuer="NPTEL"
                date="2024"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="Algorithmic Game Theory (AGT)"
                issuer="NPTEL"
                date="2024"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="IEEE ICECCT"
                issuer="IEEE"
                date="2024"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="GECR Avesh '23 HACKATHON-4 Winner"
                issuer="GECR"
                date="2023"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="Winner, Technorollix Hackathon"
                issuer="Technorollix"
                date="2024"
                image="/placeholder.svg?height=64&width=64"
              />
              <CertificateCard
                title="Winner, Inter-Zone Chess Tournament"
                issuer="Inter-Zone Chess"
                date="2024"
                image="/placeholder.svg?height=64&width=64"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Publications Section */}
      <section id="publications" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Research Publications
              </span>
              <span className="ml-2 text-white">📚</span>
            </h2>
            <div className="space-y-8">
              <PublicationCard
                title="Deep Learning and Natural Language Processing Integrated Gold Price Forecasting"
                authors="G Kirtika, Rahul Pandya, Sridher Iyer"
                journal="IATMSI IEEE IIIT Gwalior 3rd International Conference 2025"
                date="2025"
                abstract="Predicted gold prices using advanced deep learning and natural language processing techniques."
                link="https://ieeexplore.ieee.org/document/10985530"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Ping Me
              </span>
              <span className="ml-2 text-white">🚀</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <form
                  action="https://formsubmit.co/gkirtika01@gmail.com"
                  method="POST"
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-4 py-3"
                    ></textarea>
                  </div>

                  {/* Hidden fields for FormSubmit configuration */}
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_next" value="http://localhost:3000/thankyou" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_autoresponse" value="Thank you for your message! I'll get back to you soon." />
                  <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Send Message
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-gray-400 mb-2">Download my CV to learn more about my experience</p>
                  <div className="flex justify-center">
                    <a
                      href="https://drive.google.com/file/d/1HDSo6OaQERaltgXz7Dscpw9806JYHH45/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Social Links */}
      <footer className="py-12 bg-gradient-to-t from-gray-900 to-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <SocialIcon icon={<Github />} href="https://github.com/kirtika01" label="GitHub" />
            <SocialIcon icon={<Linkedin />} href="https://www.linkedin.com/in/g-kirtika-426687254/" label="LinkedIn" />
          </div>
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} G. Kirtika. All rights reserved.</p>
            <ContactEmail />
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, description, tags, link, period, image }) {
  return (
    <div className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300">
      <h3 className="text-xl font-bold mb-2 text-white text-center md:text-left">{title}</h3>
      {period && <p className="text-purple-400 mb-3 text-sm text-center md:text-left">{period}</p>}
      <p className="text-gray-400 mb-4 text-center md:text-left">{description}</p>
      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300"
          >
            {tag}
          </span>
        ))}
      </div>
      {link && (
        <div className="text-center md:text-left">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View Project</span>
            <ExternalLink className="ml-1 w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}

function ContactEmail() {
  return (
    <div className="mt-2">
      <a href="mailto:gkirtika01@gmail.com" className="text-purple-400 hover:text-purple-300">
        gkirtika01@gmail.com
      </a>
    </div>
  )
}

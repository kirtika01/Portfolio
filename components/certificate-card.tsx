"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import Image from "next/image"

interface CertificateCardProps {
  title: string
  issuer: string
  date: string
  image?: string
  link?: string
}

export default function CertificateCard({ title, issuer, date, image, link }: CertificateCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
        <div className="w-16 h-16 relative flex-shrink-0">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${
            issuer === "Google Cloud" ? "from-blue-500/20 to-green-500/20" :
            issuer === "IEEE" ? "from-blue-500/20 to-blue-700/20" :
            issuer === "NPTEL" ? "from-orange-500/20 to-red-500/20" :
            "from-purple-500/20 to-pink-500/20"
          } flex items-center justify-center`}>
            <Award className={`w-8 h-8 ${
              issuer === "Google Cloud" ? "text-blue-400" :
              issuer === "IEEE" ? "text-blue-500" :
              issuer === "NPTEL" ? "text-orange-400" :
              "text-purple-400"
            }`} />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-purple-400 mb-2">{issuer}</p>
          <p className="text-gray-400 text-sm mb-3">{date}</p>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              <span>View Certificate</span>
              <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { BookOpen, ExternalLink } from "lucide-react"

interface PublicationCardProps {
  title: string
  authors: string
  journal: string
  date: string
  link?: string
  abstract?: string
}

export default function PublicationCard({ title, authors, journal, date, link, abstract }: PublicationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300"
    >
      <div className="flex gap-4">
        <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-1">{authors}</p>
          <p className="text-purple-400 mb-1">{journal}</p>
          <p className="text-gray-400 text-sm mb-3">{date}</p>
          {abstract && <p className="text-gray-400 text-sm mb-3 line-clamp-3">{abstract}</p>}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              <span>Read Publication</span>
              <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

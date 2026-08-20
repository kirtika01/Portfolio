import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import InteractiveBackground from "@/components/interactive-background"
import SmoothScroll from "@/components/smooth-scroll"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const SITE_URL = "https://kirtikadev.in"
const TITLE = "G. Kirtika - AI Developer & Full Stack Engineer"
const DESCRIPTION =
  "Portfolio of G Kirtika, a Senior Backend Developer and AI Engineer specializing in building intelligent agents and full-stack applications."

export const metadata: Metadata = {
  // Absolute base for canonical URLs and social previews.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "G. Kirtika",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        {/* Without JS the reveal animations never run, so show their content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important}`}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll />
          <InteractiveBackground />
          {children}
          <div className="noise-overlay" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  )
}

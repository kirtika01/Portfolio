import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import InteractiveBackground from "@/components/interactive-background"

export const metadata: Metadata = {
  title: "G. Kirtika - AI Developer & Full Stack Engineer",
  description:
    "Portfolio of Aakash Singh Rajput, a Blockchain Developer and Full Stack Engineer specializing in Web3 technologies.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <InteractiveBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

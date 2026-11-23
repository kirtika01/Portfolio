import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import { LINKS, SITE, SITE_URL } from "@/lib/site"

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

export const metadata: Metadata = {
  // Absolute base for canonical URLs and social previews.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  keywords: [
    "AI engineer",
    "backend engineer",
    "Python developer",
    "FastAPI developer",
    "AI automation",
    "AI agents",
    "LLM integration",
    "SaaS development",
    "MVP development",
    "API integration",
    "freelance AI engineer",
    "G. Kirtika",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE.name,
      jobTitle: SITE.role,
      description: SITE.description,
      url: SITE_URL,
      image: `${SITE_URL}/kirtika-portrait.jpg`,
      email: `mailto:${LINKS.email}`,
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      sameAs: [LINKS.linkedin, LINKS.github],
      knowsAbout: [
        "Artificial intelligence",
        "Large language models",
        "AI agents",
        "Python",
        "FastAPI",
        "Backend development",
        "SaaS development",
        "Workflow automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
}

/**
 * Runs before first paint. Marks <html> as JS-enabled (so hero items can start
 * hidden for their entrance) and skips the intro screen when it has already
 * played this session or the visitor prefers reduced motion.
 */
const PRE_PAINT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('intro-played')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.intro='played'}catch(e){d.dataset.intro='played'}})()`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        {/* Without JS the reveal animations never run, so show their content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important}#intro-screen{display:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-[#ecdcc6] px-5 py-2.5 font-medium text-[#140d07] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll />
          {children}
          <div className="noise-overlay" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  )
}

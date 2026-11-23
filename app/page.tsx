import AboutMe from "@/components/about-me"
import AchievementsSection from "@/components/achievements-section"
import BackToTop from "@/components/back-to-top"
import ContactSection from "@/components/contact-section"
import CustomCursor from "@/components/custom-cursor"
import ExperienceSection from "@/components/experience-section"
import HashLanding from "@/components/hash-landing"
import HeroSection from "@/components/hero-section"
import IntroScreen from "@/components/intro-screen"
import Navbar from "@/components/navbar"
import ProcessSection from "@/components/process-section"
import ProjectsSection from "@/components/projects-section"
import ServicesSection from "@/components/services-section"
import SiteFooter from "@/components/site-footer"
import SkillsSection from "@/components/skills-section"
import WhySection from "@/components/why-section"

/**
 * The home page. A server component: every section's text is in the HTML the
 * server sends, so search engines and link previews see the real content.
 * The intro screen is an overlay on top, not a gate in front of it.
 */
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-black text-white">
      <IntroScreen />
      <HashLanding />
      <CustomCursor />
      <Navbar />
      <BackToTop />

      <main id="main">
        <HeroSection />
        <AboutMe />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <WhySection />
        <ProcessSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  )
}

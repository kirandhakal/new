"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowUp } from "lucide-react";
import type { SectionKey } from "@/types/navigation";

const HomeSection = React.lazy(() => import("./HomeSection"));
const SkillsSection = React.lazy(() => import("./SkillsSection"));
const ProjectsSection = React.lazy(() => import("./ProjectsSection"));
const ServicesSection = React.lazy(() => import("./ServicesSection"));
const ContactSection = React.lazy(() => import("./ContactSection"));
const ChatbaseWidget = React.lazy(() => import("./ChatbaseWidget"));

function useIsNearViewport(ref: React.RefObject<HTMLElement | null>, rootMargin = "600px") {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isNear;
}

const SectionFallback = ({ label }: { label: string }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
  </div>
);

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    chatbase: useRef<HTMLElement>(null),
  };

  const isHomeNear = useIsNearViewport(sectionRefs.home);
  const isServicesNear = useIsNearViewport(sectionRefs.services);
  const isSkillsNear = useIsNearViewport(sectionRefs.skills);
  const isProjectsNear = useIsNearViewport(sectionRefs.projects);
  const isContactNear = useIsNearViewport(sectionRefs.contact);

  useEffect(() => {
    const handleScroll = () => {
      // Keep order aligned with DOM order for predictable active section detection.
      const sections: SectionKey[] = ["home", "services", "skills", "projects", "contact"];

      for (const section of sections) {
        const element = sectionRefs[section].current;
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScrollPosition = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScrollPosition);
    return () => window.removeEventListener("scroll", handleScrollPosition);
  }, []);

  const scrollToSection = (section: SectionKey) => {
    const element = sectionRefs[section]?.current;
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onHomeClick={() => scrollToSection("home")} />

      <main className="pt-16 md:pt-[72px]">
        <div>
          <section ref={sectionRefs.home} id="home" className="relative">
            <div>
            <Suspense fallback={<SectionFallback label="Loading home..." />}>
              {isHomeNear ? <HomeSection setActiveSection={scrollToSection} /> : null}
            </Suspense>
            </div>
          </section>

          <section ref={sectionRefs.services} id="services" className="relative">
            <div>
            <Suspense fallback={<SectionFallback label="Loading services..." />}>
              {isServicesNear ? <ServicesSection /> : null}
            </Suspense>
            </div>
          </section>

          <section ref={sectionRefs.skills} id="skills" className="relative">
            <div>
            <Suspense fallback={<SectionFallback label="Loading skills..." />}>
              {isSkillsNear ? <SkillsSection /> : null}
            </Suspense>
            </div>
          </section>

          <section ref={sectionRefs.projects} id="projects" className="relative">
            <div>
            <Suspense fallback={<SectionFallback label="Loading projects..." />}>
              {isProjectsNear ? <ProjectsSection /> : null}
            </Suspense>
            </div>
          </section>

          <section ref={sectionRefs.contact} id="contact" className="relative">
            <div>
            <Suspense fallback={<SectionFallback label="Loading contact..." />}>
              {isContactNear ? <ContactSection /> : null}
            </Suspense>
            </div>
          </section>

          <section ref={sectionRefs.chatbase} id="chatbase" className="sr-only" aria-hidden="true" />
        </div>
      </main>

      <Navbar activeSection={activeSection} setActiveSection={scrollToSection} />
      <Suspense fallback={null}>
        <ChatbaseWidget />
      </Suspense>
      <Footer />

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        onClick={() => scrollToSection("home")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-4 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lifted transition-colors hover:bg-accent hover:text-accent-foreground md:bottom-8 md:right-8 md:flex"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </div>
  );
};

export default PortfolioPage;

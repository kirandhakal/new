"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { SectionKey } from "@/types/navigation";

import HomeSection from "./HomeSection";
import BootScreen from "./hero/BootScreen";

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
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("kd-booted")) {
        setIsBooted(true);
      }
    } catch {}
  }, []);

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    chatbase: useRef<HTMLElement>(null),
  };

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


  const scrollToSection = (section: SectionKey) => {
    const element = sectionRefs[section]?.current;
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background">
      <BootScreen onBootComplete={() => setIsBooted(true)} />
      <Header onHomeClick={() => scrollToSection("home")} />

      <main className="pt-16 lg:pl-24">
        <div>
          <section ref={sectionRefs.home} id="home" className="relative min-h-[calc(100vh-4rem)]">
            <HomeSection setActiveSection={scrollToSection} />
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
      {isBooted && (
        <Suspense fallback={null}>
          <ChatbaseWidget />
        </Suspense>
      )}
      <Footer />

    </div>
  );
};

export default PortfolioPage;

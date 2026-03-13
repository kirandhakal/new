import React, { Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ArrowUp } from "lucide-react";
import { pageMetaTags, organizationSchema } from "../utils/seoUtils";

const HomeSection = React.lazy(() => import("../components/sections/HomeSection"));
const SkillsSection = React.lazy(() => import("../components/sections/SkillsSection"));
const ProjectsSection = React.lazy(() => import("../components/sections/ProjectsSection"));
const ServicesSection = React.lazy(() => import("../components/sections/ServicesSection"));
const ContactSection = React.lazy(() => import("../components/sections/ContactSection"));
const ChatbaseWidget = React.lazy(() => import("../components/sections/ChatbaseWidget"));

function useIsNearViewport(ref, rootMargin = "600px") {
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

const SectionFallback = ({ label }) => (
  <div className="py-20 lg:py-32 min-h-screen flex items-center justify-center">
    <div className="text-gray-500 font-medium">{label}</div>
  </div>
);

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
    chatbase: useRef(null),
  };

  const isHomeNear = useIsNearViewport(sectionRefs.home);
  const isServicesNear = useIsNearViewport(sectionRefs.services);
  const isSkillsNear = useIsNearViewport(sectionRefs.skills);
  const isProjectsNear = useIsNearViewport(sectionRefs.projects);
  const isContactNear = useIsNearViewport(sectionRefs.contact);

  useEffect(() => {
    const handleScroll = () => {
      // Keep order aligned with DOM order for predictable active section detection.
      const sections = ["home", "services", "skills", "projects", "contact"];

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

  const scrollToSection = (section) => {
    const element = sectionRefs[section]?.current;
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Helmet>
        <title>{pageMetaTags.home.title}</title>
        <meta name="description" content={pageMetaTags.home.description} />
        <meta name="keywords" content={pageMetaTags.home.keywords} />
        <meta property="og:title" content={pageMetaTags.home.title} />
        <meta property="og:description" content={pageMetaTags.home.description} />
        <meta name="twitter:title" content={pageMetaTags.home.title} />
        <meta name="twitter:description" content={pageMetaTags.home.description} />
        <link rel="canonical" href="https://kirandhakal.com" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <Header onHomeClick={() => scrollToSection("home")} />

      <main className="pt-[72px] md:pt-20">
        <div className="max-w-7xl mx-auto">
          <section ref={sectionRefs.home} id="home" className="min-h-screen">
            <Suspense fallback={<SectionFallback label="Loading home..." />}>
              {isHomeNear ? <HomeSection setActiveSection={scrollToSection} /> : null}
            </Suspense>
          </section>

          <section ref={sectionRefs.services} id="services" className="min-h-screen">
            <Suspense fallback={<SectionFallback label="Loading services..." />}>
              {isServicesNear ? <ServicesSection /> : null}
            </Suspense>
          </section>

          <section ref={sectionRefs.skills} id="skills" className="min-h-screen">
            <Suspense fallback={<SectionFallback label="Loading skills..." />}>
              {isSkillsNear ? <SkillsSection /> : null}
            </Suspense>
          </section>

          <section ref={sectionRefs.projects} id="projects" className="min-h-screen">
            <Suspense fallback={<SectionFallback label="Loading projects..." />}>
              {isProjectsNear ? <ProjectsSection /> : null}
            </Suspense>
          </section>

          <section ref={sectionRefs.contact} id="contact" className="min-h-screen">
            <Suspense fallback={<SectionFallback label="Loading contact..." />}>
              {isContactNear ? <ContactSection /> : null}
            </Suspense>
          </section>

          <section ref={sectionRefs.chatbase} id="chatbase" className="sr-only" aria-hidden="true" />
        </div>
      </main>

      <NavBar activeSection={activeSection} setActiveSection={scrollToSection} />
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
        className="fixed bottom-54 md:bottom-28 right-8 z-50 p-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full shadow-2xl hover:shadow-orange-500/50 transition-shadow"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
};

export default PortfolioPage;


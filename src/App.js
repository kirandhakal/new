import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import HomeSection from './components/sections/HomeSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import ChatbaseWidget from './components/sections/ChatbaseWidget';
import { ArrowUp } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    services: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'services', 'contact'];
      
      for (const section of sections) {
        const element = sectionRefs[section].current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollPosition = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScrollPosition);
    return () => window.removeEventListener('scroll', handleScrollPosition);
  }, []);

  const scrollToSection = (section) => {
    const element = sectionRefs[section].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header onHomeClick={() => scrollToSection('home')} />
      
      {/* Single page with all sections */}
      <main className="pt-[72px] md:pt-20">
        <div className="max-w-7xl mx-auto">
          <section ref={sectionRefs.home} id="home" className="min-h-screen">
            <HomeSection setActiveSection={scrollToSection} />
          </section>
          
          <section ref={sectionRefs.services} id="services" className="min-h-screen">
            <ServicesSection />
          </section>
          
          <section ref={sectionRefs.skills} id="skills" className="min-h-screen">
            <SkillsSection />
          </section>
          
          <section ref={sectionRefs.projects} id="projects" className="min-h-screen">
            <ProjectsSection />
          </section>
          
          <section ref={sectionRefs.contact} id="contact" className="min-h-screen">
            <ContactSection />
          </section>
        </div>
      </main>
      
      <NavBar activeSection={activeSection} setActiveSection={scrollToSection} />
      <ChatbaseWidget />
      <Footer />
      
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none'
        }}
        onClick={() => scrollToSection('home')}
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

export default App;

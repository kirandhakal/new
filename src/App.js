 import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import HomeSection from './components/sections/HomeSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection setActiveSection={setActiveSection} />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'services':
        return <ServicesSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Header />
      <main className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          {renderSection()}
        </div>
      </main>
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Footer />
    </div>
  );
};

export default App;
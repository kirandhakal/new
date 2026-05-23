import React from 'react';
import HomeSection from '../src/components/sections/HomeSection';
import ServicesSection from '../src/components/sections/ServicesSection';
import SkillsSection from '../src/components/sections/SkillsSection';
import ProjectsSection from '../src/components/sections/ProjectsSection';
import ContactSection from '../src/components/sections/ContactSection';

export default function Page() {
  return (
    <div className="space-y-8">
      <HomeSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

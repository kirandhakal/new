import HomeSection from '@/src/features/home/components/HomeSection';
import ServicesSection from '@/src/features/services/components/ServicesSection';
import SkillsSection from '@/src/features/skills/components/SkillsSection';
import ProjectsSection from '@/src/features/projects/components/ProjectsSection';
import ContactSection from '@/src/features/contact/components/ContactSection';

export default function Home() {
  return (
    <>
      <HomeSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

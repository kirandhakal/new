export interface HeroContent {
  greeting: string;
  name: string;
  image: string;
  imageAlt: string;
  roles: string[];
  description: string;
  stats: Array<{ value: string; label: string }>;
  download: { label: string; href: string; filename: string };
  contactLabel: string;
  techLabel: string;
  technologies: string[];
}

export interface ServiceContent {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ title: string; icon: string; description: string; gradient: string }>;
}

export interface ProjectContent {
  eyebrow: string;
  title: string;
  description: string;
  categories: Array<{ key: string; label: string }>;
  items: Array<{ title: string; category: string; description: string; demo: string; github?: string; icon: string; gradient: string; tags: string[] }>;
  githubPrompt: string;
  githubLabel: string;
  githubUrl: string;
  caseStudiesLabel: string;
}

export interface SkillContent {
  eyebrow: string;
  title: string;
  description: string;
  footer: string;
  items: Array<{ name: string; icon: string; description: string; code: string; color: string; bgColor: string }>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  institution: string;
  projectType: string;
  team: string[];
  icon: string;
  gradient: string;
  cover: string;
  stack: string[];
  overview: string;
  problem: string;
  objective: string;
  impact: string;
  highlights: Array<{ icon: string; title: string; description: string }>;
  actors: Array<{ name: string; description: string }>;
  research: { intro: string; items: Array<{ name: string; description: string; url?: string }> };
  approach: { name: string; intro: string; steps: string[] };
}

export interface CaseStudyContent {
  eyebrow: string;
  title: string;
  description: string;
  readLabel: string;
  backLabel: string;
  items: CaseStudy[];
}

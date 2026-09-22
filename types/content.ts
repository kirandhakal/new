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

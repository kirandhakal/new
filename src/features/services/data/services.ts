import { Globe, Smartphone, Palette, Database, Cloud, Code } from 'lucide-react';
import { Service } from '@/src/types';

export const services: Service[] = [
  {
    title: 'Web Development',
    icon: Globe,
    description: 'Specializing in React JS and Next.js for dynamic, high-performing websites.',
    gradient: 'from-orange-400 to-rose-400',
  },
  {
    title: 'App Development',
    icon: Smartphone,
    description: 'Building beautiful iOS and Android apps with Flutter and single codebase.',
    gradient: 'from-amber-400 to-orange-400',
  },
  {
    title: 'UI/UX Design',
    icon: Palette,
    description: 'Bridging code and creativity for seamless user experiences.',
    gradient: 'from-rose-400 to-pink-400',
  },
  {
    title: 'Backend Development',
    icon: Database,
    description: 'Robust server-side apps with Node.js, Express, MongoDB, and PostgreSQL.',
    gradient: 'from-blue-400 to-cyan-400',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    description: 'Cloud deployment and modern DevOps practices with CI/CD pipelines.',
    gradient: 'from-purple-400 to-indigo-400',
  },
  {
    title: 'Clean Code',
    icon: Code,
    description: 'Maintainable, scalable code following best practices and design patterns.',
    gradient: 'from-emerald-400 to-teal-400',
  },
];

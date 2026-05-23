import {
  Layout,
  FileText,
  Heart,
  Code,
  ShoppingBag,
  Building,
} from 'lucide-react';
import { Project } from '@/src/types';

export const projects: Project[] = [
  {
    title: 'Project Management Software',
    description: 'Streamlined task orchestration with drag-and-drop mechanics, real-time state management, and CRUD operations.',
    demo: 'https://projectmanagementkanban.vercel.app/',
    icon: Layout,
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['React', 'Drag & Drop', 'Task Management'],
    imagePattern: 'grid'
  },
  {
    title: 'Dynamic CV Maker',
    description: 'Professional resume generation with live preview, customizable templates, and instant PDF export.',
    github: 'https://github.com/kirandhakal/Dynamiccvmaker',
    demo: 'https://cv.dhakalkiran.com.np',
    icon: FileText,
    gradient: 'from-purple-500 to-pink-500',
    tags: ['PDF Generation', 'Templates', 'Career'],
    imagePattern: 'waves'
  },
  {
    title: 'Blood Bank Management',
    description: 'Healthcare solution orchestrating donor registration, inventory tracking, and distribution logistics.',
    github: 'https://github.com/kirandhakal/bloodbankmanagementsystem',
    icon: Heart,
    gradient: 'from-red-500 to-rose-500',
    tags: ['Healthcare', 'Database', 'Full Stack'],
    imagePattern: 'dots'
  },
  {
    title: 'Code Editor',
    description: 'Browser-based IDE for writing, compiling, and executing code instantly across multiple languages.',
    github: 'https://github.com/kirandhakal/codeeditor',
    demo: 'https://codeeditor-rose.vercel.app/',
    icon: Code,
    gradient: 'from-green-500 to-emerald-500',
    tags: ['Web IDE', 'Multi-language', 'Real-time'],
    imagePattern: 'lines'
  },
  {
    title: 'ShopBuddy',
    description: 'Shopping companion with dynamic lists, spending tracking, personalized recommendations, and budget awareness.',
    demo: 'https://fooddelivery-ten-ebon.vercel.app/',
    icon: ShoppingBag,
    gradient: 'from-orange-500 to-amber-500',
    tags: ['E-commerce', 'Budget Tracking', 'UX'],
    imagePattern: 'circles'
  },
  {
    title: 'Red Panda Hotel',
    description: 'Hospitality platform with reservation experiences, room inventory control, and guest service coordination.',
    demo: 'https://redpandahotelandlodge.vercel.app/',
    icon: Building,
    gradient: 'from-teal-500 to-cyan-500',
    tags: ['Hospitality', 'Booking', 'Management'],
    imagePattern: 'hexagons'
  },
];

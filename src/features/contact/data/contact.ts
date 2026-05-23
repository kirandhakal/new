import { Facebook, Instagram, Github, Linkedin, Mail, Phone, MapPin, Twitter, Youtube } from 'lucide-react';
import { SocialLink, ContactInfo } from '@/src/types';

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/kirandhakal715', color: 'bg-blue-600' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/dhakalkiran_', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/kirandhakal', color: 'bg-gray-900' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kirandhakal7/', color: 'bg-blue-700' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/dhakaldiary', color: 'bg-sky-500' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@kirandhakal715', color: 'bg-red-600' },
];

export const contactInfo: ContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'kirandhakal715@gmail.com', href: 'mailto:kirandhakal715@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977 9827591616', href: 'tel:+9779827591616' },
  { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal', href: '#' },
];

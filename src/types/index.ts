import React from 'react';

export interface Project {
  title: string;
  description: string;
  github?: string;
  demo?: string;
  icon: React.ComponentType<any>;
  gradient: string;
  tags: string[];
  imagePattern: 'grid' | 'dots' | 'lines' | 'circles' | 'waves' | 'hexagons';
}

export interface Service {
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  gradient: string;
}

export interface Skill {
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  code: string;
  color: string;
  bgColor: string;
}

export interface SocialLink {
  name: string;
  icon: React.ComponentType<any>;
  url: string;
  color: string;
}

export interface ContactInfo {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  href: string;
}


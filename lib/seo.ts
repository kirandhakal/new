import type { Metadata } from "next";

export const siteConfig = {
  name: "Kiran Dhakal",
  url: "https://kirandhakal.com",
} as const;

export const pageMetaTags = {
  home: {
    title: "Kiran Dhakal - Full Stack Developer | React & Node.js Expert",
    description: "Full-stack web developer specializing in React, Node.js, and modern web technologies. Explore my projects, skills, and services.",
    keywords: "web developer, React, Node.js, JavaScript, full-stack, portfolio",
    ogImage: "https://kirandhakal.com/og-image.jpg"
  },
  skills: {
    title: "Skills & Expertise - Kiran Dhakal",
    description: "Proficient in React, Node.js, Docker, Git, Figma, and modern web development tools. View my technical expertise and experience.",
    keywords: "React, Node.js, Docker, JavaScript, web development, skills"
  },
  projects: {
    title: "Projects - Kiran Dhakal",
    description: "Explore my portfolio of web development projects built with React, Node.js, and modern technologies.",
    keywords: "web projects, React projects, portfolio, case studies"
  },
  services: {
    title: "Services - Kiran Dhakal",
    description: "Full-stack web development services including front-end development, back-end development, and UI/UX design.",
    keywords: "web development services, React development, Node.js development, consulting"
  },
  contact: {
    title: "Contact - Kiran Dhakal",
    description: "Get in touch with me for web development projects, consultations, or inquiries.",
    keywords: "contact, hire developer, web development"
  }
} as const;

export type PageMetaKey = keyof typeof pageMetaTags;

export function metadataFor(page: PageMetaKey, path: string): Metadata {
  const meta = pageMetaTags[page];
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      images: "ogImage" in meta ? [meta.ogImage] : undefined,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: "ogImage" in meta ? [meta.ogImage] : undefined,
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kiran Dhakal",
  "url": "https://kirandhakal.com",
  "description": "Full-stack web developer specializing in React and Node.js",
  "jobTitle": "Full Stack Developer",
  "sameAs": [
    "https://github.com/kirandhakal",
    "https://linkedin.com/in/kirandhakal"
  ]
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProjectSchemaInput {
  name: string;
  description: string;
  url: string;
}

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://kirandhakal.com${item.url}`
  }))
});

export const getProjectSchema = (project: ProjectSchemaInput) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.name,
  "description": project.description,
  "creator": {
    "@type": "Person",
    "name": "Kiran Dhakal"
  },
  "url": project.url
});

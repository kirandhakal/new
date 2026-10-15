"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BellRing,
  BookOpen,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Hotel,
  Landmark,
  MessageSquare,
  Palette,
  PanelsTopLeft,
  ShoppingBag,
  Store,
  Utensils,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import projectsJson from "@/data/landing-page/home-project.json";
import type { ProjectContent } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";

const content = projectsJson as ProjectContent;
const icons: Record<string, LucideIcon> = {
  BellRing,
  FileText,
  GraduationCap,
  Hotel,
  Landmark,
  MessageSquare,
  Palette,
  PanelsTopLeft,
  ShoppingBag,
  Store,
  Utensils,
  Wrench,
};

const categoryNames = Object.fromEntries(
  content.categories.filter(({ key }) => key !== "all").map(({ key, label }) => [key, label]),
);

// One solid swatch per category so the grid reads at a glance.
const categoryTone: Record<string, string> = {
  govtech: "bg-lilac",
  saas: "bg-accent",
  commerce: "bg-coral",
  creative: "bg-warning",
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProjects = activeCategory === "all"
    ? content.items
    : content.items.filter((project) => project.category === activeCategory);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading
        index="03"
        eyebrow={content.eyebrow}
        title={<>Projects with <span className="text-accent">purpose</span></>}
        description={content.description}
      />

      <div
        className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        role="group"
        aria-label="Filter projects by category"
      >
        {content.categories.map((category) => {
          const isActive = activeCategory === category.key;
          const count = category.key === "all"
            ? content.items.length
            : content.items.filter((project) => project.category === category.key).length;
          return (
            <button
              key={category.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category.key)}
              className={`flex flex-none items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${isActive ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              {category.key !== "all" && <span className={`h-2 w-2 rounded-full ${isActive ? "bg-accent-foreground" : categoryTone[category.key]}`} />}
              {category.label}
              <sup className={`font-mono text-[10px] ${isActive ? "text-accent-foreground/70" : "text-muted-foreground/60"}`}>{count}</sup>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => {
          const Icon = icons[project.icon];
          const featured = index === 0;
          return (
            <Card
              key={`${activeCategory}-${project.title}`}
              className={`project-card-enter group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-accent sm:p-7 ${featured ? "md:col-span-2 lg:row-span-1" : ""}`}
              style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`font-display font-extrabold leading-none text-outline transition-colors ${featured ? "text-6xl sm:text-7xl" : "text-5xl"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={19} aria-hidden="true" />
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${categoryTone[project.category]}`} />{categoryNames[project.category]}</span>
                <span className="text-border">/</span>
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />Live</span>
              </div>

              <h3 className={`mt-3 font-display font-bold tracking-tight text-foreground ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{project.title}</h3>
              <p className={`mt-3 flex-1 leading-relaxed text-muted-foreground ${featured ? "max-w-xl text-base" : "text-sm"}`}>{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
                <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} className="inline-flex flex-1 items-center justify-between gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                  View project <ExternalLink size={15} />
                </a>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`} className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                    <Github size={17} />
                  </a>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-7 sm:p-10 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Open source</p>
          <p className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{content.githubPrompt}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={content.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-border px-6 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground">
            <Github size={18} />{content.githubLabel}
          </a>
          <Link href="/case-studies" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-colors hover:bg-primary">
            <BookOpen size={18} />{content.caseStudiesLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

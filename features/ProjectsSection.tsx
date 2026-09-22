"use client";

import { useState } from "react";
import {
  BellRing, ExternalLink, FileText, Github, GraduationCap, Hotel, Landmark,
  MessageSquare, Palette, PanelsTopLeft, ShoppingBag, Sparkles, Store, Utensils, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import projectsJson from "@/data/landing-page/home-project.json";
import type { ProjectContent } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { H2, P } from "@/components/typography";

const content = projectsJson as ProjectContent;
const icons: Record<string, LucideIcon> = {
  BellRing, FileText, GraduationCap, Hotel, Landmark, MessageSquare, Palette,
  PanelsTopLeft, ShoppingBag, Store, Utensils, Wrench,
};
const categoryNames = Object.fromEntries(
  content.categories.filter(({ key }) => key !== "all").map(({ key, label }) => [key, label]),
);

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProjects = activeCategory === "all"
    ? content.items
    : content.items.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf9f7] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 text-orange-600">
            <Sparkles size={16} className="text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">{content.eyebrow}</span>
          </div>
          <H2 className="mx-auto max-w-3xl text-4xl text-gray-950 sm:text-5xl md:text-6xl">{content.title}</H2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
          <P className="mx-auto mt-6 max-w-2xl text-lg">{content.description}</P>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
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
                className={`rounded-lg border px-4 py-2.5 text-sm font-semibold sm:px-5 ${isActive ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}
              >
                {category.label}
                <span className={`ml-2 text-xs ${isActive ? "text-gray-300" : "text-gray-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => {
            const Icon = icons[project.icon];
            return (
              <Card
                key={`${activeCategory}-${project.title}`}
                className="project-card-enter flex h-full flex-col rounded-2xl p-6 hover:border-orange-200 hover:shadow-md"
                style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-orange-600">{categoryNames[project.category]}</span>
                  </div>
                  <span className="flex flex-none items-center gap-1.5 text-xs font-medium text-gray-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Live</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-gray-950">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
                <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`} className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-950">
                      <Github size={16} /> Code
                    </a>
                  )}
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
                    View project <ExternalLink size={16} />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-14 border-t border-gray-200 pt-10 text-center">
          <p className="mb-4 font-medium text-gray-500">{content.githubPrompt}</p>
          <a href={content.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:border-gray-900">
            <Github size={19} />{content.githubLabel}<ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

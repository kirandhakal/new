"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
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
import ModuleHeading from "@/components/ModuleHeading";
import { hash } from "@/lib/board";

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

// Each category is a product family with its own part-number prefix and LED colour.
const family: Record<string, { prefix: string; led: string }> = {
  govtech: { prefix: "GOV", led: "text-led-blue" },
  saas: { prefix: "SAS", led: "text-led-green" },
  commerce: { prefix: "COM", led: "text-led-amber" },
  creative: { prefix: "CRT", led: "text-led-red" },
};

const partNumber = (category: string, index: number) => `KD-${family[category]?.prefix ?? "GEN"}-${String(index + 1).padStart(2, "0")}`;

/* Quad-flat-pack chip with pins on all four sides. */
const QfpChip = ({ index, active, enabled, onSelect }: { index: number; active: boolean; enabled: boolean; onSelect: () => void }) => {
  const project = content.items[index];
  const Icon = icons[project.icon] ?? FileText;
  const fam = family[project.category];
  const pins = (horizontal: boolean) =>
    Array.from({ length: 6 }, (_, i) => <span key={i} className={horizontal ? "h-[5px] w-[3px] bg-copper" : "h-[3px] w-[5px] bg-copper"} />);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!enabled}
      aria-pressed={active}
      aria-label={`${project.title} (${partNumber(project.category, index)})`}
      className={`group relative aspect-square w-full p-[7px] transition-opacity duration-300 ${enabled ? "" : "opacity-20"}`}
    >
      <span className="absolute inset-x-[22%] top-0 flex justify-between" aria-hidden="true">{pins(true)}</span>
      <span className="absolute inset-x-[22%] bottom-0 flex justify-between" aria-hidden="true">{pins(true)}</span>
      <span className="absolute inset-y-[22%] left-0 flex flex-col justify-between" aria-hidden="true">{pins(false)}</span>
      <span className="absolute inset-y-[22%] right-0 flex flex-col justify-between" aria-hidden="true">{pins(false)}</span>
      <span
        className={`relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-md bg-chip text-chip-foreground transition-all duration-300 ${
          active ? "ring-2 ring-accent ring-offset-2 ring-offset-board" : enabled ? "group-hover:-translate-y-0.5 group-hover:ring-1 group-hover:ring-copper" : ""
        }`}
      >
        <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full border border-chip-foreground/40" aria-hidden="true" />
        <span className={`led absolute right-1.5 top-1.5 h-1.5 w-1.5 ${fam?.led} ${active ? "" : "opacity-40"}`} />
        <Icon size={18} className="opacity-90" />
        <span className="font-mono text-[8px] tracking-[0.08em] opacity-60 sm:text-[9px]">{partNumber(project.category, index)}</span>
      </span>
    </button>
  );
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(0);

  const inCategory = (category: string) => activeCategory === "all" || category === activeCategory;
  const visible = content.items.map((p, i) => ({ ...p, index: i })).filter((p) => inCategory(p.category));
  const project = content.items[selected];
  const fam = family[project.category];
  const position = visible.findIndex((p) => p.index === selected);
  const revision = (hash(project.title) % 5) + 1;

  const pickCategory = (key: string) => {
    setActiveCategory(key);
    const first = content.items.findIndex((p) => key === "all" || p.category === key);
    if (first >= 0) setSelected(first);
  };

  const step = (dir: number) => {
    if (!visible.length) return;
    const next = visible[(Math.max(position, 0) + dir + visible.length) % visible.length];
    setSelected(next.index);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <ModuleHeading
        module="projects"
        title={<>Shipped <span className="text-copper">silicon</span></>}
        description={`${content.description} Every chip is a live product. Select one to read its datasheet.`}
      />

      <div className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter projects by product family">
        {content.categories.map((category) => {
          const isActive = activeCategory === category.key;
          const count = content.items.filter((p) => category.key === "all" || p.category === category.key).length;
          return (
            <button
              key={category.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => pickCategory(category.key)}
              className={`flex flex-none items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {category.key !== "all" && <span className={`led ${family[category.key]?.led}`} />}
              {category.label}
              <span className="font-mono text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* The board of chips */}
        <div className="pcb-grid self-start rounded-3xl border border-border bg-board p-4 sm:p-6 lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="silk">U4 · {content.items.length} ICs populated</span>
            <span className="silk">{visible.length} active</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
            {content.items.map((p, i) => (
              <QfpChip key={p.title} index={i} active={i === selected} enabled={inCategory(p.category)} onSelect={() => setSelected(i)} />
            ))}
          </div>
        </div>

        {/* Datasheet */}
        <AnimatePresence mode="wait">
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="min-w-0 overflow-hidden rounded-3xl border border-border bg-card lg:col-span-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="font-semibold text-foreground">Datasheet · {partNumber(project.category, selected)}</span>
              <span className="text-muted-foreground">Rev {revision}.0 · {categoryNames[project.category]}</span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">{project.title}</h3>
                <span className="mt-2 inline-flex flex-none items-center gap-2 rounded-md border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
                  <span className="led text-led-green" /> Live
                </span>
              </div>

              <p className="silk mt-6">1 · General description</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{project.description}</p>

              <p className="silk mt-6">2 · Pin configuration</p>
              <div className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {project.tags.map((tag, i) => (
                  <div key={tag} className="flex items-center gap-3 border-b border-dashed border-border py-2 font-mono text-sm">
                    <span className="w-8 text-copper">P{i + 1}</span>
                    <span className="h-[2px] w-4 bg-copper" aria-hidden="true" />
                    <span className="text-foreground">{tag}</span>
                  </div>
                ))}
              </div>

              <p className="silk mt-6">3 · Operating status</p>
              <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
                <span className={`inline-flex items-center gap-2 rounded-md bg-secondary px-2.5 py-1.5 ${fam?.led}`}>
                  <span className="led" /> <span className="text-foreground">{categoryNames[project.category]}</span>
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1.5 text-foreground">Deployed · production</span>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3.5 font-semibold text-background transition-transform hover:-translate-y-0.5">
                  Open live system <ExternalLink size={16} />
                </a>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground">
                    <Github size={16} /> Source
                  </a>
                )}
                <div className="flex items-center gap-2 sm:ml-auto">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous chip" className="flex h-11 w-11 items-center justify-center rounded-lg border border-border transition-colors hover:border-foreground">
                    <ArrowLeft size={17} />
                  </button>
                  <span className="w-12 text-center font-mono text-xs text-muted-foreground">{Math.max(position, 0) + 1}/{visible.length}</span>
                  <button type="button" onClick={() => step(1)} aria-label="Next chip" className="flex h-11 w-11 items-center justify-center rounded-lg border border-border transition-colors hover:border-foreground">
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-border p-7 sm:p-10 md:flex-row md:items-center">
        <div>
          <p className="silk">Open-source firmware</p>
          <p className="mt-3 font-display text-2xl font-bold uppercase sm:text-3xl">{content.githubPrompt}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={content.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg border border-border px-6 py-3.5 font-semibold transition-colors hover:border-foreground">
            <Github size={18} />{content.githubLabel}
          </a>
          <Link href="/case-studies" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-copper px-6 py-3.5 font-semibold text-background transition-transform hover:-translate-y-0.5">
            <BookOpen size={18} />{content.caseStudiesLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

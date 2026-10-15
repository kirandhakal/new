"use client";

import { useMemo, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import CampHeading from "@/components/CampHeading";

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

// One prayer-flag colour per category, used for the peak and its chip.
const categoryTone: Record<string, { bg: string; fill: string }> = {
  govtech: { bg: "bg-flag-blue", fill: "hsl(var(--flag-blue))" },
  saas: { bg: "bg-flag-yellow", fill: "hsl(var(--flag-yellow))" },
  commerce: { bg: "bg-flag-red", fill: "hsl(var(--flag-red))" },
  creative: { bg: "bg-flag-green", fill: "hsl(var(--flag-green))" },
};

/* Range geometry in a 1400×360 viewBox. Heights are fixed so the skyline never shifts. */
const BASE_Y = 340;
const HEIGHTS = [230, 170, 260, 196, 286, 176, 236, 304, 206, 262, 184, 244, 214, 276, 190, 250];
const peakAltitude = (h: number) => Math.round(6000 + h * 9.6);

const buildRange = (count: number) => {
  const step = 1300 / Math.max(count - 1, 1);
  const peaks = Array.from({ length: count }, (_, i) => ({ x: 50 + i * step, y: BASE_Y - HEIGHTS[i % HEIGHTS.length] }));
  const valleys = peaks.slice(0, -1).map((p, i) => {
    const next = peaks[i + 1];
    return { x: (p.x + next.x) / 2, y: BASE_Y - Math.min(BASE_Y - p.y, BASE_Y - next.y) * 0.42 };
  });
  const outline = [`M0 ${BASE_Y}`, `L0 ${BASE_Y - 40}`];
  peaks.forEach((p, i) => {
    outline.push(`L${p.x} ${p.y}`);
    if (valleys[i]) outline.push(`L${valleys[i].x} ${valleys[i].y}`);
  });
  outline.push(`L1400 ${BASE_Y - 40}`, `L1400 ${BASE_Y}`, "Z");
  const facets = peaks.map((p, i) => {
    const left = valleys[i - 1] ?? { x: 0, y: BASE_Y - 40 };
    const right = valleys[i] ?? { x: 1400, y: BASE_Y - 40 };
    return { left, right, peak: p };
  });
  return { outline: outline.join(" "), facets };
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(0);
  const range = useMemo(() => buildRange(content.items.length), []);

  const inCategory = (category: string) => activeCategory === "all" || category === activeCategory;
  const visible = content.items.map((p, i) => ({ ...p, index: i })).filter((p) => inCategory(p.category));
  const project = content.items[selected];
  const Icon = icons[project.icon];
  const tone = categoryTone[project.category];
  const position = visible.findIndex((p) => p.index === selected);

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
      <CampHeading
        camp="projects"
        title={<>Peaks I&apos;ve <span className="text-flag-green">summited</span>.</>}
        description={`${content.description} Every peak is a shipped project. Pick one to plant the flag.`}
      />

      <div
        className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        role="group"
        aria-label="Filter projects by category"
      >
        {content.categories.map((category) => {
          const isActive = activeCategory === category.key;
          const count = content.items.filter((p) => category.key === "all" || p.category === category.key).length;
          return (
            <button
              key={category.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => pickCategory(category.key)}
              className={`flex flex-none items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {category.key !== "all" && <span className={`h-2.5 w-2.5 rounded-[2px] ${categoryTone[category.key]?.bg}`} />}
              {category.label}
              <span className="font-mono text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* The range */}
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Range of {content.items.length} peaks</span>
          <span className="hidden sm:inline">Hover or tap a summit</span>
        </div>
        <div className="overflow-x-auto [scrollbar-width:none]">
        <svg viewBox="0 0 1400 360" className="block h-auto w-full min-w-[760px] md:min-w-0" role="group" aria-label="Projects as mountain peaks">
          {[100, 180, 260].map((y) => (
            <line key={y} x1="0" x2="1400" y1={y} y2={y} stroke="hsl(var(--border))" strokeDasharray="4 10" />
          ))}
          <path d={range.outline} fill="hsl(var(--secondary))" />
          {range.facets.map(({ left, right, peak }, i) => {
            const item = content.items[i];
            const active = i === selected;
            const enabled = inCategory(item.category);
            const capL = { x: peak.x + (left.x - peak.x) * 0.22, y: peak.y + (left.y - peak.y) * 0.22 };
            const capR = { x: peak.x + (right.x - peak.x) * 0.22, y: peak.y + (right.y - peak.y) * 0.22 };
            return (
              <g
                key={item.title}
                role="button"
                tabIndex={enabled ? 0 : -1}
                aria-label={`${item.title}, ${categoryNames[item.category]}`}
                aria-pressed={active}
                onClick={() => enabled && setSelected(i)}
                onMouseEnter={() => enabled && setSelected(i)}
                onKeyDown={(e) => {
                  if (enabled && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
                className={`outline-none transition-opacity duration-300 ${enabled ? "cursor-pointer" : "pointer-events-none"}`}
                style={{ opacity: enabled ? 1 : 0.18 }}
              >
                <path
                  d={`M${left.x} ${left.y} L${peak.x} ${peak.y} L${right.x} ${right.y} L${right.x} ${BASE_Y} L${left.x} ${BASE_Y} Z`}
                  fill={active ? categoryTone[item.category].fill : "hsl(var(--peak))"}
                  stroke="hsl(var(--card))"
                  strokeWidth="2"
                  className="transition-[fill] duration-300"
                />
                <path d={`M${peak.x} ${peak.y} L${capR.x} ${capR.y} L${peak.x + 4} ${capR.y - 6} L${capL.x} ${capL.y} Z`} fill="hsl(var(--snow))" opacity={active ? 1 : 0.85} />
                <text x={peak.x} y={BASE_Y - 10} textAnchor="middle" className={`font-mono text-[15px] ${active ? "fill-background" : "fill-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          {/* Planted flag on the selected summit */}
          {(() => {
            const { peak } = range.facets[selected];
            return (
              <motion.g key={selected} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} style={{ originY: 1, originX: 0 }} transition={{ type: "spring", stiffness: 220, damping: 14 }}>
                <line x1={peak.x} x2={peak.x} y1={peak.y} y2={peak.y - 46} stroke="hsl(var(--foreground))" strokeWidth="2.5" />
                <path d={`M${peak.x} ${peak.y - 46} h30 l-8 9 l8 9 h-30 Z`} fill="hsl(var(--accent))" />
              </motion.g>
            );
          })()}
        </svg>
        </div>
        <p className="px-5 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:hidden">← Swipe the range →</p>
      </div>

      {/* Selected peak */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <AnimatePresence mode="wait">
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-accent-foreground ${tone.bg}`}>
                  <Icon size={19} />
                </span>
                Peak {String(selected + 1).padStart(2, "0")} · {categoryNames[project.category]}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                ▲ {peakAltitude(HEIGHTS[selected % HEIGHTS.length]).toLocaleString("en-US")} m · <span className="text-flag-green">Live</span>
              </span>
            </div>

            <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">{project.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-dashed border-border pt-6 sm:flex-row sm:items-center">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Visit the summit <ExternalLink size={16} />
              </a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground">
                  <Github size={16} /> Source
                </a>
              )}
              <div className="flex items-center gap-2 sm:ml-auto">
                <button type="button" onClick={() => step(-1)} aria-label="Previous peak" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground">
                  <ArrowLeft size={17} />
                </button>
                <span className="w-14 text-center font-mono text-xs text-muted-foreground">{Math.max(position, 0) + 1}/{visible.length}</span>
                <button type="button" onClick={() => step(1)} aria-label="Next peak" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground">
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Summit log */}
        <div className="min-w-0 rounded-3xl border border-border bg-card lg:col-span-4">
          <p className="border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Summit log</p>
          <ol className="max-h-[22rem] overflow-y-auto p-2 [scrollbar-width:thin]">
            {visible.map((p) => (
              <li key={p.title}>
                <button
                  type="button"
                  onClick={() => setSelected(p.index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${p.index === selected ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}
                >
                  <span className="w-6 font-mono text-[11px]">{String(p.index + 1).padStart(2, "0")}</span>
                  <span className={`h-2.5 w-2.5 flex-none rounded-[2px] ${categoryTone[p.category]?.bg}`} />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{p.title}</span>
                  {p.index === selected && <span className="text-accent" aria-hidden="true">⚑</span>}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-border p-7 sm:p-10 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Unmapped trails</p>
          <p className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{content.githubPrompt}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={content.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-border px-6 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground">
            <Github size={18} />{content.githubLabel}
          </a>
          <Link href="/case-studies" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-foreground px-6 py-3.5 font-semibold text-background transition-transform hover:-translate-y-0.5">
            <BookOpen size={18} />{content.caseStudiesLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

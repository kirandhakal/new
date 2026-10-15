"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Braces, Code2 } from 'lucide-react';
import skillsJson from '@/data/landing-page/home-skills.json';
import type { SkillContent } from '@/types/content';
import CampHeading from '@/components/CampHeading';
import { FLAG_TONES } from '@/lib/expedition';
import { codeFileName as fileName, highlight } from '@/lib/highlight';

const content = skillsJson as SkillContent;

// Brand SVGs are flattened to one dark tone so they read on the coloured chip.
const svgIcon = (src: string, alt: string) => (
  <img src={src} alt={alt} className="h-5 w-5 object-contain brightness-0" />
);

const skillIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 size={20} />,
  Braces: <Braces size={20} />,
  Node: svgIcon('/images/node.svg', 'Node.js'),
  Figma: svgIcon('/images/figma.svg', 'Figma'),
  Git: svgIcon('/images/git.svg', 'Git'),
  GitHub: svgIcon('/images/github.svg', 'GitHub'),
  Docker: svgIcon('/images/docker.svg', 'Docker'),
};

/* Map is drawn in a 1000×600 viewBox. Waypoints climb from bottom-left to the top-right. */
const WAYPOINTS: Array<[number, number]> = [
  [90, 520], [235, 440], [380, 488], [500, 352], [650, 392], [770, 250], [905, 112],
];
const waypointAltitude = (i: number) => 5400 + i * 160;

const TRAIL = WAYPOINTS.reduce((d, [x, y], i) => {
  if (i === 0) return `M${x} ${y}`;
  const [px, py] = WAYPOINTS[i - 1];
  return `${d} Q${(px + x) / 2 + (i % 2 ? 40 : -40)} ${(py + y) / 2 + 30} ${x} ${y}`;
}, '');

/* Wobbly concentric rings around two summits make the contour lines. */
const contour = (cx: number, cy: number, radius: number, seed: number) => {
  const pts = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const r = radius * (1 + 0.14 * Math.sin(3 * a + seed) + 0.07 * Math.sin(5 * a + seed * 2));
    return `${(cx + Math.cos(a) * r * 1.5).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  });
  return `M${pts.join(' L')} Z`;
};
const CONTOURS = [
  ...Array.from({ length: 8 }, (_, k) => contour(880, 150, 26 + k * 46, k * 0.7)),
  ...Array.from({ length: 5 }, (_, k) => contour(260, 470, 22 + k * 40, k * 1.3 + 2)),
];

const SkillsSection = () => {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const total = content.items.length;
  const skill = content.items[active];

  // Walk the trail on its own until the visitor takes over.
  useEffect(() => {
    if (touched) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 4200);
    return () => clearInterval(id);
  }, [touched, total]);

  const go = (index: number) => {
    setTouched(true);
    setActive((index + total) % total);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <CampHeading
        camp="skills"
        title={<>The route map, <span className="text-flag-red">one waypoint</span> at a time.</>}
        description={`${content.description}. Tap a waypoint to read the field notes.`}
      />

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Topographic map */}
        <div className="relative min-w-0 overflow-hidden rounded-3xl border border-border bg-card lg:col-span-7">
          <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Sheet 07 · Skills range</span>
            <span>1 : 25,000</span>
          </div>
          <div className="relative aspect-[5/3]">
            <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {CONTOURS.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="hsl(var(--muted-foreground) / 0.18)" strokeWidth={i % 4 === 0 ? 1.6 : 0.9} />
              ))}
              <path d={TRAIL} fill="none" stroke="hsl(var(--border))" strokeWidth="6" strokeLinecap="round" />
              <path d={TRAIL} fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeDasharray="10 10" strokeLinecap="round" className="animate-trail" />
              <text x="905" y="62" textAnchor="middle" className="fill-muted-foreground font-mono text-[18px]">▲ 6,400</text>
            </svg>

            {content.items.map((item, i) => {
              const [x, y] = WAYPOINTS[i % WAYPOINTS.length];
              const isActive = i === active;
              const visited = i < active;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${item.name}, waypoint ${i + 1}`}
                  aria-pressed={isActive}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x / 10}%`, top: `${y / 6}%` }}
                >
                  {isActive && <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />}
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold transition-all duration-300 sm:h-9 sm:w-9 sm:text-xs ${
                      isActive
                        ? 'scale-110 border-accent bg-accent text-accent-foreground'
                        : visited
                          ? 'border-accent bg-background text-accent'
                          : 'border-muted-foreground/60 bg-background text-muted-foreground group-hover:border-foreground group-hover:text-foreground'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background/90 px-2 py-1 text-xs font-semibold transition-opacity sm:block ${
                      isActive ? 'text-foreground opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 border-t border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-accent" /> Trail</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-accent" /> Visited</span>
            <span className="ml-auto">{active + 1} / {total}</span>
          </div>
        </div>

        {/* Field notes */}
        <div className="min-w-0 lg:col-span-5">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Field notes · Day {String(active + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">▲ {waypointAltitude(active).toLocaleString('en-US')} m</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="flex flex-1 flex-col p-5 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl text-accent-foreground ${FLAG_TONES[active % FLAG_TONES.length]}`}>
                    {skillIcons[skill.icon]}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </div>

                <div className="mt-5 flex-1 overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
                    <span>{fileName(skill.name)}</span>
                    <span className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-flag-red" />
                      <span className="h-2 w-2 rounded-full bg-flag-yellow" />
                      <span className="h-2 w-2 rounded-full bg-flag-green" />
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 text-foreground">
                    <code>
                      {skill.code.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="mr-4 inline-block w-4 flex-none select-none text-right text-muted-foreground/40">{i + 1}</span>
                          <span className="whitespace-pre">{highlight(line)}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-3 border-t border-border p-3">
              <button type="button" onClick={() => go(active - 1)} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <ArrowLeft size={16} /> Back
              </button>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:inline">{touched ? 'Manual' : 'Auto-trek'}</span>
              <button type="button" onClick={() => go(active + 1)} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">
                Next waypoint <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:tracking-[0.24em]">
        ⛰ {content.footer} ⛰
      </p>
    </div>
  );
};

export default SkillsSection;

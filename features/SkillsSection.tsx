"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import skillsJson from '@/data/landing-page/home-skills.json';
import type { SkillContent } from '@/types/content';
import ModuleHeading from '@/components/ModuleHeading';
import { LED_TEXT, hash, toHex } from '@/lib/board';
import { codeFileName, highlight } from '@/lib/highlight';

const content = skillsJson as SkillContent;
const LEVELS = [92, 90, 86, 78, 88, 84, 76];
const partNo = (name: string) => `KD${(hash(name) % 9000) + 1000}`;

/* A square wave whose bit pattern comes from the skill's name, so every chip has its own signal. */
const waveform = (seed: number, bits = 24, w = 600, h = 34) => {
  const step = w / bits;
  let d = '';
  let prev = -1;
  for (let i = 0; i < bits; i++) {
    const bit = (seed >> (i % 31)) & 1;
    const y = bit ? 4 : h - 4;
    d += prev === -1 ? `M0 ${y}` : prev !== bit ? ` V${y}` : '';
    d += ` H${(i + 1) * step}`;
    prev = bit;
  }
  return d;
};

/* DIP chip on the breadboard: one per skill. */
const DipChip = ({ name, active, onClick, led }: { name: string; active: boolean; onClick: () => void; led: string }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className="group relative flex flex-none snap-start flex-col items-center px-2 py-3"
  >
    {/* legs */}
    <span className="absolute inset-x-4 top-0 flex justify-between" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-3 w-[3px] bg-copper/80" />)}
    </span>
    <span className="absolute inset-x-4 bottom-0 flex justify-between" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-3 w-[3px] bg-copper/80" />)}
    </span>
    <span
      className={`relative flex h-20 w-36 flex-col items-center justify-center rounded-md bg-chip px-2 text-center text-chip-foreground transition-all duration-300 sm:w-40 ${
        active ? 'ring-2 ring-accent ring-offset-2 ring-offset-board' : 'group-hover:-translate-y-0.5'
      }`}
    >
      <span className="absolute left-0 top-1/2 h-4 w-2 -translate-y-1/2 rounded-r-full bg-board" aria-hidden="true" />
      <span className="font-mono text-[9px] tracking-[0.14em] opacity-60">{partNo(name)}</span>
      <span className="mt-0.5 line-clamp-2 font-display text-sm font-bold uppercase leading-tight">{name}</span>
      {active && <span className={`led absolute right-2 top-2 ${led}`} />}
    </span>
  </button>
);

const SkillsSection = () => {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const total = content.items.length;
  const skill = content.items[active];
  const level = LEVELS[active % LEVELS.length];
  const seed = useMemo(() => hash(skill.name), [skill.name]);

  // Cycle through chips on its own until the visitor probes one.
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
      <ModuleHeading
        module="skills"
        title={<>Logic <span className="text-copper">analyzer</span></>}
        description={`${content.description}. Probe a chip to read its signal.`}
      />

      {/* Breadboard */}
      <div className="pcb-grid mt-14 rounded-3xl border border-border bg-board p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="silk">Breadboard · {total} ICs</span>
          <span className="silk hidden sm:inline">{touched ? 'Manual probe' : 'Auto-scan'}</span>
        </div>
        <div role="tablist" aria-label="Skills" className="-mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
          {content.items.map((item, i) => (
            <DipChip key={item.name} name={item.name} active={i === active} onClick={() => go(i)} led={LED_TEXT[i % LED_TEXT.length]} />
          ))}
        </div>
      </div>

      {/* Analyzer screen */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-chip text-chip-foreground shadow-lifted">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-chip-foreground/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em]">
          <span className="text-chip-foreground/60">Probe · CH1–CH3 · 100 MHz</span>
          <span className="text-led-green">● Trigger armed</span>
        </div>

        <div className="grid lg:grid-cols-12">
          {/* waveforms */}
          <div className="border-b border-chip-foreground/10 p-5 lg:col-span-7 lg:border-b-0 lg:border-r">
            <AnimatePresence mode="wait">
              <motion.div key={skill.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] text-chip-foreground/50">{partNo(skill.name)} · {skill.description}</p>
                    <h3 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight">{skill.name}</h3>
                  </div>
                  <p className="font-mono text-sm">
                    level <span className="text-led-green">{level}%</span> <span className="text-chip-foreground/40">{toHex(level)}</span>
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { label: 'CLK', d: waveform(0b101010101010101010101010101010, 24), color: 'hsl(var(--chip-foreground) / 0.5)' },
                    { label: 'SIG', d: waveform(seed, 24), color: 'hsl(var(--led-green))' },
                    { label: 'DATA', d: waveform(seed >>> 7, 24), color: 'hsl(var(--led-amber))' },
                  ].map((ch) => (
                    <div key={ch.label} className="flex items-center gap-3">
                      <span className="w-10 flex-none font-mono text-[10px] text-chip-foreground/50">{ch.label}</span>
                      <svg viewBox="0 0 600 34" preserveAspectRatio="none" className="h-8 w-full" aria-hidden="true">
                        <line x1="0" x2="600" y1="17" y2="17" stroke="hsl(var(--chip-foreground) / 0.08)" />
                        <motion.path
                          d={ch.d}
                          fill="none"
                          stroke={ch.color}
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* level as a 10-segment bar graph LED */}
                <div className="mt-6 flex gap-1.5" aria-label={`Proficiency ${level} percent`}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`h-3 flex-1 rounded-[2px] ${i < Math.round(level / 10) ? (i > 7 ? 'bg-led-red' : i > 5 ? 'bg-led-amber' : 'bg-led-green') : 'bg-chip-foreground/10'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* decoded payload */}
          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center justify-between border-b border-chip-foreground/10 px-5 py-2.5 font-mono text-[11px] text-chip-foreground/60">
              <span>decode → {codeFileName(skill.name)}</span>
              <span>{skill.code.split('\n').length} lines</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.pre
                key={skill.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="max-h-72 flex-1 overflow-auto p-5 font-mono text-[12.5px] leading-6"
              >
                <code>
                  {skill.code.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="mr-4 inline-block w-4 flex-none select-none text-right text-chip-foreground/30">{i + 1}</span>
                      <span className="whitespace-pre">{highlight(line)}</span>
                    </div>
                  ))}
                </code>
              </motion.pre>
            </AnimatePresence>
            <div className="flex items-center justify-between gap-2 border-t border-chip-foreground/10 p-3">
              <button type="button" onClick={() => go(active - 1)} className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider text-chip-foreground/70 transition-colors hover:text-chip-foreground">
                <ArrowLeft size={15} /> Prev
              </button>
              <span className="font-mono text-[11px] text-chip-foreground/50">{active + 1}/{total}</span>
              <button type="button" onClick={() => go(active + 1)} className="inline-flex items-center gap-2 rounded-md bg-led-green px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-chip transition-transform hover:-translate-y-0.5">
                Next chip <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        // {content.footer}
      </p>
    </div>
  );
};

export default SkillsSection;

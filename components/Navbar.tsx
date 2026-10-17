"use client";

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CircuitBoard, Cpu, MemoryStick, Microchip, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionKey } from '@/types/navigation';
import { MODULES, MODULE_ORDER } from '@/lib/board';

interface NavBarProps {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

const moduleIcons: Record<SectionKey, LucideIcon> = {
  home: Cpu,
  services: CircuitBoard,
  skills: MemoryStick,
  projects: Microchip,
  contact: Terminal,
};

/* Scroll position shown as a program counter: 0x0000 at the top of the page, 0xFFFF at the end. */
const useProgramCounter = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const pc = useTransform(progress, (v) => `0x${Math.round(Math.min(Math.max(v, 0), 1) * 0xffff).toString(16).toUpperCase().padStart(4, '0')}`);
  return { progress, pc };
};

const Navbar = ({ activeSection, setActiveSection }: NavBarProps) => {
  const { progress, pc } = useProgramCounter();
  const signalHeight = useTransform(progress, (v) => `${v * 100}%`);
  const barWidth = useTransform(progress, (v) => `${v * 100}%`);
  const active = MODULES[activeSection];

  return (
    <>
      {/* Phone + tablet: bottom bus bar */}
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden safe-area-pb">
        <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-card/95 shadow-lifted backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="flex min-w-0 items-center gap-2 truncate">
              {active.ref} · {active.addr} · {active.name}
            </span>
            <span className="flex-none text-accent">PC <motion.span>{pc}</motion.span></span>
          </div>
          <div className="relative h-[3px] bg-secondary">
            <motion.span className="absolute inset-y-0 left-0 bg-copper" style={{ width: barWidth }} />
          </div>
          <div className="flex items-center justify-between p-1.5">
            {MODULE_ORDER.map((key) => {
              const Icon = moduleIcons[key];
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  aria-label={`${MODULES[key].name}: ${MODULES[key].label}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex h-11 items-center justify-center gap-1.5 rounded-xl transition-all duration-300 ${
                    isActive ? 'flex-[1.9] bg-foreground px-3 text-background' : 'flex-1 text-muted-foreground active:bg-secondary'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.1} />
                  {isActive && <span className="whitespace-nowrap font-mono text-[11px] font-semibold uppercase">{MODULES[key].name}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop: vertical data bus — every module is a pad you can jump to */}
      <nav aria-label="Primary" className="fixed bottom-10 left-6 top-28 z-40 hidden w-16 flex-col items-center lg:flex">
        <div className="mb-4 w-full rounded-lg border border-border bg-card/90 px-1 py-2 text-center backdrop-blur">
          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">PC</span>
          <span className="block font-mono text-[11px] font-semibold tabular-nums text-accent"><motion.span>{pc}</motion.span></span>
        </div>

        <div className="relative w-full flex-1">
          {/* Copper bus, with the signal filling it as you scroll */}
          <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-copper/25" />
          <motion.span className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-copper" style={{ height: signalHeight }} />

          {MODULE_ORDER.map((key, i) => {
            const m = MODULES[key];
            const isActive = activeSection === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSection(key)}
                aria-label={`${m.name}: ${m.label}`}
                aria-current={isActive ? 'page' : undefined}
                className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${(i / (MODULE_ORDER.length - 1)) * 100}%` }}
              >
                <span
                  className={`flex h-7 w-10 items-center justify-center rounded-[4px] border-2 font-mono text-[9px] font-semibold transition-all duration-300 ${
                    isActive ? 'border-copper bg-copper text-background' : 'border-copper/60 bg-background text-muted-foreground group-hover:border-copper group-hover:text-foreground'
                  }`}
                >
                  {m.ref}
                </span>
                <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-left opacity-0 shadow-soft transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="block font-display text-sm font-bold uppercase text-foreground">{m.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{m.addr} · {m.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

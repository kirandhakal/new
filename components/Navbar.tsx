"use client";

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Backpack, Flag, Map, Mountain, Tent } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionKey } from '@/types/navigation';
import { BASE_ALTITUDE, CAMPS, CAMP_ORDER, SUMMIT_ALTITUDE, altitudeFraction } from '@/lib/expedition';

interface NavBarProps {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

const campIcons: Record<SectionKey, LucideIcon> = {
  home: Tent,
  services: Backpack,
  skills: Map,
  projects: Mountain,
  contact: Flag,
};

/* Altitude follows page scroll: the top of the page is Kathmandu, the bottom is the summit. */
const useAltitude = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const meters = useTransform(progress, [0, 1], [BASE_ALTITUDE, SUMMIT_ALTITUDE]);
  const readout = useTransform(meters, (v) => Math.round(v).toLocaleString('en-US'));
  return { progress, readout };
};

const Navbar = ({ activeSection, setActiveSection }: NavBarProps) => {
  const { progress, readout } = useAltitude();
  const markerBottom = useTransform(progress, (v) => `${v * 100}%`);
  const barWidth = useTransform(progress, (v) => `${v * 100}%`);
  const activeCamp = CAMPS[activeSection];

  return (
    <>
      {/* Mobile + tablet: bottom camp bar with a live altimeter strip */}
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden safe-area-pb">
        <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-card/95 shadow-lifted backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="truncate">{activeCamp.name} · {activeCamp.label}</span>
            <span className="flex-none text-accent">▲ <motion.span>{readout}</motion.span> m</span>
          </div>
          <div className="relative h-[3px] bg-secondary">
            <motion.span className="absolute inset-y-0 left-0 bg-accent" style={{ width: barWidth }} />
          </div>
          <div className="flex items-center justify-between p-1.5">
            {CAMP_ORDER.map((key) => {
              const Icon = campIcons[key];
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  aria-label={`${CAMPS[key].name}: ${CAMPS[key].label}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex h-11 items-center justify-center gap-1.5 rounded-xl transition-all duration-300 ${
                    isActive ? 'flex-[1.9] bg-accent px-3 text-accent-foreground' : 'flex-1 text-muted-foreground active:bg-secondary'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} />
                  {isActive && <span className="whitespace-nowrap text-xs font-bold">{CAMPS[key].short}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop: vertical altimeter rail — camps are the navigation */}
      <nav aria-label="Primary" className="fixed bottom-10 left-6 top-28 z-40 hidden w-16 flex-col items-center lg:flex">
        <div className="mb-4 w-full rounded-xl border border-border bg-card/90 px-1 py-2 text-center backdrop-blur">
          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Alt</span>
          <span className="block font-mono text-xs font-bold tabular-nums text-accent"><motion.span>{readout}</motion.span></span>
          <span className="block font-mono text-[9px] text-muted-foreground">m</span>
        </div>

        <div className="relative w-full flex-1">
          {/* Track + tick marks every 1,000 m */}
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
          {Array.from({ length: 8 }, (_, i) => 2000 + i * 1000).map((alt) => (
            <span
              key={alt}
              className="absolute left-1/2 h-px w-2 -translate-x-1/2 bg-muted-foreground/40"
              style={{ bottom: `${altitudeFraction(alt) * 100}%` }}
            />
          ))}
          <motion.span className="absolute bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-accent" style={{ height: markerBottom }} />

          {CAMP_ORDER.map((key) => {
            const camp = CAMPS[key];
            const isActive = activeSection === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSection(key)}
                aria-current={isActive ? 'page' : undefined}
                className="group absolute left-1/2 -translate-x-1/2 translate-y-1/2"
                style={{ bottom: `${altitudeFraction(camp.altitude) * 100}%` }}
              >
                <span
                  className={`block h-3.5 w-3.5 rotate-45 rounded-[3px] border-2 transition-all duration-300 ${
                    isActive ? 'scale-125 border-accent bg-accent' : 'border-muted-foreground bg-background group-hover:border-foreground'
                  }`}
                />
                <span
                  className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg border border-border bg-card px-3 py-1.5 text-left opacity-0 shadow-soft transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="block font-display text-sm font-bold text-foreground">{camp.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{camp.label}</span>
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

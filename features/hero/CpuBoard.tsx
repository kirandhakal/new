"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CircuitBoard, MemoryStick, Microchip, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroJson from "@/data/landing-page/home-hero.json";
import type { HeroContent } from "@/types/content";
import type { SectionKey } from "@/types/navigation";
import { MODULES } from "@/lib/board";

const hero = heroJson as HeroContent;

type Target = Exclude<SectionKey, "home">;

/* Board drawn in a 600×520 viewBox. The CPU sits in the middle; one trace runs to each module pad. */
const PADS: Array<{ key: Target; x: number; y: number; icon: LucideIcon; trace: string }> = [
  { key: "services", x: 80, y: 70, icon: CircuitBoard, trace: "M235 160 V115 L190 70 H120" },
  { key: "skills", x: 520, y: 70, icon: MemoryStick, trace: "M365 160 V115 L410 70 H480" },
  { key: "projects", x: 80, y: 450, icon: Microchip, trace: "M235 360 V405 L190 450 H120" },
  { key: "contact", x: 520, y: 450, icon: Terminal, trace: "M365 360 V405 L410 450 H480" },
];

/* Decorative bus lines leaving the CPU's left and right edges. */
const SIDE_TRACES = [190, 215, 240, 265, 290, 315, 340].flatMap((y, i) => [
  `M210 ${y} H${150 - (i % 3) * 14} L${130 - (i % 3) * 14} ${y + (i % 2 ? 18 : -18)} H${40 + i * 4}`,
  `M390 ${y} H${450 + (i % 3) * 14} L${470 + (i % 3) * 14} ${y + (i % 2 ? -18 : 18)} H${560 - i * 4}`,
]);

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/* The hero board: hover a pad to light its trace, click it to jump to that module. */
export default function CpuBoard({ onNavigate }: { onNavigate: (key: SectionKey) => void }) {
  const [hovered, setHovered] = useState<Target | null>(null);

  return (
    <div className="pcb-grid relative aspect-[600/520] w-full overflow-hidden rounded-3xl border border-border bg-board">
      <svg viewBox="0 0 600 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {SIDE_TRACES.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="hsl(var(--copper) / 0.35)" strokeWidth="3" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="hsl(var(--copper))" strokeWidth="3" strokeDasharray="6 114" className="animate-signal" style={{ animationDelay: `${i * -0.23}s` }} />
          </g>
        ))}
        {SIDE_TRACES.map((d, i) => {
          const end = d.match(/H(\d+)$/);
          const y = d.match(/L\d+ (\d+)/);
          return end && y ? <circle key={`via-${i}`} cx={end[1]} cy={y[1]} r="5" fill="hsl(var(--board))" stroke="hsl(var(--copper) / 0.7)" strokeWidth="2.5" /> : null;
        })}

        {PADS.map((pad) => {
          const lit = hovered === pad.key;
          return (
            <g key={pad.key}>
              <path d={pad.trace} fill="none" stroke={lit ? "hsl(var(--copper))" : "hsl(var(--copper) / 0.45)"} strokeWidth="6" strokeLinejoin="round" className="transition-[stroke] duration-300" />
              <path
                d={pad.trace}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={lit ? "18 22" : "8 112"}
                className="animate-signal"
              />
            </g>
          );
        })}

        {/* Passive parts: resistors and capacitors scattered on the board */}
        {[[300, 60], [300, 470], [560, 260], [40, 260]].map(([x, y], i) => (
          <g key={`r-${i}`} transform={`translate(${x} ${y}) rotate(${i > 1 ? 90 : 0})`}>
            <rect x="-18" y="-6" width="36" height="12" rx="3" fill="hsl(var(--chip))" />
            <rect x="-24" y="-4" width="6" height="8" fill="hsl(var(--copper))" />
            <rect x="18" y="-4" width="6" height="8" fill="hsl(var(--copper))" />
          </g>
        ))}
        <text x="300" y="38" textAnchor="middle" className="fill-muted-foreground font-mono text-[11px] tracking-[0.2em]">KD-2026 REV.A</text>
      </svg>

      {/* CPU package with a window onto the die (Kiran's photo) */}
      <motion.div
        whileHover={{ scale: 1.03, rotate: -1 }}
        className="absolute flex flex-col items-center justify-center rounded-xl bg-chip p-[3%] text-chip-foreground shadow-lifted"
        style={{ left: pct(210, 600), top: pct(160, 520), width: pct(180, 600), height: pct(200, 520) }}
      >
        {/* pins */}
        {(["top", "bottom"] as const).map((side) => (
          <span key={side} className={`absolute inset-x-[10%] flex justify-between ${side === "top" ? "-top-[7px]" : "-bottom-[7px]"}`} aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <span key={i} className="h-[7px] w-[3px] bg-copper" />)}
          </span>
        ))}
        {(["left", "right"] as const).map((side) => (
          <span key={side} className={`absolute inset-y-[10%] flex flex-col justify-between ${side === "left" ? "-left-[7px]" : "-right-[7px]"}`} aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <span key={i} className="h-[3px] w-[7px] bg-copper" />)}
          </span>
        ))}
        <span className="absolute left-[7%] top-[6%] h-2 w-2 rounded-full border border-chip-foreground/50" aria-hidden="true" />

        {/* Die window: photo fills the package like a microprocessor die */}
        <div className="relative mt-[8%] aspect-square w-[78%] overflow-hidden rounded-md border-2 border-copper/70 shadow-[inset_0_0_0_1px_hsl(var(--chip))]">
          <img src={hero.image} alt={hero.imageAlt} className="h-full w-full object-cover object-top" />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--copper)/0.12),transparent_40%,hsl(var(--chip)/0.25))]" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--chip)) 3px, hsl(var(--chip)) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, hsl(var(--chip)) 3px, hsl(var(--chip)) 4px)" }} aria-hidden="true" />
        </div>
        <p className="mt-[4%] font-display text-[clamp(0.55rem,1.4vw,0.9rem)] font-bold uppercase leading-none tracking-wider">Kiran Dhakal</p>
        <p className="mt-1 font-mono text-[clamp(0.4rem,0.95vw,0.55rem)] uppercase tracking-[0.18em] opacity-60">KD-2026 · Full-stack</p>
      </motion.div>

      {/* Module pads */}
      {PADS.map((pad) => {
        const m = MODULES[pad.key];
        const Icon = pad.icon;
        return (
          <button
            key={pad.key}
            type="button"
            onClick={() => onNavigate(pad.key)}
            onMouseEnter={() => setHovered(pad.key)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(pad.key)}
            onBlur={() => setHovered(null)}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: pct(pad.x, 600), top: pct(pad.y, 520) }}
            aria-label={`Go to ${m.name}`}
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-lg border-2 border-copper bg-card text-foreground shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-foreground group-hover:text-background sm:h-14 sm:w-14">
              <Icon size={20} />
            </span>
            <span className="whitespace-nowrap rounded bg-background/80 px-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground sm:text-[10px]">
              {m.ref} · {m.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

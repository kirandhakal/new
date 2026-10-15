"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Terminal as TerminalIcon } from "lucide-react";
import type { SectionKey } from "@/types/navigation";
import heroJson from "@/data/landing-page/home-hero.json";
import type { HeroContent } from "@/types/content";
import { toHex } from "@/lib/board";
import BootScreen from "./hero/BootScreen";
import CpuBoard from "./hero/CpuBoard";
import Terminal from "./hero/Terminal";

interface HomeSectionProps {
  setActiveSection: (section: SectionKey) => void;
}

const hero = heroJson as HeroContent;
const fullName = hero.name.replace(/^I'm\s+/i, "");
const [firstName, ...rest] = fullName.split(" ");

const SPECS: Array<[string, string]> = [
  ["Architecture", "Full-stack web"],
  ["Clock", `${hero.stats[0]?.value ?? "3+"} years in production`],
  ["Cores", "React · Next.js · Node · NestJS"],
  ["Memory", `${hero.stats[1]?.value ?? "20+"} shipped projects`],
  ["I/O", "Kathmandu, Nepal · remote OK"],
  ["Power", "Coffee & curiosity"],
];

/* Landing: the visitor powers on the board, then meets the CPU (Kiran), its traces and a live shell. */
const HomeSection = ({ setActiveSection }: HomeSectionProps) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % hero.roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <BootScreen />

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 md:pt-14 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-5">
            <p className="eyebrow">
              <span className="led text-led-green" /> U1 · 0x00 · main processor
            </p>
            <h1 className="mt-6 font-display text-[clamp(3.2rem,11vw,6.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.03em] text-foreground">
              {firstName}
              <br />
              <span className="text-copper">{rest.join(" ")}</span>
            </h1>

            <div className="mt-7 flex h-10 items-center gap-2 overflow-hidden font-mono text-base sm:text-lg">
              <span className="text-muted-foreground">&gt; compiling</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={hero.roles[roleIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap font-semibold text-accent"
                >
                  {hero.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="h-5 w-2.5 animate-blink bg-accent" />
            </div>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.description} Computer engineer by training: I care about the whole stack, from database schema to the last pixel.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/Kiran-Dhakal-CV.pdf"
                download={hero.download.filename}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-foreground px-6 py-4 font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                <Download size={18} /> Download datasheet <span className="font-mono text-xs opacity-60">(CV)</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveSection("contact")}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg border-2 border-copper px-6 py-4 font-semibold text-foreground transition-colors hover:bg-copper hover:text-background"
              >
                <TerminalIcon size={18} /> Open serial port
              </button>
            </div>

            {/* Stats shown as CPU registers */}
            <dl className="mt-10 grid grid-cols-3 gap-2">
              {hero.stats.map((stat, i) => (
                <div key={stat.label} className="rounded-lg border border-border bg-card px-3 py-3">
                  <dt className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">R{i} · {stat.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</dd>
                  <dd className="font-mono text-[10px] text-copper">{toHex(parseInt(stat.value, 10) || 0)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Board */}
          <div className="lg:col-span-7">
            <CpuBoard onNavigate={setActiveSection} />
            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Hover a pad to trace the signal · click to jump
            </p>
          </div>
        </div>

        {/* Shell + spec sheet */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <Terminal onNavigate={setActiveSection} />
          </div>
          <div className="min-w-0 rounded-3xl border border-border bg-card p-6 lg:col-span-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold uppercase">Spec sheet</p>
              <span className="silk">U1</span>
            </div>
            <dl className="mt-4 divide-y divide-dashed divide-border">
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                  <dd className="text-right text-sm font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;

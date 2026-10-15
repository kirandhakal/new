"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Download } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { SectionKey } from "@/types/navigation";
import heroJson from "@/data/landing-page/home-hero.json";
import type { HeroContent } from "@/types/content";
import PrayerFlags from "@/components/expedition/PrayerFlags";
import { FLAG_TONES } from "@/lib/expedition";

interface HomeSectionProps {
  setActiveSection: (section: SectionKey) => void;
}

const hero = heroJson as HeroContent;
const fullName = hero.name.replace(/^I'm\s+/i, "");

/* Deterministic star field so server and client render the same sky. */
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  return { left: r(1) * 100, top: r(2) * 62, size: r(3) > 0.85 ? 2.5 : 1.5, delay: r(4) * 3 };
});

/* Ridge lines (viewBox 1440×400). Back layer is the high Himalaya, front is the valley rim. */
const BACK_RIDGE: Array<[number, number]> = [
  [0, 250], [120, 180], [210, 228], [330, 112], [420, 170], [520, 64], [600, 140], [700, 92],
  [790, 170], [900, 38], [1010, 150], [1100, 100], [1210, 190], [1320, 120], [1440, 200],
];
const MID_RIDGE = "M0 400 L0 300 L140 238 L260 292 L380 208 L500 272 L640 196 L760 282 L880 222 L1000 292 L1130 228 L1260 284 L1440 240 L1440 400 Z";
const FRONT_RIDGE = "M0 400 L0 352 L180 312 L320 346 L480 298 L660 352 L820 314 L980 356 L1150 322 L1300 350 L1440 330 L1440 400 Z";

const toPath = (points: Array<[number, number]>) =>
  `M0 400 ${points.map(([x, y]) => `L${x} ${y}`).join(" ")} L1440 400 Z`;

/* Snow caps on every peak above the snow line, cut with a jagged lower edge. */
const SNOW_CAPS = BACK_RIDGE.flatMap(([x, y], i) => {
  const left = BACK_RIDGE[i - 1];
  const right = BACK_RIDGE[i + 1];
  if (!left || !right || y > 150 || y > left[1] || y > right[1]) return [];
  const lerp = (a: [number, number], t: number): [number, number] => [x + (a[0] - x) * t, y + (a[1] - y) * t];
  const [lx, ly] = lerp(left, 0.32);
  const [rx, ry] = lerp(right, 0.32);
  const w = rx - lx;
  return [`M${x} ${y} L${rx} ${ry} L${lx + w * 0.72} ${Math.max(ly, ry) - 4} L${lx + w * 0.5} ${Math.max(ly, ry) + 9} L${lx + w * 0.28} ${Math.min(ly, ry) - 2} L${lx} ${ly} Z`];
});

const barcode = Array.from({ length: 38 }, (_, i) => ((i * 7) % 5) + 1);

/* Nepal's TIMS trekking card, reimagined as an introduction card. */
const PermitCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: -8 }}
    animate={{ opacity: 1, y: 0, rotate: -3 }}
    whileHover={{ rotate: 0, y: -6 }}
    transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.3 }}
    className="relative mx-auto w-full max-w-[22rem] rounded-2xl bg-foreground p-1.5 text-background shadow-lifted lg:mx-0 lg:ml-auto"
  >
    <div className="overflow-hidden rounded-xl border border-background/15">
      <div className="flex h-2">
        {FLAG_TONES.map((tone) => <span key={tone} className={`flex-1 ${tone}`} />)}
      </div>
      <div className="flex items-center justify-between border-b border-dashed border-background/25 px-4 py-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]">Trekker Information Card</span>
        <span className="font-mono text-[10px] opacity-60">No. KD-0715</span>
      </div>

      <div className="flex gap-4 p-4">
        <div className="h-32 w-24 flex-none overflow-hidden rounded-lg bg-background/10">
          <img src={hero.image} alt={hero.imageAlt} className="h-full w-full object-cover grayscale-[35%]" />
        </div>
        <dl className="min-w-0 space-y-2 text-[13px] leading-tight">
          {[
            ["Name", fullName],
            ["Origin", "Kathmandu, Nepal"],
            ["Route", "Frontend → Backend → Cloud"],
            ["Trail time", `${hero.stats[0]?.value ?? "3+"} years`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-55">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid grid-cols-3 border-t border-dashed border-background/25 text-center">
        {hero.stats.map((stat) => (
          <div key={stat.label} className="border-r border-dashed border-background/25 px-2 py-3 last:border-r-0">
            <span className="block font-display text-2xl font-extrabold leading-none">{stat.value}</span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] opacity-60">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-dashed border-background/25 px-4 py-3">
        <div className="flex h-8 items-end gap-[2px]" aria-hidden="true">
          {barcode.map((w, i) => <span key={i} className="h-full bg-background" style={{ width: w }} />)}
        </div>
        <span className="font-mono text-[9px] uppercase opacity-60">Valid · 2026</span>
      </div>
    </div>

    {/* Rubber stamp */}
    <div className="pointer-events-none absolute -bottom-6 -right-3 flex h-24 w-24 rotate-[-14deg] items-center justify-center rounded-full border-[3px] border-flag-red bg-foreground/0 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-flag-red">
      <span className="flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-full border border-flag-red">
        Permit<br />approved<br />✓
      </span>
    </div>
  </motion.div>
);

const HomeSection = ({ setActiveSection }: HomeSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % hero.roles.length), 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      {/* Sky */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="hidden dark:block">
          {STARS.map((star, i) => (
            <span
              key={i}
              className="animate-twinkle absolute rounded-full bg-foreground"
              style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size, animationDelay: `${star.delay}s` }}
            />
          ))}
        </div>
        {/* Night: crescent moon (snow disc with a sky disc over it). Day: the rising sun. */}
        <span className="absolute right-[10%] top-[14%] hidden h-14 w-14 overflow-hidden rounded-full bg-foreground dark:block sm:h-20 sm:w-20">
          <span className="absolute -right-3 -top-3 h-14 w-14 rounded-full bg-background sm:h-20 sm:w-20" />
        </span>
        <span className="absolute right-[10%] top-[14%] h-16 w-16 rounded-full bg-flag-yellow ring-[10px] ring-flag-yellow/25 dark:hidden sm:h-24 sm:w-24" />
      </motion.div>

      <PrayerFlags className="opacity-90 sm:hidden" count={9} sag={30} />
      <PrayerFlags className="hidden opacity-90 sm:block" count={17} sag={42} />

      {/* Copy + permit */}
      <motion.div style={{ y: copyY }} className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-16 px-5 pb-[34vw] pt-2 sm:px-6 md:pb-[28vw] lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-[300px]">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">
            <span className="h-2 w-2 rounded-[2px] bg-flag-blue" /> Base camp · 1,400 m · 27.71°N 85.32°E
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-7 font-deva text-4xl font-extrabold text-accent sm:text-5xl"
            lang="ne"
          >
            नमस्ते,
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-[clamp(3rem,10.5vw,6.75rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-foreground"
          >
            I&apos;m {fullName}.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg text-muted-foreground sm:text-xl"
          >
            <span>Currently climbing as a</span>
            <span className="relative inline-flex h-10 items-center overflow-hidden rounded-lg border border-border bg-card px-3 font-display font-bold text-foreground">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={hero.roles[roleIndex]}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-110%" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="whitespace-nowrap"
                >
                  {hero.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.description} Every project is a climb, and this page is the route.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => setActiveSection("services")}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Begin the ascent
              <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
            <a
              href="/Kiran-Dhakal-CV.pdf"
              download={hero.download.filename}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-background/40 px-7 py-4 font-bold text-foreground backdrop-blur transition-colors hover:border-foreground"
            >
              <Download size={18} />
              {hero.download.label}
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <PermitCard />
        </div>
      </motion.div>

      {/* Mountains */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" aria-hidden="true">
        <motion.svg style={{ y: backY }} viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 h-[30vw] max-h-[330px] min-h-[150px] w-full">
          <path d={toPath(BACK_RIDGE)} fill="hsl(var(--ridge-back))" />
          {SNOW_CAPS.map((d) => <path key={d} d={d} fill="hsl(var(--snow))" opacity="0.95" />)}
          {/* Summit flag on the tallest peak */}
          <path d="M900 38 V8" stroke="hsl(var(--accent))" strokeWidth="2" />
          <path d="M900 8 h18 l-5 6 l5 6 h-18 Z" fill="hsl(var(--accent))" />
        </motion.svg>
        <motion.svg style={{ y: midY }} viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 h-[30vw] max-h-[330px] min-h-[150px] w-full">
          <path d={MID_RIDGE} fill="hsl(var(--ridge-mid))" />
        </motion.svg>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="relative block h-[30vw] max-h-[330px] min-h-[150px] w-full">
          <path d={FRONT_RIDGE} fill="hsl(var(--background))" />
        </svg>
      </div>
    </div>
  );
};

export default HomeSection;

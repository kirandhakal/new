"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import type { SectionKey } from "@/types/navigation";
import heroJson from "@/data/landing-page/home-hero.json";
import type { HeroContent } from "@/types/content";

interface HomeSectionProps {
  setActiveSection: (section: SectionKey) => void;
}

const hero = heroJson as HeroContent;
const [firstName, ...restName] = hero.name.replace(/^I'm\s+/i, "").split(" ");
const lastName = restName.join(" ");

const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/^\d+/, "");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
      {current}
      <span className="text-accent">{suffix}</span>
    </span>
  );
};

/* Circular "available for work" sticker that slowly spins around an arrow. */
const SpinningBadge = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Get in touch"
    className="group absolute -bottom-8 -right-4 flex h-28 w-28 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lifted sm:-right-8 sm:h-32 sm:w-32"
  >
    <svg viewBox="0 0 100 100" className="animate-spin-badge absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-current font-mono text-[9.5px] font-medium uppercase tracking-[0.24em]">
        <textPath href="#badge-circle">Available for work • Let&apos;s talk •</textPath>
      </text>
    </svg>
    <ArrowUpRight size={30} strokeWidth={2.4} className="transition-transform duration-300 group-hover:rotate-45" />
  </button>
);

const HomeSection = ({ setActiveSection }: HomeSectionProps) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % hero.roles.length), 2600);
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [...hero.technologies, ...hero.technologies];

  return (
    <div className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <div className="grid-texture pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pb-20 pt-10 sm:px-6 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3rem,13.5vw,7.25rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.04em]"
          >
            <span className="block text-foreground">{firstName}</span>
            <span className="block text-outline">{lastName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-semibold text-muted-foreground sm:text-2xl"
          >
            <span>I work as a</span>
            <span className="relative inline-flex h-10 items-center overflow-hidden rounded-lg bg-secondary px-3 text-foreground ring-1 ring-border sm:h-11">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={hero.roles[roleIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="whitespace-nowrap"
                >
                  {hero.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="ml-1 h-6 w-[2px] animate-blink bg-accent" aria-hidden="true" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="/Kiran-Dhakal-CV.pdf"
              download={hero.download.filename}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 font-bold text-accent-foreground transition-colors hover:bg-primary"
              aria-label="Download Kiran Dhakal's CV"
            >
              <Download size={18} />
              {hero.download.label}
            </a>
            <button
              type="button"
              onClick={() => setActiveSection("contact")}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-border px-7 py-4 font-bold text-foreground transition-colors hover:border-foreground"
            >
              {hero.contactLabel}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:col-span-5 lg:mx-0 lg:ml-auto"
        >
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-card">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-background/85 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-md">
              <MapPin size={15} className="text-coral" /> Kathmandu, NP
            </span>
          </div>
          <span className="absolute -left-3 -top-4 -rotate-6 rounded-full bg-coral px-4 py-2 font-display text-sm font-bold text-accent-foreground shadow-lifted">
            Hi, I build things ✦
          </span>
          <SpinningBadge onClick={() => setActiveSection("contact")} />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-3 divide-x divide-border border-y border-border">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 px-3 py-6 first:pl-0 sm:px-8 sm:first:pl-0">
              <dd><AnimatedNumber value={stat.value} /></dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => setActiveSection("services")}
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent sm:right-6 md:inline-flex lg:right-8"
        >
          Scroll <ArrowDownRight size={16} />
        </button>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-14 -rotate-1 overflow-hidden border-y border-accent bg-accent py-4 text-accent-foreground" aria-label={hero.techLabel}>
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {marqueeItems.map((tech, i) => (
            <span key={`${tech}-${i}`} className="flex items-center gap-8 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl" aria-hidden={i >= hero.technologies.length}>
              {tech}
              <span className="text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;

"use client";

import { motion } from "framer-motion";
import heroJson from "@/data/landing-page/home-hero.json";
import type { HeroContent } from "@/types/content";
import { FLAG_TONES } from "@/lib/expedition";

const hero = heroJson as HeroContent;
const fullName = hero.name.replace(/^I'm\s+/i, "");

const barcode = Array.from({ length: 38 }, (_, i) => ((i * 7) % 5) + 1);

/* Nepal's TIMS trekking card, reimagined as an introduction card. */
export default function PermitCard({ compact = false }: { compact?: boolean }) {
  return (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: -8 }}
    animate={{ opacity: 1, y: 0, rotate: -3 }}
    whileHover={{ rotate: 0, y: -6 }}
    transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.3 }}
    className={`relative mx-auto w-full rounded-2xl ${compact ? "max-w-[19rem]" : "max-w-[22rem]"} bg-foreground p-1.5 text-background shadow-lifted`}
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
}

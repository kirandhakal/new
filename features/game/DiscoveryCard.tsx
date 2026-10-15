"use client";

import { motion } from "framer-motion";
import {
  Award,
  Braces,
  Cloud,
  Code,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe,
  Mail,
  MountainSnow,
  Palette,
  RotateCcw,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PermitCard from "@/components/expedition/PermitCard";
import { Badge } from "@/components/ui/badge";
import { FLAG_TONES, formatMeters } from "@/lib/expedition";
import { codeFileName, highlight } from "@/lib/highlight";
import { STEPS, hero, projectCategories, type Step } from "./steps";

export const serviceIcons: Record<string, LucideIcon> = { Globe, Smartphone, Palette, Code, Database, Cloud };
export const skillIcons: Record<string, LucideIcon> = { Code2, Braces };

export const categoryTone: Record<string, string> = {
  govtech: "bg-flag-blue",
  saas: "bg-flag-yellow",
  commerce: "bg-flag-red",
  creative: "bg-flag-green",
};

const kindLabel: Record<Step["kind"], string> = {
  base: "Starting point",
  gear: "Gear found",
  camp: "Camp reached",
  skill: "Skill unlocked",
  peak: "Peak discovered",
  summit: "Summit!",
};

interface DiscoveryCardProps {
  step: Step;
  index: number;
  elapsed?: string;
  best?: string;
  onContact: () => void;
  onRestart: () => void;
}

/* What the climber finds at each stop on the trail. */
export default function DiscoveryCard({ step, index, elapsed, best, onContact, onRestart }: DiscoveryCardProps) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-accent">{kindLabel[step.kind]}</span>
        <span className="text-muted-foreground">
          Step {index + 1}/{STEPS.length} · ▲ {formatMeters(step.altitude)}
        </span>
      </div>

      {step.kind === "base" && (
        <div className="mt-4">
          <p lang="ne" className="font-deva text-3xl font-extrabold text-accent">नमस्ते!</p>
          <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight">I&apos;m your guide, Kiran.</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hero.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Climb to the summit and you&apos;ll pick up my gear (services), my skills and the 14 peaks I&apos;ve shipped along the way.
          </p>
          <div className="mt-6 hidden pb-6 lg:block">
            <PermitCard compact />
          </div>
        </div>
      )}

      {step.kind === "gear" && (() => {
        const Icon = serviceIcons[step.item.icon] ?? Code;
        return (
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-accent-foreground ${FLAG_TONES[step.n % FLAG_TONES.length]}`}>
                <Icon size={26} />
              </span>
              <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">{step.item.title}</h3>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{step.item.description}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 font-mono text-[11px] text-foreground">🎒 Added to your pack</p>
          </div>
        );
      })()}

      {step.kind === "skill" && (() => {
        const Icon = skillIcons[step.item.icon] ?? Braces;
        return (
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-accent-foreground ${FLAG_TONES[step.n % FLAG_TONES.length]}`}>
                <Icon size={26} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">{step.item.name}</h3>
                <p className="text-sm text-muted-foreground">{step.item.description}</p>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
              <div className="border-b border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">{codeFileName(step.item.name)}</div>
              <pre className="max-h-48 overflow-auto p-4 font-mono text-[12px] leading-6 text-foreground">
                <code>
                  {step.item.code.split("\n").map((line, i) => (
                    <div key={i} className="whitespace-pre">{highlight(line)}</div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        );
      })()}

      {step.kind === "peak" && (
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-[2px] ${categoryTone[step.item.category]}`} />
            Peak {String(step.n + 1).padStart(2, "0")} · {projectCategories[step.item.category]}
          </span>
          <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight">{step.item.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {step.item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={step.item.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">
              Visit live site <ExternalLink size={14} />
            </a>
            {step.item.github && (
              <a href={step.item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-foreground">
                <Github size={14} /> Code
              </a>
            )}
          </div>
        </div>
      )}

      {step.kind === "camp" && (
        <div className="mt-4 text-center">
          <motion.div
            initial={{ rotate: -30, scale: 0.4 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-background text-accent-foreground shadow-lifted ring-4 ring-border ${step.tone}`}
          >
            <Award size={40} />
          </motion.div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Badge unlocked</p>
          <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight">{step.badge}</h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {step.title} reached at {formatMeters(step.altitude)}. {step.blurb}
          </p>
        </div>
      )}

      {step.kind === "summit" && (
        <div className="mt-4 text-center">
          <motion.div
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 10 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lifted"
            aria-hidden="true"
          >
            <MountainSnow size={44} />
          </motion.div>
          <h3 className="mt-2 font-display text-4xl font-extrabold tracking-tight">You summited!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            8,849 m. You found every service, skill and project.
            {elapsed && <> Climb time <strong className="text-foreground">{elapsed}</strong>{best && best !== elapsed ? <> (best {best})</> : null}.</>}
          </p>
          <div className="mt-6 grid gap-2">
            <button type="button" onClick={onContact} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">
              <Mail size={17} /> Sign the summit register
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a href="/Kiran-Dhakal-CV.pdf" download={hero.download.filename} className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-foreground">
                <Download size={15} /> CV
              </a>
              <button type="button" onClick={onRestart} className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-foreground">
                <RotateCcw size={15} /> Climb again
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

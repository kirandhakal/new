"use client";

import React, { useState } from "react";
import { ArrowUp, Heart, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import footerJson from "@/data/footer/footer.json";

const iconMap: Record<string, LucideIcon> = { Github, Linkedin, Mail };

/* Mounting hole in each corner of the board. */
const Hole = ({ className }: { className: string }) => (
  <span className={`absolute h-5 w-5 rounded-full border-[3px] border-copper/70 bg-background ${className}`} aria-hidden="true" />
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hearts, setHearts] = useState<Array<{ id: number; x: number }>>([]);

  const createHeart = () => {
    const id = Date.now();
    const pair = [{ id, x: -24 }, { id: id + 1, x: 24 }];
    setHearts((prev) => [...prev, ...pair]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id && h.id !== id + 1)), 1200);
  };

  return (
    <footer className="relative mt-auto px-3 pb-32 pt-10 sm:px-6 lg:pb-10 lg:pl-24 lg:pr-0">
      <div className="mx-auto max-w-7xl lg:px-8">
      <div className="pcb-grid relative overflow-hidden rounded-3xl border border-border bg-board px-6 py-12 sm:px-12">
        <Hole className="left-4 top-4" />
        <Hole className="right-4 top-4" />
        <Hole className="bottom-4 left-4" />
        <Hole className="bottom-4 right-4" />

        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="silk">J6 · end of file</p>
            <p className="mt-4 font-display text-[clamp(3.5rem,12vw,8rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-foreground">
              EOF<span className="text-accent">_</span>
            </p>
            <p className="mt-4 text-lg text-muted-foreground">Thanks for probing the board. Let&apos;s build the next one together.</p>
            <a href="mailto:kirandhakal715@gmail.com" className="mt-3 inline-block break-all font-mono text-sm text-foreground underline decoration-copper underline-offset-4 transition-colors hover:text-accent">
              kirandhakal715@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-4 md:col-span-5 md:items-end">
            <div className="flex items-center gap-2">
              {footerJson.socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const external = link.href.startsWith("http");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                    aria-label={link.label}
                  >
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-3 rounded-lg bg-foreground px-5 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-background"
            >
              <ArrowUp size={17} className="transition-transform group-hover:-translate-y-0.5" />
              Reset to 0x0000
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-dashed border-border pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center">
          <p>© {currentYear} Kiran Dhakal · KD-Portfolio Rev {currentYear} · {footerJson.copyright}</p>
          <div className="flex items-center gap-2">
            <span>{footerJson.messageBefore}</span>
            <button type="button" onClick={createHeart} className="relative flex items-center" aria-label="Send love">
              <Heart size={15} className="text-led-red transition-transform hover:scale-125" />
              <AnimatePresence>
                {hearts.map((heart) => (
                  <motion.span
                    key={heart.id}
                    initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -70, x: heart.x, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute"
                  >
                    <Heart size={13} className="fill-led-red text-led-red" />
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
            <span>{footerJson.messageAfter} · assembled in Kathmandu</span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

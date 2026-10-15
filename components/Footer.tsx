"use client";

import React, { useState } from "react";
import { ArrowDown, Heart, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import footerJson from "@/data/footer/footer.json";
import PrayerFlags from "@/components/expedition/PrayerFlags";

const iconMap: Record<string, LucideIcon> = { Github, Linkedin, Mail };

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
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-card pb-36 lg:pb-10 lg:pl-24">
      <PrayerFlags count={9} sag={22} className="opacity-90 sm:hidden" />
      <PrayerFlags count={21} sag={28} className="hidden opacity-90 sm:block" />

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p lang="ne" className="font-deva text-[clamp(3.5rem,13vw,8.5rem)] font-extrabold leading-[1.05] text-accent">
              धन्यवाद
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">Thanks for climbing with me.</p>
            <a href="mailto:kirandhakal715@gmail.com" className="mt-4 inline-block break-all font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent">
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
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
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
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground"
            >
              Descend to base camp
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-dashed border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {currentYear} Kiran Dhakal · {footerJson.copyright}</p>
          <div className="flex items-center gap-2">
            <span>{footerJson.messageBefore}</span>
            <button type="button" onClick={createHeart} className="relative flex items-center" aria-label="Send love">
              <Heart size={16} className="text-flag-red transition-transform hover:scale-125" />
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
                    <Heart size={14} className="fill-flag-red text-flag-red" />
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
            <span>{footerJson.messageAfter} from the Himalaya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

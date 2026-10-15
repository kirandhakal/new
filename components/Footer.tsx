"use client";

import React, { useState } from "react";
import { ArrowUp, Heart, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import footerJson from "@/data/footer/footer.json";

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
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-card pb-28 pt-16 md:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Got an idea?</p>
            <a
              href="mailto:kirandhakal715@gmail.com"
              className="mt-4 block break-all font-display text-2xl font-bold sm:break-normal min-[400px]:text-3xl tracking-tight text-foreground transition-colors hover:text-accent sm:text-5xl"
            >
              kirandhakal715@gmail.com
            </a>
          </div>

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
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  aria-label={link.label}
                >
                  <Icon size={19} />
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:-translate-y-1"
              aria-label="Back to top"
            >
              <ArrowUp size={19} />
            </button>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="mt-14 select-none whitespace-nowrap font-display text-[16.5vw] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] lg:text-[13.5rem]"
        >
          <span className="text-outline opacity-60">Kiran</span><span className="text-accent">.</span>
        </p>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {currentYear} Kiran Dhakal. {footerJson.copyright}</p>
          <div className="relative flex items-center gap-2">
            <span>{footerJson.messageBefore}</span>
            <button type="button" onClick={createHeart} className="relative flex items-center" aria-label="Send love">
              <Heart size={16} className="text-coral transition-transform hover:scale-125" />
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
                    <Heart size={14} className="fill-coral text-coral" />
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
            <span>{footerJson.messageAfter} from Kathmandu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

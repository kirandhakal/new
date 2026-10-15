"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Braces } from 'lucide-react';
import skillsJson from '@/data/landing-page/home-skills.json';
import type { SkillContent } from '@/types/content';
import SectionHeading from '@/components/SectionHeading';

const content = skillsJson as SkillContent;

// Brand SVGs are flattened to one tone so they match the lucide icons: bone by default, ink on the lime chip.
const svgIcon = (src: string, alt: string) => (
  <img src={src} alt={alt} className="h-5 w-5 object-contain brightness-0 invert group-aria-selected:invert-0" />
);

const skillIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 size={20} />,
  Braces: <Braces size={20} />,
  Node: svgIcon('/images/node.svg', 'Node.js'),
  Figma: svgIcon('/images/figma.svg', 'Figma'),
  Git: svgIcon('/images/git.svg', 'Git'),
  GitHub: svgIcon('/images/github.svg', 'GitHub'),
  Docker: svgIcon('/images/docker.svg', 'Docker'),
};

const fileName = (name: string) => {
  const base = name.toLowerCase().replace(/[^a-z]/g, '');
  if (name.includes('HTML')) return `${base}.html`;
  if (name.includes('React')) return 'app.jsx';
  if (name.includes('Node')) return 'server.js';
  if (name.includes('Docker')) return 'Dockerfile';
  if (name.includes('GitHub')) return 'deploy.yml';
  if (name.includes('Git')) return 'branch.sh';
  return 'tokens.css';
};

const KEYWORDS = /^(const|let|return|import|from|export|require|FROM|WORKDIR|COPY|RUN|EXPOSE|CMD|git|on|jobs|name|steps|uses|run)$/;

/* Tiny highlighter: strings → lime, comments → muted, a few keywords → lilac. */
const highlight = (line: string) => {
  if (/^\s*(#|\/\*|\/\/)/.test(line)) {
    return <span className="text-muted-foreground/70 italic">{line}</span>;
  }
  return line.split(/("[^"]*"|\b[A-Za-z_]+\b)/g).map((part, i) => {
    if (part.startsWith('"')) return <span key={i} className="text-accent">{part}</span>;
    if (KEYWORDS.test(part)) return <span key={i} className="text-lilac">{part}</span>;
    return <span key={i}>{part}</span>;
  });
};

const SkillsSection = () => {
  const [active, setActive] = useState(0);
  const skill = content.items[active];
  const lines = skill.code.split('\n');

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading
        index="02"
        eyebrow={content.eyebrow}
        title={<>Skills &amp; <span className="text-outline">tools</span></>}
        description={content.description}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Skill picker — horizontal scroller on phones, vertical list on desktop */}
        <div
          role="tablist"
          aria-label="Skills"
          className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {content.items.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={`group flex flex-none snap-start items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:px-5 lg:py-4 ${
                  isActive
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-card hover:border-muted-foreground/40'
                }`}
              >
                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-accent text-accent-foreground' : 'bg-secondary text-foreground'}`}>
                  {skillIcons[item.icon]}
                </span>
                <span className="min-w-0">
                  <span className="block whitespace-nowrap font-display text-base font-bold text-foreground lg:text-lg">{item.name}</span>
                  <span className="hidden text-sm text-muted-foreground lg:block">{item.description}</span>
                </span>
                <span className={`ml-auto hidden font-mono text-xs lg:block ${isActive ? 'text-accent' : 'text-muted-foreground/50'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Terminal preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-28 overflow-hidden rounded-3xl border border-border bg-card shadow-lifted">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-coral" />
                <span className="h-3 w-3 rounded-full bg-warning" />
                <span className="h-3 w-3 rounded-full bg-accent" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">~/kiran/{fileName(skill.name)}</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:block">{lines.length} lines</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.pre
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="min-h-[18rem] overflow-x-auto p-5 font-mono text-[13px] leading-7 text-foreground sm:p-6 sm:text-sm"
              >
                <code>
                  {lines.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="mr-5 inline-block w-5 flex-none select-none text-right text-muted-foreground/40">{i + 1}</span>
                      <span className="whitespace-pre">{highlight(line)}</span>
                    </div>
                  ))}
                  <div className="flex">
                    <span className="mr-5 inline-block w-5 flex-none select-none text-right text-muted-foreground/40">{lines.length + 1}</span>
                    <span className="h-5 w-2 translate-y-1 animate-blink bg-accent" />
                  </div>
                </code>
              </motion.pre>
            </AnimatePresence>

            <div className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> {skill.description}</span>
              <span className="hidden sm:inline">UTF-8</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-14 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:tracking-[0.24em]">
        ✦ {content.footer} ✦
      </p>
    </div>
  );
};

export default SkillsSection;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Palette, Code, Database, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import servicesJson from '@/data/landing-page/home-service.json';
import type { ServiceContent } from '@/types/content';
import SectionHeading from '@/components/SectionHeading';

const services = servicesJson as ServiceContent;
const icons: Record<string, LucideIcon> = { Globe, Smartphone, Palette, Code, Database, Cloud };

const ServicesSection = () => (
  <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
    <SectionHeading
      index="01"
      eyebrow={services.eyebrow}
      title={<>What I can <span className="text-accent">do</span> for you</>}
      description={services.description}
    />

    <ol className="divide-y divide-border border-b border-border">
      {services.items.map((service, index) => {
        const Icon = icons[service.icon];
        return (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-60px" }}
            className="group relative"
          >
            {/* Solid lime fill that wipes in from the left on hover */}
            <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" aria-hidden="true" />
            <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-7 transition-colors duration-300 group-hover:text-accent-foreground sm:gap-x-8 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_3rem] md:items-center md:px-4 md:py-9">
              <span className="pt-1 font-mono text-xs text-muted-foreground transition-colors group-hover:text-accent-foreground/70 md:pt-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                {service.title}
              </h3>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-accent-foreground group-hover:bg-accent-foreground group-hover:text-accent md:order-last">
                <Icon size={18} className="group-hover:hidden" />
                <ArrowUpRight size={18} className="hidden group-hover:block" />
              </span>
              <p className="col-span-3 col-start-1 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-accent-foreground/80 sm:col-start-2 sm:col-span-2 md:col-span-1 md:col-start-auto md:text-base">
                {service.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  </div>
);

export default ServicesSection;

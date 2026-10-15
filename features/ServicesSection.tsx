"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Palette, Code, Database, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import servicesJson from '@/data/landing-page/home-service.json';
import type { ServiceContent } from '@/types/content';
import CampHeading from '@/components/CampHeading';
import { FLAG_TONES } from '@/lib/expedition';

const services = servicesJson as ServiceContent;
const icons: Record<string, LucideIcon> = { Globe, Smartphone, Palette, Code, Database, Cloud };
const PACK_WEIGHT = ['2.4 kg', '1.8 kg', '0.9 kg', '3.1 kg', '2.2 kg', '0.6 kg'];

/* Each service is a luggage tag hanging from the expedition rope. Hover makes it swing. */
const ServicesSection = () => (
  <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
    <CampHeading
      camp="services"
      title={<>Gear I pack for <span className="text-accent">every</span> climb.</>}
      description={services.description}
    />

    <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {services.items.map((service, index) => {
        const Icon = icons[service.icon];
        const tone = FLAG_TONES[index % FLAG_TONES.length];
        return (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: -24, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 12, delay: (index % 3) * 0.08 }}
            viewport={{ once: true, margin: '-40px' }}
            className="group relative border-t-2 border-dashed border-muted-foreground/40 px-2 pb-6 pt-10 sm:px-3"
          >
            {/* Knot on the rope + the string down to the tag */}
            <span className="absolute -top-[5px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-muted-foreground/70" aria-hidden="true" />
            <span className="absolute left-1/2 top-0 z-10 h-[3.75rem] w-px -translate-x-1/2 bg-muted-foreground/60" aria-hidden="true" />

            <article className="animate-tag-swing relative origin-top rounded-[1.25rem] border border-border bg-card p-6 pt-10 transition-colors duration-300 group-hover:border-foreground/40 sm:p-7 sm:pt-11">
              {/* Punched eyelet */}
              <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-muted-foreground/60 bg-background" aria-hidden="true" />
              <span className={`absolute left-6 top-4 h-1.5 w-10 rounded-full ${tone}`} aria-hidden="true" />
              <span className="absolute right-6 top-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Tag {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex items-start gap-4">
                <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl text-accent-foreground ${tone}`}>
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <h3 className="pt-1 font-display text-2xl font-bold leading-tight tracking-tight text-foreground">{service.title}</h3>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{service.description}</p>

              <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>Pack weight · {PACK_WEIGHT[index % PACK_WEIGHT.length]}</span>
                <span className="text-flag-green">✓ Checked</span>
              </div>
            </article>
          </motion.li>
        );
      })}
    </ul>
  </div>
);

export default ServicesSection;

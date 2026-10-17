"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Palette, Code, Database, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import servicesJson from '@/data/landing-page/home-service.json';
import type { ServiceContent } from '@/types/content';
import ModuleHeading from '@/components/ModuleHeading';

const services = servicesJson as ServiceContent;
const icons: Record<string, LucideIcon> = { Globe, Smartphone, Palette, Code, Database, Cloud };
const BUS = ['PCIe x16', 'USB-C', 'HDMI', 'SATA', 'Ethernet', 'GPIO'];

/* Each service is an expansion card that slides into its slot when it scrolls into view. */
const ServicesSection = () => (
  <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
    <ModuleHeading
      module="services"
      title={<>Expansion <span className="text-copper">cards</span></>}
      description={`${services.description}. Each card plugs a capability into your project.`}
    />

    <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.items.map((service, index) => {
        const Icon = icons[service.icon] ?? Code;
        return (
          <li key={service.title} className="group relative">
            <motion.article
              initial={{ y: -46, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18, delay: (index % 3) * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
              className="relative z-10 rounded-t-2xl border border-b-0 border-border bg-card p-6 pb-5 transition-transform duration-300 group-hover:-translate-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="silk">Slot {index + 1} · {BUS[index % BUS.length]}</span>
                <span className="silk">J{index + 2}</span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                {/* the card's main chip */}
                <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-md bg-chip text-chip-foreground">
                  <span className="absolute -left-[5px] inset-y-2 flex flex-col justify-between" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => <span key={i} className="h-[2px] w-[5px] bg-copper" />)}
                  </span>
                  <span className="absolute -right-[5px] inset-y-2 flex flex-col justify-between" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => <span key={i} className="h-[2px] w-[5px] bg-copper" />)}
                  </span>
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-foreground">{service.title}</h3>
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{service.description}</p>

              <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>Driver v{index + 2}.{(index * 3) % 10} loaded</span>
                <span className="text-led-green">Active</span>
              </div>

              {/* gold edge connector */}
              <div className="absolute inset-x-6 -bottom-3 flex h-3 gap-[3px]" aria-hidden="true">
                {Array.from({ length: 22 }, (_, i) => (
                  <span key={i} className={`flex-1 rounded-b-[2px] bg-copper ${i === 7 ? 'invisible' : ''}`} />
                ))}
              </div>
            </motion.article>
            {/* the slot on the motherboard */}
            <div className="relative h-4 rounded-b-xl border border-border bg-board" aria-hidden="true">
              <span className="absolute inset-x-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-chip/80" />
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default ServicesSection;

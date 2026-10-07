"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, Smartphone, Palette, Code, Database, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import servicesJson from '@/data/landing-page/home-service.json';
import type { ServiceContent } from '@/types/content';
import { H1, P } from '@/components/typography';

const services = servicesJson as ServiceContent;
const icons: Record<string, LucideIcon> = { Globe, Smartphone, Palette, Code, Database, Cloud };

const ServicesSection = () => {
  return (
    <div className="py-20 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements - matching HomeSection */}
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-orange-200/50 shadow-sm mb-6">
            <Briefcase size={16} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">What I Offer</span>
          </div>
          <H1 className="leading-tight mb-4">{services.title}</H1>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
          <P className="text-lg max-w-2xl mx-auto mt-6 font-medium">{services.description}</P>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.items.map((service, index) => {
            const Icon = icons[service.icon];
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-card/70 text-card-foreground backdrop-blur-md p-8 rounded-2xl border border-border shadow-soft hover:shadow-lifted transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon size={32} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 leading-tight tracking-tight group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                {service.description}
              </p>
              <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${service.gradient} rounded-full group-hover:w-full transition-all duration-300`}></div>
            </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ServicesSection;

"use client";

import React, { useState, useEffect } from "react";
import { Download, MessageCircle, ArrowRight } from "lucide-react";
import type { SectionKey } from "@/types/navigation";
import heroJson from "@/data/landing-page/home-hero.json";
import type { HeroContent } from "@/types/content";
import { H1, P } from "@/components/typography";

interface HomeSectionProps {
  setActiveSection: (section: SectionKey) => void;
}

const hero = heroJson as HeroContent;

const HomeSection = ({ setActiveSection }: HomeSectionProps) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % hero.roles.length);
        setIsAnimating(false);
      }, 500); // Half of the animation duration
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-stone-50 min-h-screen flex items-center">
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="relative z-10 flex items-center justify-center px-8 py-12">
        <div className="max-w-5xl w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mobile: 1) Greeting + Name + Role  2) Image  3) Rest. Desktop: Image left, content right. */}
            {/* Block 1: Greeting + "I'm Kiran Dhakal" + role (mobile order 1); desktop: col 2 row 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 w-full md:col-start-2 md:row-start-1 space-y-4 md:space-y-0">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200/50 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm sm:text-lg font-medium text-gray-700">{hero.greeting}</span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <H1 className="text-gray-950 leading-tight">
                  {hero.name}
                </H1>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
                  <div className="relative h-10 sm:h-12 overflow-hidden">
                    <p
                      className={`text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 transition-all duration-500 ${
                        isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      {hero.roles[currentRoleIndex]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Image — right below "I'm Kiran Dhakal" on mobile; desktop: col 1, span 2 rows */}
            <div className="flex justify-center md:justify-end order-2 w-full md:col-start-1 md:row-start-1 md:row-span-2">
              <div className="relative group">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={hero.image}
                    alt={hero.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Block 3: Description, stats, CTAs, tech (mobile order 3); desktop: col 2 row 2 */}
            <div className="space-y-6 sm:space-y-8 order-3 w-full text-center md:text-left md:col-start-2 md:row-start-2 md:flex md:flex-col md:items-start">
              <P className="text-base sm:text-lg max-w-xl mx-auto md:mx-0">{hero.description}</P>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto md:mx-0">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-orange-100/50 shadow-sm">
                    <div className="text-3xl font-black text-orange-700">{stat.value}</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href={hero.download.href}
                  download={hero.download.filename}
                  className="group relative inline-flex items-center justify-center gap-3 bg-gray-950 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  aria-label="Download Kiran Dhakal's CV"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Download size={20} className="relative z-10" />
                  <span className="relative z-10">{hero.download.label}</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <button
                  onClick={() => setActiveSection && setActiveSection("contact")}
                  className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 border-2 border-gray-200 hover:border-orange-300 shadow-lg hover:shadow-xl"
                  aria-label="Navigate to contact section"
                >
                  <MessageCircle size={20} />
                  <span>{hero.contactLabel}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Tech stack preview */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 font-medium mb-3">{hero.techLabel}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {hero.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 border border-orange-100/50 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default HomeSection;

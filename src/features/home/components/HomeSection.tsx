'use client';
import React from 'react';
import { Download, MessageCircle, ArrowRight } from 'lucide-react';
import { useRoleAnimation } from '../hooks/useRoleAnimation';
import { stats, techStack } from '../data/stats';

export default function HomeSection() {
  const { roles, currentRoleIndex, isAnimating } = useRoleAnimation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 opacity-20 animate-pulse"></div>
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="/kd.png"
                  alt="Kiran Dhakal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 md:order-2">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200/50 shadow-sm w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">Hey there! Welcome</span>
            </div>

            {/* Title + Role */}
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4">
                I'm Kiran Dhakal
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
                <p className={`text-2xl md:text-3xl font-bold text-orange-700 transition-all duration-500 h-10 ${
                  isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}>
                  {roles[currentRoleIndex]}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Crafting exceptional digital experiences through clean code and thoughtful design. I transform ideas into responsive, interactive web applications.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100/50">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/Kiran%20Dhakal%20-%20Web%20Developer.pdf"
                download
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg"
              >
                <Download size={20} />
                Download CV
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-bold border-2 border-gray-200 transition-all"
              >
                <MessageCircle size={20} />
                Let's Talk
              </a>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-orange-100">
              <p className="text-sm text-gray-500 font-medium mb-3">Working with</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 border border-orange-100/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

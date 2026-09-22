"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Braces } from 'lucide-react';
import skillsJson from '@/data/landing-page/home-skills.json';
import type { SkillContent } from '@/types/content';
import { H2, P } from '@/components/typography';

// SVG Icon Components
const NodeIcon = () => <img src="/images/node.svg" alt="Node.js Icon" className="w-12 h-12" />;
const DockerIcon = () => <img src="/images/docker.svg" alt="Docker Icon" className="w-12 h-12" />;
const GitIcon = () => <img src="/images/git.svg" alt="Git Icon" className="w-12 h-12" />;
const GitHubIcon = () => <img src="/images/github.svg" alt="GitHub Icon" className="w-12 h-12" />;
const FigmaIcon = () => <img src="/images/figma.svg" alt="Figma Icon" className="w-12 h-12" />;

const content = skillsJson as SkillContent;
const skillIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 size={48} />,
  Braces: <Braces size={48} />,
  Node: <NodeIcon />,
  Figma: <FigmaIcon />,
  Git: <GitIcon />,
  GitHub: <GitHubIcon />,
  Docker: <DockerIcon />,
};

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  return (
    <div className="py-20 lg:py-32 min-h-screen relative overflow-hidden flex items-center">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-orange-200/50 shadow-sm mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">{content.eyebrow}</span>
          </div>
          
          <H2 className="text-4xl sm:text-5xl md:text-7xl text-gray-950">{content.title}</H2>
          
          <P className="text-xl max-w-2xl mx-auto">{content.description}</P>
          
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {content.items.map((skill, index) => {
            const isActive = activeSkill === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
                className={`group relative bg-white/70 backdrop-blur-md rounded-3xl p-6 border-2 transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'border-orange-300 shadow-2xl -translate-y-2 scale-[1.02]' 
                    : 'border-white shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${skill.bgColor} -z-10`}></div>

                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <div className="text-white flex items-center justify-center">
                        {skillIcons[skill.icon]}
                      </div>
                    </div>

                    {/* Title and description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-inner overflow-hidden">
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-500 text-xs ml-2 font-mono">
                        {skill.name.toLowerCase().replace(/[^a-z]/g, '')}.
                        {skill.name.includes('HTML') ? 'html' :
                         skill.name.includes('React') ? 'jsx' :
                         skill.name.includes('Node') ? 'js' :
                         skill.name.includes('Docker') ? 'dockerfile' :
                         skill.name.includes('Git') && !skill.name.includes('GitHub') ? 'sh' :
                         skill.name.includes('GitHub') ? 'yml' :
                         'css'}
                      </span>
                    </div>
                    
                    {/* Code content */}
                    <pre className="text-sm leading-relaxed overflow-x-auto">
                      <code className="font-mono">
                        {skill.code.split('\n').map((line, i) => (
                          <div key={i} className="group/line hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                            <span className="text-gray-600 select-none inline-block w-6 text-right mr-4">
                              {i + 1}
                            </span>
                            <span className="text-emerald-400">
                              {line}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>

                  {/* Hover indicator */}
                  <div className={`mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'text-orange-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'
                    }`}></div>
                    <span>{isActive ? 'Viewing code' : 'Hover to explore'}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-300"></div>
            <div className="text-sm text-gray-500 font-medium">{content.footer}</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-300"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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

export default SkillsSection;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Layout, Heart, Code, ShoppingBag, FileText, Building } from 'lucide-react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      title: 'project management software',
      description: 'Streamlined task orchestration platform featuring intuitive drag-and-drop mechanics, real-time state management, and seamless CRUD operations. Built for teams who value visual workflow clarity.',
      // github: 'https://github.com/kirandhakal/projectmanagement',
      demo: 'https://projectmanagementkanban.vercel.app/',
      icon: Layout,
      gradient: 'from-blue-500 to-cyan-500',
      tags: ['React', 'Drag & Drop', 'Task Management'],
      imagePattern: 'grid'
    },
    {
      title: 'Dynamic CV Maker',
      description: 'Professional resume generation platform empowering users to craft pixel-perfect CVs through an intuitive interface. Live preview, customizable templates, and instant PDF export.',
      github: 'https://github.com/kirandhakal/Dynamiccvmaker',
      demo: 'https://cv.dhakalkiran.com.np',
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500',
      tags: ['PDF Generation', 'Templates', 'Career Tools'],
      imagePattern: 'waves'
    },
    {
      title: 'Blood Bank Management',
      description: 'Comprehensive healthcare solution orchestrating the entire lifecycle of blood donation—from donor registration and inventory tracking to distribution logistics and real-time availability.',
      github: 'https://github.com/kirandhakal/bloodbankmanagementsystem',
      icon: Heart,
      gradient: 'from-red-500 to-rose-500',
      tags: ['Healthcare', 'Database', 'Full Stack'],
      imagePattern: 'dots'
    },
    {
      title: 'Code Editor',
      description: 'Browser-based IDE eliminating local compiler setup friction. Write, compile, and execute code instantly across multiple languages. Perfect for rapid prototyping and coding interviews.',
      github: 'https://github.com/kirandhakal/codeeditor',
      demo: 'https://codeeditor-rose.vercel.app/',
      icon: Code,
      gradient: 'from-green-500 to-emerald-500',
      tags: ['Web IDE', 'Multi-language', 'Real-time'],
      imagePattern: 'lines'
    },
    {
      title: 'ShopBuddy',
      description: 'Intelligent shopping companion transforming purchase planning. Create dynamic lists, track spending patterns, discover personalized recommendations, and maintain budget awareness in one unified experience.',
      // github: 'https://github.com/kirandhakal/shopbuddy',
      demo: 'https://fooddelivery-ten-ebon.vercel.app/',
      icon: ShoppingBag,
      gradient: 'from-orange-500 to-amber-500',
      tags: ['E-commerce', 'Budget Tracking', 'UX'],
      imagePattern: 'circles'
    },
   
    {
      title: 'Red Panda Hotel',
      description: 'Boutique hospitality management platform delivering seamless reservation experiences, room inventory control, and guest service coordination with elegant interface design.',
      demo: 'https://redpandahotelandlodge.vercel.app/',
      icon: Building,
      gradient: 'from-teal-500 to-cyan-500',
      tags: ['Hospitality', 'Booking System', 'Management'],
      imagePattern: 'hexagons'
    },
  ];

  const getPatternSVG = (pattern) => {
    const patterns = {
      grid: '<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/></pattern>',
      dots: '<pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3"/></pattern>',
      lines: '<pattern id="lines" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0,0 L20,20" stroke="currentColor" stroke-width="0.5" opacity="0.3"/></pattern>',
      circles: '<pattern id="circles" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.2"/></pattern>',
      waves: '<pattern id="waves" width="40" height="20" patternUnits="userSpaceOnUse"><path d="M0,10 Q10,0 20,10 T40,10" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/></pattern>',
      hexagons: '<pattern id="hexagons" width="30" height="26" patternUnits="userSpaceOnUse"><path d="M15,0 L30,8 L30,18 L15,26 L0,18 L0,8 Z" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.2"/></pattern>'
    };
    return patterns[pattern] || patterns.grid;
  };

  return (
    <div className="py-20 lg:py-32 min-h-screen relative overflow-hidden flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-rose-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      
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
            <Sparkles size={16} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Featured Work</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tight">
            My Projects
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A curated collection showcasing innovation, craftsmanship, and technical excellence
          </p>
          
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className={`relative h-full bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                  isHovered 
                    ? 'border-orange-300 shadow-2xl -translate-y-3 scale-[1.02]' 
                    : 'border-white shadow-lg'
                }`}>
                  {/* Pattern Header */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <svg className="absolute inset-0 w-full h-full text-white">
                      <defs dangerouslySetInnerHTML={{ __html: getPatternSVG(project.imagePattern) }} />
                      <rect width="100%" height="100%" fill={`url(#${project.imagePattern})`} />
                    </svg>
                    
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`p-6 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl transform transition-all duration-500 ${
                        isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                      }`}>
                        <Icon size={48} className="text-white" />
                      </div>
                    </div>

                    {/* Floating badge */}
                    {project.demo && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 shadow-lg flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Live
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                      {project.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 rounded-full text-xs font-semibold border border-orange-200/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group/btn"
                        >
                          <Github size={18} className="group-hover/btn:rotate-12 transition-transform" />
                          <span className="text-sm">Code</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group/btn`}
                        >
                          <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          <span className="text-sm">Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} transform origin-left transition-transform duration-500 ${
                    isHovered ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 font-medium mb-4">Want to see more?</p>
          <a 
            href="https://github.com/kirandhakal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 rounded-2xl font-bold border-2 border-orange-200/50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <style jsx>{`
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

export default ProjectsSection;

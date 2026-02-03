import React, { useState } from 'react';
import Docker from '../../assets/images/docker.svg';
import Figma from '../../assets/images/figma.svg';
import Node from '../../assets/images/node.svg';
import Git from '../../assets/images/git.svg';
import GitHub from '../../assets/images/github.svg';
import { Code2, Braces } from 'lucide-react';

// SVG Icon Components
const NodeIcon = () => <img src={Node} alt="Node.js Icon" className="w-12 h-12" />;
const DockerIcon = () => <img src={Docker} alt="Docker Icon" className="w-12 h-12" />;
const GitIcon = () => <img src={Git} alt="Git Icon" className="w-12 h-12" />;
const GitHubIcon = () => <img src={GitHub} alt="GitHub Icon" className="w-12 h-12" />;
const FigmaIcon = () => <img src={Figma} alt="Figma Icon" className="w-12 h-12" />;

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    { 
      name: 'HTML, CSS & JavaScript', 
      icon: <Code2 size={48} />,
      description: 'Modern web fundamentals',
      code: '<div className="hero">\n  <h1>Hello World!</h1>\n  <p>Building the web</p>\n</div>',
      color: 'from-orange-400 to-rose-400',
      bgColor: 'bg-orange-50'
    },
    { 
      name: 'React', 
      icon: <Braces size={48} />,
      description: 'Component-based UI library',
      code: 'const App = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  )\n}',
      color: 'from-cyan-400 to-blue-400',
      bgColor: 'bg-cyan-50'
    },
    { 
      name: 'Node.js', 
      icon: <NodeIcon />,
      description: 'JavaScript runtime environment',
      code: 'const express = require("express")\nconst app = express()\n\napp.get("/api", (req, res) => {\n  res.json({ message: "Hello!" })\n})\n\napp.listen(3000)',
      color: 'from-green-400 to-emerald-400',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Figma', 
      icon: <FigmaIcon />,
      description: 'UI/UX design platform',
      code: '/* Design System */\n:root {\n  --primary: #FF6B6B;\n  --radius: 12px;\n  --spacing: 16px;\n}\n\n.button {\n  border-radius: var(--radius);\n  padding: var(--spacing);\n}',
      color: 'from-purple-400 to-pink-400',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Git', 
      icon: <GitIcon />,
      description: 'Distributed version control',
      code: 'git checkout -b feature/new-component\ngit add .\ngit commit -m "feat: add hero section"\ngit push origin feature/new-component\n# Create pull request',
      color: 'from-red-400 to-orange-400',
      bgColor: 'bg-red-50'
    },
    { 
      name: 'GitHub', 
      icon: <GitHubIcon />,
      description: 'Code hosting & collaboration',
      code: 'name: Deploy to Production\n\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm install && npm run build',
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-50'
    },
    { 
      name: 'Docker', 
      icon: <DockerIcon />,
      description: 'Container platform',
      code: 'FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-50'
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-orange-200/50 shadow-sm mb-4">
            <span className="text-sm font-medium text-gray-700">My Expertise</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tight">
            Skills & Tools
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Technologies I use to bring ideas to life
          </p>
          
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const isActive = activeSkill === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
                className={`group relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'border-orange-300 shadow-2xl -translate-y-2 scale-[1.02]' 
                    : 'border-orange-100/50 shadow-lg hover:shadow-xl'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${skill.bgColor} -z-10`}></div>

                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <div className="text-white flex items-center justify-center">
                        {skill.icon}
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
              </div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-300"></div>
            <div className="text-sm text-gray-500 font-medium">Always learning, always growing</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-300"></div>
          </div>
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
      `}</style>
    </div>
  );
};

export default SkillsSection;

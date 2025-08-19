import React from 'react';
import Docker from '/home/dhakalkiran/vrit/animation/PCA/fpca/src/assests/images/docker.svg';
import Figma from '/home/dhakalkiran/vrit/animation/PCA/fpca/src/assests/images/figma.svg';
import Node from '/home/dhakalkiran/vrit/animation/PCA/fpca/src/assests/images/node.svg';
import Git from '/home/dhakalkiran/vrit/animation/PCA/fpca/src/assests/images/git.svg';
import GitHub from '/home/dhakalkiran/vrit/animation/PCA/fpca/src/assests/images/github.svg';

// SVG Icon Components
const NodeIcon = () => (
   <img
            src={Node}
            alt="Docker Icon" className="w-16 h-16"
          />
 
);

const DockerIcon = () => (
   <img
            src={Docker}
            alt="Docker Icon" className="w-16 h-16"
          />
 


);

const GitIcon = () => (
   <img
            src={Git}
            alt="Docker Icon" className="w-16 h-16"
          />
 
);

const GitHubIcon = () => (
   <img
            src={GitHub}
            alt="Docker Icon" className="w-16 h-16"
          />
 
);

const FigmaIcon = () => (
   <img
            src={Figma}
            alt="Docker Icon" className="w-16 h-16"
          />
 
);

const SkillsSection = () => {
  const skills = [
    { 
      name: 'HTML, CSS, JS', 
      icon: '🌐',
      description: 'Frontend fundamentals',
      code: '<div class="hero">\n  <h1>Hello World</h1>\n</div>'
    },
    { 
      name: 'React', 
      icon: '⚛️',
      description: 'JavaScript library',
      code: 'const App = () => {\n  return <h1>Hello React!</h1>\n}'
    },
    { 
      name: 'Node.js', 
      icon: <NodeIcon />,
      description: 'Backend runtime',
      code: 'const express = require("express")\nconst app = express()\napp.listen(3000)'
    },
    { 
      name: 'Figma', 
      icon: <FigmaIcon />,
      description: 'Design tool',
      code: '// Design System\n.button {\n  border-radius: 8px;\n  padding: 12px 24px;\n}'
    },
    { 
      name: 'Git', 
      icon: <GitIcon />,
      description: 'Version control',
      code: 'git add .\ngit commit -m "feat: new feature"\ngit push origin main'
    },
    { 
      name: 'GitHub', 
      icon: <GitHubIcon />,
      description: 'Code repository',
      code: 'name: CI/CD\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest'
    },
    { 
      name: 'Docker', 
      icon: <DockerIcon />,
      description: 'Containerization',
      code: 'FROM node:18\nCOPY . .\nRUN npm install\nEXPOSE 3000'
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            My Skills
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Technologies and tools I work with
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content Container */}
              <div className="relative z-10 flex items-start gap-6">
                {/* Left Side - Icon and Info */}
                <div className="flex-shrink-0 text-center">
                  {/* Icon */}
                  <div className="flex justify-center items-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {typeof skill.icon === 'string' ? (
                      <div className="text-5xl">{skill.icon}</div>
                    ) : (
                      <div className="w-16 h-16">{skill.icon}</div>
                    )}
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {skill.description}
                  </p>
                </div>

                {/* Right Side - Code Preview */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-900 rounded-lg p-4 overflow-hidden">
                    {/* Code Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-xs ml-2">
                        {skill.name.toLowerCase().replace(/[^a-z]/g, '')}.{
                          skill.name.includes('HTML') ? 'html' :
                          skill.name.includes('React') ? 'jsx' :
                          skill.name.includes('Node') ? 'js' :
                          skill.name.includes('TypeScript') ? 'ts' :
                          skill.name.includes('Docker') ? 'dockerfile' :
                          skill.name.includes('Git') ? 'sh' :
                          skill.name.includes('GitHub') ? 'yml' :
                          'css'
                        }
                      </span>
                    </div>
                    
                    {/* Code Content */}
                    <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
                      <code className="text-green-400">
                        {skill.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        {/* <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Always Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              I'm passionate about staying up-to-date with the latest technologies 
              and continuously expanding my skill set. Currently exploring advanced 
              React patterns, cloud technologies, and modern development practices.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SkillsSection;
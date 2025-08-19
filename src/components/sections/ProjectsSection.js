import React from 'react';
import { Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Kanban Board',
      description:' A simple Kanban board application for task management, allowing users to create, update, and delete tasks with drag-and-drop functionality.',
      github: 'https://github.com/kirandhakal/kanban',
      demo: 'https://kirandhakal.github.io/kanban/',
    },
    {
      title: 'Blood Bank Management System',
      description:
        'A Web App solution designed to efficiently manage the operations of a blood bank. It aims to organize blood donation, storage, and distribution processes.',
      github: 'https://github.com/kirandhakal/bloodbankmanagementsystem',
    },
    {
      title: 'Code Editor',
      description:
        'KBS Code Editor is a Web App where users can write code and compile it. This application saves time in installing entire compilers.',
      github: 'https://github.com/kirandhakal/codeeditor',
      demo: 'https://kirandhakal.github.io/codeeditor/',
    },
    {
      title: 'shopbuddy',
      description:
        'ShopBuddy is a web application designed to streamline the shopping experience by providing a platform for users to create and manage their shopping lists, track expenses, and discover new products.',
      github: 'https://github.com/kirandhakal/shopbuddy',
      demo: 'https://github.com/kirandhakal/shopbuddy',
    },
     {
      title: 'Tic Tac Toe',
      description:
        'A web-based version of the popular game using modern web technologies like HTML5, CSS3, and JavaScript with dynamic game state updates.',
      github: 'https://github.com/kirandhakal/tictactoe',
      demo: 'https://kirandhakal.github.io/tictactoe/',
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
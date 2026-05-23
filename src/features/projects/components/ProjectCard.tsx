'use client';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/src/types';

interface ProjectCardProps {
  project: Project;
  onHover: (id: number | null) => void;
}

export default function ProjectCard({ project, onHover }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

      {/* Content */}
      <div className="relative p-8 sm:p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-110 transition-transform text-white`}>
            <Icon size={28} />
          </div>
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600" aria-label="GitHub">
                <Github size={20} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600" aria-label="Live Demo">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition capitalize">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

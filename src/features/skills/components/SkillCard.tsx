'use client';
import { Skill } from '@/src/types';

interface SkillCardProps {
  skill: Skill;
  isActive: boolean;
  onClick: () => void;
}

export default function SkillCard({ skill, isActive, onClick }: SkillCardProps) {
  const Icon = skill.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-br ${skill.color} text-white shadow-lg scale-105`
          : `${skill.bgColor} border-gray-200 text-gray-900 hover:shadow-md`
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 flex items-center justify-center ${isActive ? 'text-white' : 'text-gray-700'}`}>
          <Icon size={48} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{skill.name}</h3>
          <p className={isActive ? 'text-white/80' : 'text-gray-600'}>{skill.description}</p>
        </div>
      </div>
    </button>
  );
}

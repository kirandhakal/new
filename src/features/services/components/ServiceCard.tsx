'use client';
import { Service } from '@/src/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed">{service.description}</p>
    </div>
  );
}

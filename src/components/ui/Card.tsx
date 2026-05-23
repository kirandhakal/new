import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${
        hover ? 'hover:shadow-lg hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

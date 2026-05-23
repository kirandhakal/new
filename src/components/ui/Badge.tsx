import React from 'react';

interface BadgeProps {
  children: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-50 text-primary-700',
    secondary: 'bg-orange-50 text-orange-700',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

import { useState, useEffect } from 'react';

const roles = [
  'Web Developer',
  'Full Stack Developer',
  'Computer Engineer',
  'AI Enthusiast'
];

export function useRoleAnimation() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { roles, currentRoleIndex, isAnimating };
}

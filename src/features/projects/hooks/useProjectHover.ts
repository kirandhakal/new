import { useState } from 'react';

export function useProjectHover() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return { hoveredProject, setHoveredProject };
}

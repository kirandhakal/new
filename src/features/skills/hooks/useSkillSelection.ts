import { useState } from 'react';

export function useSkillSelection(initialSkill: number = 0) {
  const [activeSkill, setActiveSkill] = useState(initialSkill);

  const selectSkill = (index: number) => {
    setActiveSkill(index);
  };

  return { activeSkill, selectSkill };
}

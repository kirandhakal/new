"use client";

import type { SectionKey } from "@/types/navigation";
import ClimbGame from "./game/ClimbGame";

interface HomeSectionProps {
  setActiveSection: (section: SectionKey) => void;
}

/* The landing experience is a game: the visitor climbs Kiran's mountain and collects the portfolio on the way. */
const HomeSection = ({ setActiveSection }: HomeSectionProps) => (
  <ClimbGame onSkip={() => setActiveSection("services")} onContact={() => setActiveSection("contact")} />
);

export default HomeSection;

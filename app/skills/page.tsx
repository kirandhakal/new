import type { Metadata } from "next";
import FeaturePage from "@/components/FeaturePage";
import SkillsSection from "@/features/SkillsSection";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("skills", "/skills");

export default function SkillsPage() {
  return <FeaturePage section="skills"><SkillsSection /></FeaturePage>;
}

import type { Metadata } from "next";
import FeaturePage from "@/components/FeaturePage";
import ProjectsSection from "@/features/ProjectsSection";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("projects", "/projects");

export default function ProjectsPage() {
  return <FeaturePage section="projects"><ProjectsSection /></FeaturePage>;
}

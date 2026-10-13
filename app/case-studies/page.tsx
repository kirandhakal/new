import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CaseStudiesSection from "@/features/CaseStudiesSection";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("caseStudies", "/case-studies");

export default function CaseStudiesPage() {
  return <PageShell activeSection="projects"><CaseStudiesSection /></PageShell>;
}

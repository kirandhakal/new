import caseStudiesJson from "@/data/case-studies/case-studies.json";
import type { CaseStudyContent } from "@/types/content";

export const caseStudies = caseStudiesJson as CaseStudyContent;

export function getCaseStudy(slug: string) {
  return caseStudies.items.find((item) => item.slug === slug);
}

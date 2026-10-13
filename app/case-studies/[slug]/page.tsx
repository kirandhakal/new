import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CaseStudyDetail from "@/features/CaseStudyDetail";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { siteConfig } from "@/lib/seo";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};

  const title = `${study.title} Case Study - Kiran Dhakal`;
  const url = `${siteConfig.url}/case-studies/${study.slug}`;
  return {
    title,
    description: study.tagline,
    alternates: { canonical: url },
    openGraph: { title, description: study.tagline, url, images: [study.cover] },
    twitter: { title, description: study.tagline, images: [study.cover] },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return <PageShell activeSection="projects"><CaseStudyDetail study={study} /></PageShell>;
}

import type { ReactNode } from "react";
import PageShell from "@/components/PageShell";
import type { SectionKey } from "@/types/navigation";

interface FeaturePageProps {
  section: Exclude<SectionKey, "home">;
  children: ReactNode;
}

export default function FeaturePage({ section, children }: FeaturePageProps) {
  return (
    <PageShell activeSection={section}>
      <section id={section} className="min-h-screen">
        {children}
      </section>
    </PageShell>
  );
}

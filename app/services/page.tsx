import type { Metadata } from "next";
import FeaturePage from "@/components/FeaturePage";
import ServicesSection from "@/features/ServicesSection";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("services", "/services");

export default function ServicesPage() {
  return <FeaturePage section="services"><ServicesSection /></FeaturePage>;
}

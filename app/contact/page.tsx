import type { Metadata } from "next";
import FeaturePage from "@/components/FeaturePage";
import ContactSection from "@/features/ContactSection";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("contact", "/contact");

export default function ContactPage() {
  return <FeaturePage section="contact"><ContactSection /></FeaturePage>;
}

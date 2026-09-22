import type { Metadata } from "next";
import PortfolioPage from "@/features/PortfolioPage";
import SchemaOrg from "@/components/SchemaOrg";
import { metadataFor, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = metadataFor("home", "/");

export default function HomePage() {
  return (
    <>
      <SchemaOrg data={organizationSchema} />
      <PortfolioPage />
    </>
  );
}

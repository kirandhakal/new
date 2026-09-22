import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PageShell from "./PageShell";
import { pageMetaTags } from "../utils/seoUtils";

const ServicesSection = React.lazy(() => import("../components/sections/ServicesSection"));

const ServicesPage = () => {
  const navigate = useNavigate();

  const onNavigate = (key) => {
    if (key === "home") navigate("/");
    else navigate(`/${key}`);
  };

  return (
    <>
      <Helmet>
        <title>{pageMetaTags.services.title}</title>
        <meta name="description" content={pageMetaTags.services.description} />
        <meta name="keywords" content={pageMetaTags.services.keywords} />
        <meta property="og:title" content={pageMetaTags.services.title} />
        <meta property="og:description" content={pageMetaTags.services.description} />
        <meta name="twitter:title" content={pageMetaTags.services.title} />
        <meta name="twitter:description" content={pageMetaTags.services.description} />
        <link rel="canonical" href="https://kirandhakal.com/services" />
      </Helmet>
      <PageShell activeSection="services" onNavigate={onNavigate}>
        <section id="services" className="min-h-screen">
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>
        </section>
      </PageShell>
    </>
  );
};

export default ServicesPage;


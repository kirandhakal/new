import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PageShell from "./PageShell";
import { pageMetaTags } from "../utils/seoUtils";

const SkillsSection = React.lazy(() => import("../components/sections/SkillsSection"));

const SkillsPage = () => {
  const navigate = useNavigate();

  const onNavigate = (key) => {
    if (key === "home") navigate("/");
    else navigate(`/${key}`);
  };

  return (
    <>
      <Helmet>
        <title>{pageMetaTags.skills.title}</title>
        <meta name="description" content={pageMetaTags.skills.description} />
        <meta name="keywords" content={pageMetaTags.skills.keywords} />
        <meta property="og:title" content={pageMetaTags.skills.title} />
        <meta property="og:description" content={pageMetaTags.skills.description} />
        <meta name="twitter:title" content={pageMetaTags.skills.title} />
        <meta name="twitter:description" content={pageMetaTags.skills.description} />
        <link rel="canonical" href="https://kirandhakal.com/skills" />
      </Helmet>
      <PageShell activeSection="skills" onNavigate={onNavigate}>
        <section id="skills" className="min-h-screen">
        <Suspense fallback={null}>
          <SkillsSection />
        </Suspense>
        </section>
      </PageShell>
    </>
  );
};

export default SkillsPage;


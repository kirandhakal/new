import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PageShell from "./PageShell";
import { pageMetaTags } from "../utils/seoUtils";

const ProjectsSection = React.lazy(() => import("../components/sections/ProjectsSection"));

const ProjectsPage = () => {
  const navigate = useNavigate();

  const onNavigate = (key) => {
    if (key === "home") navigate("/");
    else navigate(`/${key}`);
  };

  return (
    <>
      <Helmet>
        <title>{pageMetaTags.projects.title}</title>
        <meta name="description" content={pageMetaTags.projects.description} />
        <meta name="keywords" content={pageMetaTags.projects.keywords} />
        <meta property="og:title" content={pageMetaTags.projects.title} />
        <meta property="og:description" content={pageMetaTags.projects.description} />
        <meta name="twitter:title" content={pageMetaTags.projects.title} />
        <meta name="twitter:description" content={pageMetaTags.projects.description} />
        <link rel="canonical" href="https://kirandhakal.com/projects" />
      </Helmet>
      <PageShell activeSection="projects" onNavigate={onNavigate}>
        <section id="projects" className="min-h-screen">
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>
        </section>
      </PageShell>
    </>
  );
};

export default ProjectsPage;


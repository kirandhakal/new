import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const PortfolioPage = React.lazy(() => import("features/home/PortfolioPage"));
const ServicesPage = React.lazy(() => import("features/services/ServicesPage"));
const SkillsPage = React.lazy(() => import("features/skills/SkillsPage"));
const ProjectsPage = React.lazy(() => import("features/projects/ProjectsPage"));
const ContactPage = React.lazy(() => import("features/contact/ContactPage"));
const NotFoundPage = React.lazy(() => import("features/not-found/NotFoundPage"));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={null}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const PortfolioPage = React.lazy(() => import("./PortfolioPage"));
const ServicesPage = React.lazy(() => import("./ServicesPage"));
const SkillsPage = React.lazy(() => import("./SkillsPage"));
const ProjectsPage = React.lazy(() => import("./ProjectsPage"));
const ContactPage = React.lazy(() => import("./ContactPage"));

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;

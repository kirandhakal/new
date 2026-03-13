import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PageShell from "./PageShell";
import { pageMetaTags } from "../utils/seoUtils";

const ContactSection = React.lazy(() => import("../components/sections/ContactSection"));

const ContactPage = () => {
  const navigate = useNavigate();

  const onNavigate = (key) => {
    if (key === "home") navigate("/");
    else navigate(`/${key}`);
  };

  return (
    <>
      <Helmet>
        <title>{pageMetaTags.contact.title}</title>
        <meta name="description" content={pageMetaTags.contact.description} />
        <meta name="keywords" content={pageMetaTags.contact.keywords} />
        <meta property="og:title" content={pageMetaTags.contact.title} />
        <meta property="og:description" content={pageMetaTags.contact.description} />
        <meta name="twitter:title" content={pageMetaTags.contact.title} />
        <meta name="twitter:description" content={pageMetaTags.contact.description} />
        <link rel="canonical" href="https://kirandhakal.com/contact" />
      </Helmet>
      <PageShell activeSection="contact" onNavigate={onNavigate}>
        <section id="contact" className="min-h-screen">
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
        </section>
      </PageShell>
    </>
  );
};

export default ContactPage;


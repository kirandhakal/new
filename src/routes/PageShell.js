import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const ChatbaseWidget = React.lazy(() => import("../components/sections/ChatbaseWidget"));

const PageShell = ({ activeSection, onNavigate, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header onHomeClick={() => onNavigate("home")} />

      <main className="pt-[72px] md:pt-20">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      <NavBar activeSection={activeSection} setActiveSection={onNavigate} />
      <React.Suspense fallback={null}>
        <ChatbaseWidget />
      </React.Suspense>
      <Footer />
    </div>
  );
};

export default PageShell;


"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import type { SectionKey } from "@/types/navigation";

const ChatbaseWidget = React.lazy(() => import("@/features/ChatbaseWidget"));

interface PageShellProps {
  activeSection: SectionKey;
  children: React.ReactNode;
}

const PageShell = ({ activeSection, children }: PageShellProps) => {
  const router = useRouter();
  const onNavigate = (section: SectionKey) => {
    router.push(section === "home" ? "/" : `/${section}`);
  };

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

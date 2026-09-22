"use client";

import React, { useState } from "react";
import {
  BellRing,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Hotel,
  Landmark,
  MessageSquare,
  Palette,
  PanelsTopLeft,
  ShoppingBag,
  Sparkles,
  Store,
  Utensils,
  Wrench,
} from "lucide-react";

const categories = [
  { key: "all", label: "All work" },
  { key: "govtech", label: "GovTech" },
  { key: "saas", label: "SaaS & automation" },
  { key: "commerce", label: "Commerce & hospitality" },
  { key: "creative", label: "Creative" },
];

const projects = [
  {
    title: "Dhangadhi Service Bus",
    category: "govtech",
    description:
      "Municipal e-Governance platform with role-based workflows, e-KYC and migration services, Sifarish, appointments, and online payments.",
    demo: "https://dhangadhi.palikaportal.com/",
    icon: Landmark,
    gradient: "from-blue-600 to-cyan-500",
    tags: ["Next.js", "NestJS", "GraphQL", "PostgreSQL"],
  },
  {
    title: "Hello Palika",
    category: "govtech",
    description:
      "Municipal SaaS platform connecting citizens and local government through notices, complaints, public decisions, and direct communication.",
    demo: "https://hellopalika.cliffbyte.com/",
    icon: MessageSquare,
    gradient: "from-sky-600 to-indigo-500",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Vibe College",
    category: "saas",
    description:
      "Drag-and-drop form builder for student enrollment, intake management, and automated offer-letter workflows.",
    demo: "https://www.vibecollege.edu.au/",
    icon: GraduationCap,
    gradient: "from-violet-600 to-fuchsia-500",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "CTF School Management",
    category: "saas",
    description:
      "Academic management system that automates report-card and transcript generation for schools.",
    demo: "https://ctfnepal.com/",
    icon: FileText,
    gradient: "from-indigo-600 to-violet-500",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Connect Kisan",
    category: "saas",
    description:
      "Notification management module powered by a RabbitMQ service bus for dependable asynchronous message delivery.",
    demo: "https://connectkisan.com/en",
    icon: BellRing,
    gradient: "from-emerald-600 to-teal-500",
    tags: ["Next.js", "Node.js", "RabbitMQ", "PostgreSQL"],
  },
  {
    title: "PMS SaaS Tool",
    category: "saas",
    description:
      "A collaboration workspace for development teams with role-based access, project visibility, and sprint tracking.",
    demo: "https://pms.dhakalkiran.com.np/",
    icon: PanelsTopLeft,
    gradient: "from-blue-600 to-violet-500",
    tags: ["SaaS", "RBAC", "Sprint Planning"],
  },
  {
    title: "Dynamic CV Maker",
    category: "saas",
    description:
      "ATS-friendly résumé builder with real-time preview, flexible content editing, and polished PDF export.",
    github: "https://github.com/kirandhakal/Dynamiccvmaker",
    demo: "https://cv.dhakalkiran.com.np/",
    icon: FileText,
    gradient: "from-purple-600 to-pink-500",
    tags: ["React", "Live Preview", "PDF Export"],
  },
  {
    title: "Syanko POS",
    category: "commerce",
    description:
      "Restaurant point-of-sale system with Kitchen Order Ticket routing and automated billing workflows.",
    demo: "https://syanko-test.dashboard.cliffbyte.com/en",
    icon: Utensils,
    gradient: "from-orange-600 to-amber-500",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
  },
  {
    title: "Churika",
    category: "commerce",
    description:
      "Headless eCommerce CMS for managing storefront banners, product collections, and featured merchandise.",
    demo: "https://chiurika.com/",
    icon: Store,
    gradient: "from-rose-600 to-orange-500",
    tags: ["React", "Node.js", "GraphQL"],
  },
  {
    title: "Red Panda Hotel",
    category: "commerce",
    description:
      "Hospitality platform with room reservations, live inventory, and custom guest checkout flows.",
    demo: "https://pandanest.vercel.app/",
    icon: Hotel,
    gradient: "from-teal-600 to-cyan-500",
    tags: ["Hospitality", "Reservations", "Checkout"],
  },
  {
    title: "Food Delivery AI",
    category: "commerce",
    description:
      "Food ordering experience enhanced with collaborative-filtering recommendations for more relevant discovery.",
    demo: "https://fooddelivery-ten-ebon.vercel.app/",
    icon: ShoppingBag,
    gradient: "from-amber-600 to-red-500",
    tags: ["Food Ordering", "Recommendations", "AI"],
  },
  {
    title: "Gourav Studio",
    category: "creative",
    description:
      "Immersive digital-art portfolio for Gourav Pangeni, showcasing character studies, curated collections, creative process, and client inquiries.",
    demo: "https://admirationseeker.vercel.app/",
    icon: Palette,
    gradient: "from-pink-600 to-blue-600",
    tags: ["Next.js", "Digital Portfolio", "Interactive UI"],
  },
  {
    title: "Dwarika Engineering",
    category: "creative",
    description:
      "A polished engineering-company website that presents its services, capabilities, and project work through a clear, professional digital experience.",
    demo: "https://dwarikaengineering.com/",
    icon: Wrench,
    gradient: "from-slate-600 to-cyan-500",
    tags: ["Web Design", "Company Profile", "Responsive UI"],
  },
];

const categoryNames = Object.fromEntries(
  categories.filter(({ key }) => key !== "all").map(({ key, label }) => [key, label])
);

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf9f7] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 text-orange-600">
            <Sparkles size={16} className="text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Selected work</span>
          </div>
          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-gray-950 sm:text-5xl md:text-6xl">
            Projects with purpose
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Production platforms and independent builds across civic technology, SaaS,
            commerce, hospitality, and creative experiences.
          </p>
        </div>

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.key;
            const count =
              category.key === "all"
                ? projects.length
                : projects.filter((project) => project.category === category.key).length;

            return (
              <button
                key={category.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.key)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-semibold sm:px-5 ${
                  isActive
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {category.label}
                <span className={`ml-2 text-xs ${isActive ? "text-gray-300" : "text-gray-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => {
            const Icon = project.icon;

            return (
              <article
                key={`${activeCategory}-${project.title}`}
                className="project-card-enter flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-orange-200 hover:shadow-md"
                style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-orange-600">
                      {categoryNames[project.category]}
                    </span>
                  </div>
                  <span className="flex flex-none items-center gap-1.5 text-xs font-medium text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-gray-950">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code`}
                      className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-950"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    View project <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 border-t border-gray-200 pt-10 text-center">
          <p className="mb-4 font-medium text-gray-500">Explore the code behind more experiments.</p>
          <a
            href="https://github.com/kirandhakal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:border-gray-900"
          >
            <Github size={19} />
            View GitHub profile
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Compass,
  ExternalLink,
  GraduationCap,
  Images,
  LayoutDashboard,
  Lightbulb,
  Map,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CaseStudy } from "@/types/content";
import { caseStudies } from "@/lib/case-studies";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { H1, H3, P } from "@/components/typography";

const icons: Record<string, LucideIcon> = {
  Compass,
  Images,
  LayoutDashboard,
  Map,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Sparkles,
  Store,
  Users,
  Wallet,
};

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">{title}</h2>
    </div>
  );
}

export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const Icon = icons[study.icon] ?? Compass;
  const brief = [
    { icon: Lightbulb, label: "Problem", text: study.problem },
    { icon: Target, label: "Objective", text: study.objective },
    { icon: TrendingUp, label: "Impact", text: study.impact },
  ];

  return (
    <article className="px-6 py-12 lg:py-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: caseStudies.eyebrow, href: "/case-studies" }, { label: study.title }]} />

      {/* Hero */}
      <header className="mt-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg`}>
              <Icon size={24} />
            </span>
            <span className="font-semibold text-muted-foreground">{study.category}</span>
          </div>
          <H1 className="mb-6">{study.title}</H1>
          <P className="mb-8 text-xl font-medium">{study.tagline}</P>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="flex gap-3">
              <GraduationCap size={18} className="mt-0.5 shrink-0 text-accent" />
              <div><dt className="font-bold text-foreground">{study.projectType}</dt><dd className="text-muted-foreground">{study.institution}</dd></div>
            </div>
            <div className="flex gap-3">
              <Users size={18} className="mt-0.5 shrink-0 text-accent" />
              <div><dt className="font-bold text-foreground">Team</dt><dd className="text-muted-foreground">{study.team.join(", ")}</dd></div>
            </div>
            <div className="flex gap-3">
              <CalendarDays size={18} className="mt-0.5 shrink-0 text-accent" />
              <div><dt className="font-bold text-foreground">Year</dt><dd className="text-muted-foreground">{study.year}</dd></div>
            </div>
          </dl>
        </div>
        <div className={`overflow-hidden rounded-3xl bg-secondary grid-texture p-6 shadow-lifted sm:p-10`}>
          <img src={study.cover} alt={`${study.title} wireframe`} className="mx-auto max-h-[420px] w-auto rounded-2xl bg-card shadow-lifted" />
        </div>
      </header>

      {/* Overview */}
      <section className="mt-24">
        <SectionTitle eyebrow="Overview" title="The project" />
        <P className="max-w-4xl text-lg leading-relaxed">{study.overview}</P>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {brief.map(({ icon: BriefIcon, label, text }) => (
            <div key={label} className="rounded-2xl border border-border bg-card/70 p-6 shadow-soft">
              <BriefIcon size={24} className="mb-4 text-accent" />
              <H3 className="mb-2 text-xl">{label}</H3>
              <p className="leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-24">
        <SectionTitle eyebrow="Solution" title="Key features" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {study.highlights.map((feature) => {
            const FeatureIcon = icons[feature.icon] ?? Sparkles;
            return (
              <div key={feature.title} className="group rounded-2xl border border-border bg-card/70 p-6 shadow-soft transition-shadow hover:shadow-lifted">
                <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md transition-transform group-hover:scale-110`}>
                  <FeatureIcon size={22} />
                </span>
                <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Users & use cases */}
      <section className="mt-24">
        <SectionTitle eyebrow="Users" title="Who does what" />
        <ol className="grid gap-4 md:grid-cols-2">
          {study.actors.map((actor, index) => (
            <li key={actor.name} className="flex gap-5 rounded-2xl border border-border bg-card/70 p-6">
              <span className="text-3xl font-black text-accent">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="mb-1 text-lg font-bold text-foreground">{actor.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{actor.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Research */}
      <section className="mt-24">
        <SectionTitle eyebrow="Research" title="Landscape & references" />
        <P className="mb-8 max-w-3xl">{study.research.intro}</P>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.research.items.map((item) => {
            const body = (
              <>
                <h3 className="mb-1 flex items-center gap-2 font-bold text-foreground group-hover:text-accent">
                  {item.name}
                  {item.url && <ExternalLink size={14} className="shrink-0 opacity-60" />}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </>
            );
            const className = "group block rounded-2xl border-l-4 border-accent bg-card/70 p-5 shadow-soft";
            return item.url ? (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className={`${className} transition-shadow hover:shadow-lifted`}>{body}</a>
            ) : (
              <div key={item.name} className={className}>{body}</div>
            );
          })}
        </div>
      </section>

      {/* Process & stack */}
      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Process" title={study.approach.name} />
          <P className="mb-8">{study.approach.intro}</P>
          <ol className="flex flex-wrap gap-3">
            {study.approach.steps.map((step, index) => (
              <li key={step} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-secondary grid-texture text-xs text-white`}>{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionTitle eyebrow="Stack" title="Tools & technologies" />
          <div className="flex flex-wrap gap-3">
            {study.stack.map((tech) => <Badge key={tech} className="px-4 py-2 text-sm">{tech}</Badge>)}
          </div>
        </div>
      </section>

      <div className="mt-20 text-center">
        <Link href="/case-studies" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground hover:border-ring">
          <ArrowLeft size={18} />{caseStudies.backLabel}
        </Link>
      </div>
    </article>
  );
}

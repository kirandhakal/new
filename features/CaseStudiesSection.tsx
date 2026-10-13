import Link from "next/link";
import { ArrowRight, BookOpen, Compass, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { Badge } from "@/components/ui/badge";
import { H2, P } from "@/components/typography";

const icons: Record<string, LucideIcon> = { Compass, ShoppingBag };

export default function CaseStudiesSection() {
  return (
    <div className="relative px-6 py-20 lg:py-32">
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm">
          <BookOpen size={16} className="text-orange-500" />
          <span className="text-sm font-medium text-gray-700">{caseStudies.eyebrow}</span>
        </div>
        <H2 className="mb-4">{caseStudies.title}</H2>
        <div className="flex justify-center">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-rose-500"></div>
        </div>
        <P className="mx-auto mt-6 max-w-2xl text-lg font-medium">{caseStudies.description}</P>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {caseStudies.items.map((study) => {
          const Icon = icons[study.icon] ?? BookOpen;
          return (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card/70 shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${study.gradient}`}>
                <img
                  src={study.cover}
                  alt={`${study.title} preview`}
                  className="absolute inset-x-8 top-8 h-full w-[calc(100%-4rem)] rounded-t-2xl bg-white object-cover object-top shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${study.gradient} text-white`}>
                    <Icon size={20} />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">{study.category} · {study.year}</span>
                </div>
                <h3 className="mb-3 text-3xl font-black tracking-tight text-foreground">{study.title}</h3>
                <p className="mb-6 font-medium leading-relaxed text-muted-foreground">{study.tagline}</p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {study.stack.slice(0, 5).map((tech) => <Badge key={tech}>{tech}</Badge>)}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold text-foreground group-hover:text-accent">
                  {caseStudies.readLabel}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

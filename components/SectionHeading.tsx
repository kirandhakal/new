import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/* Shared editorial heading: mono eyebrow, oversized display title, and a section counter. */
export default function SectionHeading({ index, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 border-b border-border pb-10 md:grid-cols-12 md:items-end md:pb-14", className)}>
      <div className="md:col-span-8">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,8vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-foreground">
          {title}
        </h2>
      </div>
      <div className="flex items-end justify-between gap-6 md:col-span-4 md:flex-col md:items-end">
        {description && <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-right">{description}</p>}
        <span className="flex-none font-mono text-xs tracking-[0.2em] text-muted-foreground">
          <span className="text-accent">{index}</span> / 04
        </span>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/board";
import type { SectionKey } from "@/types/navigation";

interface ModuleHeadingProps {
  module: SectionKey;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/* Section heading printed like board silkscreen: reference designator, bus address, then the title. */
export default function ModuleHeading({ module, title, description, className }: ModuleHeadingProps) {
  const m = MODULES[module];

  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
            <span className={cn("led", m.led)} />
            {m.ref}
          </span>
          <span className="silk">
            {m.addr} · {m.label}
          </span>
        </div>
        <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-foreground">
          {title}
        </h2>
      </div>

      <div className="md:col-span-4">
        {description && <p className="text-base leading-relaxed text-muted-foreground md:text-right">{description}</p>}
        {/* Pin header: one pad per bit of the module address */}
        <div className="mt-6 flex items-center gap-1.5 md:justify-end" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => {
            const on = (parseInt(m.addr, 16) >> (7 - i)) & 1;
            return (
              <span key={i} className={cn("h-3.5 w-3.5 rounded-[3px] border-2", on ? "border-copper bg-copper" : "border-copper/60 bg-transparent")} />
            );
          })}
          <span className="ml-2 font-mono text-[10px] text-muted-foreground">{m.addr}</span>
        </div>
      </div>
    </div>
  );
}

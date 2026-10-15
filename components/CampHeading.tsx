import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CAMPS, CAMP_ORDER, altitudeFraction, formatMeters } from "@/lib/expedition";
import type { SectionKey } from "@/types/navigation";

interface CampHeadingProps {
  camp: SectionKey;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/* Section heading styled as a trail sign: camp name + altitude, then a mini elevation profile. */
export default function CampHeading({ camp, title, description, className }: CampHeadingProps) {
  const current = CAMPS[camp];
  const reached = CAMP_ORDER.indexOf(camp);

  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
            <span className={cn("h-2.5 w-2.5 rounded-[2px]", current.tone)} />
            {current.name}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            ▲ {formatMeters(current.altitude)} · {current.label}
          </span>
        </div>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,7.5vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-foreground">
          {title}
        </h2>
      </div>

      <div className="md:col-span-4">
        {description && <p className="text-base leading-relaxed text-muted-foreground md:text-right">{description}</p>}
        {/* Elevation profile: one step per camp, filled up to this camp. */}
        <div className="mt-6 flex h-14 items-end gap-1.5 md:justify-end" aria-hidden="true">
          {CAMP_ORDER.map((key, i) => (
            <span
              key={key}
              className={cn("w-full max-w-[3rem] rounded-t-[3px]", i <= reached ? CAMPS[key].tone : "bg-secondary")}
              style={{ height: `${18 + altitudeFraction(CAMPS[key].altitude) * 82}%`, opacity: i === reached ? 1 : 0.55 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

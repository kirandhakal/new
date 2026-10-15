import { cn } from "@/lib/utils";
import { FLAG_TONES } from "@/lib/expedition";

interface PrayerFlagsProps {
  count?: number;
  /** How far the string sags in the middle, in px. */
  sag?: number;
  className?: string;
}

/* A string of lungta prayer flags hanging in a gentle curve and swaying in the wind. */
export default function PrayerFlags({ count = 15, sag = 36, className }: PrayerFlagsProps) {
  const flags = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    return { left: t * 100, top: 4 * sag * t * (1 - t), tone: FLAG_TONES[i % FLAG_TONES.length] };
  });

  return (
    <div className={cn("pointer-events-none relative w-full", className)} style={{ height: sag + 48 }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path
          d={`M0 0 Q50 ${(2 * sag * 100) / (sag + 48)} 100 0`}
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.6)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {flags.map((flag, i) => (
        <span
          key={i}
          className={cn("animate-flag absolute h-8 w-6 -translate-x-1/2 rounded-b-[3px] sm:h-10 sm:w-8", flag.tone)}
          style={{ left: `${flag.left}%`, top: flag.top, animationDelay: `${(i % 5) * -0.55}s`, opacity: 0.92 }}
        />
      ))}
    </div>
  );
}

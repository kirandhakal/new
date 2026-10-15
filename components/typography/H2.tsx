import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-display text-4xl font-bold leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-7xl", className)} {...props} />;
}

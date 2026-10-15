import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-foreground sm:text-6xl md:text-display", className)} {...props} />;
}

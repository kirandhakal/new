import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-6xl", className)} {...props} />;
}

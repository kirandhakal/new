import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-4xl font-black tracking-tight sm:text-5xl md:text-7xl", className)} {...props} />;
}

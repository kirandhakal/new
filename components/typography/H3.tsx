import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H3({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-bold tracking-tight", className)} {...props} />;
}

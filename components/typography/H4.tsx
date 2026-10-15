import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H4({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("font-display text-xl font-semibold tracking-tight text-foreground", className)} {...props} />;
}

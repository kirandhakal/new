import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function H4({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("text-xl font-bold tracking-tight", className)} {...props} />;
}

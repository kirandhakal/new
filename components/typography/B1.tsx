import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function B1({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-base font-medium", className)} {...props} />;
}

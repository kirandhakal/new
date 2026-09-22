import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function P({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("leading-relaxed text-gray-600", className)} {...props} />;
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function P({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body text-muted-foreground", className)} {...props} />;
}

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn("w-full rounded-xl border border-input bg-secondary px-4 py-3 text-foreground outline-none transition-colors focus:border-ring", className)}
      {...props}
    />
  ),
);
Select.displayName = "Select";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn("w-full rounded-md border border-gray-200 bg-white px-3 py-2 outline-none focus:border-orange-400", className)}
      {...props}
    />
  ),
);
Select.displayName = "Select";

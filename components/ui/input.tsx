import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("w-full rounded-xl border border-input bg-secondary px-4 py-3 text-foreground outline-none transition-colors focus:border-ring", className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

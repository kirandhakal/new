import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("w-full rounded-xl border border-input bg-secondary px-4 py-3 text-foreground outline-none transition-colors focus:border-ring", className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

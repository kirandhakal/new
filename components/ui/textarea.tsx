import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:border-ring", className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

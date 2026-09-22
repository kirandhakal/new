import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("w-full rounded-md border border-gray-200 bg-white px-3 py-2 outline-none focus:border-orange-400", className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

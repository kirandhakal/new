import type { FormHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Form({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("space-y-5", className)} {...props} />;
}

export function FormField({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground", className)} {...props} />;
}

export function FormMessage({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-danger", className)} {...props} />;
}

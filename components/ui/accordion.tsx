import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("divide-y divide-gray-200", className)} {...props} />;
}

interface AccordionItemProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  label: ReactNode;
}

export function AccordionItem({ label, className, children, ...props }: AccordionItemProps) {
  return (
    <details className={cn("group py-4", className)} {...props}>
      <summary className="cursor-pointer list-none font-semibold">{label}</summary>
      <div className="pt-3 text-muted-foreground">{children}</div>
    </details>
  );
}

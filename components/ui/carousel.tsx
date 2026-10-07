"use client";

import { Children, useState, type ReactNode } from "react";
import { Button } from "./button";

export function Carousel({ children, ariaLabel = "Carousel" }: { children: ReactNode; ariaLabel?: string }) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  if (!slides.length) return null;

  return (
    <section aria-label={ariaLabel} className="space-y-4">
      <div aria-live="polite">{slides[index]}</div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIndex((index - 1 + slides.length) % slides.length)}>Previous</Button>
        <Button variant="outline" size="sm" onClick={() => setIndex((index + 1) % slides.length)}>Next</Button>
      </div>
    </section>
  );
}

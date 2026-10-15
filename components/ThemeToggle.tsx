"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/* Switches between the night climb (dark) and Himalayan dawn (light). Choice is remembered per browser. */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Dawn (light)" : "Night (dark)"}
      className="relative flex h-9 w-16 flex-none items-center rounded-full border border-border bg-secondary p-1 transition-colors"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft transition-transform duration-300 ${
          isDark ? "translate-x-0" : "translate-x-7"
        }`}
      >
        {isDark ? <Moon size={14} strokeWidth={2.4} /> : <Sun size={14} strokeWidth={2.4} />}
      </span>
    </button>
  );
}

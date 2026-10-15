"use client";

import { motion } from "framer-motion";

const COLORS = ["--flag-blue", "--flag-white", "--flag-red", "--flag-green", "--flag-yellow"];

/* A burst of prayer-flag confetti. Re-mount with a new key to fire again. */
export default function Confetti({ pieces = 42 }: { pieces?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden="true">
      {Array.from({ length: pieces }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
          return x - Math.floor(x);
        };
        return (
          <motion.span
            key={i}
            className="absolute top-0 h-3 w-2 rounded-[1px]"
            style={{ left: `${r(1) * 100}%`, background: `hsl(var(${COLORS[i % COLORS.length]}))` }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 520 + r(2) * 300, x: (r(3) - 0.5) * 160, rotate: r(4) * 720, opacity: 0 }}
            transition={{ duration: 1.8 + r(5) * 1.2, ease: "easeOut", delay: r(6) * 0.25 }}
          />
        );
      })}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Power } from "lucide-react";

const POST_LINES: Array<[string, string?]> = [
  ["KD-BIOS v26.10  (c) Kiran Dhakal, Kathmandu"],
  ["CPU0: Kiran Dhakal @ full-stack, 2 core, unlimited curiosity", "ok"],
  ["Memory test: 10+ projects ............................ OK", "ok"],
  ["Detecting buses: PCIe (services) · I2C (skills) · SPI (projects)", "ok"],
  ["Loading module react.ko", "ok"],
  ["Loading module nextjs.ko", "ok"],
  ["Loading module nodejs.ko · nestjs.ko", "ok"],
  ["Mounting /dev/postgres  /dev/mongodb", "ok"],
  ["Calibrating UI/UX sensors", "ok"],
  ["Coffee level ......................................... 87%", "warn"],
  ["Starting UART on /dev/ttyKD0 (contact)", "ok"],
  ["All systems nominal. Welcome."],
];

interface BootScreenProps {
  onBootComplete?: () => void;
}

/* First-visit power-on sequence. Remembered per tab session so it only plays once. */
export default function BootScreen({ onBootComplete }: BootScreenProps = {}) {
  const [phase, setPhase] = useState<"off" | "booting" | "done">("off");
  const [shown, setShown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("kd-booted")) {
        setPhase("done");
        onBootComplete?.();
      }
    } catch {
      // No storage: just show the boot screen.
    }
  }, [onBootComplete]);

  // Lock body scroll while in the boot screen sequence
  useEffect(() => {
    if (phase !== "done") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [phase]);

  const finish = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    setPhase("done");
    try {
      sessionStorage.setItem("kd-booted", "1");
      document.documentElement.setAttribute("data-booted", "true");
    } catch {
      // Ignore: the boot screen will simply play again next time.
    }
    onBootComplete?.();
  }, [onBootComplete]);

  const powerOn = useCallback(() => {
    if (phase !== "off") return;
    setPhase("booting");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return finish();
    timer.current = setInterval(() => {
      setShown((n) => {
        if (n + 1 >= POST_LINES.length) {
          if (timer.current) clearInterval(timer.current);
          setTimeout(finish, 650);
        }
        return n + 1;
      });
    }, 150);
  }, [finish, phase]);

  useEffect(() => {
    if (phase !== "off") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") powerOn();
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish, phase, powerOn]);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          id="boot-screen"
          exit={{ opacity: 0, scaleY: 0.02, filter: "brightness(2)" }}
          transition={{ duration: 0.45, ease: "easeIn" }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background px-5"
        >
          {phase === "off" ? (
            <div className="flex flex-col items-center text-center">
              <p className="silk">Board KD-2026 detected · standby</p>
              <motion.button
                type="button"
                onClick={powerOn}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                className="group relative mt-8 flex h-36 w-36 items-center justify-center rounded-full border-2 border-border bg-card shadow-lifted sm:h-44 sm:w-44"
                aria-label="Power on"
              >
                <span className="absolute inset-3 animate-ping rounded-full border border-accent/30" />
                <span className="absolute inset-0 rounded-full border-[3px] border-accent/70" />
                <Power size={54} strokeWidth={2.2} className="text-accent transition-transform group-hover:scale-110" />
              </motion.button>
              <p className="mt-8 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">Kiran Dhakal</p>
              <p className="mt-2 max-w-sm text-muted-foreground">Computer engineer & full-stack developer. Press power to boot the portfolio.</p>
              <div className="mt-6 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                <span className="hidden sm:inline">
                  <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-foreground">Enter</kbd> power on
                </span>
                <button type="button" onClick={finish} className="underline underline-offset-4 hover:text-foreground">
                  Skip boot
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl font-mono text-[12px] leading-6 sm:text-sm">
              {POST_LINES.slice(0, shown).map(([line, status], i) => (
                <div key={i} className="flex justify-between gap-4">
                  <span className="truncate text-foreground">{line}</span>
                  {status && (
                    <span className={status === "ok" ? "text-led-green" : "text-led-amber"}>[{status === "ok" ? " OK " : "WARN"}]</span>
                  )}
                </div>
              ))}
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-accent transition-all duration-150" style={{ width: `${(shown / POST_LINES.length) * 100}%` }} />
              </div>
              <span className="mt-2 inline-block h-4 w-2 animate-blink bg-accent" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

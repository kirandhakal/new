"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, ArrowUp, Award, Backpack, ChevronDown, Diamond, Flag, Pause, Play, Tent } from "lucide-react";
import PrayerFlags from "@/components/expedition/PrayerFlags";
import { FLAG_TONES, SUMMIT_ALTITUDE, BASE_ALTITUDE } from "@/lib/expedition";
import Climber from "./Climber";
import Confetti from "./Confetti";
import DiscoveryCard, { categoryTone } from "./DiscoveryCard";
import { BADGES, STEPS, TOTALS, countFound, type Step } from "./steps";

interface ClimbGameProps {
  onSkip: () => void;
  onContact: () => void;
}

const N = STEPS.length;
const TOP_PAD = 150;
const BOTTOM_PAD = 170;

const fmtTime = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/* Deterministic pseudo-random so the mountain looks the same on server and client. */
const rand = (i: number, n: number) => {
  const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const nodeIcon = (step: Step, unlocked: boolean) => {
  if (step.kind === "camp" || step.kind === "base") return <Tent size={18} />;
  if (step.kind === "summit") return <Flag size={18} />;
  if (!unlocked) return <span className="font-mono text-xs font-bold">?</span>;
  if (step.kind === "gear") return <Backpack size={16} />;
  if (step.kind === "skill") return <Diamond size={16} />;
  return <Flag size={16} />;
};

const nodeTone = (step: Step) => {
  if (step.kind === "gear") return FLAG_TONES[step.n % FLAG_TONES.length];
  if (step.kind === "skill") return "bg-flag-blue";
  if (step.kind === "peak") return categoryTone[step.item.category];
  if (step.kind === "camp") return step.tone;
  return "bg-accent";
};

export default function ClimbGame({ onSkip, onContact }: ClimbGameProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1000, h: 760 });
  const [started, setStarted] = useState(false);
  const [pos, setPos] = useState(0);
  const [reached, setReached] = useState(0);
  const [auto, setAuto] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(true);
  const [burst, setBurst] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [nudge, setNudge] = useState(0);
  const [inView, setInView] = useState(true);
  const startedAt = useRef<number>(0);
  const [finish, setFinish] = useState<{ elapsed: string; best: string } | null>(null);

  const isMobile = size.w < 640;
  const gap = isMobile ? 104 : 118;
  const worldH = TOP_PAD + (N - 1) * gap + BOTTOM_PAD;
  const nodeY = useCallback((i: number) => TOP_PAD + (N - 1 - i) * gap, [gap]);
  const nodeX = (i: number) => 50 + (isMobile ? 26 : 30) * Math.sin(i * 0.82);

  // Measure the stage so the camera can frame the climber.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio > 0.45), { threshold: [0, 0.45, 1] });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Camera: keep the climber in the upper third on phones (the card sheet covers the bottom), centre-ish on desktop.
  const cameraY = useMemo(() => {
    const anchor = isMobile ? 0.34 : 0.58;
    const target = size.h * anchor - nodeY(pos);
    return Math.min(0, Math.max(size.h - worldH, target));
  }, [isMobile, nodeY, pos, size.h, worldH]);

  // Animated altitude readout.
  const altitude = useMotionValue(BASE_ALTITUDE);
  const altitudeText = useTransform(altitude, (v) => Math.round(v).toLocaleString("en-US"));
  const progressWidth = useTransform(altitude, (v) => `${((v - BASE_ALTITUDE) / (SUMMIT_ALTITUDE - BASE_ALTITUDE)) * 100}%`);
  useEffect(() => {
    const controls = animate(altitude, STEPS[pos].altitude, { duration: 0.7, ease: "easeOut" });
    return () => controls.stop();
  }, [altitude, pos]);

  const arrive = useCallback((next: number) => {
    const step = STEPS[next];
    if (step.kind === "camp") {
      setBurst((b) => b + 1);
      setToast(`Badge unlocked: ${step.badge}`);
    }
    if (step.kind === "summit") {
      setBurst((b) => b + 1);
      setToast("Summit reached! 8,849 m");
      setAuto(false);
      const ms = Date.now() - startedAt.current;
      let best = ms;
      try {
        const prev = Number(localStorage.getItem("kd-climb-best") || 0);
        best = prev ? Math.min(prev, ms) : ms;
        localStorage.setItem("kd-climb-best", String(best));
      } catch {
        // Best time is a nice-to-have; ignore storage failures.
      }
      setFinish({ elapsed: fmtTime(ms), best: fmtTime(best) });
    }
  }, []);

  // Refs mirror state so rapid key presses never read a stale position.
  const posRef = useRef(0);
  const reachedRef = useRef(0);
  const startedRef = useRef(false);

  const goTo = useCallback((i: number) => {
    posRef.current = i;
    setPos(i);
  }, []);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    startedAt.current = Date.now();
  }, []);

  const climb = useCallback(() => {
    start();
    setSheetOpen(true);
    const next = posRef.current + 1;
    if (next > N - 1) return;
    goTo(next);
    if (next > reachedRef.current) {
      reachedRef.current = next;
      setReached(next);
      arrive(next);
    }
  }, [arrive, goTo, start]);

  const descend = useCallback(() => goTo(Math.max(0, posRef.current - 1)), [goTo]);

  const restart = () => {
    goTo(0);
    reachedRef.current = 0;
    setReached(0);
    setFinish(null);
    setAuto(false);
    startedAt.current = Date.now();
  };

  const jumpTo = (i: number) => {
    if (i <= reached) {
      goTo(i);
      setSheetOpen(true);
    } else if (i === reached + 1 && pos === reached) {
      climb();
    } else {
      setNudge((n) => n + 1);
      setToast("Climb step by step to unlock it");
    }
  };

  // Keyboard: ↑ / W / Space climbs, ↓ / S goes back — only while the game fills the screen.
  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
        e.preventDefault();
        climb();
      } else if ((e.key === "ArrowDown" || e.key === "s") && started) {
        e.preventDefault();
        descend();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [climb, descend, inView, started]);

  // Auto-climb for visitors who just want the tour.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(climb, 1700);
    return () => clearInterval(id);
  }, [auto, climb]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  // Side ridges: jagged walls that frame the trail all the way up.
  const ridges = useMemo(() => {
    const rows = Math.ceil(worldH / 110) + 1;
    const side = (offset: number, mirror: boolean, depth: number) => {
      const pts = Array.from({ length: rows }, (_, i) => {
        const x = depth * (0.35 + rand(i, offset) * 0.65);
        return `${mirror ? 100 - x : x},${i * 110}`;
      });
      const edge = mirror ? 100 : 0;
      return `${edge},0 ${pts.join(" ")} ${edge},${worldH}`;
    };
    return {
      backL: side(1, false, isMobile ? 30 : 26),
      backR: side(2, true, isMobile ? 30 : 26),
      frontL: side(3, false, isMobile ? 16 : 14),
      frontR: side(4, true, isMobile ? 16 : 14),
    };
  }, [isMobile, worldH]);

  const trail = useMemo(
    () => STEPS.map((_, i) => `${i === 0 ? "M" : "L"}${nodeX(i)} ${nodeY(i)}`).join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, nodeY],
  );
  const reachedTrail = useMemo(
    () => STEPS.slice(0, reached + 1).map((_, i) => `${i === 0 ? "M" : "L"}${nodeX(i)} ${nodeY(i)}`).join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, nodeY, reached],
  );

  const step = STEPS[pos];
  const nextIsLocked = pos === reached && pos < N - 1;
  const earned = BADGES.filter((b) => b.index <= reached);

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={descend}
        disabled={!started || pos === 0}
        aria-label="Climb down one step"
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground disabled:opacity-30"
      >
        <ArrowDown size={18} />
      </button>
      <motion.button
        type="button"
        onClick={climb}
        disabled={pos >= N - 1}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 font-bold text-accent-foreground transition-opacity disabled:opacity-40"
      >
        <ArrowUp size={18} />
        {pos >= N - 1 ? "Summit reached" : nextIsLocked ? "Climb" : `Climb to ${STEPS[pos + 1].title}`}
      </motion.button>
      <button
        type="button"
        onClick={() => {
          start();
          setAuto((a) => !a);
        }}
        disabled={pos >= N - 1}
        aria-label={auto ? "Pause auto-climb" : "Auto-climb"}
        title={auto ? "Pause auto-climb" : "Auto-climb"}
        className={`flex h-12 w-12 flex-none items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${auto ? "border-accent bg-accent/15 text-accent" : "border-border text-foreground hover:border-foreground"}`}
      >
        {auto ? <Pause size={17} /> : <Play size={17} />}
      </button>
    </div>
  );

  return (
    <div className="relative flex h-[calc(100svh-4rem)] min-h-[560px] w-full overflow-hidden border-b border-border lg:min-h-[640px]">
      {/* Stage */}
      <div
        ref={stageRef}
        className="relative h-full min-w-0 flex-1 overflow-hidden"
        aria-label="Climbing game: climb Kiran's mountain to discover services, skills and projects"
        role="region"
      >
        <motion.div
          className="absolute inset-x-0 top-0"
          style={{ height: worldH }}
          animate={{ y: cameraY }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        >
          {/* Stars across the upper half of the climb (night only) */}
          <div className="absolute inset-x-0 top-0 hidden dark:block" style={{ height: worldH * 0.55 }}>
            {Array.from({ length: 90 }, (_, i) => (
              <span
                key={i}
                className="animate-twinkle absolute rounded-full bg-foreground"
                style={{ left: `${rand(i, 9) * 100}%`, top: `${rand(i, 10) * 100}%`, width: rand(i, 11) > 0.85 ? 2.5 : 1.5, height: rand(i, 11) > 0.85 ? 2.5 : 1.5, animationDelay: `${rand(i, 12) * 3}s` }}
              />
            ))}
          </div>

          <svg viewBox={`0 0 100 ${worldH}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <polygon points={ridges.backL} fill="hsl(var(--ridge-back))" opacity="0.55" />
            <polygon points={ridges.backR} fill="hsl(var(--ridge-back))" opacity="0.55" />
            <polygon points={ridges.frontL} fill="hsl(var(--ridge-mid))" />
            <polygon points={ridges.frontR} fill="hsl(var(--ridge-mid))" />
            {/* Camp altitude lines */}
            {STEPS.map((s, i) =>
              s.kind === "camp" || s.kind === "summit" ? (
                <line key={i} x1="0" x2="100" y1={nodeY(i)} y2={nodeY(i)} stroke="hsl(var(--border))" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
              ) : null,
            )}
            <path d={trail} fill="none" stroke="hsl(var(--muted-foreground) / 0.35)" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
            <path d={reachedTrail} fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeDasharray="10 8" vectorEffect="non-scaling-stroke" className="animate-trail" />
          </svg>

          {/* Summit cap + flags */}
          <div className="absolute inset-x-0" style={{ top: nodeY(N - 1) - 120 }}>
            <PrayerFlags count={isMobile ? 7 : 13} sag={26} className="mx-auto w-[70%] opacity-90" />
          </div>

          {/* Camp labels */}
          {STEPS.map((s, i) =>
            s.kind === "camp" || s.kind === "summit" || s.kind === "base" ? (
              <span
                key={`label-${i}`}
                className="absolute left-3 -translate-y-full pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:left-6"
                style={{ top: nodeY(i) }}
              >
                {s.title} · {s.altitude.toLocaleString("en-US")} m
              </span>
            ) : null,
          )}

          {/* Trail stops */}
          {STEPS.map((s, i) => {
            const unlocked = i <= reached;
            const isHere = i === pos;
            const big = s.kind === "camp" || s.kind === "summit" || s.kind === "base";
            return (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={unlocked ? `${s.title} (step ${i + 1})` : `Locked step ${i + 1}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${nodeX(i)}%`, top: nodeY(i) }}
              >
                {isHere && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />}
                <span
                  className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ${big ? "h-12 w-12" : "h-9 w-9"} ${
                    unlocked
                      ? `${nodeTone(s)} border-background text-accent-foreground shadow-soft`
                      : "border-dashed border-muted-foreground/50 bg-card text-muted-foreground group-hover:border-foreground"
                  } ${isHere ? "scale-110 ring-4 ring-accent/40" : ""}`}
                >
                  {nodeIcon(s, unlocked)}
                </span>
                {unlocked && !big && (
                  <span className="pointer-events-none absolute left-full top-1/2 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card/90 px-2 py-0.5 text-[11px] font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                    {s.title}
                  </span>
                )}
              </button>
            );
          })}

          {/* The climber */}
          <motion.div
            className="pointer-events-none absolute z-20 -translate-x-1/2"
            animate={{ left: `${nodeX(pos)}%`, top: nodeY(pos) - (STEPS[pos].kind === "camp" || pos === 0 || pos === N - 1 ? 72 : 62) }}
            transition={{ type: "spring", stiffness: 140, damping: 15 }}
          >
            <motion.div key={pos} animate={{ y: [0, -14, 0] }} transition={{ duration: 0.45 }}>
              <Climber facingLeft={pos < N - 1 && nodeX(pos + 1) < nodeX(pos)} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-5">
          <div className="pointer-events-auto rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-soft backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Altitude</p>
            <p className="font-display text-2xl font-extrabold tabular-nums text-foreground sm:text-3xl">
              <motion.span>{altitudeText}</motion.span>
              <span className="ml-1 text-sm font-bold text-muted-foreground">m</span>
            </p>
            <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-secondary sm:w-36">
              <motion.div className="h-full rounded-full bg-accent" style={{ width: progressWidth }} />
            </div>
          </div>

          <div className="pointer-events-auto flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/90 p-1.5 shadow-soft backdrop-blur">
              {(
                [
                  ["gear", Backpack, "Gear"],
                  ["skill", Diamond, "Skills"],
                  ["peak", Flag, "Peaks"],
                ] as const
              ).map(([kind, Icon, label]) => (
                <span key={kind} title={label} className="flex items-center gap-1.5 rounded-xl px-2 py-1.5 font-mono text-xs text-foreground sm:px-3">
                  <Icon size={14} className="text-accent" />
                  <span className="tabular-nums">{countFound(kind, reached)}/{TOTALS[kind]}</span>
                </span>
              ))}
            </div>
            {earned.length > 0 && (
              <div className="flex gap-1.5">
                {earned.map((b) => (
                  <motion.span
                    key={b.index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    title={b.badge}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-accent-foreground shadow-soft ${b.tone}`}
                  >
                    <Award size={15} />
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast + nudge}
              initial={{ opacity: 0, y: -10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -10, x: "-50%" }}
              className="absolute left-1/2 top-24 z-40 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background shadow-lifted sm:top-28"
              role="status"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {burst > 0 && <Confetti key={burst} />}

        {/* Start screen */}
        <AnimatePresence>
          {!started && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-background/70 p-5 backdrop-blur-[3px]"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="w-full max-w-md rounded-3xl border border-border bg-card p-7 text-center shadow-lifted sm:p-9"
              >
                <p lang="ne" className="font-deva text-4xl font-extrabold text-accent">नमस्ते!</p>
                <h1 className="mt-2 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-5xl">
                  Climb with Kiran
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  I&apos;m Kiran Dhakal, a full-stack developer from Kathmandu. Take my portfolio as a climb from 1,400 m to the top of Everest.
                  You&apos;ll collect <strong className="text-foreground">{TOTALS.gear} pieces of gear</strong>, <strong className="text-foreground">{TOTALS.skill} skills</strong> and <strong className="text-foreground">{TOTALS.peak} peaks</strong> I&apos;ve shipped on the way.
                </p>
                <div className="mt-5 hidden flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-muted-foreground sm:flex">
                  <kbd className="rounded-md border border-border bg-secondary px-2 py-1 text-foreground">↑</kbd>
                  <kbd className="rounded-md border border-border bg-secondary px-2 py-1 text-foreground">Space</kbd>
                  <span>or tap</span>
                  <span className="rounded-full bg-accent px-2 py-1 font-bold text-accent-foreground">Climb</span>
                </div>
                <button
                  type="button"
                  onClick={start}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-lg font-extrabold text-accent-foreground transition-transform hover:-translate-y-0.5"
                >
                  <ArrowUp size={20} /> Start climbing
                </button>
                <button type="button" onClick={onSkip} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  Skip the game, show the classic portfolio <ChevronDown size={15} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phone: discovery sheet + controls */}
        <div className="absolute inset-x-0 bottom-0 z-30 lg:hidden">
          <div className="mx-2 mb-2 overflow-hidden rounded-3xl border border-border bg-card/95 shadow-lifted backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setSheetOpen((o) => !o)}
              className="flex w-full items-center justify-between px-5 pt-3 text-left"
              aria-expanded={sheetOpen}
            >
              <span className="mx-auto h-1 w-10 rounded-full bg-border" />
            </button>
            <AnimatePresence initial={false}>
              {sheetOpen && started && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-h-[40svh] overflow-y-auto px-5 pb-4 pt-2">
                    <DiscoveryCard step={step} index={pos} elapsed={finish?.elapsed} best={finish?.best} onContact={onContact} onRestart={restart} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="border-t border-border p-2.5">{controls}</div>
          </div>
        </div>
      </div>

      {/* Desktop: field journal panel */}
      <aside className="hidden w-[400px] flex-none flex-col border-l border-border bg-card lg:flex xl:w-[440px]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <span className="font-display text-lg font-bold">Field journal</span>
          <button type="button" onClick={onSkip} className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">
            Classic view ↓
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait">
            <DiscoveryCard key={pos} step={step} index={pos} elapsed={finish?.elapsed} best={finish?.best} onContact={onContact} onRestart={restart} />
          </AnimatePresence>
        </div>
        <div className="border-t border-border p-4">
          {controls}
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            ↑ / Space climb · ↓ back · click any found item to revisit
          </p>
        </div>
      </aside>

      <p className="sr-only" aria-live="polite">
        {started ? `${step.title}, ${step.altitude} metres. Step ${pos + 1} of ${N}.` : ""}
      </p>
    </div>
  );
}

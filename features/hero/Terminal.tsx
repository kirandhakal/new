"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import heroJson from "@/data/landing-page/home-hero.json";
import servicesJson from "@/data/landing-page/home-service.json";
import skillsJson from "@/data/landing-page/home-skills.json";
import projectsJson from "@/data/landing-page/home-project.json";
import type { HeroContent, ProjectContent, ServiceContent, SkillContent } from "@/types/content";
import type { SectionKey } from "@/types/navigation";

const hero = heroJson as HeroContent;
const services = servicesJson as ServiceContent;
const skills = skillsJson as SkillContent;
const projects = projectsJson as ProjectContent;

type Line = { id: number; content: ReactNode; tone?: "cmd" | "ok" | "err" | "muted" | "accent" };

const SUGGESTIONS = ["help", "whoami", "skills", "projects", "cv", "sudo hire kiran"];
const PROMPT = "guest@kd-board:~$";

let nextId = 0;
const line = (content: ReactNode, tone?: Line["tone"]): Line => ({ id: nextId++, content, tone });

/* A small shell visitors can actually type into. Every command maps to real portfolio content. */
export default function Terminal({ onNavigate }: { onNavigate: (key: SectionKey) => void }) {
  const [lines, setLines] = useState<Line[]>(() => [
    line("KD-shell 1.0 · connected to Kiran's portfolio", "muted"),
    line(<>Type <span className="text-accent">help</span> or tap a command below.</>, "muted"),
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const go = (key: SectionKey, label: string): Line[] => {
    setTimeout(() => onNavigate(key), 500);
    return [line(`→ jumping to ${label}…`, "accent")];
  };

  const run = (raw: string): Line[] => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    const [name, ...args] = cmd.split(" ");
    switch (name) {
      case "":
        return [];
      case "help":
        return [
          line("Available commands:", "muted"),
          ...[
            ["whoami", "who is Kiran?"],
            ["services", "what I build"],
            ["skills", "my stack, with levels"],
            ["projects", "shipped work"],
            ["open <section>", "jump to services | skills | projects | contact"],
            ["cv", "download my résumé"],
            ["contact", "how to reach me"],
            ["theme", "toggle light / dark"],
            ["clear", "clear the screen"],
          ].map(([c, d]) => line(<><span className="inline-block w-36 text-accent">{c}</span><span className="text-muted-foreground">{d}</span></>)),
          line("…and a few hidden ones. Try sudo.", "muted"),
        ];
      case "whoami":
      case "about":
        return [
          line("Kiran Dhakal, computer engineer & full-stack developer", "ok"),
          line(`Roles: ${hero.roles.join(" · ")}`),
          line(hero.description, "muted"),
          line(`Location: Kathmandu, Nepal · ${hero.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" · ")}`),
        ];
      case "services":
        return [line("Services loaded:", "muted"), ...services.items.map((s, i) => line(`[${i + 1}] ${s.title}`)), line("Run `open services` for details.", "muted")];
      case "skills": {
        const levels = [92, 90, 86, 78, 88, 84, 76];
        return [
          line("Skill            level", "muted"),
          ...skills.items.map((s, i) => {
            const lvl = levels[i % levels.length];
            const bar = "█".repeat(Math.round(lvl / 10)) + "░".repeat(10 - Math.round(lvl / 10));
            return line(<><span className="inline-block w-48 truncate align-bottom">{s.name}</span><span className="text-accent">{bar}</span> <span className="text-muted-foreground">{lvl}%</span></>);
          }),
        ];
      }
      case "projects":
      case "ls":
        if (name === "ls" && !args.length) {
          return [line(<><span className="text-led-blue">services/  skills/  projects/  contact/</span>  resume.pdf  README.md</>)];
        }
        return [
          line(`${projects.items.length} projects deployed:`, "muted"),
          ...projects.items.slice(0, 8).map((p) =>
            line(
              <>
                <span className="text-led-green">●</span> <a href={p.demo} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-accent">{p.title}</a>{" "}
                <span className="text-muted-foreground">· {p.tags.slice(0, 2).join(", ")}</span>
              </>,
            ),
          ),
          line(`+${projects.items.length - 8} more. Run \`open projects\`.`, "muted"),
        ];
      case "open":
      case "cd": {
        const target = (args[0] || "").replace(/[/.]/g, "") as SectionKey;
        const map: Record<string, SectionKey> = { services: "services", skills: "skills", projects: "projects", contact: "contact", home: "home", "~": "home" };
        if (map[target]) return go(map[target], target);
        return [line(`${name}: no such module: ${args[0] ?? ""}`, "err")];
      }
      case "cv":
      case "resume": {
        const a = document.createElement("a");
        a.href = "/Kiran-Dhakal-CV.pdf";
        a.download = hero.download.filename;
        a.click();
        return [line("Downloading Kiran-Dhakal-CV.pdf … done ✓", "ok")];
      }
      case "contact":
        return [line("email  kirandhakal715@gmail.com"), line("phone  +977 9827591616"), ...go("contact", "UART contact port")];
      case "sudo":
        if (args.join(" ").startsWith("hire")) {
          setTimeout(() => onNavigate("contact"), 1400);
          return [line("[sudo] password for recruiter: ********", "muted"), line("✓ Permission granted. Excellent decision.", "ok"), line("→ opening contact channel…", "accent")];
        }
        return [line("guest is not in the sudoers file. This incident will be reported. 😉", "err")];
      case "theme": {
        const dark = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", dark);
        try {
          localStorage.setItem("theme", dark ? "dark" : "light");
        } catch {
          // Theme still switches for this visit.
        }
        return [line(`Theme set to ${dark ? "dark (green solder mask)" : "light (white solder mask)"}.`, "ok")];
      }
      case "date":
        return [line(new Date().toLocaleString("en-GB", { timeZone: "Asia/Kathmandu" }) + " NPT")];
      case "echo":
        return [line(args.join(" "))];
      case "cat":
        if (args[0] === "readme.md") return [line("Hi! Thanks for reading the source. Hire me? → sudo hire kiran", "accent")];
        return [line(`cat: ${args[0] ?? ""}: permission denied (try README.md)`, "err")];
      case "rm":
        return [line("Nice try. This portfolio is read-only. 🛡", "err")];
      case "exit":
        return [line("There is no escape. But there is `open contact`.", "muted")];
      default:
        return [line(`command not found: ${name}. Try \`help\`.`, "err")];
    }
  };

  const submit = (value: string) => {
    if (value.trim() === "clear") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, line(<><span className="text-led-green">{PROMPT}</span> {value}</>, "cmd"), ...run(value)]);
    }
    if (value.trim()) setHistory((h) => [value, ...h].slice(0, 30));
    setCursor(-1);
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-chip text-chip-foreground shadow-lifted">
      <div className="flex items-center justify-between border-b border-chip-foreground/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-led-red" />
          <span className="h-3 w-3 rounded-full bg-led-amber" />
          <span className="h-3 w-3 rounded-full bg-led-green" />
        </div>
        <span className="font-mono text-[11px] text-chip-foreground/60">kd-shell — /dev/ttyKD0</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-led-green">● live</span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-64 flex-1 cursor-text overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-6 sm:h-72 sm:text-[13px]"
      >
        {lines.map((l) => (
          <div
            key={l.id}
            className={
              l.tone === "err"
                ? "text-led-red"
                : l.tone === "ok"
                  ? "text-led-green"
                  : l.tone === "muted"
                    ? "text-chip-foreground/55"
                    : l.tone === "accent"
                      ? "text-led-amber"
                      : "text-chip-foreground"
            }
          >
            {l.content}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="kd-shell" className="flex-none text-led-green">{PROMPT}</label>
          <input
            id="kd-shell"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const next = Math.min(cursor + 1, history.length - 1);
                setCursor(next);
                setInput(history[next]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = cursor - 1;
                setCursor(next);
                setInput(next >= 0 ? history[next] : "");
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-chip-foreground caret-led-green outline-none"
            aria-label="Terminal command"
          />
        </form>
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-chip-foreground/10 px-3 py-3 [scrollbar-width:none]">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="flex-none rounded-md border border-chip-foreground/15 px-3 py-1.5 font-mono text-xs text-chip-foreground/80 transition-colors hover:border-led-green hover:text-led-green"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

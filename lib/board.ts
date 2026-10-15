import type { SectionKey } from "@/types/navigation";

export interface BoardModule {
  /** Reference designator printed on the board, like U1 or J2. */
  ref: string;
  /** Bus address of the module. */
  addr: string;
  name: string;
  label: string;
  /** Tailwind text colour for the module's status LED. */
  led: string;
  /** Tailwind background colour matching the LED. */
  tone: string;
}

/* Each page section is a module on the board, wired to the CPU (the hero). */
export const MODULES: Record<SectionKey, BoardModule> = {
  home: { ref: "U1", addr: "0x00", name: "CPU", label: "Main processor", led: "text-led-green", tone: "bg-led-green" },
  services: { ref: "J2", addr: "0x10", name: "Services", label: "Expansion slots", led: "text-led-blue", tone: "bg-led-blue" },
  skills: { ref: "U3", addr: "0x20", name: "Skills", label: "Logic analyzer", led: "text-led-amber", tone: "bg-led-amber" },
  projects: { ref: "U4", addr: "0x30", name: "Projects", label: "IC datasheets", led: "text-led-red", tone: "bg-led-red" },
  contact: { ref: "J5", addr: "0x40", name: "Contact", label: "UART serial port", led: "text-led-green", tone: "bg-led-green" },
};

export const MODULE_ORDER: SectionKey[] = ["home", "services", "skills", "projects", "contact"];

export const LED_TONES = ["bg-led-green", "bg-led-blue", "bg-led-amber", "bg-led-red"];
export const LED_TEXT = ["text-led-green", "text-led-blue", "text-led-amber", "text-led-red"];

/* Small deterministic hash so generated visuals (waveforms, part numbers) are stable. */
export const hash = (input: string) => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const toHex = (n: number, width = 2) => `0x${n.toString(16).toUpperCase().padStart(width, "0")}`;

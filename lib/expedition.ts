import type { SectionKey } from "@/types/navigation";

export const BASE_ALTITUDE = 1400; // Kathmandu valley
export const SUMMIT_ALTITUDE = 8849; // Sagarmatha / Everest

export interface Camp {
  name: string;
  short: string;
  altitude: number;
  label: string;
  /** Tailwind background class for the camp's prayer-flag colour. */
  tone: string;
}

/* Each page section is a stop on the climb from Kathmandu to the summit. */
export const CAMPS: Record<SectionKey, Camp> = {
  home: { name: "Base Camp", short: "Base", altitude: BASE_ALTITUDE, label: "Kathmandu", tone: "bg-flag-blue" },
  services: { name: "Camp I", short: "Camp I", altitude: 5364, label: "Gear check", tone: "bg-flag-white" },
  skills: { name: "Camp II", short: "Camp II", altitude: 6400, label: "Route map", tone: "bg-flag-red" },
  projects: { name: "Camp III", short: "Camp III", altitude: 7200, label: "Peaks summited", tone: "bg-flag-green" },
  contact: { name: "Summit", short: "Summit", altitude: SUMMIT_ALTITUDE, label: "Sign the register", tone: "bg-flag-yellow" },
};

export const CAMP_ORDER: SectionKey[] = ["home", "services", "skills", "projects", "contact"];

/* Lungta order: blue (sky), white (air), red (fire), green (water), yellow (earth). */
export const FLAG_TONES = ["bg-flag-blue", "bg-flag-white", "bg-flag-red", "bg-flag-green", "bg-flag-yellow"];

export const altitudeFraction = (altitude: number) =>
  (altitude - BASE_ALTITUDE) / (SUMMIT_ALTITUDE - BASE_ALTITUDE);

export const formatMeters = (value: number) => `${Math.round(value).toLocaleString("en-US")} m`;

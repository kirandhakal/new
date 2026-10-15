import heroJson from "@/data/landing-page/home-hero.json";
import servicesJson from "@/data/landing-page/home-service.json";
import skillsJson from "@/data/landing-page/home-skills.json";
import projectsJson from "@/data/landing-page/home-project.json";
import type { HeroContent, ProjectContent, ServiceContent, SkillContent } from "@/types/content";

export const hero = heroJson as HeroContent;
const services = servicesJson as ServiceContent;
const skills = skillsJson as SkillContent;
const projects = projectsJson as ProjectContent;

export type StepKind = "base" | "gear" | "camp" | "skill" | "peak" | "summit";

export type Step =
  | { kind: "base"; title: string; altitude: number }
  | { kind: "gear"; title: string; altitude: number; item: ServiceContent["items"][number]; n: number }
  | { kind: "camp"; title: string; altitude: number; badge: string; blurb: string; tone: string }
  | { kind: "skill"; title: string; altitude: number; item: SkillContent["items"][number]; n: number }
  | { kind: "peak"; title: string; altitude: number; item: ProjectContent["items"][number]; n: number }
  | { kind: "summit"; title: string; altitude: number };

export const projectCategories = Object.fromEntries(
  projects.categories.filter(({ key }) => key !== "all").map(({ key, label }) => [key, label]),
);

/* Altitude anchors: every camp sits at its real Everest-route height; steps in between are interpolated. */
// Omit distributed over the union, so each step variant keeps its own fields.
type Draft = Step extends infer S ? (S extends Step ? Omit<S, "altitude"> & { anchor?: number } : never) : never;

const build = (): Step[] => {
  const raw: Draft[] = [
    { kind: "base", title: "Base Camp", anchor: 1400 },
    ...services.items.map((item, n) => ({ kind: "gear" as const, title: item.title, item, n })),
    { kind: "camp", title: "Camp I", badge: "Well equipped", blurb: "Every piece of gear is packed. These are the services I bring to a project.", tone: "bg-flag-white", anchor: 5364 },
    ...skills.items.map((item, n) => ({ kind: "skill" as const, title: item.name, item, n })),
    { kind: "camp", title: "Camp II", badge: "Pathfinder", blurb: "You've mapped the route. These are the tools I use on every climb.", tone: "bg-flag-red", anchor: 6400 },
    ...projects.items.map((item, n) => ({ kind: "peak" as const, title: item.title, item, n })),
    { kind: "camp", title: "Camp III", badge: "Peak bagger", blurb: "Fourteen real, shipped projects. One last push to the top.", tone: "bg-flag-green", anchor: 7200 },
    { kind: "summit", title: "Summit", anchor: 8849 },
  ];

  const anchors = raw.map((s, i) => [i, s.anchor] as const).filter(([, a]) => a !== undefined) as Array<readonly [number, number]>;
  return raw.map((s, i) => {
    const next = anchors.findIndex(([ai]) => ai >= i);
    const [hi, ha] = anchors[next];
    const [lo, la] = anchors[Math.max(next - 1, 0)];
    const altitude = hi === i ? ha : Math.round(la + ((ha - la) * (i - lo)) / (hi - lo));
    const rest = { ...s };
    delete rest.anchor;
    return { ...rest, altitude } as Step;
  });
};

export const STEPS = build();

export const TOTALS = {
  gear: services.items.length,
  skill: skills.items.length,
  peak: projects.items.length,
};

export const countFound = (kind: "gear" | "skill" | "peak", reached: number) =>
  STEPS.slice(0, reached + 1).filter((s) => s.kind === kind).length;

export const BADGES = STEPS.flatMap((s, i) => (s.kind === "camp" ? [{ index: i, badge: s.badge, tone: s.tone }] : []));

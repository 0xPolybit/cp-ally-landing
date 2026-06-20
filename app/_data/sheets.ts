import { introForBeginners, type Problem } from "./intro-for-beginners";
import { basicsOfNumberTheory } from "./basics-of-number-theory";

export type { Problem };

export type Sheet = {
  slug: string;
  title: string;
  topic: string;
  description: string;
  problems: Problem[];
};

export const sheets: Sheet[] = [
  {
    slug: "introduction-for-beginners",
    title: "Introduction for Beginners",
    topic: "Getting started",
    description:
      "A first ladder into competitive programming — 100 of the most-solved CodeForces problems, ordered by rating. 40 rated 800, 40 rated 900, and 20 rated 1000.",
    problems: introForBeginners,
  },
  {
    slug: "basics-of-number-theory",
    title: "Basics of Number Theory",
    topic: "Number theory",
    description:
      "Build a foundation in number theory — 100 CodeForces problems tagged number theory, laddered from 800 up to 1400 as the ideas get sharper.",
    problems: basicsOfNumberTheory,
  },
];

export function getSheet(slug: string): Sheet | undefined {
  return sheets.find((s) => s.slug === slug);
}

export function ratingBreakdown(problems: Problem[]): { rating: number; count: number }[] {
  const map = new Map<number, number>();
  for (const p of problems) map.set(p.rating, (map.get(p.rating) ?? 0) + 1);
  return [...map.entries()]
    .map(([rating, count]) => ({ rating, count }))
    .sort((a, b) => a.rating - b.rating);
}

import { introForBeginners, type Problem } from "./intro-for-beginners";
import { basicsOfNumberTheory } from "./basics-of-number-theory";
import { basicsOfBitManipulation } from "./basics-of-bit-manipulation";
import { basicsOfDynamicProgramming } from "./basics-of-dynamic-programming";
import { basicsOfStrings } from "./basics-of-strings";
import { basicsOfHashing } from "./basics-of-hashing";
import { basicsOfSorting } from "./basics-of-sorting";

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
  {
    slug: "basics-of-bit-manipulation",
    title: "Basics of Bit Manipulation",
    topic: "Bit manipulation",
    description:
      "Get comfortable thinking in bits — 100 CodeForces problems tagged bitmasks, laddered from 800 up to 1400 as the tricks compound.",
    problems: basicsOfBitManipulation,
  },
  {
    slug: "basics-of-dynamic-programming",
    title: "Basics of Dynamic Programming",
    topic: "Dynamic programming",
    description:
      "Learn to break problems into subproblems — 100 CodeForces problems tagged dp, laddered from 800 up to 1400 as the states get richer.",
    problems: basicsOfDynamicProgramming,
  },
  {
    slug: "basics-of-strings",
    title: "Basics of Strings",
    topic: "Strings",
    description:
      "Sharpen your string-handling instincts — 100 CodeForces problems tagged strings, laddered from 800 up to 1400 across every rating tier.",
    problems: basicsOfStrings,
  },
  {
    slug: "basics-of-hashing",
    title: "Basics of Hashing",
    topic: "Hashing",
    description:
      "Get a feel for hashing techniques — 40 CodeForces problems tagged hashing, laddered from 800 up to 1700 (the range was widened since few hashing problems sit at the lowest ratings).",
    problems: basicsOfHashing,
  },
  {
    slug: "basics-of-sorting",
    title: "Basics of Sorting",
    topic: "Sorting",
    description:
      "Master sorting and the ideas built on it — 100 CodeForces problems tagged sortings, laddered from 800 up to 1400 across every rating tier.",
    problems: basicsOfSorting,
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

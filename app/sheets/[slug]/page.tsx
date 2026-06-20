import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../_components/SiteHeader";
import { SiteFooter } from "../../_components/SiteFooter";
import { HandleTracker } from "../../_components/HandleTracker";
import { getSheet, ratingBreakdown, sheets } from "../../_data/sheets";

export function generateStaticParams() {
  return sheets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getSheet(slug);
  if (!sheet) return { title: "Sheet not found — CP Ally IDE" };
  return {
    title: `${sheet.title} — CP Ally IDE`,
    description: sheet.description,
  };
}

export default async function SheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sheet = getSheet(slug);
  if (!sheet) notFound();

  const breakdown = ratingBreakdown(sheet.problems);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <Link
              href="/sheets"
              className="font-display text-xs uppercase tracking-wider text-faint transition-colors hover:text-foreground"
            >
              ← All sheets
            </Link>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {sheet.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {sheet.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="border border-border-strong px-3 py-1 font-display text-sm text-foreground tabular-nums">
                {sheet.problems.length} problems
              </span>
              {breakdown.map((b) => (
                <span
                  key={b.rating}
                  className="border border-border px-3 py-1 font-display text-sm text-muted tabular-nums"
                >
                  {b.count} rated {b.rating}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <HandleTracker problems={sheet.problems} />
            <p className="mt-6 text-sm text-faint">
              &ldquo;Open in app&rdquo; uses the{" "}
              <span className="font-display">cpally://</span> protocol and opens
              the problem directly in CP Ally IDE.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../_components/SiteHeader";
import { SiteFooter } from "../_components/SiteFooter";
import { ratingBreakdown, sheets } from "../_data/sheets";

export const metadata: Metadata = {
  title: "Sheets — CP Ally IDE",
  description:
    "Curated problem sheets for competitive programming, organized by topic. Practice straight from CP Ally IDE.",
};

export default function SheetsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <p className="animate-fade-up font-display text-xs uppercase tracking-wider text-faint">
              Problem sheets
            </p>
            <h1 className="animate-fade-up mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Practice, by topic.
            </h1>
            <p className="animate-fade-up mt-5 max-w-2xl text-lg leading-8 text-muted">
              Hand-picked CodeForces problems grouped into focused sheets. Open any
              problem on CodeForces, or jump straight into CP Ally IDE.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
              {sheets.map((sheet) => {
                const breakdown = ratingBreakdown(sheet.problems);
                return (
                  <Link
                    key={sheet.slug}
                    href={`/sheets/${sheet.slug}`}
                    className="group flex flex-col bg-surface p-8 transition-colors hover:bg-surface-muted"
                  >
                    <span className="font-display text-xs uppercase tracking-wider text-faint">
                      {sheet.topic}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                      {sheet.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                      {sheet.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-display text-sm text-foreground">
                        {sheet.problems.length} problems
                      </span>
                      <span className="flex gap-2">
                        {breakdown.map((b) => (
                          <span
                            key={b.rating}
                            className="border border-border-strong px-2 py-0.5 font-display text-xs text-muted tabular-nums"
                          >
                            {b.count}×{b.rating}
                          </span>
                        ))}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

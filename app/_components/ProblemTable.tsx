import type { Problem } from "../_data/sheets";
import type { ProblemStatus } from "../api/cf-status/route";

function codeforcesUrl(p: Problem) {
  return `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`;
}

// Tints kept below 50% opacity so the row text stays legible in both themes.
const STATUS_ROW: Record<ProblemStatus, string> = {
  accepted: "bg-green-500/20 hover:bg-green-500/30",
  wrong: "bg-red-500/20 hover:bg-red-500/30",
  error: "bg-amber-400/25 hover:bg-amber-400/35",
};

// Non-color cue (glyph + label) so status isn't conveyed by tint alone (WCAG 1.4.1).
const STATUS_META: Record<ProblemStatus, { glyph: string; label: string; className: string }> = {
  accepted: { glyph: "✓", label: "Solved", className: "text-accent" },
  wrong: { glyph: "✗", label: "Wrong", className: "text-muted" },
  error: { glyph: "!", label: "Attempted", className: "text-muted" },
};

export function ProblemTable({
  problems,
  statusByCode,
  onOpenInApp,
}: {
  problems: Problem[];
  statusByCode?: Record<string, ProblemStatus>;
  onOpenInApp?: (code: string) => void;
}) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-muted">
            <th className="w-12 px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider text-muted">
              #
            </th>
            <th className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider text-muted">
              Problem
            </th>
            <th className="w-24 px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider text-muted">
              Rating
            </th>
            <th className="w-28 px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider text-muted">
              Status
            </th>
            <th className="px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-wider text-muted">
              Links
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p, i) => {
            const status = statusByCode?.[p.code];
            return (
            <tr
              key={p.code}
              className={`border-b border-border transition-colors last:border-b-0 ${
                status ? STATUS_ROW[status] : "hover:bg-surface-muted"
              }`}
            >
              <td className="px-4 py-3 align-middle font-display text-xs text-faint tabular-nums">
                {String(i + 1).padStart(3, "0")}
              </td>
              <td className="px-4 py-3 align-middle">
                <span className="font-medium text-foreground">{p.name}</span>
                <span className="ml-2 font-display text-xs text-faint">
                  {p.code}
                </span>
              </td>
              <td className="px-4 py-3 align-middle">
                <span className="inline-block border border-border-strong px-2 py-0.5 font-display text-xs text-muted tabular-nums">
                  {p.rating}
                </span>
              </td>
              <td className="px-4 py-3 align-middle">
                {status && (
                  <span
                    className={`inline-flex items-center gap-1.5 font-display text-xs ${STATUS_META[status].className}`}
                  >
                    <span aria-hidden="true">{STATUS_META[status].glyph}</span>
                    {STATUS_META[status].label}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 align-middle">
                <div className="flex justify-end gap-2">
                  <a
                    href={codeforcesUrl(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border-strong px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    CodeForces
                  </a>
                  <a
                    href={`cpally://problem/${p.code}`}
                    onClick={
                      onOpenInApp
                        ? (e) => {
                            e.preventDefault();
                            onOpenInApp(p.code);
                          }
                        : undefined
                    }
                    className="border border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
                  >
                    Open in app
                  </a>
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

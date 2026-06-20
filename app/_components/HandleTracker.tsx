"use client";

import { useCallback, useEffect, useState } from "react";
import type { Problem } from "../_data/sheets";
import type { ProblemStatus } from "../api/cf-status/route";
import { ProblemTable } from "./ProblemTable";

const STORAGE_KEY = "cp-ally-handle";

type StatusMap = Record<string, ProblemStatus>;

const LEGEND: { status: ProblemStatus; label: string; swatch: string }[] = [
  { status: "accepted", label: "Accepted", swatch: "bg-green-500/40" },
  { status: "wrong", label: "Wrong answer", swatch: "bg-red-500/40" },
  { status: "error", label: "TLE / other error", swatch: "bg-amber-400/50" },
];

export function HandleTracker({ problems }: { problems: Problem[] }) {
  const [handle, setHandle] = useState("");
  const [statusByCode, setStatusByCode] = useState<StatusMap | null>(null);
  const [trackedHandle, setTrackedHandle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    setHandle(value);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cf-status?handle=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatusByCode(null);
        setTrackedHandle(null);
        return;
      }
      setStatusByCode(data.statusByCode as StatusMap);
      setTrackedHandle(data.handle as string);
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore and auto-check a previously used handle (deferred so the initial
  // state updates happen outside the synchronous effect body).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const id = window.setTimeout(() => void check(saved), 0);
    return () => window.clearTimeout(id);
  }, [check]);

  // Progress counts, scoped to the problems in this sheet.
  const counts = { accepted: 0, wrong: 0, error: 0 };
  if (statusByCode) {
    for (const p of problems) {
      const s = statusByCode[p.code];
      if (s) counts[s] += 1;
    }
  }

  function clear() {
    setStatusByCode(null);
    setTrackedHandle(null);
    setError(null);
    setHandle("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void check(handle);
        }}
        className="border border-border bg-surface-muted p-6"
      >
        <label
          htmlFor="cf-handle"
          className="font-display text-xs uppercase tracking-wider text-faint"
        >
          Track your progress
        </label>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id="cf-handle"
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Your CodeForces handle"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 border border-border-strong bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-foreground"
          />
          <button
            type="submit"
            disabled={loading || !handle.trim()}
            className="border border-foreground bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking…" : "Track"}
          </button>
          {trackedHandle && (
            <button
              type="button"
              onClick={clear}
              className="border border-border-strong px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {trackedHandle && !error && (
          <p className="mt-4 text-sm text-muted">
            <span className="font-display text-foreground">{trackedHandle}</span>
            {" · "}
            <span className="text-foreground tabular-nums">
              {counts.accepted}/{problems.length}
            </span>{" "}
            solved
            {counts.wrong > 0 && (
              <>
                {" · "}
                <span className="tabular-nums">{counts.wrong}</span> wrong
              </>
            )}
            {counts.error > 0 && (
              <>
                {" · "}
                <span className="tabular-nums">{counts.error}</span> attempted
              </>
            )}
          </p>
        )}

        {trackedHandle && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {LEGEND.map((l) => (
              <span key={l.status} className="flex items-center gap-2 text-xs text-muted">
                <span className={`inline-block h-3 w-3 ${l.swatch}`} aria-hidden="true" />
                {l.label}
              </span>
            ))}
          </div>
        )}
      </form>

      <div className="mt-6">
        <ProblemTable
          problems={problems}
          statusByCode={statusByCode ?? undefined}
        />
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Problem } from "../_data/sheets";
import type { ProblemStatus } from "../api/cf-status/route";
import { ProblemTable } from "./ProblemTable";
import { OpenInAppModal, type AppDialogPhase } from "./OpenInAppModal";

const STORAGE_KEY = "cp-ally-handle";
const SKIP_POPUP_KEY = "cp-ally-skip-app-popup";
const STATUS_CACHE_PREFIX = "cp-ally-status:";
const CACHE_TTL_MS = 5 * 60 * 1000;

type StatusMap = Record<string, ProblemStatus>;

type CachedStatus = { handle: string; statusByCode: StatusMap; ts: number };

function readStatusCache(handle: string): CachedStatus | null {
  try {
    const raw = window.sessionStorage.getItem(STATUS_CACHE_PREFIX + handle.toLowerCase());
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedStatus;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStatusCache(entry: CachedStatus) {
  try {
    window.sessionStorage.setItem(
      STATUS_CACHE_PREFIX + entry.handle.toLowerCase(),
      JSON.stringify(entry),
    );
  } catch {
    /* sessionStorage unavailable — caching is best-effort */
  }
}

// Trigger a custom-protocol deep link without mutating window.location (which
// can blank/navigate the page if the protocol has no registered handler).
function fireDeepLink(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

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

  const [onlyUnsolved, setOnlyUnsolved] = useState(false);

  // "Open in app" deep-link popup state.
  const [appPhase, setAppPhase] = useState<AppDialogPhase | null>(null);
  const [neverShow, setNeverShow] = useState(false);
  const appTimer = useRef<number | null>(null);

  const openInApp = useCallback((code: string) => {
    // Fire the deep link first — this is what actually launches the app.
    fireDeepLink(`cpally://problem/${code}`);
    if (window.localStorage.getItem(SKIP_POPUP_KEY) === "1") return;

    setNeverShow(false);
    setAppPhase("opening");
    if (appTimer.current) window.clearTimeout(appTimer.current);
    appTimer.current = window.setTimeout(() => setAppPhase("ready"), 5000);
  }, []);

  const closeAppDialog = useCallback(() => {
    if (appTimer.current) window.clearTimeout(appTimer.current);
    appTimer.current = null;
    setAppPhase(null);
  }, []);

  const toggleNeverShow = useCallback((checked: boolean) => {
    setNeverShow(checked);
    if (checked) window.localStorage.setItem(SKIP_POPUP_KEY, "1");
    else window.localStorage.removeItem(SKIP_POPUP_KEY);
  }, []);

  // Clear any pending timer on unmount.
  useEffect(() => {
    return () => {
      if (appTimer.current) window.clearTimeout(appTimer.current);
    };
  }, []);

  const check = useCallback(async (raw: string, opts?: { auto?: boolean }) => {
    const value = raw.trim();
    if (!value) return;
    setHandle(value);

    // On an automatic (mount) check, reuse a fresh cached result so navigating
    // between sheets doesn't re-hit CodeForces and trip its rate limit.
    if (opts?.auto) {
      const cached = readStatusCache(value);
      if (cached) {
        setStatusByCode(cached.statusByCode);
        setTrackedHandle(cached.handle);
        setError(null);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cf-status?handle=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (!res.ok) {
        // A saved handle that has since been renamed/deleted would otherwise
        // error on every page load — drop it so it stops auto-checking.
        if (res.status === 404 && opts?.auto) {
          window.localStorage.removeItem(STORAGE_KEY);
        }
        setError(data.error ?? "Something went wrong.");
        setStatusByCode(null);
        setTrackedHandle(null);
        return;
      }
      const statusMap = data.statusByCode as StatusMap;
      const resolved = data.handle as string;
      setStatusByCode(statusMap);
      setTrackedHandle(resolved);
      window.localStorage.setItem(STORAGE_KEY, value);
      writeStatusCache({ handle: resolved, statusByCode: statusMap, ts: Date.now() });
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
    const id = window.setTimeout(() => void check(saved, { auto: true }), 0);
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
    setOnlyUnsolved(false);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const canFilter = trackedHandle && statusByCode;
  const visibleProblems =
    canFilter && onlyUnsolved
      ? problems.filter((p) => statusByCode![p.code] !== "accepted")
      : problems;

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

      {canFilter && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={onlyUnsolved}
              onChange={(e) => setOnlyUnsolved(e.target.checked)}
              className="h-4 w-4 appearance-none border border-border-strong bg-background transition-colors checked:bg-foreground"
            />
            Show only unsolved
          </label>
          <span className="font-display text-xs text-faint tabular-nums">
            {visibleProblems.length} shown
          </span>
        </div>
      )}

      <div className={canFilter ? "mt-4" : "mt-6"}>
        {visibleProblems.length === 0 ? (
          <p className="border border-border bg-surface-muted px-6 py-10 text-center text-sm text-muted">
            Every problem in this sheet is solved. Nicely done.
          </p>
        ) : (
          <ProblemTable
            problems={visibleProblems}
            statusByCode={statusByCode ?? undefined}
            onOpenInApp={openInApp}
          />
        )}
      </div>

      {appPhase && (
        <OpenInAppModal
          phase={appPhase}
          onClose={closeAppDialog}
          neverShow={neverShow}
          onToggleNeverShow={toggleNeverShow}
        />
      )}
    </div>
  );
}

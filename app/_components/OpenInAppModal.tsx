"use client";

import { useEffect } from "react";
import { RELEASES_URL } from "./site";

export type AppDialogPhase = "opening" | "ready";

export function OpenInAppModal({
  phase,
  onClose,
  neverShow,
  onToggleNeverShow,
}: {
  phase: AppDialogPhase;
  onClose: () => void;
  neverShow: boolean;
  onToggleNeverShow: (checked: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Open in CP Ally IDE"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div className="animate-fade-up relative w-full max-w-md border border-border-strong bg-surface p-6">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-faint transition-colors hover:text-foreground"
        >
          ✕
        </button>

        <h2 className="pr-6 font-display text-xl font-semibold tracking-tight">
          {phase === "opening" ? "Opening in app…" : "CP Ally IDE should be open"}
        </h2>

        {phase === "opening" ? (
          <>
            <p className="mt-3 text-sm text-muted">
              Launching CP Ally IDE for this problem.
            </p>
            <div className="mt-5 h-1 w-full overflow-hidden bg-border">
              <div className="animate-indeterminate h-full w-2/5 bg-foreground" />
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-muted">
              If nothing happened, you may not have CP Ally IDE installed yet.
            </p>
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              Download CP Ally IDE
            </a>
          </>
        )}

        <label className="mt-6 flex cursor-pointer items-center gap-2 border-t border-border pt-4 text-sm text-muted">
          <input
            type="checkbox"
            checked={neverShow}
            onChange={(e) => onToggleNeverShow(e.target.checked)}
            className="h-4 w-4 appearance-none border border-border-strong bg-background transition-colors checked:bg-foreground"
          />
          Don&apos;t show this again
        </label>
      </div>
    </div>
  );
}

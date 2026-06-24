"use client";

import { useEffect, useRef } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden"; // lock background scroll
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Trap focus within the dialog.
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="open-in-app-title"
        className="animate-fade-up relative w-full max-w-md border border-border-strong bg-surface p-6"
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-faint transition-colors hover:text-foreground"
        >
          ✕
        </button>

        <h2
          id="open-in-app-title"
          className="pr-6 font-display text-xl font-semibold tracking-tight"
        >
          {phase === "opening" ? "Opening in app…" : "CP Ally IDE should be open"}
        </h2>

        {phase === "opening" ? (
          <>
            <p className="mt-3 text-sm text-muted">
              Launching CP Ally IDE for this problem.
            </p>
            <div className="mt-5 h-1 w-full overflow-hidden bg-border">
              <div className="loading-bar h-full bg-foreground" />
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-muted">
              If nothing happened, you may not have CP Ally IDE installed yet.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-foreground bg-foreground px-5 py-2.5 text-center text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
              >
                Download CP Ally IDE
              </a>
              <button
                type="button"
                onClick={onClose}
                className="border border-border-strong px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
              >
                Done
              </button>
            </div>
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

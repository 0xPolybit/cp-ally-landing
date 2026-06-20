import { GitHubIcon } from "./GitHubIcon";
import { REPO_URL, RELEASES_URL } from "./site";

export function Hero() {
  return (
    <section
      id="top"
      className="border-b border-border"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="animate-fade-up mb-6 inline-flex items-center gap-2 border border-border px-3 py-1 font-display text-xs uppercase tracking-wider text-muted">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 bg-accent"
          />
          Unofficial · for CodeForces
        </p>

        <h1
          className="animate-fade-up font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          style={{ animationDelay: "60ms" }}
        >
          Solve faster.
          <br />
          Run locally.
          <span
            aria-hidden="true"
            className="animate-blink ml-2 inline-block h-[0.85em] w-[0.5ch] translate-y-[0.06em] bg-foreground align-middle"
          />
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl text-lg leading-8 text-muted"
          style={{ animationDelay: "120ms" }}
        >
          The unofficial partner code editor for competitive programming on
          CodeForces. Fetch a problem by its code, write your solution, and judge
          it against the samples — all in one window.
        </p>

        <p
          className="animate-fade-up mt-3 max-w-xl text-sm text-faint"
          style={{ animationDelay: "150ms" }}
        >
          Built on the idea that, mid-contest, speed matters more than
          general-purpose IDE features.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-stretch gap-3 sm:flex-row"
          style={{ animationDelay: "200ms" }}
        >
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Download for desktop
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-border-strong px-6 py-3 font-medium text-foreground transition-colors hover:border-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            View source
          </a>
        </div>

        <p
          className="animate-fade-up mt-6 font-display text-xs uppercase tracking-wider text-faint"
          style={{ animationDelay: "240ms" }}
        >
          Java · Swing · Apache-2.0
        </p>
      </div>
    </section>
  );
}

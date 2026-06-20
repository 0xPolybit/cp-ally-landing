import { GitHubIcon } from "./GitHubIcon";
import { REPO_URL, VERSION } from "./site";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold tracking-tight">
            CP Ally IDE
          </p>
          <p className="mt-2 text-sm text-muted">
            Built by Swastik Biswas · contributions from Himanshi Saxena.
          </p>
          <p className="mt-1 text-sm text-faint">
            Apache-2.0 · {VERSION} · Beta — expect the occasional bug.
          </p>
        </div>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 border border-border-strong px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground"
        >
          <GitHubIcon className="h-4 w-4" />
          Star on GitHub
        </a>
      </div>
    </footer>
  );
}

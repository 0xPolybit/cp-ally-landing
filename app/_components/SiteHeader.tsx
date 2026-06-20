import Link from "next/link";
import { GitHubIcon } from "./GitHubIcon";
import { REPO_URL, RELEASES_URL, VERSION } from "./site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight">
            CP Ally IDE
          </span>
          <span className="hidden border border-border-strong px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-muted sm:inline">
            {VERSION} · beta
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/#features"
            className="hidden px-3 py-2 text-muted transition-colors hover:text-foreground sm:inline-block"
          >
            Features
          </Link>
          <Link
            href="/sheets"
            className="px-3 py-2 text-muted transition-colors hover:text-foreground"
          >
            Sheets
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground bg-foreground px-4 py-2 font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}

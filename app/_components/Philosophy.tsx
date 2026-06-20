import { RELEASES_URL } from "./site";

export function Philosophy() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-24 text-center">
        <blockquote className="mx-auto max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
          &ldquo;Speed matters more than general-purpose IDE features.&rdquo;
        </blockquote>
        <p className="mt-6 text-sm uppercase tracking-wider text-faint">
          The whole design philosophy, in one line.
        </p>
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-foreground bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          Get CP Ally IDE
        </a>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Fetch by problem code",
    body: "Type a contest code like 2208A and hit Enter. CP Ally pulls the problem straight from CodeForces.",
  },
  {
    title: "Faithful rendering",
    body: "Statements render with HTML, icons, and LaTeX — so math and formatting look the way they should.",
  },
  {
    title: "Syntax-highlighted editor",
    body: "Write solutions in a focused editor with a compact split layout: statement left, code right.",
  },
  {
    title: "Run against samples",
    body: "Execute locally against the extracted sample tests, or add your own custom cases on the fly.",
  },
  {
    title: "Smart YES / NO judging",
    body: "When the expected output is only YES or NO tokens, comparison is handled case-insensitively.",
  },
  {
    title: "Caching that remembers",
    body: "Statements cache for fast reloads, and your code is preserved per problem and per language.",
  },
  {
    title: "Persistent workspace",
    body: "Window state, divider positions, and your last selected language are restored between sessions.",
  },
  {
    title: "Built for the clock",
    body: "A dark, no-nonsense layout that trims general-purpose IDE weight in favor of contest speed.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything the contest needs.
          </h2>
          <p className="mt-4 text-muted">
            Nothing it doesn&apos;t. Each feature exists to shave seconds off the
            fetch → solve → run loop.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group bg-surface p-6 transition-colors hover:bg-surface-muted"
            >
              <h3 className="font-display text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

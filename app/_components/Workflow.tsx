const STEPS = [
  {
    n: "01",
    title: "Enter the code",
    body: "Drop in a contest code and index, e.g. 2208A.",
  },
  {
    n: "02",
    title: "Fetch",
    body: "Pull the statement and sample tests from CodeForces.",
  },
  {
    n: "03",
    title: "Read",
    body: "Study the rendered problem in the left panel.",
  },
  {
    n: "04",
    title: "Write",
    body: "Code your solution in the editor on the right.",
  },
  {
    n: "05",
    title: "Run",
    body: "Judge it locally against the samples — instantly.",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="border-b border-border bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Five steps, one window.
          </h2>
          <p className="mt-4 text-muted">
            The whole loop, from a blank editor to a judged solution.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="flex flex-col bg-background p-6"
            >
              <span
                className={`font-display text-2xl font-bold ${
                  i === STEPS.length - 1 ? "text-accent" : "text-faint"
                }`}
              >
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

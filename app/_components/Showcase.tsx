import Image from "next/image";

export function Showcase() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="animate-fade-up border border-border-strong bg-surface p-2">
          <Image
            src="/screenshot.png"
            alt="CP Ally IDE showing a CodeForces problem statement on the left and the code editor on the right"
            width={1917}
            height={1138}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        <p className="animate-fade-up mt-4 text-center text-sm text-faint">
          Problem statement on the left, editor on the right — one window, built
          for the contest clock.
        </p>
      </div>
    </section>
  );
}

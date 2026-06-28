import { SiteHeader } from "./_components/SiteHeader";
import { Hero } from "./_components/Hero";
import { Showcase } from "./_components/Showcase";
import { Features } from "./_components/Features";
import { Workflow } from "./_components/Workflow";
import { Philosophy } from "./_components/Philosophy";
import { SiteFooter } from "./_components/SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Showcase />
        <Features />
        <Workflow />
        <Philosophy />
      </main>
      <SiteFooter />
    </div>
  );
}

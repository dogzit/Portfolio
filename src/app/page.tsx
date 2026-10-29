import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatusBar } from "@/components/layout/StatusBar";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Skills } from "@/components/sections/Skills";
import { Activity } from "@/components/sections/Activity";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Marquee } from "@/components/shared/Marquee";
import { PROJECTS, SKILLS } from "@/lib/data";

const STACK_TICKER = SKILLS.flatMap((c) => c.skills.map((s) => s.name));
const WORK_TICKER = PROJECTS.map((p) => p.title);

export default function Home() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Streams on its own so a slow GitHub call never blocks first paint. */}
      <Suspense fallback={<div style={{ height: "var(--status-h)" }} />}>
        <StatusBar />
      </Suspense>
      <ScrollProgress />
      <Navbar />

      <main className="frame">
        <Hero />
        <About />
        {/* The project ticker sits against the work it names. */}
        <Marquee items={WORK_TICKER} />
        <CaseStudies />
        <Marquee items={STACK_TICKER} reverse />
        <Skills />
        <Suspense fallback={null}>
          <Activity />
        </Suspense>
        <hr className="rule" />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

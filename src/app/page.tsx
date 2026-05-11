import { Navbar }      from "@/components/layout/Navbar";
import { Footer }      from "@/components/layout/Footer";
import { Hero }        from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Skills }      from "@/components/sections/Skills";
import { Journey }     from "@/components/sections/Journey";
import { Contact }     from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <CaseStudies />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

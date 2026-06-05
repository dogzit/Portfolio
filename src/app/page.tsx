import { Navbar }      from "@/components/layout/Navbar";
import { Footer }      from "@/components/layout/Footer";
import { Hero }        from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Skills }      from "@/components/sections/Skills";
import { Journey }     from "@/components/sections/Journey";
import { Contact }     from "@/components/sections/Contact";

function SectionDivider() {
  return <div className="section-divider" />;
}

export default function Home() {
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <CaseStudies />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Journey />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import { AmbientBlobs } from "@/components/background/AmbientBlobs";
import { GridBackdrop } from "@/components/background/GridBackdrop";
import { ParticleConstellation } from "@/components/background/ParticleConstellation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <GridBackdrop />
      <AmbientBlobs />
      <ParticleConstellation />
      <ScrollProgress />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

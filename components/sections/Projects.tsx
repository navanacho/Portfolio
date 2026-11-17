import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="mt-20 scroll-mt-28">
      <SectionHeading id="proyectos-titulo">Proyectos</SectionHeading>
      <div className="mt-6 grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

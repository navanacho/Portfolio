import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Skills() {
  return (
    <section aria-labelledby="habilidades">
      <SectionHeading id="habilidades">Habilidades</SectionHeading>
      <Card>
        <ul aria-label="Tecnologías" className="font-mono">
          {profile.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <ul aria-label="Herramientas" className="font-mono">
          {profile.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

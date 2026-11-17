import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Experience() {
  return (
    <section aria-labelledby="experiencia">
      <SectionHeading id="experiencia">Experiencia</SectionHeading>
      <Card>
        <ul>
          {profile.experience.map((entry) => (
            <li key={entry.role}>{`${entry.period} ${entry.role}`}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

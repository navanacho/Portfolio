import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Experience() {
  return (
    <section aria-labelledby="experiencia">
      <SectionHeading id="experiencia">Experiencia</SectionHeading>
      <ol className="space-y-4 border-l border-primary/30 pl-6">
        {profile.experience.map((entry) => (
          <li
            key={entry.role}
            className="relative before:absolute before:-left-[1.7rem] before:top-6 before:h-2 before:w-2 before:rounded-full before:bg-primary"
          >
            <Card className="p-4">
              <span>{`${entry.period} ${entry.role}`}</span>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

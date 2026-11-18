import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Education() {
  return (
    <section aria-labelledby="educacion">
      <SectionHeading id="educacion">Educación</SectionHeading>
      <ol className="space-y-4 border-l border-primary/30 pl-6">
        {profile.education.map((entry) => (
          <li
            key={entry.title}
            className="relative before:absolute before:-left-[1.7rem] before:top-6 before:h-2 before:w-2 before:rounded-full before:bg-primary"
          >
            <Card className="flex flex-wrap gap-x-4 gap-y-1 p-4">
              <span>{entry.title}</span>
              <span>{entry.period}</span>
              {entry.status ? <span>{entry.status}</span> : null}
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Education() {
  return (
    <section aria-labelledby="educacion">
      <SectionHeading id="educacion">Educación</SectionHeading>
      <Card>
        <ul>
          {profile.education.map((entry) => (
            <li key={entry.title}>
              <span>{entry.title}</span>
              <span>{entry.period}</span>
              {entry.status ? <span>{entry.status}</span> : null}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

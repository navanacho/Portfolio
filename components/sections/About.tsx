import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section aria-labelledby="sobre-mi">
      <SectionHeading id="sobre-mi">Sobre mí</SectionHeading>
      <Card>
        <p>{profile.bio}</p>
      </Card>
    </section>
  );
}

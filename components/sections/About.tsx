import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section aria-labelledby="sobre-mi" className="content-grid grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <SectionHeading id="sobre-mi">Sobre mí</SectionHeading>
        <Card className="mt-6">
          <p>{profile.bio}</p>
        </Card>
      </div>
      <div className="lg:col-span-5">
        <Card>
          <h3 className="text-lg font-semibold">Áreas de trabajo</h3>
          <ul aria-label="Áreas de trabajo" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {profile.stack.slice(0, 4).map((technology) => (
              <li key={technology} className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-sm text-primary">
                {technology}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

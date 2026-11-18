import { BriefcaseBusiness, Code2, Download, Mail } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { CTAButton } from "@/components/ui/CTAButton";
import { IconBadge } from "@/components/ui/IconBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section aria-labelledby="contacto">
      <SectionHeading id="contacto">Contacto</SectionHeading>
      <Card className="content-grid grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-wrap items-center gap-3">
          <IconBadge label="Correo electrónico">
            <Mail size={18} />
          </IconBadge>
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label="Correo de Ignacio Navarria"
            className="text-text underline-offset-4 hover:underline"
          >
            {profile.contact.email}
          </a>
          <CopyEmailButton />
        </div>
        <div className="lg:col-span-7">
          <ul aria-label="Enlaces de contacto" className="flex flex-wrap items-center gap-3">
            <li>
              <CTAButton
                href={profile.contact.github}
                ariaLabel="GitHub de Ignacio Navarria"
                external
                variant="warm"
              >
                <Code2 aria-hidden="true" size={16} />
                <span>GitHub</span>
              </CTAButton>
            </li>
            <li>
              <CTAButton
                href={profile.contact.linkedin}
                ariaLabel="LinkedIn de Ignacio Navarria"
                external
                variant="warm"
              >
                <BriefcaseBusiness aria-hidden="true" size={16} />
                <span>LinkedIn</span>
              </CTAButton>
            </li>
            <li>
              <CTAButton
                href={profile.contact.cv}
                ariaLabel="Descargar CV de Ignacio Navarria"
                external
                variant="warm"
              >
                <Download aria-hidden="true" size={16} />
                <span>Descargar CV</span>
              </CTAButton>
            </li>
          </ul>
        </div>
      </Card>
    </section>
  );
}

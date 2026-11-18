import { BriefcaseBusiness, Code2, Mail } from "lucide-react";

import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-border/60 px-6 py-10 text-center text-sm text-text-muted">
      <span aria-hidden="true" className="font-mono text-base font-semibold text-primary">
        &lt;navanacho/&gt;
      </span>
      <p>© 2026 Ignacio Navarria - Portfolio personal</p>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        <li>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Ignacio Navarria"
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            <Code2 aria-hidden="true" size={16} />
            <span>GitHub</span>
          </a>
        </li>
        <li>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Ignacio Navarria"
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            <BriefcaseBusiness aria-hidden="true" size={16} />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label="Correo de Ignacio Navarria"
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            <Mail aria-hidden="true" size={16} />
            <span>{profile.contact.email}</span>
          </a>
        </li>
      </ul>
    </footer>
  );
}

"use client";

import { BriefcaseBusiness, Code2, FileText, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { SectionAnnouncement } from "@/components/ui/SectionAnnouncement";
import { profile } from "@/data/profile";

const sections = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Educación", href: "#educacion" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export function Navbar() {
  const [active, setActive] = useState<string>("#inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        const current = visible[visible.length - 1];
        if (current) {
          setActive(`#${current.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    for (const section of sections) {
      const target = document.querySelector(section.href);
      if (target) {
        observer.observe(target);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Navegación principal"
        className={`flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-surface px-5 py-3 text-xs text-text shadow-lg sm:text-sm ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {sections.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                aria-current={active === section.href ? "location" : undefined}
                onClick={() => setActive(section.href)}
                className="relative rounded px-1 py-0.5 text-text-muted transition-colors hover:text-text aria-[current=location]:text-primary"
              >
                {active === section.href && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="navbar-active-section"
                    className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <ul aria-label="Enlaces rápidos" className="flex items-center gap-3 border-l border-border pl-4">
          <li>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Ignacio Navarria"
              className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
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
              className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
            >
              <BriefcaseBusiness aria-hidden="true" size={16} />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${profile.contact.email}`}
              aria-label="Correo de Ignacio Navarria"
              className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
            >
              <Mail aria-hidden="true" size={16} />
              <span>Correo</span>
            </a>
          </li>
          <li>
            <a
              href={profile.contact.cv}
              aria-label="Descargar CV de Ignacio Navarria"
              className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
            >
              <FileText aria-hidden="true" size={16} />
              <span>CV</span>
            </a>
          </li>
        </ul>
        <SectionAnnouncement label={sections.find((section) => section.href === active)?.label ?? "Inicio"} />
      </nav>
    </header>
  );
}

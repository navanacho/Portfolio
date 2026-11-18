"use client";

import { FileText, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { NAV_SECTIONS } from "@/components/layout/navigation";
import { SectionAnnouncement } from "@/components/ui/SectionAnnouncement";
import { profile } from "@/data/profile";

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

    for (const section of NAV_SECTIONS) {
      const target = document.querySelector(section.href);
      if (target) {
        observer.observe(target);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-center border-b border-border/60 bg-background/70 px-4 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className={`flex w-full max-w-[1200px] items-center justify-between gap-3 rounded-full border border-border bg-surface/70 px-4 py-2.5 text-xs text-text shadow-lg sm:text-sm ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <a href="#inicio" className="shrink-0 font-mono text-sm font-semibold text-primary">
          &lt;navanacho/&gt;
        </a>
        <ul className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto">
          {NAV_SECTIONS.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                aria-current={active === section.href ? "location" : undefined}
                onClick={() => setActive(section.href)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-text-muted transition-colors hover:text-text ${
                  active === section.href ? "bg-primary/15 text-primary" : ""
                }`}
              >
                {active === section.href && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="navbar-active-section"
                    className="absolute h-0 w-0"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <ul aria-label="Enlaces rápidos" className="flex shrink-0 items-center gap-2">
          <li>
            <span role="img" aria-label="Perfil de Ignacio Navarria" className="inline-flex rounded-full border border-border p-1.5 text-text-muted">
              <UserRound aria-hidden="true" size={16} />
            </span>
          </li>
          <li className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary sm:inline-flex">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
            Disponible para proyectos
          </li>
          <li>
            <a
              href={profile.contact.cv}
              aria-label="Descargar CV de Ignacio Navarria"
              className="inline-flex items-center gap-1 rounded-full border border-warm-strong/50 bg-warm/10 px-3 py-1.5 text-warm transition-colors hover:bg-warm/20"
            >
              <FileText aria-hidden="true" size={16} />
              <span>CV</span>
            </a>
          </li>
        </ul>
        <SectionAnnouncement label={NAV_SECTIONS.find((section) => section.href === active)?.label ?? "Inicio"} />
      </nav>
    </header>
  );
}

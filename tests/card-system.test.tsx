import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { CTAButton } from "@/components/ui/CTAButton";
import { IconBadge } from "@/components/ui/IconBadge";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "--font-plus-jakarta-sans", className: "font-jakarta" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains-mono", className: "font-mono" }),
}));

vi.mock("motion/react", async () => {
  const React = await import("react");
  const motionOnly = new Set([
    "initial",
    "animate",
    "exit",
    "variants",
    "transition",
    "whileInView",
    "whileHover",
    "whileTap",
    "viewport",
  ]);
  const create = (tag: string) => {
    const component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionOnly.has(key)));
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
    motion: {
      article: create("article"),
      div: create("div"),
      h1: create("h1"),
      p: create("p"),
      section: create("section"),
      span: create("span"),
    },
    MotionConfig: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
    useReducedMotion: () => false,
  };
});

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("sistema de tarjetas", () => {
  it("eleva y cambia el borde de todas las tarjetas con iconos y CTA animados", () => {
    const views = [
      render(<About />).container,
      render(<Skills />).container,
      render(<Projects />).container,
      render(<Experience />).container,
      render(<Education />).container,
      render(<Contact />).container,
    ];

    for (const container of views) {
      const cards = container.querySelectorAll<HTMLElement>("[data-card]");
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card).toHaveClass("hover:-translate-y-1.5");
        expect(card).toHaveClass("hover:border-primary/60");
        expect(card).toHaveClass("motion-reduce:transform-none");
      }
    }

    const badge = render(<IconBadge label="Correo electrónico">icono</IconBadge>).container.querySelector("span");
    expect(badge?.className).toContain("group-hover:scale-110");
    expect(badge?.className).toContain("motion-reduce:transform-none");

    const cta = render(<CTAButton href="#inicio" ariaLabel="Inicio">Inicio</CTAButton>).container.querySelector("a");
    expect(cta?.className).toContain("hover:scale-105");
    expect(cta?.className).toContain("motion-reduce:transform-none");
  });

  it("cubre competencias, stack, proyectos, cronología y contacto con tarjetas interactivas", () => {
    const views = [
      render(<About />).container,
      render(<Skills />).container,
      render(<Projects />).container,
      render(<Experience />).container,
      render(<Education />).container,
      render(<Contact />).container,
    ];
    const expected =
      2 +
      4 +
      projects.length +
      profile.experience.length +
      profile.education.length +
      1;
    const cards = views.flatMap((container) => Array.from(container.querySelectorAll<HTMLElement>("[data-card]")));
    expect(cards).toHaveLength(expected);

    const cv = render(<Contact />).container.querySelector<HTMLAnchorElement>(
      'a[aria-label="Descargar CV de Ignacio Navarria"]',
    );
    expect(cv?.className).toContain("border-warm-strong/50");
    expect(cv?.className).toContain("text-warm");
    for (const label of ["GitHub de Ignacio Navarria", "LinkedIn de Ignacio Navarria"]) {
      const cta = render(<Contact />).container.querySelector<HTMLAnchorElement>(`a[aria-label="${label}"]`);
      expect(cta?.className).toContain("border-warm-strong/50");
    }
  });

  it("respeta movimiento reducido y no reintroduce estilos de Stitch", () => {
    expect(read("components/ui/ProjectCard.tsx")).toContain("reducedMotion ? undefined : { y: -6 }");
    expect(read("components/ui/Card.tsx")).toContain("export const CARD_SURFACE_CLASSES");
    expect(read("components/ui/ProjectCard.tsx")).toContain("CARD_SURFACE_CLASSES");
    expect(read("components/ui/Card.tsx")).toContain("motion-reduce:transform-none");
    expect(read("components/ui/CTAButton.tsx")).toContain("motion-reduce:transform-none");
    expect(read("components/ui/IconBadge.tsx")).toContain("motion-reduce:transform-none");

    const stitchPalette = /#1A1F2B|#264653|#2A9D8F|#E9C46A|#F4A261|Geist Mono|Material Symbols/i;
    for (const directory of ["app", "components"] as const) {
      const collect = (dir: string): string[] =>
        readdirSync(resolve(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
          const relative = `${dir}/${entry.name}`;
          if (entry.isDirectory()) {
            return collect(relative);
          }
          return /\.(ts|tsx|css)$/.test(entry.name) ? [relative] : [];
        });
      for (const file of collect(directory)) {
        expect(read(file), file).not.toMatch(stitchPalette);
      }
    }

    const collect = (dir: string): string[] =>
      readdirSync(resolve(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
        const relative = `${dir}/${entry.name}`;
        if (entry.isDirectory()) {
          return collect(relative);
        }
        return /\.(ts|tsx|css)$/.test(entry.name) ? [relative] : [];
      });
    const hoverDefinitions = ["app", "components"].flatMap((directory) =>
      collect(directory).flatMap((file) => read(file).match(/hover:-translate-y-1\.5/g) ?? []),
    );
    expect(hoverDefinitions).toHaveLength(1);
  });

  it("carga Plus Jakarta Sans para la interfaz y mantiene JetBrains Mono", () => {
    const fonts = read("app/fonts.ts");
    expect(fonts).toContain("Plus_Jakarta_Sans(");
    expect(fonts).toContain('variable: "--font-plus-jakarta-sans"');
    expect(fonts).not.toContain("Inter(");

    const css = read("app/globals.css");
    expect(css).toContain("--font-ui: var(--font-plus-jakarta-sans)");
    expect(css).toContain("--font-mono: var(--font-jetbrains-mono)");

    const layout = read("app/layout.tsx");
    expect(layout).toContain("plusJakartaSans.variable");
    for (const file of ["visual-tokens.test.tsx", "shell.test.tsx", "accessibility.test.tsx", "performance.test.tsx"]) {
      expect(read(`tests/${file}`), file).toContain("Plus_Jakarta_Sans");
      expect(read(`tests/${file}`), file).not.toMatch(/\bInter\(/);
    }
  });

  it("revela con whileInView sin IntersectionObserver propio en las secciones", () => {
    render(<Hero />);
    const reveal = read("components/ui/Reveal.tsx");
    expect(reveal).toContain("whileInView");
    expect(reveal).toContain("once: true");

    for (const file of ["Hero", "About", "Skills", "Projects", "Contact"]) {
      expect(read(`components/sections/${file}.tsx`), file).not.toContain("IntersectionObserver");
    }
  });
});

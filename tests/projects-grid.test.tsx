import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Projects } from "@/components/sections/Projects";
import { projects } from "@/data/projects";

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "--font-plus-jakarta-sans", className: "font-jakarta" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains-mono", className: "font-mono" }),
}));

vi.mock("motion/react", async () => {
  const React = await import("react");
  const motionProps = new Set([
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
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key)));
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
    motion: { article: create("article"), div: create("div"), h3: create("h3"), p: create("p"), span: create("span") },
    MotionConfig: ({ children }: { children: React.ReactNode }) => React.createElement("div", null, children),
    useReducedMotion: () => false,
  };
});

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("grilla de proyectos", () => {
  it("presenta una sola tesis con preview local, estado, resumen acotado, tags y repositorio", () => {
    const { container } = render(<Projects />);
    const thesis = projects[0];

    expect(screen.getAllByRole("article")).toHaveLength(1);
    const card = screen.getByRole("article");
    expect(within(card).getByRole("heading", { level: 3, name: thesis.title })).toBeInTheDocument();
    expect(within(card).getByText(thesis.authors[0])).toBeInTheDocument();
    expect(within(card).getByText(thesis.authors[1])).toBeInTheDocument();

    expect(card.querySelector("[data-project-preview]")).toBeInTheDocument();
    expect(card.querySelector("[data-project-status]")).toHaveTextContent("Tesis de Grado");
    const summary = card.querySelector<HTMLElement>("[data-project-summary]");
    expect(summary).toHaveTextContent(thesis.summary);
    expect(summary?.className).toContain("line-clamp-3");

    for (const tag of thesis.tags) {
      expect(within(card).getAllByText(tag).length).toBeGreaterThan(0);
    }
    expect(within(card).getByRole("link", { name: "Ver repositorio" })).toHaveAttribute("href", thesis.repository);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/googleusercontent|lh3\.google/i);
  });

  it("preserva el modal de arquitectura y devuelve el foco al disparador", () => {
    render(<Projects />);

    const trigger = screen.getByRole("button", { name: "Ver arquitectura" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: /Arquitectura de la tesis/i });
    expect(within(dialog).getByRole("list", { name: "Flujo de arquitectura" })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar arquitectura" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("no reintroduce los tres proyectos inventados de Stitch", () => {
    render(<Projects />);
    const source = read("components/ui/ProjectCard.tsx");

    for (const fake of [
      "SaaS Analytics Dashboard",
      "E-Commerce Headless Storefront",
      "Portfolio Personal v2",
      "En Producción",
      "Caso de Estudio",
      "Este Sitio",
    ]) {
      expect(document.body.textContent ?? "", fake).not.toContain(fake);
      expect(source, fake).not.toContain(fake);
    }

    expect(source).toContain("CARD_SURFACE_CLASSES");
    expect(read("components/sections/Projects.tsx")).toContain("projects.map");
    expect(read("data/projects.ts")).toContain("export const projects");
  });
});

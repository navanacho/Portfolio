import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
import { Projects } from "@/components/sections/Projects";
import { projects } from "@/data/projects";

const probes = vi.hoisted(() => ({
  reduced: false,
  motion: [] as Array<Record<string, unknown>>,
}));

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

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
      probes.motion.push({ tag, ...props });
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionOnly.has(key)));
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };

  return {
    motion: {
      article: create("article"),
      div: create("div"),
      span: create("span"),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    MotionConfig: ({ children, reducedMotion }: { children: React.ReactNode; reducedMotion: string }) => {
      probes.motion.push({ tag: "MotionConfig", reducedMotion });
      return React.createElement(React.Fragment, null, children);
    },
    useReducedMotion: () => probes.reduced,
  };
});

const REPOSITORY = "https://github.com/germarino18/Automatizacion_con_Honeypots_Tesis.git";

afterEach(() => {
  probes.reduced = false;
  document.body.style.overflow = "";
});

describe("escaparate de la tesis", () => {
  it("muestra una sola tarjeta con ambos autores y abre el flujo de arquitectura en un diálogo", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { level: 2, name: "Proyectos" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("Ignacio Navarria")).toBeInTheDocument();
    expect(screen.getByText("Germán Marino")).toBeInTheDocument();

    const card = screen.getByRole("article");
    const repositoryLink = within(card).getByRole("link", { name: "Ver repositorio" });
    expect(repositoryLink).toHaveAttribute("href", REPOSITORY);
    expect(repositoryLink).toHaveAttribute("rel", "noopener noreferrer");

    fireEvent.click(within(card).getByRole("button", { name: "Ver arquitectura" }));

    const dialog = screen.getByRole("dialog", { name: /Arquitectura de la tesis/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const flow = within(dialog).getByRole("list", { name: "Flujo de arquitectura" });
    expect(
      within(flow)
        .getAllByRole("listitem")
        .map((item) => item.querySelector("h3")?.textContent),
    ).toEqual(["Captura", "Orquestación", "Enriquecimiento", "Persistencia", "Visualización", "Consola SOC"]);

    expect(dialog).toHaveTextContent(/Cowrie/);
    expect(dialog).toHaveTextContent(/Dionaea/);
    expect(dialog).toHaveTextContent(/n8n/);
    expect(dialog).toHaveTextContent(/PostgreSQL/);
    expect(dialog).toHaveTextContent(/Grafana/);
    expect(within(dialog).getByRole("link", { name: "Ver repositorio" })).toHaveAttribute("href", REPOSITORY);
  });
});

describe("cierre y foco del diálogo", () => {
  it("cierra con Escape o backdrop, devuelve el foco al disparador y restaura el scroll", () => {
    document.body.style.overflow = "scroll";
    render(<Projects />);

    const trigger = screen.getByRole("button", { name: "Ver arquitectura" });
    trigger.focus();
    fireEvent.click(trigger);

    let dialog = screen.getByRole("dialog", { name: /Arquitectura de la tesis/i });
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Cerrar arquitectura" }));

    fireEvent.click(dialog);
    expect(screen.getByRole("dialog", { name: /Arquitectura de la tesis/i })).toBeInTheDocument();
    fireEvent.click(dialog.parentElement as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("scroll");
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    dialog = screen.getByRole("dialog", { name: /Arquitectura de la tesis/i });
    expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Cerrar arquitectura" }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("confina el foco dentro del diálogo al tabular en ambos sentidos", () => {
    render(<Projects />);

    const trigger = screen.getByRole("button", { name: "Ver arquitectura" });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: /Arquitectura de la tesis/i });
    const closeButton = within(dialog).getByRole("button", { name: "Cerrar arquitectura" });
    const repositoryLink = within(dialog).getByRole("link", { name: "Ver repositorio" });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(repositoryLink);

    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(repositoryLink);
    expect(document.body.contains(trigger)).toBe(true);
    expect(document.activeElement).not.toBe(trigger);
  });
});

describe("movimiento de la tarjeta", () => {
  it("sigue al cursor con el spotlight y anima las etiquetas técnicas", () => {
    render(<Projects />);

    const card = screen.getByRole("article");
    fireEvent.mouseMove(card, { clientX: 140, clientY: 90 });
    expect(card.style.getPropertyValue("--pointer-x")).toBe("140px");
    expect(card.style.getPropertyValue("--pointer-y")).toBe("90px");
    expect(card.className).toContain("project-spotlight");
    expect(probes.motion.some((entry) => entry.tag === "span" && entry.whileHover !== undefined)).toBe(true);
    expect(read("components/motion/MotionProvider.tsx")).toContain('reducedMotion="user"');
  });

  it("respeta movimiento reducido sin perder operabilidad del modal", () => {
    probes.reduced = true;
    render(<Projects />);

    const card = screen.getByRole("article");
    fireEvent.mouseMove(card, { clientX: 12, clientY: 34 });
    expect(card.style.getPropertyValue("--pointer-x")).toBe("");
    expect(read("components/motion/MotionProvider.tsx")).toContain('reducedMotion="user"');

    fireEvent.click(within(card).getByRole("button", { name: "Ver arquitectura" }));
    const dialog = screen.getByRole("dialog", { name: /Arquitectura de la tesis/i });
    expect(within(dialog).getByRole("list", { name: "Flujo de arquitectura" })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar arquitectura" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("flujo de arquitectura presentacional", () => {
  it("reutiliza los mismos nodos del catálogo fuera del modal", () => {
    render(<ArchitectureFlow nodes={projects[0]?.architecture ?? []} />);

    const flow = screen.getByRole("list", { name: "Flujo de arquitectura" });
    expect(
      within(flow)
        .getAllByRole("listitem")
        .map((item) => item.querySelector("h3")?.textContent),
    ).toEqual(["Captura", "Orquestación", "Enriquecimiento", "Persistencia", "Visualización", "Consola SOC"]);
    expect(flow).toHaveTextContent(/Grafana con cuatro paneles: SOC Overview, MITRE ATT&CK, geo-origen y Malware\/IoC/);
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import RootLayout from "@/app/layout";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";

const probes = vi.hoisted(() => ({
  inter: [] as unknown[][],
  mono: [] as unknown[][],
  motion: [] as Array<Record<string, unknown>>,
  reduced: false,
}));

vi.mock("next/font/google", () => ({
  Inter: (...args: unknown[]) => {
    probes.inter.push(args);
    return { variable: "--font-inter", className: "font-inter" };
  },
  JetBrains_Mono: (...args: unknown[]) => {
    probes.mono.push(args);
    return { variable: "--font-jetbrains-mono", className: "font-mono" };
  },
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
      probes.motion.push({ tag, ...props });
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionOnly.has(key)));
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };

  return {
    motion: {
      div: create("div"),
      section: create("section"),
      h1: create("h1"),
      p: create("p"),
      span: create("span"),
    },
    MotionConfig: ({ children, reducedMotion }: { children: React.ReactNode; reducedMotion: string }) => {
      probes.motion.push({ tag: "MotionConfig", reducedMotion });
      return React.createElement(React.Fragment, null, children);
    },
    useReducedMotion: () => probes.reduced,
  };
});

const tokens = [
  "--color-background: #0A0F1C;",
  "--color-surface: #111827;",
  "--color-border: rgba(255,255,255,0.08);",
  "--color-primary: #00F5D4;",
  "--color-secondary: #8B5CF6;",
  "--color-secondary-soft: #7B2CBF;",
  "--color-text: #F8FAFC;",
  "--color-text-muted: #94A3B8;",
];

describe("sistema visual", () => {
  it("declara los tokens exactos de color y superficie", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");

    for (const token of tokens) {
      expect(css).toContain(token);
    }
  });

  it("renderiza superficies con borde semitransparente y desenfoque", () => {
    render(<Card className="seccion-extra">Contenido de tarjeta</Card>);

    const card = screen.getByText("Contenido de tarjeta");
    expect(card).toHaveClass("bg-surface", "border-border", "backdrop-blur-md", "seccion-extra");
    expect(card).toHaveClass("text-text");
  });
});

describe("tipografía y movimiento", () => {
  it("carga Inter y JetBrains Mono con next/font sin URLs de terceros", () => {
    const fonts = readFileSync(resolve(process.cwd(), "app/fonts.ts"), "utf8");
    expect(fonts).toContain('from "next/font/google"');
    expect(fonts).toContain("Inter(");
    expect(fonts).toContain("JetBrains_Mono(");

    const html: string = renderToStaticMarkup(
      createElement(RootLayout, null, createElement("div", null, "contenido")),
    );
    expect(html).toContain("--font-inter");
    expect(html).toContain("--font-jetbrains-mono");
    expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic/i);
    expect(probes.inter[0]).toEqual([{ subsets: ["latin"], variable: "--font-inter", display: "swap" }]);
    expect(probes.mono[0]).toEqual([{ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" }]);
  });

  it("usa entrada escalonada, revelado once y fondo que sigue al cursor", () => {
    probes.reduced = false;
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1, name: "Ignacio Navarria" })).toBeInTheDocument();
    const sectionProps = probes.motion.find((entry) => entry.tag === "section");
    expect(sectionProps?.initial).toBeDefined();
    expect((sectionProps?.variants as Record<string, unknown>)?.visible).toMatchObject({
      transition: { staggerChildren: 0.08 },
    });
    const reveal = probes.motion.find((entry) => typeof entry.whileInView === "string");
    expect(reveal?.viewport).toMatchObject({ once: true });
    expect(probes.motion.some((entry) => entry.tag === "MotionConfig" && entry.reducedMotion === "user")).toBe(true);

    const heroSection = document.querySelector("section");
    if (!heroSection) {
      throw new Error("Hero no renderizó su sección");
    }
    const sectionElement = heroSection as HTMLElement;
    expect(sectionElement.querySelector('[aria-hidden="true"]')).toBeInTheDocument();

    fireEvent.mouseMove(sectionElement, { clientX: 120, clientY: 80 });
    expect(sectionElement.style.getPropertyValue("--pointer-x")).toBe("120px");
    expect(sectionElement.style.getPropertyValue("--pointer-y")).toBe("80px");
  });

  it("desactiva el seguimiento del cursor con movimiento reducido", () => {
    probes.reduced = true;
    render(<Hero />);

    const heroSection = document.querySelector("section");
    if (!heroSection) {
      throw new Error("Hero no renderizó su sección");
    }
    const sectionElement = heroSection as HTMLElement;
    fireEvent.mouseMove(sectionElement, { clientX: 42, clientY: 24 });

    expect(sectionElement.style.getPropertyValue("--pointer-x")).toBe("");
    probes.reduced = false;
  });
});

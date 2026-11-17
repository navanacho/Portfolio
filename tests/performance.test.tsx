import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen } from "@testing-library/react";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import RootLayout from "@/app/layout";
import { Hero } from "@/components/sections/Hero";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter", className: "font-inter" }),
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
    motion: {
      div: create("div"),
      section: create("section"),
      h1: create("h1"),
      p: create("p"),
      span: create("span"),
    },
    MotionConfig: ({ children }: { children: React.ReactNode }) =>
      React.createElement(Fragment, null, children),
    useReducedMotion: () => false,
  };
});

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("rendimiento y estabilidad visual", () => {
  it("reserva dimensiones del avatar y carga tipografías solo con next/font", () => {
    render(<Hero />);
    const avatar = screen.getByRole("img", { name: "Retrato de Ignacio Navarria" });
    expect(avatar).toHaveAttribute("src", "/assets/images/avatar.png");
    expect(avatar).toHaveAttribute("width", "96");
    expect(avatar).toHaveAttribute("height", "96");
    expect(avatar).toHaveAttribute("alt", "Retrato de Ignacio Navarria");

    const fonts = read("app/fonts.ts");
    expect(fonts).toContain('from "next/font/google"');
    expect(fonts).toContain("Inter(");
    expect(fonts).toContain("JetBrains_Mono(");

    const html = renderToStaticMarkup(
      createElement(RootLayout, null, createElement("div", null, "contenido")),
    );
    expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic/i);
    expect(html).not.toMatch(/<link[^>]+href="https?:\/\//i);
    expect(read("app/globals.css")).not.toMatch(/@import\s+url\(|fonts\.googleapis/i);
  });

  it("limita la hidratación a revelados once con movimiento reducido", () => {
    expect(read("components/ui/Reveal.tsx")).toContain("once: true");
    expect(read("components/sections/Hero.tsx")).toContain('reducedMotion="user"');
    expect(read("components/ui/ProjectCard.tsx")).toContain('reducedMotion="user"');
    expect(read("components/ui/Modal.tsx")).toContain("useReducedMotion");
  });

  it("registra dos notas de medición de Core Web Vitals sin cifras simuladas", () => {
    const evidence = read("tests/evidence/performance.txt");
    const first = evidence.indexOf("NOTA_MEDICION_1");
    const second = evidence.indexOf("NOTA_MEDICION_2");
    expect(first).toBeGreaterThanOrEqual(0);
    expect(second).toBeGreaterThan(first);

    const secondNote = evidence.slice(second);
    for (const token of [
      "LCP",
      "2,5 s",
      "INP",
      "200 ms",
      "CLS",
      "0,1",
      "PENDIENTE_DE_MEDICION",
      "sin cifras medidas",
    ]) {
      expect(secondNote).toContain(token);
    }
  });
});

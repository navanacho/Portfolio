import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render } from "@testing-library/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import RootLayout from "@/app/layout";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter", className: "font-inter" }),
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
    "layoutId",
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

function sectionClass(element: HTMLElement | null): string {
  if (!element) {
    throw new Error("No se renderizó la sección esperada");
  }
  return element.className;
}

describe("contenedor central y espaciado", () => {
  it("centra el contenido a 1200 px con márgenes móvil y escritorio", () => {
    const html: string = renderToStaticMarkup(
      createElement(RootLayout, null, createElement("div", null, "contenido")),
    );
    const main = html.match(/<main[^>]*>/)?.[0] ?? "";

    expect(main).toContain("mx-auto");
    expect(main).toContain("w-full");
    expect(main).toContain("max-w-[1200px]");
    expect(main).toContain("px-5");
    expect(main).toContain("lg:px-8");
  });

  it("usa grids de 12 columnas con distribución 7/5 en hero y sobre mí", () => {
    const hero = render(<Hero />);
    expect(sectionClass(hero.container.querySelector("section"))).toContain("lg:grid-cols-12");
    expect(hero.container.querySelector(".lg\\:col-span-7")).toBeInTheDocument();
    expect(hero.container.querySelector(".lg\\:col-span-5")).toBeInTheDocument();

    const about = render(<About />);
    expect(sectionClass(about.container.querySelector("section"))).toContain("lg:grid-cols-12");
    expect(about.container.querySelector(".lg\\:col-span-7")).toBeInTheDocument();
    expect(about.container.querySelector(".lg\\:col-span-5")).toBeInTheDocument();
  });

  it("colapsa a una columna en móvil y declara tablet y escritorio sin ancho fijo", () => {
    const views = [
      render(<Hero />).container,
      render(<About />).container,
      render(<Skills />).container,
      render(<Projects />).container,
      render(<Contact />).container,
    ];

    for (const container of views) {
      expect(container.querySelector(".grid-cols-1")).toBeInTheDocument();
      expect(container.innerHTML).not.toMatch(/\b(?:min-w-\[|whitespace-nowrap|overflow-x-auto)\b/);
    }

    expect(views[2]?.querySelector(".sm\\:grid-cols-2")).toBeInTheDocument();
    expect(views[2]?.querySelector(".lg\\:grid-cols-4")).toBeInTheDocument();
    expect(views[3]?.querySelector(".md\\:grid-cols-2")).toBeInTheDocument();
    expect(views[3]?.querySelector(".lg\\:grid-cols-3")).toBeInTheDocument();
    expect(views[4]?.querySelector(".lg\\:col-span-5")).toBeInTheDocument();
    expect(views[4]?.querySelector(".lg\\:col-span-7")).toBeInTheDocument();
  });

  it("centraliza márgenes, gutter y escala de espaciado en variables CSS", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    for (const variable of [
      "--layout-max-width: 1200px;",
      "--layout-margin-mobile: 1.25rem;",
      "--layout-margin-desktop: 2rem;",
      "--layout-gutter: 1.5rem;",
      "--space-lg: 1.5rem;",
      "--space-xl: 2.5rem;",
      ".app-container",
      ".content-grid",
    ]) {
      expect(css, variable).toContain(variable);
    }

    const html: string = renderToStaticMarkup(
      createElement(RootLayout, null, createElement("div", null, "contenido")),
    );
    expect(html).toContain('class="app-container');
    expect(render(<Skills />).container.querySelector(".content-grid")).toBeInTheDocument();
  });
});

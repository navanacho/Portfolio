import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { act, fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { createElement, Fragment } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

class TrackedIntersection implements IntersectionObserver {
  static instances: TrackedIntersection[] = [];
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];
  readonly callback: IntersectionObserverCallback;
  readonly targets: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    TrackedIntersection.instances.push(this);
  }

  observe(target: Element): void {
    this.targets.push(target);
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

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
    "style",
    "layoutId",
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
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(Fragment, null, children),
    motion: {
      article: create("article"),
      div: create("div"),
      section: create("section"),
      h1: create("h1"),
      p: create("p"),
      span: create("span"),
    },
    MotionConfig: ({ children }: { children: React.ReactNode }) =>
      React.createElement(Fragment, null, children),
    useReducedMotion: () => false,
    useScroll: () => ({ scrollYProgress: 0.4 }),
    useTransform: (_value: unknown, input: number[], output: number[]) => {
      const ratio = (0.4 - input[0]) / (input[1] - input[0]);
      return { value: output[0] + ratio * (output[1] - output[0]) };
    },
  };
});

beforeEach(() => {
  TrackedIntersection.instances = [];
  vi.stubGlobal("IntersectionObserver", TrackedIntersection);
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (media: string) => ({
      matches: false,
      media,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function Page() {
  return (
    <>
      <Navbar />
      <main>{createElement(Home)}</main>
      <Footer />
    </>
  );
}

describe("accesibilidad del portafolio", () => {
  it("expone landmarks, un único h1 y encabezados de sección sin violaciones de axe", async () => {
    const { container } = render(<Page />);

    expect(container.querySelector("header")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
    expect(container.querySelector("footer")).toBeInTheDocument();

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Ignacio Navarria");

    for (const label of ["Sobre mí", "Experiencia", "Educación", "Habilidades", "Proyectos", "Contacto"]) {
      expect(screen.getByRole("heading", { level: 2, name: label })).toBeInTheDocument();
    }

    const ids = Array.from(container.querySelectorAll<HTMLElement>("[id]")).map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const labelled of Array.from(container.querySelectorAll<HTMLElement>("[aria-labelledby]"))) {
      const references = (labelled.getAttribute("aria-labelledby") ?? "").split(/\s+/).filter(Boolean);
      expect(references.length).toBeGreaterThan(0);
      for (const reference of references) {
        expect(ids.filter((id) => id === reference)).toHaveLength(1);
      }
    }

    const results = await axe.run(document.body, {
      rules: { "color-contrast": { enabled: false } },
    });
    const violations = results.violations.map(
      (violation) => `${violation.id}: ${violation.nodes.map((node) => node.html).join(" | ")}`,
    );
    expect(violations).toEqual([]);
  }, 15000);

  it("mantiene los controles iconográficos etiquetados y el foco visible en CSS", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-primary\)/);

    render(<Page />);
    for (const name of [
      "GitHub de Ignacio Navarria",
      "LinkedIn de Ignacio Navarria",
      "Correo de Ignacio Navarria",
      "Descargar CV de Ignacio Navarria",
    ]) {
      const links = screen.getAllByRole("link", { name });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("aria-label", name);
      }
    }
  });

  it("recorre los controles en orden y anuncia la sección activa por teclado y scroll", () => {
    const { container } = render(<Page />);

    const focusables = Array.from(
      container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    );
    const sectionLink = focusables.findIndex((node) => node.getAttribute("href") === "#proyectos");
    const architectureButton = focusables.findIndex((node) => node.textContent?.includes("Ver arquitectura"));
    const contactRegion = container.querySelector<HTMLElement>('section[aria-labelledby="contacto"]');
    const emailLink = focusables.findIndex(
      (node) =>
        Boolean(contactRegion?.contains(node)) &&
        node.getAttribute("href") === "mailto:navarria332@gmail.com",
    );
    expect(sectionLink).toBeGreaterThanOrEqual(0);
    expect(architectureButton).toBeGreaterThan(sectionLink);
    expect(emailLink).toBeGreaterThan(architectureButton);
    expect(focusables.every((node) => Number(node.getAttribute("tabindex") ?? 0) <= 0)).toBe(true);

    const announcement = screen.getByRole("status", { name: "Sección activa" });
    expect(announcement).toHaveTextContent("Sección activa: Inicio");

    const observer = TrackedIntersection.instances[0];
    const contactSection = document.getElementById("contacto");
    if (!observer || !contactSection) {
      throw new Error("El navbar no registró un observer para la sección de contacto");
    }
    act(() => {
      observer.callback(
        [{ isIntersecting: true, target: contactSection } as unknown as IntersectionObserverEntry],
        observer as unknown as IntersectionObserver,
      );
    });
    expect(announcement).toHaveTextContent("Sección activa: Contacto");
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("aria-current", "location");

    fireEvent.click(screen.getByRole("link", { name: "Proyectos" }));
    expect(announcement).toHaveTextContent("Sección activa: Proyectos");
  });
});

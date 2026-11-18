import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { profile } from "@/data/profile";

class StaticIntersectionObserver implements IntersectionObserver {
  static instances: StaticIntersectionObserver[] = [];
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];
  readonly targets: Element[] = [];
  readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    StaticIntersectionObserver.instances.push(this);
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
  const motionProps = new Set(["initial", "animate", "transition", "layoutId", "whileHover", "whileTap"]);
  const create = (tag: string) => {
    const component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key)));
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };
  return {
    motion: { span: create("span"), div: create("div") },
    useReducedMotion: () => false,
  };
});

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

beforeEach(() => {
  StaticIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", StaticIntersectionObserver);
  Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("rediseño del shell", () => {
  it("muestra una cabecera h-20 translúcida con logo, navegación en píldora y acciones", () => {
    const { container } = render(<Navbar />);

    const header = container.querySelector("header");
    expect(header?.className).toContain("h-20");
    expect(header?.className).toContain("bg-background/70");

    const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
    expect(navigation.className).toContain("rounded-full");
    expect(screen.getByText("<navanacho/>")).toBeInTheDocument();
    expect(screen.getByText("Disponible para proyectos")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Perfil de Ignacio Navarria" })).toBeInTheDocument();

    const cv = screen.getByRole("link", { name: "Descargar CV de Ignacio Navarria" });
    expect(cv).toHaveAttribute("href", profile.contact.cv);
    expect(cv.className).toContain("rounded-full");
  });

  it("expone seis secciones reales y marca la activa por teclado o clic", () => {
    render(<Navbar />);

    const expected = [
      ["Inicio", "#inicio"],
      ["Sobre mí", "#sobre-mi"],
      ["Tech Stack", "#habilidades"],
      ["Proyectos", "#proyectos"],
      ["Trayectoria", "#experiencia"],
      ["Contacto", "#contacto"],
    ] as const;

    for (const [label, href] of expected) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).not.toHaveAttribute("tabindex", "-1");
    }

    const trayectoria = screen.getByRole("link", { name: "Trayectoria" });
    fireEvent.click(trayectoria);
    expect(trayectoria).toHaveAttribute("aria-current", "location");
    expect(trayectoria.className).toContain("bg-primary/15");
    expect(trayectoria.className).toContain("text-primary");
  });

  it("evita enlaces vacíos y mantiene el footer con tres destinos confirmados", () => {
    const { container } = render(
      <>
        <Navbar />
        <Footer />
      </>,
    );

    expect(container.querySelector('a[href="#"]')).not.toBeInTheDocument();
    expect(read("components/layout/Navbar.tsx")).not.toContain('href="#"');
    expect(read("components/layout/Footer.tsx")).not.toContain('href="#"');

    const footer = container.querySelector("footer");
    const footerLinks = footer?.querySelectorAll("a") ?? [];
    expect(footerLinks).toHaveLength(3);
    expect(footerLinks[0]).toHaveAttribute("href", profile.contact.github);
    expect(footerLinks[1]).toHaveAttribute("href", profile.contact.linkedin);
    expect(footerLinks[2]).toHaveAttribute("href", `mailto:${profile.contact.email}`);
  });

  it("sincroniza el activo con el observer y permite recorrer la navegación con teclado", () => {
    const { container } = render(
      <>
        <div id="proyectos" />
        <Navbar />
      </>,
    );

    const observer = StaticIntersectionObserver.instances[0];
    const target = document.getElementById("proyectos");
    if (!observer || !target) {
      throw new Error("El navbar no registró un observer para la sección");
    }
    act(() => {
      observer.callback(
        [{ isIntersecting: true, target } as unknown as IntersectionObserverEntry],
        observer as unknown as IntersectionObserver,
      );
    });

    const projects = screen.getByRole("link", { name: "Proyectos" });
    expect(projects).toHaveAttribute("aria-current", "location");
    const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
    expect(navigation.querySelectorAll('[aria-current="location"]')).toHaveLength(1);
    expect(navigation.querySelector("ul")?.className).toContain("overflow-x-auto");

    for (const label of ["Inicio", "Sobre mí", "Tech Stack", "Proyectos", "Trayectoria", "Contacto"]) {
      const link = screen.getByRole("link", { name: label });
      link.focus();
      expect(document.activeElement).toBe(link);
      expect(link.tabIndex).toBe(0);
    }

    fireEvent.click(screen.getByRole("link", { name: "Contacto" }));
    expect(container.querySelectorAll('[aria-current="location"]')).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent("Sección activa: Contacto");

    expect(read("components/layout/navigation.ts")).toContain("export const NAV_SECTIONS");
    expect(read("components/layout/Navbar.tsx")).toContain("NAV_SECTIONS");
    expect(read("components/layout/Navbar.tsx")).not.toContain("const sections");
    expect(read("data/profile.ts")).not.toContain("NAV_SECTIONS");
  });
});

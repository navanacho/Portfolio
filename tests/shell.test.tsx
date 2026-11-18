import { act, fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import RootLayout, { metadata } from "@/app/layout";
import { Navbar } from "@/components/layout/Navbar";

class ObservedIntersection implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];
  static instances: ObservedIntersection[] = [];
  readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    ObservedIntersection.instances.push(this);
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
  ObservedIntersection.instances = [];
});

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "--font-plus-jakarta-sans", className: "font-jakarta" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains-mono", className: "font-mono" }),
}));

vi.mock("motion/react", async () => {
  const React = await import("react");
  const motionProps = new Set(["initial", "animate", "variants", "transition", "whileInView", "viewport", "layoutId"]);
  const create = (tag: string) => {
    const component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key)));
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };
  return {
    motion: { div: create("div"), span: create("span"), section: create("section") },
    MotionConfig: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false,
  };
});

describe("shell de la aplicación", () => {
  it("emite metadata en español con Open Graph relativo y sin dominio absoluto", () => {
    const og = metadata.openGraph as Record<string, unknown>;
    const twitter = metadata.twitter as Record<string, unknown>;

    expect(metadata.title).toBe("Ignacio Navarria | Software Developer & Data Analyst");
    expect(metadata.description).toContain("Software Developer & Data Analyst");
    expect(og).toMatchObject({
      title: "Ignacio Navarria | Software Developer & Data Analyst",
      description: metadata.description,
      type: "website",
      images: [{ url: "/assets/images/avatar.png" }],
    });
    expect(twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata).not.toHaveProperty("metadataBase");
    expect(JSON.stringify(metadata)).not.toMatch(/https?:\/\//);
  });

  it("sirve el HTML inicial con lang es, main, footer y solo enlaces confirmados", () => {
    const html: string = renderToStaticMarkup(
      createElement(RootLayout, null, createElement("div", null, "contenido")),
    );

    expect(html).toContain('<html lang="es"');
    expect(html).toContain("<main");
    expect(html).toContain('href="https://github.com/navanacho"');
    expect(html).toContain('href="https://www.linkedin.com/in/ignacio-navarria-151787450"');
    expect(html).toContain('href="mailto:navarria332@gmail.com"');
    expect(html).toContain("© 2026 Ignacio Navarria");
    expect(html).not.toMatch(/tel:|\+54/);
  });
});

describe("navbar flotante", () => {
  it("marca la sección activa al hacer scroll y aplica blur al desplazarse", () => {
    vi.stubGlobal("IntersectionObserver", ObservedIntersection);
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });

    render(
      <>
        <div id="contacto" />
        <Navbar />
      </>,
    );

    const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
    const contactLink = screen.getByRole("link", { name: "Contacto" });
    expect(contactLink).toHaveAttribute("href", "#contacto");
    expect(navigation).not.toHaveClass("backdrop-blur-md");

    const observer = ObservedIntersection.instances[0];
    const section = document.getElementById("contacto");
    if (!observer || !section) {
      throw new Error("El navbar no registró un observer para la sección");
    }

    act(() => {
      observer.callback(
        [{ isIntersecting: true, target: section } as unknown as IntersectionObserverEntry],
        observer as unknown as IntersectionObserver,
      );
    });
    expect(contactLink).toHaveAttribute("aria-current", "location");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 240, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(navigation).toHaveClass("backdrop-blur-md");
  });

  it("actualiza el indicador activo cuando el usuario elige otro enlace", () => {
    vi.stubGlobal("IntersectionObserver", ObservedIntersection);
    render(<Navbar />);

    const projectsLink = screen.getByRole("link", { name: "Proyectos" });
    fireEvent.click(projectsLink);

    expect(projectsLink).toHaveAttribute("aria-current", "location");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Navbar } from "@/components/layout/Navbar";
import { profile } from "@/data/profile";

class NoopIntersection implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const probes = vi.hoisted(() => ({
  reduced: false,
  scroll: 0.4,
  transforms: [] as Array<{ input: number[]; output: number[] }>,
  motion: [] as Array<Record<string, unknown>>,
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
    "style",
    "layoutId",
  ]);

  const create = (tag: string) => {
    const component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      probes.motion.push({ tag, ...props });
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionOnly.has(key)));
      if (props.layoutId) {
        domProps["data-motion-layout-id"] = props.layoutId;
      }
      return React.createElement(tag, { ...domProps, ref }, props.children as React.ReactNode);
    });
    component.displayName = `motion-${tag}`;
    return component;
  };

  return {
    motion: {
      div: create("div"),
      span: create("span"),
      section: create("section"),
      h1: create("h1"),
      p: create("p"),
    },
    MotionConfig: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useReducedMotion: () => probes.reduced,
    useScroll: () => ({ scrollYProgress: probes.scroll }),
    useTransform: (_value: unknown, input: number[], output: number[]) => {
      probes.transforms.push({ input, output });
      const ratio = (probes.scroll - input[0]) / (input[1] - input[0]);
      return { value: output[0] + ratio * (output[1] - output[0]) };
    },
  };
});

afterEach(() => {
  vi.unstubAllGlobals();
  probes.reduced = false;
  probes.scroll = 0.4;
  probes.transforms = [];
  probes.motion = [];
});

describe("animaciones del portafolio", () => {
  it("muestra la barra de progreso con transformación horizontal y sin animar width", async () => {
    const { ScrollProgress } = await import("@/components/ui/ScrollProgress");
    probes.scroll = 0.4;

    render(<ScrollProgress />);

    const bar = probes.motion.find((entry) => entry.tag === "div");
    expect(bar?.className).toContain("origin-left");
    expect(bar?.className).not.toMatch(/\b(?:w-|width-)/);
    expect(probes.transforms).toEqual([{ input: [0, 1], output: [0.08, 1] }]);

    const style = bar?.style as { scaleX?: { value: number } } | undefined;
    expect(style?.scaleX?.value).toBeCloseTo(0.448);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("reutiliza un layoutId para deslizar el indicador entre secciones activas", () => {
    vi.stubGlobal("IntersectionObserver", NoopIntersection);
    const { container } = render(<Navbar />);

    const initialIndicators = container.querySelectorAll('[data-motion-layout-id="navbar-active-section"]');
    expect(initialIndicators).toHaveLength(1);
    expect(initialIndicators[0]?.parentElement).toBe(screen.getByRole("link", { name: "Inicio" }));

    fireEvent.click(screen.getByRole("link", { name: "Proyectos" }));

    const movedIndicators = container.querySelectorAll('[data-motion-layout-id="navbar-active-section"]');
    expect(movedIndicators).toHaveLength(1);
    expect(movedIndicators[0]?.parentElement).toBe(screen.getByRole("link", { name: "Proyectos" }));
    expect(probes.motion.filter((entry) => entry.layoutId).map((entry) => entry.layoutId)).toEqual([
      "navbar-active-section",
      "navbar-active-section",
    ]);
  });

  it("revela las insignias de habilidades escalonadas una sola vez", () => {
    render(<Skills />);

    const container = probes.motion.find((entry) => entry.tag === "div" && entry.whileInView === "visible");
    const variants = container?.variants as
      | Record<string, { transition?: { staggerChildren?: number } }>
      | undefined;
    expect(container?.viewport).toMatchObject({ once: true });
    expect(variants?.visible?.transition?.staggerChildren).toBeCloseTo(0.06);

    const badges = probes.motion.filter((entry) => entry.tag === "span" && entry.variants);
    expect(badges).toHaveLength(profile.stack.length + profile.tools.length);
    for (const badge of badges) {
      expect(badge.variants).toMatchObject({ hidden: { opacity: 0 }, visible: { opacity: 1 } });
    }
    expect(screen.getByRole("list", { name: "Herramientas" })).toHaveTextContent("PostgreSQL");
  });

  it("detiene el pulso de la red de nodos con movimiento reducido", () => {
    const { container, unmount } = render(<Hero />);

    const network = probes.motion.find(
      (entry) => entry.tag === "div" && Array.isArray((entry.animate as { opacity?: unknown })?.opacity),
    );
    expect(network?.animate).toMatchObject({ opacity: [0.35, 0.8, 0.35], scale: [1, 1.05, 1] });
    expect((network?.transition as { repeat: number } | undefined)?.repeat).toBe(Infinity);
    expect(container.querySelector('[aria-hidden="true"].grid-cols-3')).toBeInTheDocument();

    unmount();
    probes.motion = [];
    probes.reduced = true;
    render(<Hero />);

    const stopped = probes.motion.find((entry) =>
      String(entry.className ?? "").includes("grid-cols-3"),
    );
    expect(stopped?.animate).toBeUndefined();
    expect(stopped?.transition).toBeUndefined();
  });
});

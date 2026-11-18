import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { act, render } from "@testing-library/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";
import {
  CANVAS_STYLE,
  PARTICLE_CONFIG,
  applyPointerInfluence,
  createParticles,
} from "@/components/background/ParticleConstellation";

const canvasProbes = vi.hoisted(() => ({
  getContext: vi.fn(),
  context: {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  },
  frames: [] as Array<FrameRequestCallback>,
  cancelled: [] as number[],
  hidden: false,
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
    "viewport",
    "style",
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
    useScroll: () => ({ scrollYProgress: 0.4 }),
    useTransform: () => ({ value: 0.4 }),
  };
});

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

beforeEach(() => {
  canvasProbes.getContext.mockReset();
  canvasProbes.getContext.mockReturnValue(canvasProbes.context);
  canvasProbes.context.setTransform.mockClear();
  canvasProbes.context.clearRect.mockClear();
  canvasProbes.context.beginPath.mockClear();
  canvasProbes.context.arc.mockClear();
  canvasProbes.context.fill.mockClear();
  canvasProbes.context.moveTo.mockClear();
  canvasProbes.context.lineTo.mockClear();
  canvasProbes.context.stroke.mockClear();
  canvasProbes.frames = [];
  canvasProbes.cancelled = [];
  canvasProbes.hidden = false;

  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: canvasProbes.getContext,
  });
  Object.defineProperty(document, "hidden", {
    configurable: true,
    get: () => canvasProbes.hidden,
  });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    canvasProbes.frames.push(callback);
    return canvasProbes.frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => {
    canvasProbes.cancelled.push(id);
  });
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fondo ambiental", () => {
  it("compone grilla enmascarada, tres blobs y un canvas detrás del contenido", () => {
    const { container } = render(<Home />);

    expect(container.querySelector(".ambient-grid")).toBeInTheDocument();
    expect(container.querySelectorAll(".ambient-blob")).toHaveLength(3);
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
    expect(canvasProbes.getContext).toHaveBeenCalledWith("2d");

    const css = read("app/globals.css");
    expect(css).toMatch(/\.ambient-grid\s*\{[^}]*mask-image:\s*radial-gradient/);
    expect(css).toMatch(/@keyframes ambient-drift/);
  });

  it("mantiene el render de servidor libre de acceso a canvas y a window en el módulo", () => {
    const html: string = renderToStaticMarkup(createElement(Home));

    expect(html).toContain("<canvas");
    expect(html).not.toMatch(/<script|material-symbols-outlined/);
    expect(canvasProbes.getContext).not.toHaveBeenCalled();

    const source = read("components/background/ParticleConstellation.tsx");
    expect(source.indexOf("window")).toBeGreaterThan(source.indexOf("useEffect"));
  });

  it("dibuja puntos y líneas de conexión con un techo de partículas", () => {
    const { unmount } = render(<Home />);
    act(() => {
      canvasProbes.frames.forEach((callback) => callback(0));
    });

    expect(canvasProbes.context.setTransform).toHaveBeenCalled();
    expect(canvasProbes.context.arc).toHaveBeenCalled();
    expect(canvasProbes.context.lineTo).toHaveBeenCalled();
    expect(canvasProbes.context.stroke).toHaveBeenCalled();
    expect(PARTICLE_CONFIG.maxParticles).toBeLessThanOrEqual(60);
    expect(CANVAS_STYLE.connectionColor).toContain("91,192,222");
    expect(CANVAS_STYLE.particleColor).toContain("244,214,176");
    expect(createParticles(1024, 768).length).toBeLessThanOrEqual(PARTICLE_CONFIG.maxParticles);
    expect(createParticles(1024, 768).length).toBeGreaterThan(0);
    unmount();
  });

  it("desvía partículas cercanas al cursor y deja quietas las lejanas", () => {
    const particle = { x: 100, y: 100, vx: 0, vy: 0 };
    const pointer = { x: 110, y: 110 };

    const near = applyPointerInfluence(particle, pointer, PARTICLE_CONFIG.pointerRadius);
    expect(near.x).toBeLessThan(particle.x);
    expect(near.y).toBeLessThan(particle.y);

    const far = applyPointerInfluence(particle, { x: 400, y: 400 }, PARTICLE_CONFIG.pointerRadius);
    expect(far).toEqual(particle);

    const event = new Event("pointermove");
    Object.defineProperties(event, { clientX: { value: 110 }, clientY: { value: 110 } });
    const { unmount } = render(<Home />);
    act(() => {
      window.dispatchEvent(event);
    });
    expect(canvasProbes.frames.length).toBeGreaterThan(0);
    unmount();
  });

  it("documenta el fallback CSS-only cuando el canvas no puede animarse", () => {
    const design = read("openspec/changes/stitch-ui-redesign/design.md");
    expect(design).toContain("fallback CSS-only");
    expect(design).toContain("GridBackdrop");
    expect(design).toContain("AmbientBlobs");
  });

  it("pausa el bucle cuando la pestaña está oculta", () => {
    const { unmount } = render(<Home />);
    const firstFrame = canvasProbes.frames[0];
    expect(firstFrame).toBeDefined();
    const drawsBefore = canvasProbes.context.clearRect.mock.calls.length;

    act(() => {
      canvasProbes.hidden = true;
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(canvasProbes.cancelled).toContain(1);
    act(() => {
      canvasProbes.frames.forEach((callback) => callback(0));
    });
    expect(canvasProbes.context.clearRect).toHaveBeenCalledTimes(drawsBefore);
    unmount();
  });
});

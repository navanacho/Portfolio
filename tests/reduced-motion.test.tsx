import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ParticleConstellation } from "@/components/background/ParticleConstellation";

const probes = vi.hoisted(() => ({
  frames: [] as Array<FrameRequestCallback>,
  cancelled: [] as number[],
  motionListener: null as null | ((event: { matches: boolean }) => void),
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
}));

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

beforeEach(() => {
  probes.frames = [];
  probes.cancelled = [];
  probes.motionListener = null;
  for (const method of Object.values(probes.context)) {
    method.mockClear();
  }

  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: () => probes.context,
  });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    probes.frames.push(callback);
    return probes.frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => {
    probes.cancelled.push(id);
  });
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) => {
      probes.motionListener = listener;
    },
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("movimiento reducido integral", () => {
  it("instala MotionConfig global y mantiene las reglas CSS de reduced motion", () => {
    const layout = read("app/layout.tsx");
    const css = read("app/globals.css");

    expect(layout).toContain("MotionProvider");
    expect(read("components/motion/MotionProvider.tsx")).toContain('reducedMotion="user"');
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("transition-duration: 0.01ms");
    expect(css).toMatch(/\.ambient-blob\s*\{[^}]*animation:\s*none/);
    expect(css).toMatch(/\.project-spotlight::before[^@]*prefers-reduced-motion|prefers-reduced-motion[^@]*\.project-spotlight::before/);
  });

  it("detiene el canvas cuando el usuario activa reduced motion en caliente", () => {
    render(<ParticleConstellation />);
    expect(probes.frames.length).toBeGreaterThan(0);

    act(() => {
      probes.motionListener?.({ matches: true });
    });

    expect(probes.cancelled.length).toBeGreaterThan(0);
    const queued = probes.frames.length;
    act(() => {
      probes.frames[0]?.(0);
    });
    expect(probes.frames.length).toBe(queued);
  });

  it("elimina desplazamientos en hover y conserva el modal operable", () => {
    const card = read("components/ui/Card.tsx");
    const cta = read("components/ui/CTAButton.tsx");
    const badge = read("components/ui/IconBadge.tsx");
    const project = read("components/ui/ProjectCard.tsx");
    const hero = read("components/sections/Hero.tsx");
    const modal = read("components/ui/Modal.tsx");

    expect(read("app/layout.tsx")).toContain("MotionProvider");
    expect(hero).not.toContain("MotionConfig");
    expect(project).not.toContain("MotionConfig");
    for (const source of [card, cta, badge, project]) {
      if (source.includes("translate-y") || source.includes("hover:scale")) {
        expect(source).toContain("motion-reduce:transform-none");
      }
    }
    expect(project).toContain("whileHover={reducedMotion ? undefined");
    expect(modal).toContain('event.key === "Escape"');
    expect(modal).toContain("closeButtonRef.current?.focus()");
    expect(modal).toContain('aria-modal="true"');
  });
});

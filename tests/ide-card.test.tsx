import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/sections/Hero";
import { profile } from "@/data/profile";

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
    "viewport",
    "style",
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

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("tarjeta IDE del hero", () => {
  it("ubica el avatar sin marco en la fila de perfil junto al nombre real", () => {
    const { container } = render(<Hero />);

    expect(screen.getByText("ignacio.bio.ts")).toBeInTheDocument();
    const profileRow = container.querySelector<HTMLElement>("[data-ide-profile]");
    expect(profileRow).toBeInTheDocument();
    expect(profileRow).toHaveTextContent(profile.identity.name);
    expect(profileRow).toHaveTextContent(`(@${profile.identity.handle})`);

    const avatar = screen.getByRole("img", { name: "Retrato de Ignacio Navarria" });
    expect(profileRow).toContainElement(avatar);
    expect(avatar).toHaveAttribute("width", "1024");
    expect(avatar).toHaveAttribute("height", "1536");
    expect(avatar).toHaveClass("object-contain");
    for (const forbidden of ["rounded-full", "object-cover", "h-24", "w-24"]) {
      expect(avatar.className, forbidden).not.toContain(forbidden);
    }

    const source = read("components/ui/Avatar.tsx");
    expect(source).not.toContain("rounded-full");
    expect(source).not.toContain("object-cover");
    expect(source).not.toContain("AVATAR_SIZE");
    expect(Number(avatar.getAttribute("width")) / Number(avatar.getAttribute("height"))).toBeCloseTo(2 / 3, 5);

    expect(read("components/ui/ide-card-constants.ts")).toContain("IDE_STATUS");
    expect(read("components/ui/IdeCard.tsx")).toContain("ide-card-constants");
  });

  it("muestra chrome, flujo de código real y barra de estado sin datos de Stitch", () => {
    const { container } = render(<Hero />);

    expect(container.querySelectorAll("[data-ide-chrome-dot]")).toHaveLength(3);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("0 errors · 0 warnings")).toBeInTheDocument();

    const code = container.querySelector<HTMLElement>("[data-ide-code]");
    expect(code).toBeInTheDocument();
    expect(code).toHaveTextContent(profile.identity.handle);
    expect(code).toHaveTextContent(profile.identity.roles[1]);
    for (const technology of profile.stack.slice(0, 4)) {
      expect(code).toHaveTextContent(technology);
    }
    for (const fake of [
      "Full Stack & Interface Eng",
      "99/100 Core Web Vitals",
      "WCAG AA+",
      "Shipping reliable features",
      "googleusercontent.com",
    ]) {
      expect(code?.textContent ?? "", fake).not.toContain(fake);
    }
  });

  it("usa solo el avatar local, el chrome aprobado y ningún icono remoto", () => {
    const { container } = render(<Hero />);

    const dots = Array.from(container.querySelectorAll<HTMLElement>("[data-ide-chrome-dot]"));
    expect(dots.map((dot) => dot.className)).toEqual([
      expect.stringContaining("bg-warm-strong"),
      expect.stringContaining("bg-secondary"),
      expect.stringContaining("bg-primary"),
    ]);

    const avatar = screen.getByRole("img", { name: "Retrato de Ignacio Navarria" });
    expect(avatar).toHaveAttribute("src", "/assets/images/avatar.png");
    expect(container.innerHTML).not.toMatch(/googleusercontent|material-symbols|(?:src|href)="https?:\/\//i);
    expect(read("components/ui/IdeCard.tsx")).not.toContain("material-symbols-outlined");
  });
});

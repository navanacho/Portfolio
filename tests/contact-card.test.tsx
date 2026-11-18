import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Contact } from "@/components/sections/Contact";
import { profile } from "@/data/profile";

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "--font-plus-jakarta-sans", className: "font-jakarta" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains-mono", className: "font-mono" }),
}));

vi.mock("motion/react", async () => {
  const React = await import("react");
  const MotionDiv = React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) =>
    React.createElement("div", { ...props, ref }, props.children as React.ReactNode),
  );
  MotionDiv.displayName = "MotionDiv";
  return { motion: { div: MotionDiv }, useReducedMotion: () => false };
});

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("contacto real", () => {
  it("usa una tarjeta 5/7 con copia de correo, CV y píldoras de GitHub y LinkedIn", () => {
    const { container } = render(<Contact />);

    const card = container.querySelector<HTMLElement>("[data-card]");
    expect(card?.className).toContain("lg:grid-cols-12");
    expect(card?.querySelector(".lg\\:col-span-5")).toBeInTheDocument();
    expect(card?.querySelector(".lg\\:col-span-7")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: `Copiar correo ${profile.contact.email}` })).toBeInTheDocument();
    for (const name of [
      "GitHub de Ignacio Navarria",
      "LinkedIn de Ignacio Navarria",
      "Descargar CV de Ignacio Navarria",
    ]) {
      const cta = screen.getByRole("link", { name });
      expect(cta).toBeInTheDocument();
      expect(cta.className).toContain("border-warm-strong/50");
      expect(cta.className).toContain("bg-warm/10");
      expect(cta.className).toContain("text-warm");
    }
  });

  it("anuncia el resultado de copiar y usa un fallback cuando Clipboard API falla", async () => {
    const label = `Copiar correo ${profile.contact.email}`;
    const success = "Correo copiado al portapapeles";

    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const apiView = render(<Contact />);
    fireEvent.click(within(apiView.container).getByRole("button", { name: label }));
    expect(writeText).toHaveBeenCalledWith(profile.contact.email);
    await waitFor(() => expect(within(apiView.container).getByRole("status")).toHaveTextContent(success));

    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    document.execCommand = execCommand;
    const fallbackView = render(<Contact />);
    fireEvent.click(within(fallbackView.container).getByRole("button", { name: label }));
    await waitFor(() => expect(execCommand).toHaveBeenCalledWith("copy"));
    expect(within(fallbackView.container).getByRole("status")).toHaveTextContent(success);

    document.execCommand = vi.fn().mockReturnValue(false);
    const failureView = render(<Contact />);
    fireEvent.click(within(failureView.container).getByRole("button", { name: label }));
    await waitFor(() =>
      expect(within(failureView.container).getByRole("status")).toHaveTextContent("No se pudo copiar el correo"),
    );
  });

  it("solo expone datos confirmados y ningún formulario ficticio", () => {
    const { container } = render(<Contact />);
    const source = read("components/sections/Contact.tsx");

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector("input")).not.toBeInTheDocument();
    expect(container.querySelector("textarea")).not.toBeInTheDocument();
    expect(source).toContain('from "@/components/ui/CTAButton"');
    expect(source).toContain('from "@/components/ui/CopyEmailButton"');
    expect(document.body.textContent ?? "").not.toContain("Mensaje enviado");
    for (const fake of ["ignacio.dev@navanacho.com", "+54", "tel:", "Velco"]) {
      expect(source, fake).not.toContain(fake);
      expect(container.innerHTML, fake).not.toContain(fake);
    }
    expect(screen.getByRole("link", { name: "Correo de Ignacio Navarria" })).toHaveAttribute(
      "href",
      `mailto:${profile.contact.email}`,
    );
    const cv = screen.getByRole("link", { name: "Descargar CV de Ignacio Navarria" });
    expect(cv).toHaveAttribute("href", profile.contact.cv);
    expect(cv).toHaveAttribute("target", "_blank");
    expect(cv).toHaveAttribute("rel", "noopener noreferrer");
  });
});

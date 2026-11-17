import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import Home from "@/app/page";
import { Contact } from "@/components/sections/Contact";

describe("contacto público", () => {
  it("muestra el correo como texto y genera un mailto con enlaces externos seguros", () => {
    render(<Contact />);

    const email = screen.getByRole("link", { name: "Correo de Ignacio Navarria" });
    expect(email).toHaveAttribute("href", "mailto:navarria332@gmail.com");
    expect(email).toHaveTextContent("navarria332@gmail.com");

    const github = screen.getByRole("link", { name: "GitHub de Ignacio Navarria" });
    expect(github).toHaveAttribute("href", "https://github.com/navanacho");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");

    const linkedin = screen.getByRole("link", { name: "LinkedIn de Ignacio Navarria" });
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/ignacio-navarria-151787450");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");

    expect(document.body.innerHTML).not.toMatch(/tel:|\+54/);
  });

  it("ofrece CV canónico y copia del correo con feedback accesible, sin controles muertos", async () => {
    const writeText = vi.fn<(value: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(<Contact />);

    const cv = screen.getByRole("link", { name: "Descargar CV de Ignacio Navarria" });
    expect(cv).toHaveAttribute("href", "assets/CV/CV-Ignacio-Navarria.pdf");

    const copyButton = screen.getByRole("button", { name: "Copiar correo navarria332@gmail.com" });
    fireEvent.click(copyButton);

    await waitFor(() => expect(writeText).toHaveBeenCalledWith("navarria332@gmail.com"));
    expect(screen.getByRole("status")).toHaveTextContent("Correo copiado al portapapeles");

    for (const button of screen.getAllByRole("button")) {
      expect(button).toBeEnabled();
    }
    expect(document.body.innerHTML).not.toMatch(/tel:|\+54/);
  });

  it("ya incluye correo, perfiles y CV en el HTML del servidor, sin JavaScript", () => {
    const html: string = renderToStaticMarkup(createElement(Contact));

    expect(html).toContain('href="mailto:navarria332@gmail.com"');
    expect(html).toContain('href="https://github.com/navanacho"');
    expect(html).toContain('href="https://www.linkedin.com/in/ignacio-navarria-151787450"');
    expect(html).toContain('href="assets/CV/CV-Ignacio-Navarria.pdf"');
    expect(html).not.toMatch(/<script|tel:|\+54/);
  });

  it("compone el contacto en la página raíz con todos los enlaces en el HTML inicial", () => {
    const html: string = renderToStaticMarkup(createElement(Home));

    expect(html).toContain('id="contacto"');
    expect(html).toContain('href="mailto:navarria332@gmail.com"');
    expect(html).toContain('href="https://github.com/navanacho"');
    expect(html).toContain('href="https://www.linkedin.com/in/ignacio-navarria-151787450"');
    expect(html).toContain('href="assets/CV/CV-Ignacio-Navarria.pdf"');
    expect(html).not.toMatch(/tel:|\+54/);
  });
});

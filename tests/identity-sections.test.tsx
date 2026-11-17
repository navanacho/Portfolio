import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";

const VERBATIM_BIO = "Soy Ignacio Navarria, un desarrollador apasionado por la creación de software funcional y estéticamente atractivo. Busco combinar diseño, rendimiento y escalabilidad en cada proyecto que desarrollo. Me motiva la mejora continua, el trabajo en equipo y los nuevos desafíos tecnológicos.";

describe("sección Sobre mí", () => {
  it("muestra la bio exacta, carácter por carácter, bajo un encabezado descriptivo", () => {
    render(<About />);

    expect(screen.getByRole("heading", { level: 2, name: "Sobre mí" })).toBeInTheDocument();
    expect(screen.getByText(VERBATIM_BIO)).toHaveTextContent(VERBATIM_BIO);
  });
});

describe("secciones de identidad profesional", () => {
  it("lista el stack y las herramientas confirmados, sin entradas inventadas", () => {
    render(<Skills />);

    const technologies = within(screen.getByRole("list", { name: "Tecnologías" })).getAllByRole("listitem");
    const tools = within(screen.getByRole("list", { name: "Herramientas" })).getAllByRole("listitem");

    expect(technologies.map((item) => item.textContent)).toEqual([
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Java",
      "TypeScript",
      "Python",
      "Spring",
    ]);
    expect(tools.map((item) => item.textContent)).toEqual([
      "VS Code",
      "IntelliJ",
      "Git",
      "GitHub",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "Postman",
    ]);
  });

  it("muestra experiencia y educación reales con encabezados anclables", () => {
    render(
      <>
        <Experience />
        <Education />
      </>,
    );

    const headings = [
      ["Experiencia", "experiencia"],
      ["Educación", "educacion"],
    ];
    for (const [title, anchor] of headings) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toHaveAttribute("id", anchor);
    }
    expect(screen.getByText("2023-actualidad Desarrollador Freelance Full Stack (Java/SQL)")).toBeInTheDocument();
    expect(screen.getByText("2020-2023 Cajero Mayorista-Minorista, Mayorista Oscar David")).toBeInTheDocument();
    expect(screen.getByText("Tecnicatura en Programación - UTN")).toBeInTheDocument();
    expect(screen.getByText("Finalizada en 2026")).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/Actualidad en la UTN|Estudiante/);
  });
});

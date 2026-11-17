import { describe, expect, it } from "vitest";

import { profile } from "@/data/profile";

const VERBATIM_BIO = "Soy Ignacio Navarria, un desarrollador apasionado por la creación de software funcional y estéticamente atractivo. Busco combinar diseño, rendimiento y escalabilidad en cada proyecto que desarrollo. Me motiva la mejora continua, el trabajo en equipo y los nuevos desafíos tecnológicos.";

describe("data/profile: identidad y bio", () => {
  it("publica nombre, handle, roles y bio exacta sin reescrituras", () => {
    expect(profile.identity.name).toBe("Ignacio Navarria");
    expect(profile.identity.handle).toBe("navanacho");
    expect(profile.identity.roles).toEqual([
      "Desarrollador Full Stack | Apasionado por la tecnología y el diseño funcional",
      "Software Developer & Data Analyst",
    ]);
    expect(profile.bio).toBe(VERBATIM_BIO);
  });
});

describe("data/profile: trayectoria y canales confirmados", () => {
  it("registra la experiencia real con sus períodos", () => {
    expect(profile.experience).toEqual([
      { period: "2023-actualidad", role: "Desarrollador Freelance Full Stack (Java/SQL)" },
      { period: "2020-2023", role: "Cajero Mayorista-Minorista, Mayorista Oscar David" },
    ]);
  });

  it("marca la Tecnicatura de UTN como finalizada en 2026, sin texto obsoleto", () => {
    expect(profile.education[0]).toEqual({
      period: "2026",
      title: "Tecnicatura en Programación - UTN",
      status: "Finalizada en 2026",
    });
    expect(profile.education.map((entry) => entry.title)).toEqual([
      "Tecnicatura en Programación - UTN",
      "Auxiliar y Cajero Bancario - Instituto La Bancaria",
      "Bachillerato en Economía y Administración",
    ]);
    expect(JSON.stringify(profile.education)).not.toMatch(/Actualidad|Estudiante/i);
  });

  it("publica solo los canales confirmados y sin teléfono", () => {
    expect(profile.contact).toEqual({
      email: "navarria332@gmail.com",
      github: "https://github.com/navanacho",
      linkedin: "https://www.linkedin.com/in/ignacio-navarria-151787450",
      cv: "assets/CV/CV-Ignacio-Navarria.pdf",
    });
    expect(JSON.stringify(profile)).not.toMatch(/tel:|\+54/i);
  });

  it("lista exactamente el stack y las herramientas confirmadas", () => {
    expect(profile.stack).toEqual(["HTML5", "CSS3", "JavaScript", "React", "Java", "TypeScript", "Python", "Spring"]);
    expect(profile.tools).toEqual(["VS Code", "IntelliJ", "Git", "GitHub", "Docker", "PostgreSQL", "MongoDB", "Postman"]);
  });
});

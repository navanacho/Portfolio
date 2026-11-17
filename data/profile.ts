import type { Profile } from "@/types/content";

export const profile: Profile = {
  identity: {
    name: "Ignacio Navarria",
    handle: "navanacho",
    roles: [
      "Desarrollador Full Stack | Apasionado por la tecnología y el diseño funcional",
      "Software Developer & Data Analyst",
    ],
  },
  bio: "Soy Ignacio Navarria, un desarrollador apasionado por la creación de software funcional y estéticamente atractivo. Busco combinar diseño, rendimiento y escalabilidad en cada proyecto que desarrollo. Me motiva la mejora continua, el trabajo en equipo y los nuevos desafíos tecnológicos.",
  contact: {
    email: "navarria332@gmail.com",
    github: "https://github.com/navanacho",
    linkedin: "https://www.linkedin.com/in/ignacio-navarria-151787450",
    cv: "assets/CV/CV-Ignacio-Navarria.pdf",
  },
  experience: [
    { period: "2023-actualidad", role: "Desarrollador Freelance Full Stack (Java/SQL)" },
    { period: "2020-2023", role: "Cajero Mayorista-Minorista, Mayorista Oscar David" },
  ],
  education: [
    { period: "2026", title: "Tecnicatura en Programación - UTN", status: "Finalizada en 2026" },
    { period: "2019-2020", title: "Auxiliar y Cajero Bancario - Instituto La Bancaria" },
    { period: "2014-2018", title: "Bachillerato en Economía y Administración" },
  ],
  stack: ["HTML5", "CSS3", "JavaScript", "React", "Java", "TypeScript", "Python", "Spring"],
  tools: ["VS Code", "IntelliJ", "Git", "GitHub", "Docker", "PostgreSQL", "MongoDB", "Postman"],
};

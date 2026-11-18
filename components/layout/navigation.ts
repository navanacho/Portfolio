export interface NavSection {
  readonly label: string;
  readonly href: string;
}

export const NAV_SECTIONS: readonly NavSection[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Tech Stack", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Trayectoria", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

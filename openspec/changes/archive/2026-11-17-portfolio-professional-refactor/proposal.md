## Why

El portafolio actual es un sitio estático sin tipado, sin tests y con defectos latentes (ruta `assest/`, botón de contacto inactivo, tarjetas invisibles sin JS, CV inalcanzable, falta de metadatos) que no transmiten el nivel técnico de Ignacio Navarria. La tesis de grado ya finalizada necesita una vitrina profesional y verificable, y el stack objetivo (Next.js App Router + TypeScript estricto + Tailwind + Framer Motion + Lucide React) permite construirla con acceso, rendimiento y mantenibilidad desde el primer día.

## What Changes

- **BREAKING** Reconstrucción completa desde cero: `index.html`, `style.css` y `main.js` se sustituyen por una aplicación Next.js App Router con TypeScript estricto; no se conserva el pipeline estático actual.
- Incorporar un sistema de diseño oscuro con tokens exactos, tipografía cargada con `next/font`, superficies con borde y `backdrop-blur-md`, y movimiento (entrada escalonada del hero, revelados por scroll, spotlight en hover, navbar flotante con indicador de sección activa).
- Centralizar los datos reales en `data/`: identidad, bio textual exacta, experiencia, educación (UTN finalizada en 2026), stack, herramientas y CV.
- Publicar contacto funcional: correo visible `navarria332@gmail.com` como único contacto público, GitHub, LinkedIn y enlace al CV; sin teléfono, botones muertos ni ramas inalcanzables.
- Mostrar **únicamente** el proyecto de tesis "Tesis de Grado — Orquestación de Honeypots Research con n8n", con tarjeta, enlace al repositorio confirmado, modal expandible del flujo de arquitectura y crédito a "Ignacio Navarria" y "Germán Marino" según el README.
- Añadir metadatos relativos y Open Graph, landmarks semánticos, foco visible, manejo de foco en modal, `aria-label`s y respeto a `prefers-reduced-motion`.
- Corregir la ruta canónica `assets/` y el case mismatch de `AVATAR.png`/`avatar.png` durante la migración, publicando el CV nuevo en `assets/CV/CV-Ignacio-Navarria.pdf` y conservando `assest/` solo hasta la verificación final.
- Instalar un runner de pruebas y exigir evidencia ejecutada de RED → GREEN → TRIANGULATE → REFACTOR para cada comportamiento; sin builds ni installs en la fase de propuesta.

**Alcance explícito:** Velco queda FUERA. No se inventan proyectos, enlaces, métricas ni cifras de la tesis.

## Capabilities

### New Capabilities

- `portfolio-shell`: estructura App Router, layout raíz, navbar flotante con sección activa, footer, metadatos/OG y comportamiento responsive.
- `visual-design-system`: tokens de color y tipografía exactos, superficies, iconografía Lucide y primitivas de movimiento con fallback de movimiento reducido.
- `identity-and-career`: fuente única de datos reales (bio verbatim, identidad, experiencia, educación actualizada, stack y herramientas) y su renderizado.
- `contact-actions`: acciones de contacto verificables (mailto, enlaces externos y CV) sin controles inactivos ni teléfono publicado.
- `thesis-project-showcase`: único proyecto en alcance, tarjeta, enlace al repositorio y modal expandible con el flujo de arquitectura verificado.
- `accessible-interactions`: navegación por teclado, foco, landmarks, etiquetas ARIA y reducción de movimiento.
- `performance-and-quality-gates`: Core Web Vitals, carga de fuentes/imágenes y disciplina TDD con evidencia ejecutada.

### Modified Capabilities

Ninguna. No existe `openspec/specs/` previo en este repositorio.

## Impact

- Código: se retiran `index.html`, `style.css` y `main.js`; se crean `app/`, `components/{layout,sections,ui,background}/`, `data/` y `tests/`.
- Assets: migración a `assets/` con nombre de archivo de avatar normalizado; el CV nuevo se copia desde `C:\Users\navar\Downloads\CV - Ignacio Navarria - Software Engineer & Data Analyst (General).pdf` y se publica solo en `assets/CV/CV-Ignacio-Navarria.pdf`. `assest/CV/CV2.0.pdf` queda como fuente legada, sin enlace público, y `assest/` se elimina tras la verificación final.
- Dependencias nuevas: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest + Testing Library + jsdom + axe (a elegir en design.md).
- Enlaces: GitHub, LinkedIn y correo confirmados; teléfono no publicado; repositorio de tesis confirmado: https://github.com/germarino18/Automatizacion_con_Honeypots_Tesis.git ; autores de la tesis: "Ignacio Navarria" y "Germán Marino".
- Sin API de aplicación, sin backend nuevo y sin despliegue en esta propuesta. No se configura dominio de producción, `metadataBase` ni URLs absolutas de OG: los metadatos son relativos y el dominio queda como configuración futura explícita.

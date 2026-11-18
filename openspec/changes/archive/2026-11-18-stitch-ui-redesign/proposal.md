## Why

El portafolio ya está reconstruido y publicado (Next.js 16.4.6 App Router, React 19, TypeScript estricto, Tailwind v4, `motion@14.14.0`, Lucide y Vitest con 47 pruebas), pero la paleta aprobada es casi invisible: el contraste entre `#1C2541` y `#0B132B` es insuficiente y los estados de interacción solo están implementados en la tarjeta de la tesis. El prototipo subido de Stitch aporta una estructura visual más rica (cabecera translúcida, IDE card, grids de 12 columnas, fondo ambiental y tarjetas con hover), pero usa una paleta distinta y contenido inventado que NO debe adoptarse.

## What Changes

- Reestructurar el layout en un contenedor central de 1200 px con escala de espaciado y grids responsivos de 12 columnas, siguiendo la composición del prototipo sin copiar sus colores.
- Rediseñar cabecera, navegación y footer: cabecera fija translúcida de `h-20`, logo `<navanacho/>`, nav central `rounded-full` con píldora activa, píldora de disponibilidad, CTA de CV e icono de persona con nombre accesible.
- Incorporar fondo ambiental: patrón de grilla con máscara radial, tres blobs difuminados en movimiento lento y un canvas de constelaciones reactivo al cursor, con interrupción total bajo `prefers-reduced-motion: reduce` y montaje solo en cliente.
- Reemplazar los revelados por `IntersectionObserver` del prototipo por el componente existente basado en `whileInView` de `motion`.
- Generalizar el sistema de tarjetas y hover (`hover:-translate-y-1.5`, cambio de borde, escala de iconos y CTA) a TODAS las tarjetas, no solo a la de la tesis.
- Reubicar el avatar real del usuario en la fila de perfil de la IDE card, sin círculo, marco ni recorte, con proporción natural 2:3 y `object-contain`; actualizar la prueba de rendimiento que hoy exige 96×96.
- Aplicar el tratamiento de tarjetas del prototipo a la única tarjeta real (la tesis finalizada), conservando autores, modal de arquitectura y repositorio confirmado; NO incorporar los tres proyectos ficticios de Stitch.
- Convertir la sección de contacto en una tarjeta de dos columnas con copiar correo, descarga de CV y píldoras de GitHub/LinkedIn reales; eliminar el formulario falso y cualquier mensaje de «mensaje enviado».
- Cambiar la tipografía de interfaz a Plus Jakarta Sans (ya sancionada en la configuración) y mantener JetBrains Mono para código y stack.
- Sincronizar `openspec/config.yaml` y los documentos de `openspec/specs/` que todavía describen la paleta antigua (`#0A0F1C`, `#00F5D4`, `#8B5CF6`).
- No se identifican cambios **BREAKING** en contratos públicos: no cambian rutas, datos, enlaces ni la API de los componentes; los cambios son visuales y de estructura de marcado.

## Capabilities

### New Capabilities
- `stitch-visual-system`: contenedor, escala de espaciado, grids responsivos, sistema de tarjetas y hover, fondo ambiental, jerarquía tipográfica y revelados al scroll del rediseño.

### Modified Capabilities
- `portfolio-shell`: cabecera fija translúcida, nav central con píldora activa, CTA de CV, icono de persona y footer de banda oscura con iconos reales.
- `visual-design-system`: paleta aprobada `#0B132B`/`#1C2541`/`#3A506B`/`#5BC0DE`/`#F4D6B0`/`#D97706`, contraste visible sin alterar los hex, tipografía UI Plus Jakarta Sans y movimiento generalizado.
- `thesis-project-showcase`: IDE card del hero con avatar sin marco ni recorte, tratamiento de grilla de la tarjeta de la tesis y preservación de autores y modal.
- `accessible-interactions`: foco y orden de la nueva cabecera, nombre accesible de iconos, texto alternativo del avatar y degradación de canvas, blobs, hover y revelados.
- `contact-actions`: copiar correo con confirmación real, CV en cabecera y tarjeta de contacto, píldoras sociales confirmadas y ausencia de formulario ficticio.

## Impact

- **Código**: `app/globals.css`, `app/fonts.ts`, `app/layout.tsx`, `components/layout/{Navbar,Footer}.tsx`, `components/ui/{Avatar,Card,CTAButton,IconBadge,Reveal,ProjectCard}.tsx`, `components/sections/{Hero,About,Skills,Projects,Contact}.tsx`; nueva carpeta `components/background/` para el fondo ambiental.
- **Datos**: `data/profile.ts` y `data/projects.ts` siguen siendo la única fuente; no se añaden proyectos, métricas ni contactos.
- **Pruebas**: `tests/performance.test.tsx` (deja de exigir 96×96), más nuevos archivos de comportamiento para layout, fondo, hover, IDE card, contacto y accesibilidad; evidencia en `tests/evidence/`.
- **Documentación**: `openspec/config.yaml` y `openspec/specs/visual-design-system/spec.md` se sincronizan durante la implementación para eliminar la paleta obsoleta.
- **Dependencias**: no se instalan nuevas; se reutilizan `motion`, `lucide-react`, Tailwind v4 y Vitest. Se mantiene la disciplina TDD estricta y no se ejecuta compilación de producción.

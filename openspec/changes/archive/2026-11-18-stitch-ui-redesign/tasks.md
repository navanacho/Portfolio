# Tareas: stitch-ui-redesign

## 0. Red de seguridad (antes de cualquier cambio)
- [x] 0.1 Ejecutar `npm test` y guardar la salida con las 47 pruebas verdes en `tests/evidence/baseline-tests.txt`.
- [x] 0.2 Ejecutar `npm run typecheck` y guardar la salida sin errores en `tests/evidence/baseline-typecheck.txt`.
- [x] 0.3 Ejecutar `npm run lint` y guardar la salida sin errores en `tests/evidence/baseline-lint.txt`.
- [x] 0.4 Verificar con `git status --short` que el único cambio previo es el directorio `openspec/changes/stitch-ui-redesign/`; no instalar dependencias ni ejecutar compilación de producción.

## 1. Sincronización de la paleta en documentación activa
- [x] 1.1 RED: crear `tests/stale-tokens.test.ts` que falle al encontrar `#0A0F1C`, `#00F5D4` o `#8B5CF6` en `openspec/config.yaml` y en `openspec/specs/visual-design-system/spec.md`; guardar `tests/evidence/docs-tokens-red.txt`.
- [x] 1.2 GREEN: reemplazar en esos dos archivos la paleta obsoleta por `#0B132B`, `#1C2541`, `#3A506B`, `#5BC0DE`, `#F4D6B0`, `#D97706` y la tipografía Plus Jakarta Sans; guardar `tests/evidence/docs-tokens-green.txt`.
- [x] 1.3 TRIANGULATE: ampliar la prueba a todos los archivos bajo `openspec/specs/` y confirmar que ninguno usa tokens de Stitch; guardar `tests/evidence/docs-tokens-triangulate.txt`.
- [x] 1.4 REFACTOR: extraer la lista de tokens obsoletos a una constante reutilizable en la prueba y verificar que la salida sigue verde; guardar `tests/evidence/docs-tokens-refactor.txt`.

## 2. Contenedor, espaciado y grids (stitch-visual-system)
- [x] 2.1 RED: crear `tests/layout-spacing.test.tsx` exigiendo contenedor `max-w-[1200px]`, padding 2rem/1.25rem, gutter 1.5rem y grids 12/7-5/4/3; guardar `tests/evidence/layout-red.txt`.
- [x] 2.2 GREEN: implementar el contenedor y las cuadrículas en `app/layout.tsx` y las secciones, usando clases de Tailwind v4; guardar `tests/evidence/layout-green.txt`.
- [x] 2.3 TRIANGULATE: verificar bloques de 375 px, tablet y escritorio sin desbordamiento horizontal; guardar `tests/evidence/layout-triangulate.txt`.
- [x] 2.4 REFACTOR: centralizar margin, gutter y `space-*` como variables en `app/globals.css` y comprobar que las pruebas siguen verdes; guardar `tests/evidence/layout-refactor.txt`.

## 3. Fondo ambiental y canvas de constelaciones
- [x] 3.1 RED: crear `tests/ambient-background.test.tsx` exigiendo grilla con máscara radial, tres blobs y canvas cliente sin acceso a `window` en servidor; guardar `tests/evidence/ambient-red.txt`.
- [x] 3.2 GREEN: crear `components/background/GridBackdrop.tsx`, `AmbientBlobs.tsx` y `ParticleConstellation.tsx`, montando el canvas solo en `useEffect`; guardar `tests/evidence/ambient-green.txt`.
- [x] 3.3 TRIANGULATE: verificar reacción al cursor, líneas de conexión, límite de partículas y pausa con pestaña oculta; guardar `tests/evidence/ambient-triangulate.txt`.
- [x] 3.4 REFACTOR: extraer la configuración del canvas a constantes y documentar el fallback CSS-only; guardar `tests/evidence/ambient-refactor.txt`.

## 4. Tarjetas, hover, tipografía y revelados
- [x] 4.1 RED: crear `tests/card-system.test.tsx` exigiendo `hover:-translate-y-1.5`, cambio de borde, escala de iconos y CTA en todas las tarjetas, Plus Jakarta Sans y revelados `whileInView`; guardar `tests/evidence/cards-red.txt`.
- [x] 4.2 GREEN: actualizar `Card`, `CTAButton`, `IconBadge`, `Reveal`, `app/fonts.ts` y `app/globals.css`; guardar `tests/evidence/cards-green.txt`.
- [x] 4.3 TRIANGULATE: cubrir competencias, stack, proyectos, timeline y contacto, además del estado con movimiento reducido; guardar `tests/evidence/cards-triangulate.txt`.
- [x] 4.4 REFACTOR: unificar variantes de hover en un único helper y verificar que no queden estilos de Stitch; guardar `tests/evidence/cards-refactor.txt`.

## 5. Cabecera, navegación y footer (portfolio-shell)
- [x] 5.1 RED: crear `tests/shell-redesign.test.tsx` exigiendo cabecera `h-20` translúcida, logo `<navanacho/>`, nav `rounded-full` con píldora activa, píldora de disponibilidad, CTA de CV e icono de persona; guardar `tests/evidence/shell-red.txt`.
- [x] 5.2 GREEN: reestructurar `components/layout/Navbar.tsx` y `Footer.tsx` con las secciones Inicio, Sobre mí, Tech Stack, Proyectos, Trayectoria y Contacto; guardar `tests/evidence/shell-green.txt`.
- [x] 5.3 TRIANGULATE: verificar `aria-current`, recorrido por teclado, ausencia de `href="#"` y footer con solo tres enlaces reales; guardar `tests/evidence/shell-triangulate.txt`.
- [x] 5.4 REFACTOR: extraer la lista de secciones a una constante tipada sin moverla a `data/`; guardar `tests/evidence/shell-refactor.txt`.

## 6. Tarjeta IDE y avatar sin marco
- [x] 6.1 RED: actualizar `tests/performance.test.tsx` para que deje de exigir `width="96"` y `height="96"` y exija `1024`, `1536` y `object-contain`; crear `tests/ide-card.test.tsx` para la tarjeta IDE; guardar `tests/evidence/ide-avatar-red.txt`.
- [x] 6.2 GREEN: quitar de `components/ui/Avatar.tsx` `rounded-full`, `border`, `object-cover`, `w-24`, `h-24` y el tamaño forzado; construir la tarjeta IDE en el hero en la fila exacta de perfil; guardar `tests/evidence/ide-avatar-green.txt`.
- [x] 6.3 TRIANGULATE: verificar chrome, `ignacio.bio.ts`, flujo de código solo con datos reales, barra `0 errors · 0 warnings` y `alt="Retrato de Ignacio Navarria"`; guardar `tests/evidence/ide-avatar-triangulate.txt`.
- [x] 6.4 REFACTOR: extraer las constantes de la tarjeta y confirmar que el avatar mantiene su proporción 2:3 sin recorte; guardar `tests/evidence/ide-avatar-refactor.txt`.

## 7. Grilla de proyectos preservando la tesis
- [x] 7.1 RED: crear `tests/projects-grid.test.tsx` exigiendo una sola tarjeta con preview, píldora de estado, descripción acotada, tags y enlace al repositorio; guardar `tests/evidence/projects-red.txt`.
- [x] 7.2 GREEN: adaptar `ProjectCard` y `Projects` al tratamiento visual sin imágenes remotas; guardar `tests/evidence/projects-green.txt`.
- [x] 7.3 TRIANGULATE: confirmar autores «Ignacio Navarria» y «Germán Marino», modal de arquitectura, foco devuelto y ausencia de los tres proyectos de Stitch; guardar `tests/evidence/projects-triangulate.txt`.
- [x] 7.4 REFACTOR: reutilizar el sistema de tarjetas de la tarea 4 sin duplicar estilos; guardar `tests/evidence/projects-refactor.txt`.

## 8. Contacto real sin formulario ficticio
- [x] 8.1 RED: crear `tests/contact-card.test.tsx` exigiendo tarjeta 5/7, copiar correo, CV y píldoras GitHub/LinkedIn, y prohibiendo `form`, `input`, `textarea` y «Mensaje enviado»; guardar `tests/evidence/contact-red.txt`.
- [x] 8.2 GREEN: reemplazar el bloque derecho en `components/sections/Contact.tsx` por las acciones reales; guardar `tests/evidence/contact-green.txt`.
- [x] 8.3 TRIANGULATE: verificar `mailto:`, destino del CV, feedback anunciado, fallback de portapapeles y ausencia de `ignacio.dev@navanacho.com`; guardar `tests/evidence/contact-triangulate.txt`.
- [x] 8.4 REFACTOR: reutilizar `CTAButton` y `CopyEmailButton` con el acento cálido `#D97706`; guardar `tests/evidence/contact-refactor.txt`.

## 9. Accesibilidad y movimiento reducido integral
- [x] 9.1 RED: crear `tests/reduced-motion.test.tsx` exigiendo interrupción del canvas, blobs quietos y hover sin `translateY`; guardar `tests/evidence/a11y-red.txt`.
- [x] 9.2 GREEN: aplicar `MotionConfig reducedMotion="user"` y la regla global de `globals.css` a los nuevos componentes; guardar `tests/evidence/a11y-green.txt`.
- [x] 9.3 TRIANGULATE: ejecutar axe sobre la página renderizada y verificar nombres accesibles, `focus-visible` y orden de foco; guardar `tests/evidence/a11y-triangulate.txt`.
- [x] 9.4 REFACTOR: consolidar los selectores de movimiento reducido y comprobar que el modal sigue operable; guardar `tests/evidence/a11y-refactor.txt`.

## 10. Verificación final y preparación de archivo
- [x] 10.1 Ejecutar `npm test` y confirmar que todas las pruebas están verdes, con al menos las 47 originales; guardar `tests/evidence/final-tests.txt`.
- [x] 10.2 Ejecutar `npm run typecheck` y `npm run lint`; guardar `tests/evidence/final-typecheck.txt` y `tests/evidence/final-lint.txt`.
- [x] 10.3 Ejecutar `openspec validate stitch-ui-redesign --strict --no-interactive` y `openspec validate --all --strict`; corregir cualquier error; guardar `tests/evidence/final-validate.txt`.
- [x] 10.4 Ejecutar `openspec status --change stitch-ui-redesign --json` y confirmar `isComplete: true` con `applyRequires` satisfecho; guardar `tests/evidence/final-status.json`.
- [x] 10.5 Preparar el change para archivo: revisar el diff completo, confirmar que no hay teléfono, proyectos inventados, `metadataBase`, URLs absolutas ni dependencias nuevas, y dejar `openspec archive stitch-ui-redesign --yes` pendiente para una sesión posterior; sin commits ni compilación de producción.

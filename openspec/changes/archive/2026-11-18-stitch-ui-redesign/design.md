## Context

El repositorio `Portfolio` tiene una única ruta pública `/` construida con Next.js 16.4.6 App Router, React 19, TypeScript estricto, Tailwind v4, `motion@14.14.0` (importado desde `motion/react`), Lucide y Vitest (47 pruebas). El change `portfolio-professional-refactor` fue archivado el 2026-11-17 y pusheado. La paleta aprobada ya está en `app/globals.css` bajo `@theme`, pero el contraste medido entre `--color-surface` (`#1C2541`) y `--color-background` (`#0B132B`) es de aproximadamente 1,22:1, por lo que las tarjetas no se distinguen; además, el efecto hover solo existe en `ProjectCard`.

El usuario subió `stitch_modern_developer_portfolio_redesign/code.html` (938 líneas) como referencia visual. Es un prototipo de un solo archivo con Tailwind CDN, fuentes remotas y tres proyectos inventados. Se adopta su **estructura y sistema de tarjetas**, NO sus valores de color, NO sus imágenes remotas y NO su contenido. La UI sigue en español y los datos reales provienen de `data/profile.ts` y `data/projects.ts`.

Restricciones vigentes: TDD estricto con evidencia RED → GREEN → TRIANGULATE → REFACTOR, sin compilación de producción, sin commits, sin instalar dependencias, sin `metadataBase`, sin dominio absoluto, sin teléfono, sin métricas inventadas y sin formulario de contacto falso.

## Goals / Non-Goals

**Goals:**
- Hacer visible la paleta aprobada mediante contraste, transparencia, bordes, sombras y glows, sin modificar ni un solo hex aprobado.
- Replicar la arquitectura visual de Stitch: cabecera/footer, hero 7/5 con IDE card, sobre mí 7/5, tech stack 4 columnas, proyectos en grilla, trayectoria en timeline y contacto 5/7.
- Colocar el avatar real (1024×1536, proporción 2:3) en la fila de perfil de la IDE card, visible de forma completa, flotante, sin círculo, marco ni recorte.
- Mantener y generalizar accesibilidad y movimiento reducido a los nuevos componentes.
- Sincronizar la documentación OpenSpec que aún describe la paleta antigua.

**Non-Goals:**
- Adoptar `#1A1F2B`, `#264653`, `#2A9D8F`, `#E9C46A`, `#F4A261`, Inter/Geist Mono o Material Symbols de Stitch.
- Publicar los proyectos ficticios (SaaS Analytics Dashboard, E-Commerce Headless Storefront, Portfolio Personal v2), las cifras `3+`, `18+`, `100%`, `99/100` ni el correo `ignacio.dev@navanacho.com`.
- Añadir Velco, teléfono, dominio de producción, `metadataBase`, OG absoluto o un backend de formulario.
- Instalar dependencias, ejecutar compilación de producción ni hacer commits en este change.

## Decisions

**1. Adaptar estructura, rechazar la paleta de Stitch (con mapeo explícito).** Se toman las composiciones, tarjetas, espaciados e interacciones; se descartan sus tokens cromáticos. Mapeo normativo:

| Stitch | Destino en nuestro sistema | Uso |
| --- | --- | --- |
| `background`/`surface` `#1A1F2B` | `--color-background: #0B132B` | Fondo base de página |
| `surface-card` `#264653` | `--color-surface: #1C2541` | Superficie de tarjetas, con alpha/borde reforzados |
| `primary` `#2A9D8F` | `--color-primary: #5BC0DE` | Acentos, píldora activa, iconos, líneas del canvas |
| `secondary` `#E9C46A` | `--color-warm: #F4D6B0` | Acentos cálidos secundarios |
| `cta` `#F4A261` / `cta-hover` `#ea9550` | `--color-warm-strong: #D97706` / `--color-warm` | CTA principal y su hover |
| secundario estructural `#3A506B` | `--color-secondary: #3A506B` | Bordes, sombras y capas frías |
| `on-surface` `#FAF3E0` / `on-surface-variant` `#d0d9dc` | `--color-text: #F8FAFC` / `--color-text-muted: #94A3B8` | Texto principal y secundario |

Alternativa rechazada: copiar los hex de Stitch «tal cual». Se descarta porque el usuario confirmó la paleta actual y cualquier sustitución rompería la identidad ya aprobada y sincronizada.

**2. Contraste visible sin tocar los hex aprobados.** Dado que `#1C2541` sobre `#0B132B` es casi indistinguible, la visibilidad se construye con: borde `rgba(91,192,222,0.28–0.45)` (derivado de `--color-primary-rgb`), superficie con alpha `0.70–0.85` sobre un gradiente atmosférico, `box-shadow` exterior oscura e interior tenue, glow `rgba(91,192,222,0.12–0.25)` en tarjetas activas y separadores `rgba(58,80,107,0.35)`. El texto usa siempre `#F8FAFC`/`#94A3B8`, nunca tonos de Stitch. Alternativa rechazada: aclarar `--color-surface`; se descarta porque modificaría el token aprobado.

**3. Tipografía: Plus Jakarta Sans + JetBrains Mono vía `next/font`.** `app/fonts.ts` sustituye `Inter` por `PlusJakartaSans` con variable `--font-plus-jakarta-sans`; `--font-ui` apunta a esa variable y `--font-mono` se mantiene en JetBrains Mono. No se usa la CDN de Google ni Material Symbols: los iconos siguen siendo Lucide. Alternativa rechazada: mantener Inter; se descarta porque Plus Jakarta Sans ya está sancionada en `openspec/config.yaml` y responde mejor a la jerarquía del diseño (headline 48/36/24/20 px, body 18/15/13 px, label 12 px, code 13 px).

**4. Fronteras de componentes.** `components/layout/` concentra la estructura persistente (`Navbar` fijo con píldora activa y CTA, `Footer` de banda oscura); `components/sections/` contiene las secciones declarativas del documento (Hero, About, TechStack, Projects, Timeline, Contact); `components/ui/` conserva los primitivos reutilizables y testeables (`Card`, `CTAButton`, `CopyEmailButton`, `IconBadge`, `Avatar`, `Reveal`, `Modal`, `ProjectCard`, `ArchitectureFlow`); `components/background/` agrupa el fondo ambiental (`GridBackdrop`, `AmbientBlobs`, `ParticleConstellation`) como cliente puro y aislado del contenido; `data/` (`profile.ts`, `projects.ts`) y `types/content.ts` permanecen como fuente única de verdad, sin conocimiento de React. Esto permite probar tokens y datos sin renderizado y confinar la hidratación del canvas a un solo componente. Alternativa rechazada: meter el canvas y los blobs dentro de `Hero`, lo que acoplaría el fondo al hero y repetiría lógica en cada sección.

**5. Canvas de constelaciones: implementación con techo estricto y fallback CSS.** Se monta solo en cliente (`useEffect`, o `dynamic(..., { ssr: false })`), con `requestAnimationFrame`, `devicePixelRatio` limitado a 1,5, máximo ~60 partículas, pausa cuando `document.hidden`, `ResizeObserver` para recalcular, y `pointer-events: none` en el contenedor (el canvas no debe capturar foco ni clics; la reacción al cursor se calcula con coordenadas globales). Bajo `prefers-reduced-motion: reduce` NO se monta y se muestra únicamente una grilla estática con blobs quietos. Si la medición muestra coste excesivo, la alternativa es un equivalente CSS-only (grilla + blobs + puntos estáticos con `radial-gradient`), que elimina por completo el bucle de animación a cambio de perder la reacción al cursor; la decisión queda registrada como riesgo mitigable sin cambiar la paleta. El fallback CSS-only queda implementado de forma permanente como `GridBackdrop` + `AmbientBlobs` bajo el canvas: si el contexto 2D no está disponible, el viewport es menor a 640 px o el usuario solicita movimiento reducido, la página conserva la grilla enmascarada y los tres blobs estáticos sin bucle de animación.

**6. Revelados e interacción.** Se descarta el `IntersectionObserver` + clases `.reveal-on-scroll` de Stitch y se usa el `Reveal` existente (`whileInView`, `once: true`, `viewport` con `amount`), ya cubierto por pruebas. El hover generalizado vive en `Card`, `CTAButton`, `IconBadge` y `ProjectCard` con `hover:-translate-y-1.5`, `hover:border-primary/…`, `group-hover:scale-110` en iconos y `hover:scale-105` en CTA; `MotionConfig reducedMotion="user"` y la regla global de `globals.css` los desactivan.

**7. IDE card y avatar.** La columna derecha del hero (5/12) replica la tarjeta IDE: chrome con tres puntos, nombre `ignacio.bio.ts`, fila de perfil, flujo de código y barra de estado `UTF-8 · LF` / `0 errors · 0 warnings`. El flujo de código usa solo datos verificados (handle, rol real, stack real); NO reproduce `Next.js 15` ni `99/100 Core Web Vitals`. El `<img>` remoto de Stitch se sustituye por `Avatar` en esa fila exacta: `object-contain`, proporción natural 2:3, sin `rounded-full`, sin borde, sin `object-cover`, sin `w-24 h-24` forzados y con `alt="Retrato de Ignacio Navarria"`. La prueba de rendimiento que asserta `width="96"` y `height="96"` se actualiza para verificar las dimensiones intrínsecas 1024×1536 y el `object-contain`.

**8. Proyectos y contacto sin ficción.** La grilla `1/md:2/lg:3` aplica el tratamiento visual de Stitch (área de vista previa, píldora de estado, descripción con `line-clamp-3`, tags, enlace al repo) a LA tesis real, sin imágenes remotas: el preview se genera con el propio `ArchitectureFlow` o un bloque tipográfico del stack verificado. Se conservan los autores «Ignacio Navarria» y «Germán Marino» y el modal. En contacto, el bloque derecho (7/12) deja de ser un formulario y pasa a ser contenido real: correo copiable con feedback, descarga de CV y píldoras de GitHub/LinkedIn.

**9. Metadatos.** Se mantiene el `<head>` actual sin `metadataBase`, sin URLs absolutas y con la imagen social relativa existente; el rediseño no introduce dominio ni OG remoto.

## Risks / Trade-offs

- [El contraste implementado con alpha/bordes puede seguir siendo insuficiente en pantallas claras o con `backdrop-filter` desactivado] → Medir con axe y revisión visual; subir el alpha del borde hasta 0.45 y reforzar `box-shadow` sin cambiar los hex.
- [El canvas puede impactar INP o batería en equipos low-end] → Techo de 60 partículas, DPR ≤ 1,5, pausa en pestaña oculta y fallback CSS-only documentado; si la medición falla, se activa el fallback.
- [La hidratación del canvas podría romper SSR o hidratación si se renderiza en servidor] → Componente cliente aislado, sin estado dependiente de `window` durante el render inicial y con `requestAnimationFrame` iniciado solo en `useEffect`.
- [La sustitución de Inter por Plus Jakarta Sans cambia métricas y puede provocar CLS] → `next/font` con `display: "swap"` y variable CSS reservada en `@theme`; registrar medición de CLS como pendiente, sin cifras inventadas.
- [El avatar 2:3 sin recorte puede desbordar la fila de perfil de la IDE card] → Contenedor flexible con altura reservada y `max-height`, `object-contain`, sin `overflow-hidden` que recorte; prueba de layout en móvil y escritorio.
- [Copiar correo puede fallar sin permiso de portapapeles] → Feedback visible solo tras `navigator.clipboard.writeText` exitoso, con fallback de selección de texto; NUNCA mostrar «mensaje enviado».
- [Sincronizar `openspec/config.yaml` y specs maestras puede reintroducir la paleta vieja por error] → Tarea explícita con diff revisado y prueba de ausencia de `#0A0F1C`, `#00F5D4` y `#8B5CF6` en la documentación activa.
- [Los enlaces del prototipo con `href="#"` y correos inventados pueden filtrarse al copiar la estructura] → Revisión de scenarios y prueba que valida que todo `href` externo provenga de `data/profile.ts`.

## Migration Plan

1. **Red de seguridad**: ejecutar `npm test`, `npm run typecheck` y `npm run lint`; registrar 47 pruebas verdes antes de tocar nada.
2. **Sincronización documental**: actualizar `openspec/config.yaml` y `openspec/specs/visual-design-system/spec.md` con la paleta aprobada; verificar con diff y prueba de ausencia de tokens obsoletos.
3. **Ciclos TDD por comportamiento**: para cada comportamiento (layout/espaciado, fondo ambiental, tarjetas y hover, cabecera/footer, IDE card y avatar, grilla de proyectos, tarjeta de contacto, accesibilidad y movimiento) ejecutar RED (test que falla), GREEN, TRIANGULATE (segundo caso), REFACTOR, guardando la salida en `tests/evidence/<comportamiento>-{red,green,triangulate,refactor}.txt`.
4. **Actualización de la prueba de rendimiento**: sustituir las aserciones de 96×96 por dimensiones naturales y `object-contain`, dentro del ciclo de la IDE card.
5. **Verificación final**: `npm test`, `npm run typecheck`, `npm run lint`, `openspec validate --all --strict`, `openspec status --change stitch-ui-redesign --json`; confirmar `isComplete: true` y `applyRequires` satisfecho.
6. **Preparación de archivo**: una vez verificado el apply, dejar el change listo para `openspec archive stitch-ui-redesign --yes` en una sesión posterior; sin ejecutar compilación de producción ni commits en este change.

Rollback: cada grupo se implementa en un commit atómico independiente (cuando el usuario lo autorice); revertir el commit del grupo restaura visualmente el estado anterior sin tocar datos ni rutas.

## Open Questions

- ¿Debe el CTA «Descargar CV» de la cabecera usar el mismo destino relativo `assets/CV/CV-Ignacio-Navarria.pdf` que el de contacto? La propuesta asume que sí, sin `target="_blank"` adicional.
- ¿Se prefiere habilitar el canvas de partículas también en móvil? La propuesta lo asume desactivado por debajo de 640 px para proteger INP; se confirmará con la medición.
- ¿La píldora «Disponible para nuevos proyectos» debe ser texto decorativo o enlace a contacto? Se asume texto decorativo con `aria-hidden` y el estado comunicado por el contenido visible.
- Las mediciones de LCP/INP/CLS siguen pendientes de ejecutar en entorno real; no se registran cifras estimadas.

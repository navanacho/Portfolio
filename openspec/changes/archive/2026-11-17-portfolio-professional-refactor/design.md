## Context

Ignacio Navarria (handle `navanacho`), Software Developer & Data Analyst, necesita un portafolio en español con tono técnico, minimalista y profesional. Hoy existe un sitio estático (`index.html`, `style.css`, `main.js`, `assest/`) sin `package.json`, TypeScript, bundler ni tests; por eso se trata de una reconstrucción total, no de un ajuste. El repositorio `openspec/config.yaml` es la fuente autoritativa de identidad, datos reales, paleta y reglas. La única obra en alcance es la tesis finalizada, con repositorio confirmado https://github.com/germarino18/Automatizacion_con_Honeypots_Tesis.git (README público consultado el 2026-11-17). Velco está explícitamente excluido. No hay dominio de producción confirmado.

## Goals / Non-Goals

**Goals:**

- Crear una base Next.js App Router + TypeScript strict + Tailwind CSS + Framer Motion + Lucide React, accesible, responsive y consciente de Core Web Vitals.
- Separar contenido real de presentación, con un único `data/` como fuente de verdad y componentes puros por responsabilidad.
- Mantener la identidad y la bio textualmente iguales; actualizar la educación a "Tecnicatura en Programación — UTN, finalizada en 2026".
- Publicar el proyecto de tesis con tarjeta, enlace verificable y modal del flujo de arquitectura usando solo datos confirmados por el usuario y el README, acreditando a "Ignacio Navarria" y "Germán Marino" tal como figuran en "Autores".
- Corregir los defectos heredados: ruta `assest/`, case mismatch del avatar, botón de contacto muerto, tarjetas dependientes de JS, rama inalcanzable del CV y metadatos ausentes.
- Habilitar un runner de pruebas y dejar evidencia ejecutada de cada ciclo RED → GREEN → TRIANGULATE → REFACTOR antes de considerar completo cada comportamiento.

**Non-Goals:**

- Incluir Velco u otros proyectos inventados, métricas, cifras o enlaces no confirmados.
- Escribir código de aplicación, instalar dependencias, ejecutar builds o tests en esta fase de propuesta.
- Rediseñar o documentar el stack interno de la tesis, ni alojar su demo; solo presentarla.
- Definir el dominio de producción, `metadataBase` o URLs absolutas de Open Graph: se emiten solo metadatos relativos y el dominio queda como configuración futura explícita; tampoco se incluyen CMS ni backends.

## Decisions

1. **App Router con una sola ruta pública (`/`).** Un `app/layout.tsx` concentra metadata, fuentes y chrome; `app/page.tsx` compone secciones estáticas. Alternativa descartada: múltiples rutas `/proyectos`, `/contacto` — añadiría navegación y coste sin beneficio para un portafolio de una sola página.

2. **Límites de componentes.** `components/layout/` para `Navbar` y `Footer` (chrome persistente y navegación entre secciones); `components/sections/` para `Hero`, `About`, `Experience`, `Education`, `Skills`, `Projects`, `Contact` (bloques de contenido con significado semántico propio); `components/ui/` para `Card`, `ProjectCard`, `Modal`, `SectionHeading` y `IconBadge` (primitivas reutilizables, sin conocimiento del dominio); `components/background/` para gradientes y partículas decorativas (aislando efectos puramente visuales del contenido). Alternativa descartada: un único `Portfolio.tsx` monolítico, que imposibilita pruebas focalizadas y acopla datos, animación y marcado.

3. **`data/` separado de la UI.** `data/profile.ts` (identidad, bio verbatim, contacto, experiencia, educación, stack, herramientas) y `data/projects.ts` (única entrada de tesis) exportan tipos y valores inmutables; los componentes solo consumen estos objetos. Alternativa descartada: literal strings dentro de JSX, que permitiría divergencias y dificultaría los tests de regresión de datos.

4. **Tokens exactos y tipografía.** En `app/globals.css` y la config de Tailwind: fondo `#0A0F1C`; superficies `#111827` con borde `rgba(255,255,255,0.08)` y `backdrop-blur-md`; acento primario `#00F5D4`; acento secundario `#8B5CF6` (variante suave `#7B2CBF`); texto `#F8FAFC` y `#94A3B8`. UI con Inter o Plus Jakarta Sans y código/stack/métricas con JetBrains Mono, cargadas con `next/font` (sin peticiones a terceros en runtime). Alternativa descartada: colores e fuentes por archivo, que produciría inconsistencias y saltos de layout.

5. **Movimiento con degradación controlada.** Framer Motion solo en entradas escalonadas del hero, `whileInView`, spotlight de tarjetas y transición del navbar; un hook central lee `prefers-reduced-motion` y sustituye animaciones por estados finales. Alternativa descartada: animaciones CSS independientes y duplicadas por sección.

6. **Modal accesible como primitiva `ui/`.** `ProjectCard` abre un `Modal` con foco inicial, `role="dialog"`, `aria-modal`, cierre con Escape y retorno de foco al disparador. Alternativa descartada: modal nativo `<dialog>` sin control de foco consistente entre navegadores ni animaciones coordinadas.

7. **Estrategia TDD con evidencia.** Vitest + Testing Library + jsdom para lógica y componentes, con `axe` para accesibilidad automatizada (complementada con revisión manual de teclado). Cada comportamiento sigue RED (test falla por el motivo correcto) → GREEN (implementación mínima) → TRIANGULATE (segundo caso que tensiona la solución) → REFACTOR (sin cambiar el comportamiento), guardando la salida ejecutada en `tests/evidence/<slug>.txt`. Alternativa descartada: tests posteriores al código, que no cumplen el modo TDD estricto del repositorio.

8. **Migración de assets sin romper el CV.** Ruta canónica `assets/`; avatar con un único nombre en minúsculas (`assets/images/avatar.png`). El CV nuevo se copia desde `C:\Users\navar\Downloads\CV - Ignacio Navarria - Software Engineer & Data Analyst (General).pdf` (175437 bytes, confirmado) a `assets/CV/CV-Ignacio-Navarria.pdf`, que es la única ruta publicada/enlazada. `assest/CV/CV2.0.pdf` queda como fuente legada, sin enlace público, hasta la verificación final; recién entonces se elimina `assest/` en la tarea de limpieza. Alternativa descartada: publicar el PDF legado o borrar el directorio antiguo antes de tiempo.

## Risks / Trade-offs

- [El repositorio de la tesis tiene código y documentación extensos; el portafolio podría inventar detalle técnico] → Usar solo la listaconfirmada en `config.yaml` más lo verificado en el README (componentes, MITRE ATT&CK, dashboards y consola SOC), sin cifras ni resultados medidos; ante duda, omitir.
- [README lista a Germán Marino como coautor junto a Ignacio Navarria] → Resuelto: acreditar a ambos con los nombres exactos "Ignacio Navarria" y "Germán Marino", sin atribución en solitario ni variantes.
- [OG canonical requiere una URL absoluta que aún no existe] → Resuelto: no configurar `metadataBase` ni URLs absolutas de OG; emitir solo metadatos relativos y dejar el dominio como nota de configuración futura.
- [Framer Motion puede penalizar INP/LCP si se monta sobre todo el árbol] → Animar contenedores pequeños, usar `whileInView` con `once`, cargar el cliente solo donde hace falta y verificar con medidas de rendimiento antes de cerrar la tarea.
- [Sin runner de tests actualmente, el modo TDD estricto puede relajarse] → La primera tarea crea el runner y ninguna historia de comportamiento se marca completa sin sus cuatro evidencias.
- [Publicar el teléfono del CV en el sitio] → Resuelto: no publicarlo en Contacto, `data/profile.ts` ni metadatos; el correo es el único contacto público.
- [Cambiar la ruta del CV al incorporar el PDF nuevo] → Copiar el PDF nuevo a `assets/CV/CV-Ignacio-Navarria.pdf` y enlazar solo esa ruta; mantener `assest/` como fuente legada hasta la verificación final y eliminarlo recién en la tarea de limpieza.
- [Restricción global: no ejecutar builds tras cambios salvo petición] → La verificación se apoya en tests y comprobaciones estáticas; cualquier build/deploy se ejecuta únicamente con autorización explícita.

## Migration Plan

1. Añadir manifiesto y dependencias, configurar TypeScript strict, Tailwind con los tokens y el runner de pruebas; verificar que el pipeline de tests corre vacío y en verde.
2. Crear `app/`, `data/` y los cuatro grupos de componentes; migrar el contenido real desde el sitio estático y el CV actual a `data/`.
3. Copiar assets a `assets/` con avatar normalizado y el CV nuevo en `assets/CV/CV-Ignacio-Navarria.pdf` desde la ruta confirmada de Downloads, sin eliminar aún `assest/`.
4. Implementar cada comportamiento con su ciclo TDD y evidencia; integrar metadatos relativos, accesibilidad, el crédito a ambos autores y rendimiento.
5. Retirar `index.html`, `style.css` y `main.js` solo cuando la nueva página los reemplace por completo en una revisión verificada.
6. Tras esa verificación final, eliminar el directorio heredado `assest/` en la tarea de limpieza; antes de ese punto no se borra.
7. Rollback: conservar el estado actual en Git hasta el merge; revertir el commit del cambio restaura el sitio estático sin dependencias nuevas.

## Resolved Decisions

1. **Crédito de la tesis (2026-11-17):** acreditar a ambos autores exactamente como figuran en "Autores" del README público verificado: "Ignacio Navarria" y "Germán Marino". Fuente: https://raw.githubusercontent.com/germarino18/Automatizacion_con_Honeypots_Tesis/main/README.md
2. **Contacto público (2026-11-17):** publicar únicamente `navarria332@gmail.com`. No publicar el teléfono en ningún lugar del sitio, incluidos Contacto, `data/profile.ts` y metadatos.
3. **Metadatos (2026-11-17):** no definir dominio de producción, `metadataBase` ni URLs absolutas de Open Graph; emitir metadatos relativos y dejar el dominio como configuración futura explícita.
4. **CV (2026-11-17):** usar el archivo nuevo `C:\Users\navar\Downloads\CV - Ignacio Navarria - Software Engineer & Data Analyst (General).pdf` (175437 bytes, verificado tras la copia) y publicarlo en la ruta canónica `assets/CV/CV-Ignacio-Navarria.pdf`, que es el único enlace publicado. `assest/CV/CV2.0.pdf` fue fuente legada temporal y nunca se enlazó. Next.js sirve el archivo desde el espejo `public/assets/CV/CV-Ignacio-Navarria.pdf`, byte-idéntico al original canónico.

5. **Retiro de artefactos heredados (2026-11-17):** una vez verificada la nueva página por la suite completa, se eliminaron `index.html`, `style.css`, `main.js` y el árbol `assest/` completo. No queda ninguna ruta publicada `assest/`, `AVATAR.png` ni `CV2.0.pdf`; las pruebas de regresión lo comprueban sobre `app/`, `components/`, `data/`, `types/` y el HTML renderizado. Decisión cerrada: no se reintroducen los artefactos estáticos.

## 1. Bootstrap del proyecto y del runner de pruebas

- [x] 1.1 Declarar en `package.json` las dependencias Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion y Lucide React, sin ejecutar build
- [x] 1.2 Configurar `tsconfig.json` con `strict: true` y Tailwind con los tokens exactos de `openspec/config.yaml`
- [x] 1.3 Declarar Vitest, Testing Library, jsdom y axe como dependencias de desarrollo, con script `test`
- [x] 1.4 Instalar las dependencias declaradas para habilitar el runner (sin ejecutar build)
- [x] 1.5 Ejecutar la suite vacía y confirmar que el runner arranca; guardar salida en `tests/evidence/bootstrap.txt`
- [x] 1.6 Añadir scripts `typecheck` y `lint` con sus configuraciones mínimas

## 2. Datos reales y sección de identidad

- [x] 2.1 RED: escribir un test que falle porque `data/profile.ts` no expone la bio verbatim ni el nombre "Ignacio Navarria"
- [x] 2.2 GREEN: crear `data/profile.ts` solo con identidad, handle y bio exacta; ejecutar el test en verde
- [x] 2.3 TRIANGULATE: añadir caso para experiencia, educación UTN finalizada en 2026 y ausencia de "Actualidad"/"Estudiante"; verificar que falla y luego implementarlo
- [x] 2.4 REFACTOR: extraer tipos inmutables y reutilizables en `data/profile.ts`, sin cambiar valores; ejecutar toda la suite
- [x] 2.5 Guardar las cuatro salidas en `tests/evidence/profile-data.txt` (RED/GREEN/TRIANGULATE/REFACTOR)
- [x] 2.6 RED: test de componente que exige que la sección "Sobre mí" renderice la bio carácter por carácter
- [x] 2.7 GREEN: implementar `sections/About` consumiendo `data/profile.ts`; verificar el test en verde
- [x] 2.8 TRIANGULATE: añadir caso que compruebe stack y herramientas completos sin entradas inventadas
- [x] 2.9 REFACTOR: extraer `ui/SectionHeading` usado por About, Experience, Education y Skills; registrar evidencia en `tests/evidence/identity-sections.txt`

## 3. Shell, navegación y sistema visual

- [x] 3.1 RED: test que falle por ausencia de `lang="es"`, metadatos OG y enlaces del footer en el layout
- [x] 3.2 GREEN: crear `app/layout.tsx` y `app/page.tsx` con metadata en español y footer con enlaces confirmados
- [x] 3.3 TRIANGULATE: caso de navbar flotante con `aria-current` y cambio de sección activa al hacer scroll
- [x] 3.4 REFACTOR: mover chrome a `components/layout/Navbar` y `Footer`; evidencia en `tests/evidence/shell.txt`
- [x] 3.5 RED: test que exija los tokens `#0A0F1C`, `#111827`, `#00F5D4`, `#8B5CF6`, `#F8FAFC` y `#94A3B8` en la configuración de Tailwind
- [x] 3.6 GREEN: definir tokens y borde `rgba(255,255,255,0.08)` con `backdrop-blur-md` en `app/globals.css`
- [x] 3.7 TRIANGULATE: caso de tipografía UI/JetBrains Mono cargada con `next/font` sin dominios externos
- [x] 3.8 REFACTOR: centralizar primitivas de superficie en `components/ui/Card`; evidencia en `tests/evidence/visual-tokens.txt`

## 4. Contacto funcional

- [x] 4.1 RED: test que falle porque la sección no muestra `navarria332@gmail.com` ni genera `mailto:`
- [x] 4.2 GREEN: implementar `sections/Contact` con correo, GitHub y LinkedIn desde `data/profile.ts`, sin publicar teléfono
- [x] 4.3 TRIANGULATE: caso que exija enlace directo a `assets/CV/CV-Ignacio-Navarria.pdf`, ausencia de teléfono y de botones sin manejador
- [x] 4.4 REFACTOR: verificar que el HTML del servidor ya contiene los enlaces sin JavaScript; evidencia en `tests/evidence/contact-actions.txt`

## 5. Proyecto de tesis y modal de arquitectura

- [x] 5.1 RED: test que exija exactamente una entrada en `data/projects.ts` y que no aparezca Velco
- [x] 5.2 GREEN: crear la entrada de la tesis con el repositorio confirmado, los componentes verificados del README y un test que exija los créditos literales "Ignacio Navarria" y "Germán Marino"
- [x] 5.3 TRIANGULATE: caso que rechace cifras, porcentajes o resultados medidos no confirmados en el contenido
- [x] 5.4 REFACTOR: tipar el catálogo como solo-lectura; evidencia en `tests/evidence/thesis-data.txt`
- [x] 5.5 RED: test de interacción que falle porque la tarjeta no abre un modal con el flujo de arquitectura
- [x] 5.6 GREEN: implementar `sections/Projects`, `ui/ProjectCard` y `ui/Modal` con honeypots, n8n, enriquecimiento, PostgreSQL y Grafana
- [x] 5.7 TRIANGULATE: casos de cierre con Escape, foco confinado y retorno al disparador
- [x] 5.8 REFACTOR: extraer el contenido del flujo a un componente presentacional reutilizable; evidencia en `tests/evidence/thesis-modal.txt`

## 6. Accesibilidad y rendimiento

- [x] 6.1 RED: test con axe que falle por landmarks, `h1` único o etiquetas ARIA ausentes
- [x] 6.2 GREEN: corregir marcado semántico, `aria-label` de iconos y encabezados de sección
- [x] 6.3 TRIANGULATE: caso de recorrido por teclado y anuncio de sección activa con `aria-current`
- [x] 6.4 REFACTOR: consolidar reglas accesibles en `components/ui`; evidencia en `tests/evidence/accessibility.txt`
- [x] 6.5 RED: prueba que falle si el avatar no reserva dimensiones o si las fuentes se piden a terceros
- [x] 6.6 GREEN: usar `next/font`, dimensiones fijas del avatar y revelados `once`; ejecutar en verde
- [x] 6.7 TRIANGULATE: registrar una segunda medición de LCP, INP y CLS frente a los umbrales de referencia
- [x] 6.8 REFACTOR: ajustar animaciones y cargas diferidas sin cambiar el resultado visual; evidencia en `tests/evidence/performance.txt`

## 7. Migración de assets y cierre

- [x] 7.1 RED: test que falle porque faltan las rutas canónicas `assets/images/avatar.png` y `assets/CV/CV-Ignacio-Navarria.pdf`
- [x] 7.2 GREEN: copiar el avatar con nombre en minúsculas y el CV nuevo desde `C:\Users\navar\Downloads\CV - Ignacio Navarria - Software Engineer & Data Analyst (General).pdf` a `assets/CV/CV-Ignacio-Navarria.pdf`, manteniendo `assest/` como fuente heredada sin enlace público
- [x] 7.3 TRIANGULATE: caso que detecte enlaces publicados a `assest/`, `AVATAR.png` o al nombre legado `CV2.0.pdf`, y que confirme que el PDF canónico existe
- [x] 7.4 REFACTOR: retirar `index.html`, `style.css` y `main.js` solo tras verificar la nueva página, y eliminar el directorio heredado `assest/` recién en esa verificación final; evidencia en `tests/evidence/assets-migration.txt`
- [x] 7.5 Registrar en `design.md` las decisiones resueltas: crédito literal a ambos autores del README, metadatos relativos sin dominio absoluto ni `metadataBase`, teléfono no publicado y CV nuevo en la ruta canónica con fuente legada temporal
- [x] 7.6 Verificar que cada comportamiento listado en los specs tiene su archivo de evidencia con las cuatro etapas ejecutadas

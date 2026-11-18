# accessible-interactions Specification

## Purpose
TBD - created by archiving change portfolio-professional-refactor. Update Purpose after archive.
## Requirements
### Requirement: Estructura semántica y encabezados
El sistema SHALL usar landmarks HTML semánticos (`header`, `nav`, `main`, `section`, `footer`) y una jerarquía de encabezados ordenada, con un único `h1` por página.

#### Scenario: Landmarks presentes
- **WHEN** se inspecciona el marcado renderizado
- **THEN** existen `header`, `nav`, `main` con las secciones y `footer`, y cada sección tiene un encabezado descriptivo

#### Scenario: Un único título principal
- **WHEN** se consultan los encabezados de la página
- **THEN** hay exactamente un `h1` con el nombre de Ignacio Navarria y los encabezados de sección son `h2`

### Requirement: Foco visible y navegación por teclado
El sistema SHALL hacer que todos los controles interactivos —incluidos logo, enlaces de la píldora de navegación, CTA de CV, botón de persona, copiar correo, píldoras sociales, tarjetas y modal— sean alcanzables por teclado y SHALL mostrar un indicador de foco visible con contraste suficiente, sin que el fondo ambiental intervenga en el orden de foco.

#### Scenario: Recorrido por teclado
- **WHEN** se usa Tab desde el inicio de la página
- **THEN** se recorren logo, navegación, CTA de CV, enlaces de contacto y tarjeta del proyecto en orden lógico, sin trampas de foco

#### Scenario: Indicador de foco
- **WHEN** un enlace o botón recibe el foco
- **THEN** se muestra un contorno `focus-visible` claramente diferenciable del estado de reposo, con el acento `#5BC0DE` sobre `#0B132B`

#### Scenario: Fondo fuera del orden de foco
- **WHEN** se navega con Tab por la página con el canvas y los blobs presentes
- **THEN** ninguna capa del fondo recibe foco ni intercepta clics sobre el contenido

#### Scenario: Píldora activa alcanzable
- **WHEN** se tabula por la navegación central
- **THEN** cada enlace, incluida la píldora activa, es alcanzable y activable con Enter, con `aria-current` actualizado

### Requirement: Modal accesible
El sistema SHALL implementar el modal del proyecto con `role="dialog"`, `aria-modal="true"`, nombre accesible, foco inicial dentro del diálogo, cierre con Escape y devolución del foco al disparador.

#### Scenario: Apertura con nombre accesible
- **WHEN** se abre el modal de la arquitectura
- **THEN** el diálogo expone un nombre accesible en español y el foco queda dentro de él

#### Scenario: Cierre con Escape
- **WHEN** se pulsa Escape con el modal abierto
- **THEN** el modal se cierra y el foco regresa al botón "Ver arquitectura"

#### Scenario: Foco confinado
- **WHEN** se pulsa Tab repetidamente dentro del modal abierto
- **THEN** el foco no alcanza contenido detrás del diálogo

### Requirement: Anuncios y etiquetas ARIA
El sistema SHALL etiquetar con `aria-label` los controles iconográficos —incluidos el botón de persona de la cabecera, los botones de icono del footer y el botón de copiar correo—, SHALL marcar el indicador de sección activa de forma comprensible y SHALL exponer un texto alternativo real para el avatar de la tarjeta IDE.

#### Scenario: Iconos sin texto
- **WHEN** un lector de pantalla recorre los enlaces sociales y los iconos de la cabecera
- **THEN** cada enlace anuncia un nombre en español como "GitHub de Ignacio Navarria", "LinkedIn de Ignacio Navarria" o "Perfil de Ignacio Navarria"

#### Scenario: Sección activa
- **WHEN** cambia la sección activa durante el scroll
- **THEN** el estado se comunica mediante `aria-current` u otro mecanismo ARIA equivalente

#### Scenario: Avatar de la tarjeta IDE
- **WHEN** un lector de pantalla recorre la fila de perfil de la tarjeta IDE
- **THEN** anuncia el avatar como "Retrato de Ignacio Navarria" y el chrome decorativo de la ventana queda marcado como `aria-hidden`

#### Scenario: Confirmación de copiado
- **WHEN** se copia el correo correctamente
- **THEN** el feedback se anuncia a lectores de pantalla mediante un estado ARIA, sin afirmar que se envió un mensaje

### Requirement: Preferencia de movimiento reducido
El sistema SHALL respetar `prefers-reduced-motion: reduce` en todas las animaciones y transiciones —incluidas las de `motion`, el spotlight y elevación de tarjetas, la escala de CTA e iconos, los blobs ambientales y el canvas de constelaciones— y SHALL mostrar el contenido directamente en su estado final.

#### Scenario: Usuario con movimiento reducido
- **WHEN** el navegador informa `prefers-reduced-motion: reduce`
- **THEN** hero, revelados, elevación de tarjetas, CTA, navbar y modal muestran su estado final sin animación y el modal sigue siendo totalmente operable

#### Scenario: Interrupción del canvas
- **WHEN** el usuario solicita movimiento reducido
- **THEN** el canvas de constelaciones no se monta o se oculta por completo, sin bucles `requestAnimationFrame` activos

#### Scenario: Blobs y grilla estáticos
- **WHEN** el usuario solicita movimiento reducido
- **THEN** los blobs no se desplazan y la grilla permanece visible en su estado estático sin afectar la legibilidad

#### Scenario: Hover sin desplazamiento
- **WHEN** el usuario con movimiento reducido pasa el puntero por una tarjeta
- **THEN** el cambio de estado se comunica por color de borde sin aplicar `translateY` ni escala


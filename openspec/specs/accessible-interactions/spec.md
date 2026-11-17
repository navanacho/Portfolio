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
El sistema SHALL hacer que todos los controles interactivos sean alcanzables por teclado y SHALL mostrar un indicador de foco visible con contraste suficiente.

#### Scenario: Recorrido por teclado
- **WHEN** se usa Tab desde el inicio de la página
- **THEN** se recorren navbar, enlaces de contacto y tarjeta del proyecto en orden lógico, sin trampas de foco

#### Scenario: Indicador de foco
- **WHEN** un enlace o botón recibe el foco
- **THEN** se muestra un contorno `focus-visible` claramente diferenciable del estado de reposo

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
El sistema SHALL etiquetar con `aria-label` los controles iconográficos y SHALL marcar el indicador de sección activa de forma comprensible para lectores de pantalla.

#### Scenario: Iconos sin texto
- **WHEN** un lector de pantalla recorre los enlaces sociales
- **THEN** cada enlace anuncia un nombre en español como "GitHub de Ignacio Navarria" o "LinkedIn de Ignacio Navarria"

#### Scenario: Sección activa
- **WHEN** cambia la sección activa durante el scroll
- **THEN** el estado se comunica mediante `aria-current` u otro mecanismo ARIA equivalente

### Requirement: Preferencia de movimiento reducido
El sistema SHALL respetar `prefers-reduced-motion: reduce` en todas las animaciones y transiciones, incluidas las de Framer Motion y el spotlight de tarjetas.

#### Scenario: Usuario con movimiento reducido
- **WHEN** el navegador informa `prefers-reduced-motion: reduce`
- **THEN** hero, revelados, spotlight y navbar muestran su estado final sin animación y el modal sigue siendo totalmente operable


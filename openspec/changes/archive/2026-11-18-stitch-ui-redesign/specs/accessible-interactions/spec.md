## MODIFIED Requirements

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

## MODIFIED Requirements

### Requirement: Navegación flotante con sección activa
El sistema SHALL mostrar una cabecera fija y translúcida de altura `h-20` con el logo `<navanacho/>`, una navegación central con forma de píldora y píldora activa, una píldora de disponibilidad, un CTA de descarga de CV y un icono de persona con nombre accesible, y SHALL enlazar las secciones Inicio, Sobre mí, Tech Stack, Proyectos, Trayectoria y Contacto marcando visualmente la activa por scroll o selección.

#### Scenario: Navegación a una sección
- **WHEN** se activa el enlace "Proyectos" en la cabecera
- **THEN** el viewport se desplaza a la sección de proyectos y la píldora activa se actualiza con el acento primario `#5BC0DE`

#### Scenario: Indicador durante el scroll
- **WHEN** el usuario desplaza la página hasta "Contacto"
- **THEN** la píldora activa corresponde a "Contacto" sin requerir clic y el estado se comunica con `aria-current`

#### Scenario: Estructura de la cabecera
- **WHEN** se inspecciona la cabecera en escritorio
- **THEN** mide `h-20`, usa fondo translúcido con `backdrop-blur`, muestra el logo `<navanacho/>`, la navegación central redondeada, la píldora «Disponible», el CTA «Descargar CV» y el icono de persona con nombre accesible en español

#### Scenario: Sin enlaces ficticios en la cabecera
- **WHEN** se inspeccionan los `href` de la cabecera
- **THEN** apuntan a anclas reales de la página o a destinos confirmados en `data/profile.ts`, sin `href="#"` vacío ni teléfonos

### Requirement: Diseño responsive y footer
El sistema SHALL adaptar cabecera, secciones y footer a móvil, tablet y escritorio dentro del contenedor de 1200 px sin desbordamiento horizontal, y el footer SHALL ser una banda oscura con el logo `<navanacho/>`, un tagline y botones de icono que enlacen únicamente a GitHub, LinkedIn y el correo confirmados.

#### Scenario: Visualización en móvil
- **WHEN** la página se renderiza con un viewport de 375 px de ancho
- **THEN** todo el contenido es legible, no hay scroll horizontal y la cabecera mantiene operables el logo, el CTA y la navegación

#### Scenario: Enlaces del footer
- **WHEN** se inspecciona el footer
- **THEN** aparecen GitHub (`https://github.com/navanacho`), LinkedIn (`https://www.linkedin.com/in/ignacio-navarria-151787450`) y el correo `navarria332@gmail.com`, sin enlaces inventados

#### Scenario: Banda oscura del footer
- **WHEN** se visualiza el footer en escritorio
- **THEN** muestra una franja con fondo derivado de `#0B132B`, borde superior tenue, el logo `<navanacho/>`, el tagline sobre ingeniería de interfaces y tres botones de icono con nombre accesible

#### Scenario: Ausencia de redes no confirmadas
- **WHEN** se recorren los botones de icono del footer
- **THEN** no hay enlaces a X/Twitter, ni iconos con `href="#"` y ningún botón carece de acción real

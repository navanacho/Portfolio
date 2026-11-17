## ADDED Requirements

### Requirement: Base de aplicación Next.js con ruta única
El sistema SHALL exponer el portafolio completo en una única ruta pública `/`, construida con Next.js App Router y TypeScript en modo estricto, sin dependencia de `index.html`, `style.css` ni `main.js`.

#### Scenario: Carga de la página raíz
- **WHEN** se solicita `/`
- **THEN** se sirve la página del portafolio en español con `lang="es"` y sin errores de tipado en el proyecto

#### Scenario: Sin artefactos estáticos heredados en la ruta
- **WHEN** se inspecciona la estructura de la aplicación
- **THEN** no existen `index.html`, `style.css` ni `main.js` como entradas de la interfaz

### Requirement: Navegación flotante con sección activa
El sistema SHALL mostrar una navbar flotante con efecto blur que enlace todas las secciones y marque visualmente la sección activa, tanto por scroll como por selección del usuario.

#### Scenario: Navegación a una sección
- **WHEN** se activa el enlace "Proyectos" en la navbar
- **THEN** el viewport se desplaza a la sección de proyectos y el indicador de sección activa se actualiza

#### Scenario: Indicador durante el scroll
- **WHEN** el usuario desplaza la página hasta "Contacto"
- **THEN** el indicador activo corresponde a "Contacto" sin requerir clic

### Requirement: Diseño responsive y footer
El sistema SHALL adaptar navbar, secciones y footer a móvil, tablet y escritorio sin desbordamiento horizontal, y el footer SHALL contener únicamente enlaces confirmados.

#### Scenario: Visualización en móvil
- **WHEN** la página se renderiza con un viewport de 375 px de ancho
- **THEN** todo el contenido es legible, no hay scroll horizontal y la navbar sigue siendo operable

#### Scenario: Enlaces del footer
- **WHEN** se inspecciona el footer
- **THEN** aparecen GitHub (`https://github.com/navanacho`), LinkedIn (`https://www.linkedin.com/in/ignacio-navarria-151787450`) y el correo `navarria332@gmail.com`, sin enlaces inventados

### Requirement: Metadatos y Open Graph
El sistema SHALL emitir metadatos en español de título, descripción, Open Graph y tarjeta social usando solo rutas relativas, y NO SHALL configurar un dominio de producción absoluto, `metadataBase` ni URLs absolutas de Open Graph; el dominio queda como configuración futura explícita.

#### Scenario: Inspección del `<head>`
- **WHEN** se solicita la página raíz
- **THEN** el `<head>` contiene título, descripción, `og:title`, `og:description`, `og:type` y `twitter:card` acordes al portafolio de Ignacio Navarria, sin `metadataBase` ni URLs absolutas

#### Scenario: Imagen social sin ruta rota
- **WHEN** se resuelve la imagen de Open Graph
- **THEN** apunta al avatar canónico dentro de `assets/`, usando una ruta relativa y sin dominio de producción configurado en este cambio

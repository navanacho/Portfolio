# visual-design-system Specification

## Purpose
TBD - created by archiving change portfolio-professional-refactor. Update Purpose after archive.
## Requirements
### Requirement: Tokens exactos de color y superficie
El sistema SHALL aplicar los valores aprobados por el usuario y presentes en `app/globals.css`: fondo `#0B132B`, superficie `#1C2541`, secundaria `#3A506B`, acento primario `#5BC0DE`, cálido `#F4D6B0`, cálido fuerte `#D97706`, texto principal `#F8FAFC` y texto secundario `#94A3B8`, y SHALL construir el contraste de las tarjetas mediante alpha de borde, translucidez, sombras, glows y gradientes derivados de esos tokens, sin alterar ningún hex aprobado y sin adoptar los valores del prototipo de Stitch (`#1A1F2B`, `#264653`, `#2A9D8F`, `#E9C46A`, `#F4A261`). La superficie de Stitch `#264653` se mapea a `#1C2541` con borde y alpha reforzados; su primario `#2A9D8F` se mapea a `#5BC0DE`; su secundario `#E9C46A` y su CTA `#F4A261` se mapean a `#F4D6B0` y `#D97706` respectivamente.

#### Scenario: Renderizado de una tarjeta
- **WHEN** se muestra una tarjeta de contenido sobre el fondo
- **THEN** usa superficie `#1C2541` con alpha reforzado, borde semitransparente derivado de `rgba(91,192,222,·)`, sombra exterior y texto principal y secundario en `#F8FAFC` y `#94A3B8`

#### Scenario: Acentos en elementos técnicos
- **WHEN** se resaltan datos de stack o de la arquitectura de la tesis
- **THEN** se usa `#5BC0DE` como acento principal, `#3A506B` para capas frías y `#F4D6B0` o `#D97706` para los acentos cálidos, sin `#00F5D4` ni `#8B5CF6`

#### Scenario: Contraste visible sin cambiar los hex
- **WHEN** una tarjeta `#1C2541` se muestra sobre el fondo `#0B132B`
- **THEN** se distingue por borde con alpha de al menos 0.28, sombra exterior y gradiente atmosférico, manteniendo los hex originales intactos

#### Scenario: Rechazo explícito de la paleta del prototipo
- **WHEN** se inspeccionan `app/globals.css`, `openspec/config.yaml` y los documentos activos de `openspec/specs/`
- **THEN** no aparecen `#0A0F1C`, `#00F5D4`, `#8B5CF6`, `#264653`, `#2A9D8F`, `#E9C46A` ni `#F4A261` como tokens vigentes

### Requirement: Tipografía con next/font
El sistema SHALL cargar Plus Jakarta Sans para la interfaz y JetBrains Mono para código, stack y métricas mediante `next/font`, sustituyendo a Inter, sin solicitudes a proveedores externos en runtime y sin hojas de estilo remotas de Material Symbols.

#### Scenario: Carga de fuentes
- **WHEN** se renderiza la página
- **THEN** los textos de interfaz usan Plus Jakarta Sans a través de la variable `--font-ui` y los bloques de código y stack usan JetBrains Mono a través de `--font-mono`

#### Scenario: Sin fuentes externas en runtime
- **WHEN** se inspeccionan las peticiones de la página cargada
- **THEN** no se solicitan hojas de estilo ni fuentes desde `fonts.googleapis.com` ni `fonts.gstatic.com`

#### Scenario: Sin Inter en la interfaz
- **WHEN** se inspecciona `app/fonts.ts` y `app/globals.css`
- **THEN** no se importa `Inter`, no se usa `--font-inter` y la variable de interfaz apunta a Plus Jakarta Sans

### Requirement: Iconografía consistente
El sistema SHALL usar Lucide React para todos los iconos de interfaz, con nombres accesibles cuando el icono transmita significado, y NO SHALL incorporar Material Symbols ni iconos servidos desde CDN.

#### Scenario: Icono con significado
- **WHEN** un icono de Lucide representa una acción sin texto visible
- **THEN** el control que lo contiene expone un nombre accesible equivalente en español

#### Scenario: Sin iconos remotos
- **WHEN** se inspecciona el marcado renderizado y las peticiones de red
- **THEN** no existen elementos `material-symbols-outlined` ni solicitudes a CDN de iconos

### Requirement: Movimiento con degradación controlada
El sistema SHALL implementar entrada escalonada del hero, revelados al hacer scroll con `whileInView`, spotlight en hover de tarjetas, elevación `hover:-translate-y-1.5` generalizada, escala de iconos y CTA, y transiciones de cabecera y fondo ambiental, y SHALL sustituirlos por su estado final cuando el usuario prefiera movimiento reducido o cuando el sistema lo solicite.

#### Scenario: Entrada del hero
- **WHEN** se carga la página con movimiento permitido
- **THEN** los elementos del hero aparecen de forma escalonada y terminan en su estado visible

#### Scenario: Spotlight y elevación de tarjeta
- **WHEN** el puntero pasa sobre una tarjeta con movimiento permitido
- **THEN** se muestra el spotlight sin alterar la legibilidad y la tarjeta se eleva con `hover:-translate-y-1.5` cambiando el color del borde

#### Scenario: Movimiento reducido
- **WHEN** el sistema operativo solicita `prefers-reduced-motion: reduce`
- **THEN** hero, revelados, spotlight, elevación de tarjetas, escala de CTA y navbar muestran su estado final sin animación y el modal sigue siendo totalmente operable

#### Scenario: Fondo ambiental sin movimiento
- **WHEN** el sistema solicita movimiento reducido
- **THEN** los blobs permanecen quietos, el canvas de constelaciones no se monta y la grilla se muestra en su estado estático


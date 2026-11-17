## ADDED Requirements

### Requirement: Tokens exactos de color y superficie
El sistema SHALL aplicar los valores de diseño definidos en `openspec/config.yaml`: fondo `#0A0F1C`, superficies `#111827` con borde `rgba(255,255,255,0.08)` y `backdrop-blur-md`, acento primario `#00F5D4`, acento secundario `#8B5CF6` (variante suave `#7B2CBF`), texto principal `#F8FAFC` y texto secundario `#94A3B8`.

#### Scenario: Renderizado de una tarjeta
- **WHEN** se muestra una tarjeta de contenido sobre el fondo
- **THEN** usa superficie `#111827`, borde semitransparente y desenfoque de fondo, con texto principal y secundario en los tonos definidos

#### Scenario: Acentos en elementos técnicos
- **WHEN** se resaltan datos de stack o de la arquitectura de la tesis
- **THEN** se usa `#00F5D4` como acento principal y `#8B5CF6` o su variante para gradientes suaves

### Requirement: Tipografía con next/font
El sistema SHALL cargar Inter o Plus Jakarta Sans para interfaz y JetBrains Mono para código, stack y métricas mediante `next/font`, sin solicitudes a proveedores externos en runtime.

#### Scenario: Carga de fuentes
- **WHEN** se renderiza la página
- **THEN** los textos de interfaz usan la fuente UI configurada y los bloques de stack usan JetBrains Mono

#### Scenario: Sin fuentes externas en runtime
- **WHEN** se inspeccionan las peticiones de la página cargada
- **THEN** no se solicitan hojas de estilo de fuentes desde dominios de terceros

### Requirement: Iconografía consistente
El sistema SHALL usar Lucide React para todos los iconos de interfaz, con nombres accesibles cuando el icono transmita significado.

#### Scenario: Icono con significado
- **WHEN** un icono de Lucide representa una acción sin texto visible
- **THEN** el control que lo contiene expone un nombre accesible equivalente en español

### Requirement: Movimiento con degradación controlada
El sistema SHALL implementar entrada escalonada del hero, revelados al hacer scroll con `whileInView`, spotlight en hover de tarjetas y transiciones de navbar, y SHALL sustituirlos por su estado final cuando el usuario prefiera movimiento reducido.

#### Scenario: Entrada del hero
- **WHEN** se carga la página con movimiento permitido
- **THEN** los elementos del hero aparecen de forma escalonada y terminan en su estado visible

#### Scenario: Spotlight de tarjeta
- **WHEN** el puntero pasa sobre una tarjeta de proyecto con movimiento permitido
- **THEN** se muestra el efecto spotlight sin alterar la legibilidad del texto

#### Scenario: Movimiento reducido
- **WHEN** el sistema operativo solicita `prefers-reduced-motion: reduce`
- **THEN** las animaciones se omiten y el contenido se muestra directamente en su estado final

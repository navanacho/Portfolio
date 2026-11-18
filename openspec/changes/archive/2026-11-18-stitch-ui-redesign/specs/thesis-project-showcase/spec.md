## MODIFIED Requirements

### Requirement: Catálogo limitado a la tesis
El sistema SHALL mostrar exactamente un proyecto: "Tesis de Grado — Orquestación de Honeypots Research con n8n", y NO SHALL incluir Velco ni proyectos adicionales. El tratamiento visual de grilla del prototipo SHALL aplicarse únicamente a esa tarjeta real, sin importar los tres proyectos ficticios del diseño de Stitch ni sus imágenes remotas.

#### Scenario: Listado de proyectos
- **WHEN** se visualiza la sección de proyectos
- **THEN** aparece una sola tarjeta correspondiente a la tesis de grado

#### Scenario: Exclusión explícita
- **WHEN** se busca cualquier referencia a Velco u otros proyectos en el contenido renderizado
- **THEN** no se encuentra ninguna

#### Scenario: Tratamiento de grilla sin invenciones
- **WHEN** se visualiza la grilla de proyectos en escritorio
- **THEN** la única tarjeta usa el estilo del prototipo con preview, píldora de estado, descripción acotada, tags y enlace al repositorio, y NO aparecen «SaaS Analytics Dashboard», «E-Commerce Headless Storefront» ni «Portfolio Personal v2»

#### Scenario: Vista previa sin imágenes remotas
- **WHEN** se inspecciona el área de vista previa de la tarjeta
- **THEN** se genera con el flujo de arquitectura o con datos verificados del proyecto, sin URLs de imágenes externas

## ADDED Requirements

### Requirement: Tarjeta IDE del hero con flujo de código verificado
El sistema SHALL mostrar, en la columna derecha del hero, una tarjeta con apariencia de IDE que incluya chrome de ventana con tres puntos, el nombre `ignacio.bio.ts`, una fila de perfil, un flujo de código con datos reales y una barra de estado con `UTF-8 · LF` y `0 errors · 0 warnings`, sin cifras de rendimiento ni proyectos inventados.

#### Scenario: Estructura de la tarjeta IDE
- **WHEN** se visualiza el hero en escritorio
- **THEN** la columna de 5 sobre 12 contiene la tarjeta IDE con chrome, fila de perfil, flujo de código y barra de estado, sobre superficie `#1C2541` con borde visible

#### Scenario: Contenido del flujo de código
- **WHEN** se lee el flujo de código de la tarjeta
- **THEN** aparecen únicamente el handle `navanacho`, el rol verificado y el stack confirmado, sin `99/100 Core Web Vitals`, `Next.js 15` ni puntajes simulados

#### Scenario: Barra de estado como adorno
- **WHEN** se lee la barra inferior de la tarjeta
- **THEN** muestra `UTF-8 · LF` y `0 errors · 0 warnings` como estado decorativo de la interfaz, sin afirmar mediciones del proyecto

### Requirement: Avatar completo y sin marco en la fila de perfil
El sistema SHALL colocar el avatar real del usuario exactamente en la posición de la foto de perfil del prototipo dentro de la tarjeta IDE, con su proporción natural de 2:3 (1024×1536), `object-contain`, apariencia flotante y sin círculo, borde, recorte ni dimensiones forzadas de 96×96, conservando un texto alternativo real.

#### Scenario: Ubicación exacta
- **WHEN** se visualiza la fila de perfil de la tarjeta IDE
- **THEN** el avatar aparece en el mismo lugar que la foto del prototipo, junto al nombre `Ignacio` y al handle `(@navanacho)`

#### Scenario: Sin recorte ni marco
- **WHEN** se inspeccionan las clases y atributos del avatar
- **THEN** no contiene `rounded-full`, `border`, `object-cover`, `w-24` ni `h-24`, usa `object-contain` y conserva la proporción 2:3 sin recortar la imagen

#### Scenario: Texto alternativo y dimensiones
- **WHEN** se consulta el marcado del avatar
- **THEN** expone `alt="Retrato de Ignacio Navarria"` y dimensiones intrínsecas 1024×1536, sin atributos de 96×96

#### Scenario: Prueba de rendimiento actualizada
- **WHEN** se ejecuta la prueba de rendimiento
- **THEN** ya no exige `width="96"` ni `height="96"` y verifica `object-contain` y las dimensiones naturales del avatar

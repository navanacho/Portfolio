## ADDED Requirements

### Requirement: Contenedor central y escala de espaciado
El sistema SHALL envolver el contenido en un contenedor centrado de 1200 px máximo y SHALL aplicar la escala del prototipo: margin horizontal de 2rem en escritorio y 1.25rem en móvil, gutter de 1.5rem, `space-lg` de 1.5rem y `space-xl` de 2.5rem, con grids de 12 columnas en escritorio.

#### Scenario: Ancho y padding en escritorio
- **WHEN** se renderiza la página con un viewport de 1280 px
- **THEN** el contenido está centrado con un ancho máximo de 1200 px, padding horizontal de 2rem y separación de 1.5rem entre columnas

#### Scenario: Escala móvil
- **WHEN** se renderiza la página con un viewport de 375 px
- **THEN** el padding horizontal es 1.25rem, la separación entre bloques es 1.5rem y no aparece scroll horizontal

#### Scenario: Grids de doce columnas
- **WHEN** se inspecciona el hero y la sección «Sobre mí» en escritorio
- **THEN** ambos usan una cuadrícula de 12 columnas con distribución 7/5 entre el bloque principal y la tarjeta lateral

### Requirement: Distribución responsiva de las secciones
El sistema SHALL disponer las secciones según la composición del prototipo —hero 7/5, sobre mí 7/5, tech stack de 4 columnas (2 en md, 1 en móvil), proyectos de 3 columnas (2 en md, 1 en móvil), trayectoria en timeline vertical y contacto 5/7— colapsando a una columna en móvil sin perder contenido.

#### Scenario: Tech stack en cuatro columnas
- **WHEN** se visualiza «Stack Tecnológico» en un viewport de 1024 px o superior
- **THEN** aparecen cuatro tarjetas de categoría en una fila, con dos columnas en tablet y una en móvil

#### Scenario: Bloque de contacto en dos columnas
- **WHEN** se visualiza «Contacto» en escritorio
- **THEN** la tarjeta se divide en 5 columnas para el canal directo y 7 para el bloque de acciones reales, y en móvil ambas se apilan

#### Scenario: Colapso sin pérdida de contenido
- **WHEN** se reduce el viewport a 375 px
- **THEN** todas las secciones pasan a una columna y el texto, los enlaces y las tarjetas siguen siendo legibles y alcanzables

### Requirement: Fondo ambiental con grilla, blobs y constelaciones
El sistema SHALL mostrar un fondo fijo y no interactivo compuesto por una grilla con máscara radial, tres blobs difuminados de movimiento lento y un canvas de constelaciones que reacciona al cursor con líneas de conexión, manteniendo el contenido legible y sin capturar foco ni clics.

#### Scenario: Capas del fondo
- **WHEN** se carga la página con movimiento permitido
- **THEN** el fondo muestra la grilla enmascarada, tres blobs en tonos derivados de la paleta aprobada y el canvas de constelaciones detrás del contenido

#### Scenario: Reacción al cursor
- **WHEN** el puntero se desplaza sobre la página con movimiento permitido
- **THEN** las partículas cercanas se desvían y se dibujan líneas de conexión entre las que quedan a una distancia definida

#### Scenario: Montaje seguro en servidor
- **WHEN** se renderiza la página en el servidor
- **THEN** no se accede a `window`, `document` ni a `CanvasRenderingContext2D`, y el HTML inicial no contiene un canvas dependiente de scripts externos

#### Scenario: Coste limitado del canvas
- **WHEN** el canvas está activo
- **THEN** el número de partículas está limitado, la animación se pausa cuando la pestaña está oculta y el bucle usa `requestAnimationFrame`

### Requirement: Sistema de tarjetas con estados de interacción generalizados
El sistema SHALL aplicar a TODAS las tarjetas —competencias, categorías de stack, proyectos, timeline y contacto— un mismo lenguaje de superficie translúcida, borde visible, elevación `hover:-translate-y-1.5`, cambio de color de borde y escala de iconos y CTA, sin limitar estos efectos a la tarjeta de la tesis.

#### Scenario: Elevación de una tarjeta de competencia
- **WHEN** el puntero pasa sobre una tarjeta de competencia de «Sobre mí» con movimiento permitido
- **THEN** la tarjeta se eleva 1.5 unidades, su borde cambia al acento primario y el icono aumenta de escala

#### Scenario: Estado de reposo
- **WHEN** el puntero no está sobre ninguna tarjeta
- **THEN** todas muestran el borde tenue derivado de `#5BC0DE` y la superficie `#1C2541` con alpha reforzado sobre el fondo `#0B132B`

#### Scenario: CTA dentro de una tarjeta
- **WHEN** el puntero pasa sobre un botón de acción de una tarjeta con movimiento permitido
- **THEN** el botón aumenta ligeramente de escala sin perder contraste ni su nombre accesible

### Requirement: Revelados al scroll con whileInView
El sistema SHALL sustituir el mecanismo de `IntersectionObserver` y clases del prototipo por el componente existente basado en `whileInView` de `motion`, con revelado `once` y estado final visible cuando el movimiento está reducido.

#### Scenario: Entrada de una sección
- **WHEN** una sección entra en el viewport con movimiento permitido
- **THEN** su contenido se revela una sola vez mediante `whileInView` y termina en su estado visible

#### Scenario: Sin clases del prototipo
- **WHEN** se inspecciona el código de las secciones
- **THEN** no se usan `reveal-on-scroll`, `revealed` ni un `IntersectionObserver` propio para revelar secciones

### Requirement: Jerarquía tipográfica del rediseño
El sistema SHALL aplicar la escala visual del prototipo con la tipografía de interfaz aprobada: titular principal 48 px, titulares de sección 36 px, subtítulos 24 px, títulos de tarjeta 20 px, cuerpo 18/15/13 px, etiquetas 12 px y código 13 px, manteniendo JetBrains Mono para fragmentos de código y badges técnicos.

#### Scenario: Titular del hero
- **WHEN** se visualiza el hero en escritorio
- **THEN** el titular «Hola, soy Ignacio <navanacho/>» usa la escala de 48 px y el handle aparece en el acento primario `#5BC0DE`

#### Scenario: Fragmentos técnicos
- **WHEN** se visualizan badges de stack o el flujo de código
- **THEN** usan JetBrains Mono a 13 px y la interfaz circundante usa Plus Jakarta Sans

### Requirement: Píldoras, status y adornos sin datos inventados
El sistema SHALL reproducir los adornos visuales del prototipo —píldora de disponibilidad, píldora de categoría, fila de estado y separadores— usando únicamente texto y datos verificados, y NO SHALL mostrar cifras ni etiquetas de rendimiento no medidas.

#### Scenario: Píldora de disponibilidad
- **WHEN** se visualiza la píldora de disponibilidad del hero o de la cabecera
- **THEN** muestra «Disponible para nuevos proyectos» o «Disponible» en tonos de la paleta aprobada, sin teléfono ni correos inventados

#### Scenario: Barra de estado de la IDE card
- **WHEN** se visualiza la barra inferior de la IDE card
- **THEN** aparece «UTF-8 · LF» y «0 errors · 0 warnings» como adorno de interfaz, sin métricas de cobertura ni puntajes de rendimiento

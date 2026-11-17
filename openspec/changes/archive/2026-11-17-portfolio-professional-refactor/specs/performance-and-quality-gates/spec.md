## ADDED Requirements

### Requirement: Presupuestos de Core Web Vitals
El sistema SHALL perseguir los umbrales de referencia LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 en la página principal, registrando una medición antes de cerrar la implementación.

#### Scenario: Verificación de rendimiento
- **WHEN** se ejecuta una medición de rendimiento sobre la página principal
- **THEN** se registran LCP, INP y CLS y se documenta si cada valor está dentro del umbral definido

#### Scenario: Regresión detectada
- **WHEN** una medición supera alguno de los umbrales
- **THEN** la tarea correspondiente permanece abierta con la causa y la corrección documentadas

### Requirement: Carga sin saltos de layout
El sistema SHALL reservar espacio para fuentes y avatar, y SHALL cargar las tipografías con `next/font` sin peticiones externas en runtime.

#### Scenario: Fuentes
- **WHEN** carga la página por primera vez
- **THEN** no hay cambio visible de métricas tipográficas ni solicitudes a dominios externos

#### Scenario: Avatar
- **WHEN** se renderiza el avatar antes de completar la descarga
- **THEN** su contenedor conserva dimensiones reservadas y el contenido adyacente no se desplaza

### Requirement: Animaciones bajo demanda
El sistema SHALL limitar la hidratación de Framer Motion a los componentes que animan, usando revelados `once` cuando corresponda.

#### Scenario: Coste de hidratación
- **WHEN** se revisa el código de las secciones con movimiento
- **THEN** solo esas secciones montan lógica de animación en el cliente y los revelados se ejecutan una sola vez

### Requirement: Disciplina TDD con evidencia
Cada comportamiento SHALL implementarse con tests ejecutados en el orden RED, GREEN, TRIANGULATE y REFACTOR, conservando la salida de cada etapa como evidencia.

#### Scenario: Evidencia incompleta
- **WHEN** una etapa no tiene salida de test ejecutada registrada en `tests/evidence/`
- **THEN** el comportamiento no se marca como completado

#### Scenario: Aserciones triviales
- **WHEN** una prueba solo verifica que un valor definido es igual a sí mismo
- **THEN** se rechaza y se sustituye por una aserción sobre comportamiento observable

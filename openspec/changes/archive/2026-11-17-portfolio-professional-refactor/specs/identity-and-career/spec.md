## ADDED Requirements

### Requirement: Identidad y bio verbatim
El sistema SHALL mostrar el nombre "Ignacio Navarria", el rol "Software Developer & Data Analyst" y la bio exacta definida en `openspec/config.yaml`, sin reescrituras, recortes ni interpolaciones.

#### Scenario: Bio en la sección sobre mí
- **WHEN** se visualiza la sección "Sobre mí"
- **THEN** el texto coincide carácter por carácter con: "Soy Ignacio Navarria, un desarrollador apasionado por la creación de software funcional y estéticamente atractivo. Busco combinar diseño, rendimiento y escalabilidad en cada proyecto que desarrollo. Me motiva la mejora continua, el trabajo en equipo y los nuevos desafíos tecnológicos."

#### Scenario: Datos de identidad
- **WHEN** se visualiza la cabecera del portafolio
- **THEN** aparecen el nombre "Ignacio Navarria" y el handle `navanacho` tal como figuran en la configuración

### Requirement: Experiencia y educación reales
El sistema SHALL presentar la experiencia y la educación confirmadas, con la Tecnicatura en Programación — UTN marcada como finalizada en 2026 en lugar de "2024 - Actualidad / Estudiante".

#### Scenario: Experiencia
- **WHEN** se visualiza la sección de experiencia
- **THEN** aparecen "2023-actualidad Desarrollador Freelance Full Stack (Java/SQL)" y "2020-2023 Cajero Mayorista-Minorista, Mayorista Oscar David"

#### Scenario: Educación actualizada
- **WHEN** se visualiza la sección de educación
- **THEN** "Tecnicatura en Programación - UTN" figura como finalizada en 2026 y no aparecen las palabras "Actualidad" ni "Estudiante" asociadas a ese título

#### Scenario: Resto de la educación
- **WHEN** se visualiza la sección de educación
- **THEN** aparecen "Auxiliar y Cajero Bancario - Instituto La Bancaria (2019-2020)" y "Bachillerato en Economía y Administración (2014-2018)"

### Requirement: Stack y herramientas
El sistema SHALL listar exactamente las tecnologías y herramientas confirmadas, sin añadir nuevas por inferencia.

#### Scenario: Tecnologías
- **WHEN** se visualiza la sección de stack
- **THEN** aparecen HTML5, CSS3, JavaScript, React, Java, TypeScript, Python y Spring

#### Scenario: Herramientas
- **WHEN** se visualiza la sección de herramientas
- **THEN** aparecen VS Code, IntelliJ, Git, GitHub, Docker, PostgreSQL, MongoDB y Postman

### Requirement: Fuente única de datos del CV
El sistema SHALL publicar el CV nuevo en `assets/CV/CV-Ignacio-Navarria.pdf`, copiado desde `C:\Users\navar\Downloads\CV - Ignacio Navarria - Software Engineer & Data Analyst (General).pdf` (175437 bytes, confirmado), y NO SHALL usar `assest/CV/CV2.0.pdf` como enlace público o de descarga.

#### Scenario: CV canónico disponible
- **WHEN** se construye el enlace de descarga del CV
- **THEN** resuelve a `assets/CV/CV-Ignacio-Navarria.pdf` y el archivo existe

#### Scenario: Fuente heredada hasta la verificación final
- **WHEN** se inspecciona el repositorio durante la migración
- **THEN** `assest/` sigue presente como fuente legada, sin enlace público, hasta la verificación final, y se elimina recién en la tarea de limpieza

# thesis-project-showcase Specification

## Purpose
TBD - created by archiving change portfolio-professional-refactor. Update Purpose after archive.
## Requirements
### Requirement: Catálogo limitado a la tesis
El sistema SHALL mostrar exactamente un proyecto: "Tesis de Grado — Orquestación de Honeypots Research con n8n", y NO SHALL incluir Velco ni proyectos adicionales.

#### Scenario: Listado de proyectos
- **WHEN** se visualiza la sección de proyectos
- **THEN** aparece una sola tarjeta correspondiente a la tesis de grado

#### Scenario: Exclusión explícita
- **WHEN** se busca cualquier referencia a Velco u otros proyectos en el contenido renderizado
- **THEN** no se encuentra ninguna

### Requirement: Crédito a ambos autores
El sistema SHALL acreditar la tesis a "Ignacio Navarria" y "Germán Marino", exactamente como figuran en la sección "Autores" del README público verificado, y NO SHALL atribuir la obra en solitario ni alterar los nombres.

#### Scenario: Autores en la tarjeta y el modal
- **WHEN** se visualizan la tarjeta de la tesis y su modal de arquitectura
- **THEN** aparecen los créditos literales "Ignacio Navarria" y "Germán Marino", sin variantes ni atribución exclusiva a uno de ellos

### Requirement: Contenido verificado sin invenciones
El sistema SHALL usar solo componentes y capacidades confirmados por `openspec/config.yaml` y el README público del repositorio de la tesis, y NO SHALL publicar cifras, porcentajes ni resultados medidos no confirmados.

#### Scenario: Componentes de la arquitectura
- **WHEN** se lee la descripción de la tarjeta o del modal
- **THEN** los componentes mencionados se limitan a n8n, Cowrie, Dionaea, Docker, PostgreSQL, VirusTotal, AbuseIPDB, Grafana y los elementos documentados en el README (MITRE ATT&CK, consola SOC, GLPI), sin métricas numeradas

#### Scenario: Objetivos versus resultados
- **WHEN** se describen MTTD y MTTR
- **THEN** se presentan como objetivos de la tesis, nunca como valores medidos o logros cuantificados

### Requirement: Modal expandible del flujo de arquitectura
El sistema SHALL permitir expandir la tarjeta de la tesis en un modal que muestre el flujo de arquitectura y SHALL poder cerrarse sin recargar la página.

#### Scenario: Expandir el proyecto
- **WHEN** se activa la acción "Ver arquitectura" de la tarjeta
- **THEN** se abre un modal con el flujo: captura en honeypots (Cowrie/Dionaea), orquestación en n8n, enriquecimiento (VirusTotal/AbuseIPDB), persistencia en PostgreSQL y visualización en Grafana

#### Scenario: Cerrar el modal
- **WHEN** se activa el botón de cierre del modal
- **THEN** el modal desaparece y el foco vuelve al control que lo abrió

### Requirement: Enlace al repositorio confirmado
El sistema SHALL enlazar la tarjeta y el modal al repositorio confirmado por el usuario.

#### Scenario: Acceder al código
- **WHEN** se activa el enlace "Ver repositorio"
- **THEN** se navega a `https://github.com/germarino18/Automatizacion_con_Honeypots_Tesis.git` o a su vista canónica sin `.git`


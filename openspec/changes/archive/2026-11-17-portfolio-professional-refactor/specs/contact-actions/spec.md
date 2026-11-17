## ADDED Requirements

### Requirement: Correo público funcional
El sistema SHALL mostrar `navarria332@gmail.com` como texto visible y SHALL abrir un cliente de correo mediante `mailto:` al activarlo.

#### Scenario: Correo visible
- **WHEN** se visualiza la sección de contacto
- **THEN** el correo `navarria332@gmail.com` aparece como texto legible, no solo como icono

#### Scenario: Acción de escribir
- **WHEN** se activa el enlace del correo
- **THEN** se intenta abrir `mailto:navarria332@gmail.com`

### Requirement: Enlaces externos confirmados
El sistema SHALL enlazar GitHub y LinkedIn exclusivamente con los valores confirmados, abriendo los enlaces externos de forma segura, y NO SHALL publicar el teléfono en ningún lugar del sitio.

#### Scenario: Perfiles profesionales
- **WHEN** se activan los enlaces de perfil
- **THEN** se navega a `https://github.com/navanacho` y a `https://www.linkedin.com/in/ignacio-navarria-151787450` respectivamente, con las protecciones habituales de `rel` para destinos externos

#### Scenario: Teléfono no publicado
- **WHEN** se inspeccionan la sección de contacto, `data/profile.ts` y los metadatos
- **THEN** no aparece el teléfono ni ningún URI `tel:`, siendo el correo el único contacto público

### Requirement: Descarga del CV sin ramas inalcanzables
El sistema SHALL ofrecer un enlace de descarga directo al CV canónico, sin alerts condicionales inalcanzables ni botones sin manejador.

#### Scenario: Descargar CV
- **WHEN** se activa la acción "Descargar CV"
- **THEN** el navegador abre o descarga `assets/CV/CV-Ignacio-Navarria.pdf`

#### Scenario: Sin controles muertos
- **WHEN** se inspeccionan todos los botones de la sección de contacto
- **THEN** cada uno tiene una acción real asociada y no depende de JavaScript para volverse visible

### Requirement: Contacto usable sin JavaScript
El sistema SHALL renderizar la información de contacto en el HTML inicial, de modo que enlaces y correo estén disponibles antes de cualquier hidratación.

#### Scenario: Contenido inicial
- **WHEN** se obtiene el HTML del servidor antes de ejecutar scripts
- **THEN** correo, GitHub, LinkedIn y enlace al CV ya están presentes en el marcado, sin teléfono

## MODIFIED Requirements

### Requirement: Correo público funcional
El sistema SHALL mostrar `navarria332@gmail.com` como texto visible en la sección de contacto y SHALL abrir un cliente de correo mediante `mailto:` al activarlo, además de ofrecer un botón que copie esa misma dirección al portapapeles con confirmación visible y anunciada, sin afirmar que se envió ningún mensaje.

#### Scenario: Correo visible
- **WHEN** se visualiza la tarjeta de contacto
- **THEN** el correo `navarria332@gmail.com` aparece como texto legible dentro del bloque de canal directo, no solo como icono

#### Scenario: Acción de escribir
- **WHEN** se activa el enlace del correo
- **THEN** se intenta abrir `mailto:navarria332@gmail.com`

#### Scenario: Copiar correo
- **WHEN** se activa el botón «Copiar» junto al correo
- **THEN** se escribe `navarria332@gmail.com` en el portapapeles y aparece una confirmación de copiado, sin mensajes de envío

#### Scenario: Fallo del portapapeles
- **WHEN** la escritura en el portapapeles falla
- **THEN** el correo permanece seleccionable como texto y no se muestra una confirmación engañosa

### Requirement: Enlaces externos confirmados
El sistema SHALL enlazar GitHub y LinkedIn exclusivamente con los valores confirmados, abriendo los enlaces externos de forma segura, y NO SHALL publicar el teléfono en ningún lugar del sitio. En la tarjeta de contacto estos enlaces SHALL presentarse como píldoras con icono y texto, y ninguno SHALL usar `href="#"` vacío.

#### Scenario: Perfiles profesionales
- **WHEN** se activan las píldoras de perfil en la tarjeta de contacto
- **THEN** se navega a `https://github.com/navanacho` y a `https://www.linkedin.com/in/ignacio-navarria-151787450` respectivamente, con `rel="noopener noreferrer"` para destinos externos

#### Scenario: Teléfono no publicado
- **WHEN** se inspeccionan la sección de contacto, `data/profile.ts` y los metadatos
- **THEN** no aparece el teléfono ni ningún URI `tel:`, siendo el correo el único contacto público

#### Scenario: Sin píldoras vacías
- **WHEN** se inspeccionan todos los enlaces de la tarjeta de contacto
- **THEN** ninguno apunta a `#` ni a dominios no confirmados, y cada píldora muestra texto junto a su icono

### Requirement: Descarga del CV sin ramas inalcanzables
El sistema SHALL ofrecer un enlace de descarga directo al CV canónico `assets/CV/CV-Ignacio-Navarria.pdf` en la tarjeta de contacto y en el CTA de la cabecera, sin alerts condicionales inalcanzables ni botones sin manejador.

#### Scenario: Descargar CV desde contacto
- **WHEN** se activa la acción «Descargar CV» en la tarjeta de contacto
- **THEN** el navegador abre o descarga `assets/CV/CV-Ignacio-Navarria.pdf`

#### Scenario: Descargar CV desde la cabecera
- **WHEN** se activa el CTA «Descargar CV» de la cabecera
- **THEN** se resuelve el mismo archivo canónico relativo, sin dominio absoluto

#### Scenario: Sin controles muertos
- **WHEN** se inspeccionan todos los botones de la cabecera y de la sección de contacto
- **THEN** cada uno tiene una acción real asociada y no depende de JavaScript para volverse visible

### Requirement: Contacto usable sin JavaScript
El sistema SHALL renderizar la información de contacto en el HTML inicial, de modo que enlaces y correo estén disponibles antes de cualquier hidratación.

#### Scenario: Contenido inicial
- **WHEN** se obtiene el HTML del servidor antes de ejecutar scripts
- **THEN** correo, GitHub, LinkedIn y enlace al CV ya están presentes en el marcado, sin teléfono y sin formulario

## ADDED Requirements

### Requirement: Sin formulario de contacto ficticio
El sistema SHALL sustituir el formulario del prototipo por el bloque de acciones reales y NO SHALL renderizar campos de nombre, correo, asunto o mensaje, ni mensajes de éxito que afirmen que un mensaje fue enviado.

#### Scenario: Bloque derecho de la tarjeta
- **WHEN** se visualiza la columna derecha de la tarjeta de contacto
- **THEN** muestra acciones reales sobre datos verificados: copiar correo, descargar CV y abrir GitHub y LinkedIn

#### Scenario: Ausencia de formulario
- **WHEN** se inspecciona el marcado de la sección de contacto
- **THEN** no existen elementos `form`, `input`, `textarea` ni el texto «¡Mensaje enviado con éxito!»

#### Scenario: Sin correo inventado
- **WHEN** se buscan direcciones de correo en la sección de contacto
- **THEN** la única dirección presente es `navarria332@gmail.com`, sin `ignacio.dev@navanacho.com`

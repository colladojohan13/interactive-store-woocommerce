# Interactive Store — dirección visual

## Idea de marca

**Technology that comes to life.** Una tienda tecnológica clara, precisa y confiable. La experiencia de compra debe poner el producto por delante del efecto visual. Los modelos 3D y AR serán demostraciones útiles del producto, no decoración permanente.

La maqueta de referencia se encuentra en [brand-preview.html](brand-preview.html). Es una muestra visual independiente; la Home definitiva se construirá en WordPress.

## Paleta global

Configurada en **Blocksy > Customize > Colors > Global Color Palette** el 28-09-2026.

| Color de Blocksy | Valor | Uso |
| --- | --- | --- |
| 1 | `#384FC7` | Acento, enlaces y acciones principales |
| 2 | `#283BA6` | Hover y estado activo del acento |
| 3 | `#525B6B` | Texto secundario y cuerpo |
| 4 | `#171C28` | Titulares, navegación y texto de máxima jerarquía |
| 5 | `#DCE2E8` | Bordes y separadores |
| 6 | `#F1F3F6` | Fondos de secciones discretas |
| 7 | `#F7F8FA` | Fondo general claro |
| 8 | `#FFFFFF` | Tarjetas y superficies principales |

Usar el índigo con moderación: botones de compra, enlaces, selección, foco y pequeñas señales de navegación. Mantener fichas de producto y fotografía sobre blanco o neutros claros. Reservar fondos oscuros para bloques puntuales, no para toda la tienda.

### Contraste comprobado

- Acento `#384FC7` sobre blanco: **6.75:1**.
- Texto secundario `#525B6B` sobre blanco: **6.85:1**.
- Texto principal `#171C28` sobre blanco: **17.03:1**.

Estos pares superan el mínimo 4.5:1 de WCAG AA para texto normal. Comprobar de nuevo cualquier texto colocado sobre fotografías, gradientes, estados hover o fondos distintos.

## Tipografía

**Familia:** pila sans serif del sistema, configurada como `System Default` en Blocksy. Mantiene la carga rápida y evita una conexión externa de Google Fonts. Blocksy mostró un aviso de privacidad al probar Manrope externo, por lo que no se activó.

**Jerarquía de referencia para las páginas que crearemos:**

| Elemento | Desktop | Mobile | Peso |
| --- | --- | --- | --- |
| H1 de Home | 48–56 px | 34–40 px | 700 |
| H2 de sección | 30–36 px | 26–30 px | 700 |
| Título de producto | 18–20 px | 17–18 px | 600 |
| Cuerpo | 16 px | 16 px | 400 |
| Microcopy y metadatos | 13–14 px | 13–14 px | 500 |

Evitar párrafos extensos centrados y texto en mayúsculas salvo etiquetas breves. Estas medidas son una guía para Home y catálogo; aún no se cambiaron los tamaños globales de Blocksy porque las páginas no tienen contenido para validar la jerarquía.

## Componentes y tono

- **Botón principal:** índigo con texto blanco; hover índigo oscuro.
- **Botón secundario:** fondo blanco, borde índigo y texto índigo.
- **Tarjetas:** superficie blanca, borde sutil; sombra tenue solo si aporta separación.
- **Espaciado:** generoso y consistente, con ritmo de 8 px; áreas clicables cómodas en móvil.
- **Movimiento:** transiciones breves para interacción. Sin animaciones continuas ni parallax.
- **Fotografía:** productos reales, iluminación suave, ángulo consistente y fondos limpios. Evitar imágenes genéricas de circuitos/neón.
- **Copy:** frases directas y útiles: especificaciones, beneficios verificables y pasos de compra claros.

## Logo

El símbolo combina un punto de enfoque con cuatro esquinas abiertas. Comunica interacción y atención al producto sin usar efectos 3D en la identidad. El wordmark horizontal muestra “Interactive Store” en tinta oscura; hay una variante clara para un futuro fondo oscuro.

| Archivo fuente | Uso |
| --- | --- |
| [interactive-store-mark.svg](assets/interactive-store-mark.svg) | Símbolo escalable |
| [interactive-store-logo.svg](assets/interactive-store-logo.svg) | Wordmark oscuro |
| [interactive-store-logo-light.svg](assets/interactive-store-logo-light.svg) | Wordmark blanco para superficies oscuras |

Las versiones PNG derivadas están en `assets/`: `interactive-store-icon-512.png`, `interactive-store-logo-720.png` y `interactive-store-logo-light-720.png`. WordPress usa el PNG horizontal en el elemento Logo de Blocksy y el PNG de 512 px como Site Icon. El título del sitio sigue siendo “Interactive Store”, pero su visualización junto al logo está desactivada para evitar duplicación. El tagline guardado en Site Identity es “Technology that comes to life.”

Alturas configuradas: 50 px en desktop, 40 px en tablet y 34 px en mobile. Se comprobaron a 1440, 820, 390 y 320 px.

## Mantenimiento

Editar la paleta en **Appearance > Customize > Colors**. Los ocho colores alimentan las variables globales de Blocksy y están disponibles en el editor de bloques. Cambiar una muestra central mantiene la tienda coherente. La tipografía se gestiona en **Appearance > Customize > Typography**.

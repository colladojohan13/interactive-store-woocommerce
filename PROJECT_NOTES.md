# Interactive Store — notas de desarrollo

## Entorno

- Instalación local: sitio `interactive-store.local` en LocalWP (la ruta depende del equipo).
- Tema activo: Interactive Store Child 1.0.0 sobre Blocksy 2.1.57
- Plugin instalado y activo: WooCommerce 11.1.2
- Visibilidad de WooCommerce: Coming Soon
- La página Home es la portada estática.

## Cabecera responsive (Blocksy Header Builder)

Configurada y publicada desde **Appearance > Customize > Header**. Los ajustes se guardan en WordPress; no se modificaron archivos del tema padre.

| Vista | Fila principal | Panel lateral |
| --- | --- | --- |
| Desktop | Logo, Menu 1, Search, Button (My Account), Cart | — |
| Tablet/Mobile | Logo, Search, Cart, Trigger | Mobile Menu, Button (My Account) |

- **Mobile Menu > Select Menu:** `Main Menu`, que contiene Home, Shop, Computers, Electronics y Home Tech. Esto evita que Blocksy muestre automáticamente todas las páginas, incluidas Checkout y Sample Page.
- **Button:** estilo Ghost, tamaño Small, texto `My Account`, URL `/my-account/`, clase `account-button`, etiqueta accesible `My Account`; visible para usuarios conectados y desconectados.
- Search y Cart son los elementos nativos de Blocksy. Cart conserva su acceso en la fila tablet/mobile.
- El panel lateral muestra los mismos enlaces del menú principal, seguidos por el botón My Account.

## Verificación

- Desktop: orden y enlace de My Account comprobados en la página publicada.
- Tablet (820 px): logo, búsqueda, carrito y menú visibles sin solaparse.
- Mobile (390 px): logo, búsqueda, carrito y menú visibles; el panel lateral contiene Home, Shop y My Account. El enlace My Account apunta a `/my-account/`.

## Edición posterior

- Para modificar la distribución: **Appearance > Customize > Header**, alternar entre **Desktop Header** y **Tablet / Mobile Header** en el constructor.
- Para cambiar las páginas del menú: **Appearance > Menus > Main Menu**. Al estar seleccionado también para Mobile Menu, los cambios de enlaces se reflejarán en ambas vistas.
- Para editar el botón: **Customize > Header > Button**. La clase `account-button` queda disponible para ajustes CSS futuros.

## Próximo trabajo

La dirección visual, paleta global y logo están en [BRAND_GUIDE.md](BRAND_GUIDE.md).

## Home

### Portada codificada (actual)

La Home activa usa `theme/interactive-store-child/front-page.php` y `theme/interactive-store-child/assets/css/home.css`. Sigue la maqueta visual `assets/home-final-concept.png`: hero editorial, cuatro categorías, cuatro productos y un módulo reservado para 3D. Mantiene la cabecera y el pie de Blocksy. La activación inicial del child theme copia ajustes del tema padre (cabecera, menú, paleta, logo y CSS adicional). La antigua Home de Gutenberg permanece en la base de datos como respaldo y su fuente sigue en `patterns/home-blocks.html`.

- **Imagen hero:** asignar la imagen destacada a **Pages > Home**.
- **Imágenes de categorías:** asignar miniaturas en **Products > Categories** a Computers, Electronics, Accessories y Home Tech.
- **Imágenes de productos:** asignar imagen principal en cada ficha de WooCommerce. Las tarjetas usan la imagen y el precio reales del producto publicado.
- **Productos destacados:** se enlazan por SKU (`IS-ARC14-DEMO`, `IS-PULSE-DEMO`, `IS-LINK-DEMO`, `IS-HAVEN-DEMO`). Si falta un producto publicado y visible, la tarjeta muestra “Coming soon” sin enlace ni precio ficticio.
- **3D:** módulo visual reservado con aviso “coming soon”; falta implementar el visor real.
- **Textos y estructura:** editar `front-page.php`; estilos responsive: `assets/css/home.css` del child theme.

La tienda sigue en modo **Coming Soon**. El diseño de la Home y las fichas son una demostración para portafolio.

### Portada anterior (respaldo)

La portada estática **Home** (ID 14) contiene bloques nativos de Gutenberg: hero en dos columnas con titular y CTA a `/shop/`, imagen editorial original y una sección de introducción con tres tarjetas. Se ocultó el título automático solo para esta página desde **Editar Home > Blocksy Page Settings > Page Title > Disabled**, dejando un único H1 en el contenido. La imagen está en Medios y su fuente local es [assets/home-hero-studio.png](assets/home-hero-studio.png); el texto alternativo describe los dispositivos visibles.

Los estilos se publicaron en **Appearance > Customize > Additional CSS**. La copia de referencia está en [assets/home.css](assets/home.css). Para editar textos, botones o imagen: **Pages > Home > Edit**; para espaciado, tamaño de imagen y responsive: **Additional CSS**. Se verificó visualmente en escritorio, 390 px y 320 px. El sitio sigue en modo Coming Soon.

## Categorías y navegación de la tienda

Categorías principales creadas en **Products > Categories** (sin productos ni miniaturas todavía):

| Categoría | Slug | Ubicación |
| --- | --- | --- |
| Computers | `computers` | Home y Main Menu |
| Electronics | `electronics` | Home y Main Menu |
| Accessories | `accessories` | Enlace dentro de la tarjeta Electronics en Home |
| Home Tech | `home-tech` | Home y Main Menu |

El menú principal se guarda en **Appearance > Menus > Main Menu** y sigue asignado a Header Menu 1. Blocksy lo selecciona también para el panel móvil. Orden: Home, Shop, Computers, Electronics, Home Tech. Las tres tarjetas de Home enlazan a Computers, Electronics y Home Tech; el texto «accessories» de la tarjeta central lleva a Accessories. Se verificó que el enlace de Computers abre su archivo de categoría. Como todavía no hay productos, WooCommerce muestra el estado vacío.

En móvil, el elemento activo del panel lateral heredaba un azul oscuro con poco contraste. Se añadió una regla en **Additional CSS**, reflejada al final de [assets/home.css](assets/home.css), para mostrarlo en blanco sobre el fondo oscuro.

Próximo paso: poblar el catálogo con productos de ejemplo propios o claramente identificados como demostración y crear la sección de productos de la portada. No instalar dependencias salvo necesidad concreta.

## Shop y primer producto de demostración

En **Appearance > Customize > WooCommerce > Product Archives** se cambió la cuadrícula de Shop de cuatro a tres columnas. Se mantiene el resto de opciones por defecto hasta revisar las tarjetas con productos visibles.

Se publicó un producto simple en **Products**: **Arc 14 Laptop — Concept**, categoría Computers, SKU `IS-ARC14-DEMO`, precio ilustrativo RD$64,900. Los textos indican que es un concepto ficticio y que no existe inventario físico. Su ficha reproducible y el prompt de la imagen están en [catalog/arc-14.md](catalog/arc-14.md). La imagen generada está en [assets/arc-14-laptop-concept.png](assets/arc-14-laptop-concept.png), cargada también a Medios con texto alternativo y asignada como imagen principal. Se desactivaron reseñas y disponibilidad para POS en esta ficha de demostración. Verificado el producto en Shop y en su página individual.

Otros tres productos simples están guardados como borradores, uno por cada categoría restante: **Pulse Wireless Headphones — Concept** (Electronics), **Link USB-C Dock — Concept** (Accessories) y **Haven Smart Speaker — Concept** (Home Tech). Sus datos, precios ilustrativos, imágenes y prompts están en [catalog/more-concepts.md](catalog/more-concepts.md). Se desactivaron reseñas y POS. Falta subir sus tres PNG a Medios, asignar imagen principal y texto alternativo, y publicarlos. Después se podrá añadir una selección de productos a Home y revisar la cuadrícula completa.

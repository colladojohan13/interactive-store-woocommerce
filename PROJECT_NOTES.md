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

## Ampliación de demostración (octubre de 2026)

- El catálogo local ahora tiene ocho productos ficticios publicados, con imagen y precio ilustrativo. Los cuatro nuevos conceptos son Vista, Frame, Form y Glow; sus datos están en `catalog/new-concepts.md`.
- La Home del child theme incorpora una franja de recorrido, un módulo editorial, otra fila de productos y colecciones temáticas. La tienda y la ficha WooCommerce reciben estilos en `assets/css/store.css`.
- Se creó la página **Wishlist** (ID 75) con `[interactive_store_wishlist]`, enlazada desde `Main Menu`. Su lista se guarda solamente en el navegador del visitante.
- WooCommerce contiene tres pedidos ficticios: `IS-SEED-1001` (#72, processing), `IS-SEED-1002` (#73, completed) y `IS-SEED-1003` (#74, cancelled). Son visibles en **WooCommerce → Orders**. El generador `tools/seed-woocommerce-demo.php` es idempotente y no envía correos.
- Solo en `interactive-store.local` se habilitó un método **Demo order — no payment** y un envío ilustrativo de RD$250 para probar el checkout. No se cobra dinero ni se realiza una entrega. La configuración reproducible está en `tools/configure-local-checkout.php`.
- La demo de GitHub Pages tiene checkout y pedidos separados de WordPress: usa datos ficticios guardados en el navegador y no sincroniza órdenes con WooCommerce.
- La ficha de Arc 14 en WooCommerce conserva la imagen principal y añade dos imágenes en su galería (adjuntos 78 y 79), la pestaña «Concept details», enlaces comparativos y el visor 3D bajo carga voluntaria. La demo pública añade miniaturas, ampliación de imagen y las mismas secciones descriptivas. Las fotos JPEG de la demo pública reducen el peso conjunto de la galería aproximadamente de 4.9 MB a 0.33 MB.
- El Shop público añade filtros de categoría, precio y orden, búsqueda, resultados y un panel móvil con aplicación explícita. El Shop local usa los filtros nativos de WooCommerce con una presentación móvil. Se comprobó que el filtro «Under RD$10,000» reduce el resultado local de 8 a 5 productos.

## Home

### Portada codificada (actual)

La Home activa usa `theme/interactive-store-child/front-page.php` y `theme/interactive-store-child/assets/css/home.css`. Sigue la maqueta visual `assets/home-final-concept.png`: hero editorial, cuatro categorías, cuatro productos y un módulo reservado para 3D. Mantiene la cabecera y el pie de Blocksy. La activación inicial del child theme copia ajustes del tema padre (cabecera, menú, paleta, logo y CSS adicional). La antigua Home de Gutenberg permanece en la base de datos como respaldo y su fuente sigue en `patterns/home-blocks.html`.

- **Imagen hero:** `assets/home-hero-panoramic.png`, asignada como imagen destacada de **Pages > Home** (adjunto 62 en la instalación local).
- **Imágenes de categorías:** `assets/category-computers-wide.png`, `category-electronics-wide.png`, `category-accessories-wide.png` y `category-home-tech-wide.png`, asignadas en **Products > Categories** (adjuntos 58–61 en la instalación local). Los prompts están en `assets/home-imagery-prompts.md`.
- **Imágenes de productos:** asignar imagen principal en cada ficha de WooCommerce. Las tarjetas usan la imagen y el precio reales del producto publicado.
- **Productos destacados:** se enlazan por SKU (`IS-ARC14-DEMO`, `IS-PULSE-DEMO`, `IS-LINK-DEMO`, `IS-HAVEN-DEMO`). Si falta un producto publicado y visible, la tarjeta muestra “Coming soon” sin enlace ni precio ficticio.
- **3D:** iframe del visor de laptop en `https://docs.cecomsa.com/laptop-3d/index.html` en la Home local y la vista pública. El visor también aparece en la ficha de Arc 14 bajo carga voluntaria. Usa un modelo externo distinto y la ficha lo aclara expresamente.
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

Los otros tres productos simples se crearon inicialmente como borradores, uno por cada categoría restante: **Pulse Wireless Headphones — Concept** (Electronics), **Link USB-C Dock — Concept** (Accessories) y **Haven Smart Speaker — Concept** (Home Tech). Sus datos, precios ilustrativos, imágenes y prompts están en [catalog/more-concepts.md](catalog/more-concepts.md). Se desactivaron reseñas y POS. En la revisión de la Home codificada, los cuatro productos aparecen publicados con foto, enlace y precio de WooCommerce.

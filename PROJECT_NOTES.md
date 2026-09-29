# Interactive Store — notas de desarrollo

## Entorno

- Instalación local: sitio `interactive-store.local` en LocalWP (la ruta depende del equipo).
- Tema activo: Blocksy 2.1.57 (sin child theme)
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

Se preparó un borrador de producto simple en **Products**: **Arc 14 Laptop — Concept**, categoría Computers, SKU `IS-ARC14-DEMO`, precio ilustrativo RD$64,900. Los textos indican que es un concepto ficticio y que no existe inventario físico. Su ficha reproducible y el prompt de la imagen están en [catalog/arc-14.md](catalog/arc-14.md). La imagen generada está en [assets/arc-14-laptop-concept.png](assets/arc-14-laptop-concept.png). Pendiente: cargar esa imagen a Medios, asignarla como imagen destacada y publicar la ficha.

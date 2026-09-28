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

- **Mobile Menu > Select Menu:** `Main Menu`, que actualmente contiene Home y Shop. Esto evita que Blocksy muestre automáticamente todas las páginas, incluidas Checkout y Sample Page.
- **Button:** estilo Ghost, tamaño Small, texto `My Account`, URL `/my-account/`, clase `account-button`, etiqueta accesible `My Account`; visible para usuarios conectados y desconectados.
- Search y Cart son los elementos nativos de Blocksy. Cart conserva su acceso en la fila tablet/mobile.
- El panel lateral muestra Home y Shop, seguidos por el botón My Account.

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

Próximo paso: crear categorías reales en WooCommerce, vincularlas desde la Home y ampliar el menú. Después se poblará el catálogo y la sección de productos de la portada. No instalar dependencias salvo necesidad concreta.

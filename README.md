# Interactive Store

A portfolio project for a modern technology storefront built with **WordPress, WooCommerce, Blocksy, Gutenberg, and project CSS**. The local site is being developed step by step rather than imported from a finished store template.

**Public visual preview:** [View the storefront concept](https://colladojohan13.github.io/interactive-store-woocommerce/) on GitHub Pages. The preview includes an expanded Home, a searchable and filterable [Shop](https://colladojohan13.github.io/interactive-store-woocommerce/shop.html), eight product detail views, a wishlist, a demo bag, simulated checkout, and [demo orders](https://colladojohan13.github.io/interactive-store-woocommerce/orders.html). The products, prices, customers and orders are fictional. The static preview stores favorites and orders in each visitor's browser only and never takes payment or sends a real order. The embedded 3D laptop viewer is hosted separately at `docs.cecomsa.com`.

![Interactive Store wordmark](assets/interactive-store-logo-720.png)

## Current work

- Responsive Blocksy header with product search, cart, and My Account access.
- Global color palette and original logo system.
- Code based responsive homepage in a Blocksy child theme, following the approved visual concept in `assets/home-final-concept.png`.
- Original editorial hero and four wide category photographs are assigned in the local WordPress site; their sources and prompts are in `assets/`.
- Four WooCommerce product categories linked from Home and the main navigation.
- Shop archive configured as a three-column product grid. Eight fictional concepts appear dynamically on Home when published in WooCommerce. The local Shop has a mobile filter drawer for category, price and sorting; the public preview adds product search, applied filter chips and a result count. A browser-local wishlist is available in the child theme.
- Arc 14 has three original concept images in both storefronts, an expanded product story, descriptive concept details and comparison links. Its separate 3D laptop demo loads only when requested and is clearly identified as a different model.
- Local WooCommerce contains three clearly marked sample orders under **WooCommerce → Orders**. The idempotent generator is [`tools/seed-woocommerce-demo.php`](tools/seed-woocommerce-demo.php); it preserves existing products and non-demo orders.
- The public [demo orders](https://colladojohan13.github.io/interactive-store-woocommerce/orders.html) page includes a screenshot of the local WooCommerce order dashboard, with fictional data, so portfolio visitors can inspect both the customer view and native administration.
- The LocalWP checkout has a demonstration payment title that collects no money and one illustrative Dominican Republic delivery method. [`tools/configure-local-checkout.php`](tools/configure-local-checkout.php) refuses to run outside `interactive-store.local`.
- Site currently remains in WooCommerce **Coming Soon** mode. Real payment and shipping setup and analytics tracking remain future work.

## Repository contents

| Path | Purpose |
| --- | --- |
| [`BRAND_GUIDE.md`](BRAND_GUIDE.md) | Brand, palette, typography, and logo usage |
| [`PROJECT_NOTES.md`](PROJECT_NOTES.md) | Implemented WordPress and Blocksy settings |
| [`theme/interactive-store-child/`](theme/interactive-store-child/) | Active Home template and responsive styles; install alongside Blocksy |
| [`patterns/home-blocks.html`](patterns/home-blocks.html) | Previous Gutenberg Home, retained as a fallback |
| [`assets/home.css`](assets/home.css) | Previous Home CSS and mobile menu contrast rule in WordPress Additional CSS |
| [`assets/`](assets/) | Logo sources, PNG exports, and homepage image |
| [`catalog/arc-14.md`](catalog/arc-14.md) | Reproducible data and image prompt for the first demo product |
| [`catalog/more-concepts.md`](catalog/more-concepts.md) | Data and image prompts for the next three demo products |
| [`brand-preview.html`](brand-preview.html) | Early visual direction reference |
| [`index.html`](index.html), [`shop.html`](shop.html), [`product.html`](product.html), [`wishlist.html`](wishlist.html), [`bag.html`](bag.html), [`checkout.html`](checkout.html), [`orders.html`](orders.html), and preview styles/scripts | Static GitHub Pages portfolio preview with a browser-local demo order flow |
| [`tools/seed-woocommerce-demo.php`](tools/seed-woocommerce-demo.php) | Idempotent local WooCommerce product and sample order setup |
| [`tools/configure-local-checkout.php`](tools/configure-local-checkout.php) | LocalWP-only no-payment checkout and illustrative delivery setup |
| [`portfolio/upwork-cover.html`](portfolio/upwork-cover.html), [`assets/upwork-cover-desktop-mobile.jpg`](assets/upwork-cover-desktop-mobile.jpg) | Editable desktop/mobile Project Catalog cover and exported image |

The hero image is a conceptual, AI generated composition for the fictional store. It does not represent a listed product or a manufacturer.

## Reproduce locally

1. Create a fresh local WordPress site and install the **Blocksy** theme and **WooCommerce** plugin. No other plugin is required for the work in this repository.
2. Create `Home`, set it as the static homepage under **Settings → Reading**, and keep the WooCommerce pages generated by its setup.
3. Configure the Blocksy header and global palette according to [`PROJECT_NOTES.md`](PROJECT_NOTES.md) and [`BRAND_GUIDE.md`](BRAND_GUIDE.md).
4. Copy `theme/interactive-store-child` into `wp-content/themes/` and activate **Interactive Store Child**. Its first activation copies the existing Blocksy theme settings into the child theme.
5. Keep **Home** as the static front page. `front-page.php` supplies the visible Home; the Gutenberg page content remains in WordPress as a fallback.
6. Create the four product categories and configure `Main Menu` as described in [`PROJECT_NOTES.md`](PROJECT_NOTES.md). The Home links use the category slugs listed there.
7. Assign `assets/home-hero-panoramic.png` as the **Home** featured image, and the four `assets/category-*-wide.png` images as the matching **Products → Categories** thumbnails. The local site already has these assignments. Add the catalog product images as WooCommerce featured images. For Arc 14, assign the side and workspace images as its two gallery images. The template displays clean placeholders until any missing image is assigned.
8. Add the eight demo products using the SKUs in [`catalog/`](catalog/), or run the local seed script using WP-CLI. The Home cards display a live product only when its SKU is published and visible; otherwise that card reads “Coming soon.”
9. Create a **Wishlist** page with `[interactive_store_wishlist]` and add it to the menu. It saves a shortlist in the current browser only.
10. In the local site only, run the checkout configuration script if you need to place WooCommerce test orders through the checkout. Leave Coming Soon mode in place until the store is ready to be public.

This repository intentionally excludes WordPress Core, third party theme and plugin packages, the database, user accounts, credentials, and machine specific files. It is a source and configuration record of work in progress, not a one command deployable site.

## Next milestones

The Home and Arc 14 detail pages embed an external 3D laptop demo on request. It uses a separate model and is a visual demonstration, not a true Arc 14 viewer. The static checkout and order history illustrate the intended customer journey, but they are not WooCommerce pages and cannot collect payments or share orders between visitors. The local WordPress installation uses native WooCommerce orders. Further work includes payment and shipping configuration for a real store, analytics, and measured performance testing on production hosting.

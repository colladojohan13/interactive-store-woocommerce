<?php
/**
 * Interactive Store child theme.
 *
 * @package Interactive_Store_Child
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
	if ( ! is_front_page() ) {
		return;
	}

	$path = get_stylesheet_directory() . '/assets/css/home.css';
	wp_enqueue_style(
		'interactive-store-home',
		get_stylesheet_directory_uri() . '/assets/css/home.css',
		array(),
		file_exists( $path ) ? (string) filemtime( $path ) : '1.0.0'
	);
}, 20 );

/**
 * Keep the existing Blocksy logo, header, menu and palette on first activation.
 * WordPress stores theme mods under each stylesheet name.
 */
function interactive_store_migrate_blocksy_settings() {
	if ( get_option( 'interactive_store_child_settings_migrated' ) ) {
		return;
	}

	$child_option = 'theme_mods_interactive-store-child';
	$child_mods   = get_option( $child_option );
	$parent_mods  = get_option( 'theme_mods_blocksy' );

	if ( is_array( $parent_mods ) ) {
		// WordPress may have created a partial child option before this hook runs.
		// Keep any settings that were already customized in the child theme.
		update_option( $child_option, array_merge( $parent_mods, (array) $child_mods ) );
	}

	if ( ! wp_get_custom_css() && wp_get_custom_css( 'blocksy' ) ) {
		wp_update_custom_css_post( wp_get_custom_css( 'blocksy' ) );
	}

	update_option( 'interactive_store_child_settings_migrated', 1 );
}
add_action( 'after_switch_theme', 'interactive_store_migrate_blocksy_settings' );
add_action( 'init', 'interactive_store_migrate_blocksy_settings', 1 );

/** Style WooCommerce screens and keep the small demo wishlist in this browser. */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! function_exists( 'is_woocommerce' ) ) {
		return;
	}
	$store_page = is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_page( 'wishlist' );
	if ( ! $store_page ) {
		return;
	}
	$css = get_stylesheet_directory() . '/assets/css/store.css';
	wp_enqueue_style( 'interactive-store-shop', get_stylesheet_directory_uri() . '/assets/css/store.css', array(), file_exists( $css ) ? (string) filemtime( $css ) : '1.0.0' );
	$js = get_stylesheet_directory() . '/assets/js/wishlist.js';
	wp_enqueue_script( 'interactive-store-wishlist', get_stylesheet_directory_uri() . '/assets/js/wishlist.js', array(), file_exists( $js ) ? (string) filemtime( $js ) : '1.0.0', true );
	$store_js = get_stylesheet_directory() . '/assets/js/store.js';
	wp_enqueue_script( 'interactive-store-interactions', get_stylesheet_directory_uri() . '/assets/js/store.js', array(), file_exists( $store_js ) ? (string) filemtime( $store_js ) : '1.0.0', true );
	$items = array();
	foreach ( wc_get_products( array( 'status' => 'publish', 'limit' => 100 ) ) as $product ) {
		$id = $product->get_id();
		if ( ! $product || 'publish' !== $product->get_status() || ! $product->is_visible() ) {
			continue;
		}
		$items[] = array(
			'id' => $id,
			'name' => $product->get_name(),
			'url' => get_permalink( $id ),
			'image' => wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_thumbnail' ),
			'price' => wp_strip_all_tags( $product->get_price_html() ),
		);
	}
	wp_add_inline_script( 'interactive-store-wishlist', 'window.interactiveStoreWishlist = ' . wp_json_encode( $items, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ';', 'before' );
}, 25 );

add_action( 'woocommerce_after_shop_loop_item', function () {
	global $product;
	if ( $product ) {
		echo '<button class="is-wishlist-button" type="button" data-product-id="' . esc_attr( $product->get_id() ) . '" aria-pressed="false">♡ <span>Save</span></button>';
	}
}, 11 );

add_action( 'woocommerce_single_product_summary', function () {
	global $product;
	if ( $product ) {
		echo '<button class="is-wishlist-button is-wishlist-button--single" type="button" data-product-id="' . esc_attr( $product->get_id() ) . '" aria-pressed="false">♡ <span>Save to wishlist</span></button>';
	}
}, 35 );

add_shortcode( 'interactive_store_wishlist', function () {
	return '<div class="is-wishlist-page"><p class="is-wishlist-intro">Your saved products stay in this browser only.</p><div id="is-wishlist-items" class="is-wishlist-grid"></div><p id="is-wishlist-empty" class="is-wishlist-empty" hidden>Nothing saved yet. Browse the <a href="' . esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ) . '">shop</a> and save a product you like.</p></div>';
} );

/** Simple category and price controls above the native WooCommerce product grid. */
add_action( 'woocommerce_before_shop_loop', function () {
	if ( ! is_shop() && ! is_product_category() ) {
		return;
	}
	$shop_url = wc_get_page_permalink( 'shop' );
	$current  = is_product_category() ? get_queried_object() : false;
	$max_price = isset( $_GET['max_price'] ) ? absint( wp_unslash( $_GET['max_price'] ) ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$orderby = isset( $_GET['orderby'] ) ? sanitize_key( wp_unslash( $_GET['orderby'] ) ) : 'menu_order'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	echo '<button id="is-shop-mobile-open" class="is-shop-mobile-open" type="button" aria-controls="is-shop-toolbar" aria-expanded="false">Filter &amp; sort</button><div id="is-shop-backdrop" class="is-shop-backdrop" hidden></div><div id="is-shop-toolbar" class="is-shop-toolbar"><div class="is-shop-mobile-head"><strong>Filter &amp; sort</strong><button id="is-shop-mobile-close" type="button" aria-label="Close filters">×</button></div><nav class="is-shop-categories" aria-label="Product categories"><a ' . ( ! $current ? 'aria-current="page" ' : '' ) . 'href="' . esc_url( $shop_url ) . '">All products</a>';
	foreach ( array( 'computers', 'electronics', 'accessories', 'home-tech' ) as $slug ) {
		$term = get_term_by( 'slug', $slug, 'product_cat' );
		if ( ! $term ) {
			continue;
		}
		$url = get_term_link( $term );
		if ( is_wp_error( $url ) ) {
			continue;
		}
		echo '<a ' . ( $current && (int) $current->term_id === (int) $term->term_id ? 'aria-current="page" ' : '' ) . 'href="' . esc_url( $url ) . '">' . esc_html( $term->name ) . '</a>';
	}
	echo '</nav><form class="is-shop-price" method="get"><label for="is-price-limit">Price</label><select id="is-price-limit" name="max_price"><option value="">Any price</option>';
	foreach ( array( 10000 => 'Under RD$10,000', 30000 => 'Under RD$30,000', 40000 => 'Under RD$40,000', 70000 => 'Under RD$70,000' ) as $value => $label ) {
		echo '<option value="' . esc_attr( $value ) . '"' . selected( $max_price, $value, false ) . '>' . esc_html( $label ) . '</option>';
	}
	echo '</select><label class="is-shop-mobile-sort" for="is-sort-order">Sort by</label><select id="is-sort-order" class="is-shop-mobile-sort" name="orderby">';
	foreach ( array( 'menu_order' => 'Featured', 'price' => 'Price: low to high', 'price-desc' => 'Price: high to low', 'date' => 'Newest' ) as $value => $label ) {
		echo '<option value="' . esc_attr( $value ) . '"' . selected( $orderby, $value, false ) . '>' . esc_html( $label ) . '</option>';
	}
	echo '</select><button type="submit">Apply filters</button></form></div>';
}, 15 );

/** Arc 14 is a fictional product, so its extra information stays descriptive. */
add_filter( 'woocommerce_product_tabs', function ( $tabs ) {
	global $product;
	if ( ! $product || 'IS-ARC14-DEMO' !== $product->get_sku() ) {
		return $tabs;
	}
	$tabs['interactive_store_concept'] = array(
		'title'    => 'Concept details',
		'priority' => 15,
		'callback' => function () {
			echo '<h2>Arc 14 concept details</h2><p>This is a fictional portfolio product. These details describe the design direction, not manufacturer specifications.</p><table class="is-concept-table"><tbody><tr><th scope="row">Form</th><td>Portable laptop concept</td></tr><tr><th scope="row">Finish</th><td>Graphite</td></tr><tr><th scope="row">Designed for</th><td>Focused work and everyday creativity</td></tr><tr><th scope="row">What is shown</th><td>One laptop concept. Accessories in lifestyle imagery are illustrative and not included.</td></tr></tbody></table>';
		},
	);
	return $tabs;
} );

add_action( 'woocommerce_single_product_summary', function () {
	global $product;
	if ( $product && 'IS-ARC14-DEMO' === $product->get_sku() ) {
		echo '<a class="is-arc-3d-link" href="#is-arc-3d">Explore a laptop in 3D ↓</a>';
	}
}, 36 );

add_action( 'woocommerce_after_single_product_summary', function () {
	global $product;
	if ( ! $product || 'IS-ARC14-DEMO' !== $product->get_sku() ) {
		return;
	}
	echo '<section id="is-arc-3d" class="is-arc-3d" aria-labelledby="is-arc-3d-title"><div><p class="is-arc-eyebrow">Interactive preview</p><h2 id="is-arc-3d-title">Explore a laptop in 3D.</h2><p>This viewer uses a separate demonstration model. It shows the interaction and does not depict the exact Arc 14 concept or its specifications.</p><button id="is-load-arc-3d" type="button">Load 3D viewer ↗</button></div><div id="is-arc-3d-frame" class="is-arc-3d-frame"><p>Load the viewer when you are ready to inspect the demo model.</p><noscript><a href="https://docs.cecomsa.com/laptop-3d/index.html">Open the separate 3D demo</a></noscript></div></section>';
	$concepts = array(
		array( 'IS-ARC14-DEMO', 'Portable work', 'Move your workspace with you.' ),
		array( 'IS-VISTA-DEMO', 'Desk focus', 'Give your desktop more room.' ),
		array( 'IS-LINK-DEMO', 'Desk connection', 'Bring essential connections together.' ),
	);
	echo '<section class="is-concept-compare" aria-labelledby="is-concept-compare-title"><p class="is-arc-eyebrow">Find your setup</p><h2 id="is-concept-compare-title">Compare by use.</h2><div class="is-concept-compare-grid">';
	foreach ( $concepts as $concept ) {
		$id = wc_get_product_id_by_sku( $concept[0] );
		$other = $id ? wc_get_product( $id ) : false;
		if ( ! $other || ! $other->is_visible() ) {
			continue;
		}
		echo '<a href="' . esc_url( get_permalink( $id ) ) . '"><span>' . esc_html( $concept[1] ) . '</span><strong>' . esc_html( $other->get_name() ) . '</strong><p>' . esc_html( $concept[2] ) . '</p><b>' . wp_kses_post( $other->get_price_html() ) . '</b></a>';
	}
	echo '</div><p class="is-concept-disclaimer">Fictional use cases and illustrative prices; these are not technical performance comparisons.</p></section>';
}, 12 );

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
	echo '<div class="is-shop-toolbar"><nav class="is-shop-categories" aria-label="Product categories"><a ' . ( ! $current ? 'aria-current="page" ' : '' ) . 'href="' . esc_url( $shop_url ) . '">All products</a>';
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
	echo '</select><button type="submit">Apply</button></form></div>';
}, 15 );

<?php
/** Read-only WP-CLI check for the local Interactive Store demo. */
if ( ! defined( 'WP_CLI' ) || ! WP_CLI || ! function_exists( 'wc_get_product_id_by_sku' ) ) {
	return;
}
foreach ( array( 'IS-ARC14-DEMO', 'IS-PULSE-DEMO', 'IS-LINK-DEMO', 'IS-HAVEN-DEMO', 'IS-VISTA-DEMO', 'IS-FRAME-DEMO', 'IS-FORM-DEMO', 'IS-GLOW-DEMO' ) as $sku ) {
	$id = wc_get_product_id_by_sku( $sku );
	$product = $id ? wc_get_product( $id ) : false;
	WP_CLI::log( $sku . ': ' . ( $product ? $product->get_status() . ', image=' . ( $product->get_image_id() ? 'yes' : 'no' ) : 'missing' ) );
}
foreach ( array( 'IS-SEED-1001', 'IS-SEED-1002', 'IS-SEED-1003' ) as $key ) {
	$orders = wc_get_orders( array( 'limit' => 1, 'meta_key' => '_interactive_store_demo_key', 'meta_value' => $key ) );
	WP_CLI::log( $key . ': ' . ( $orders ? '#' . $orders[0]->get_id() . ', ' . $orders[0]->get_status() : 'missing' ) );
}
$wishlist = get_page_by_path( 'wishlist' );
WP_CLI::log( 'wishlist page: ' . ( $wishlist ? '#' . $wishlist->ID . ', ' . $wishlist->post_status : 'missing' ) );
$cod = get_option( 'woocommerce_cod_settings', array() );
WP_CLI::log( 'local no-payment method: ' . ( ! empty( $cod['enabled'] ) ? $cod['enabled'] : 'missing' ) );

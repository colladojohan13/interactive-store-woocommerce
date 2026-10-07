<?php
/**
 * Idempotent LocalWP demo catalog and sample orders.
 * Run: wp eval-file tools/seed-woocommerce-demo.php --path=/path/to/wordpress
 * Existing products and non-demo orders are preserved.
 */

if ( ! defined( 'WP_CLI' ) || ! WP_CLI || ! class_exists( 'WC_Product_Simple' ) ) {
	return;
}

// The script creates fictional records only. Suppress any email notification.
add_filter( 'pre_wp_mail', '__return_true' );

$asset_dir = dirname( __DIR__ ) . '/assets';
$catalog   = array(
	array( 'sku' => 'IS-ARC14-DEMO', 'name' => 'Arc 14 Laptop — Concept', 'category' => 'computers', 'price' => 64900, 'image' => 'arc-14-laptop-concept.png', 'short' => 'A fictional graphite laptop concept for focused work.' ),
	array( 'sku' => 'IS-PULSE-DEMO', 'name' => 'Pulse Wireless Headphones — Concept', 'category' => 'electronics', 'price' => 8900, 'image' => 'pulse-headphones-concept.png', 'short' => 'A fictional over-ear headphones concept in charcoal.' ),
	array( 'sku' => 'IS-LINK-DEMO', 'name' => 'Link USB-C Dock — Concept', 'category' => 'accessories', 'price' => 3900, 'image' => 'link-usbc-dock-concept.png', 'short' => 'A fictional compact desktop dock concept.' ),
	array( 'sku' => 'IS-HAVEN-DEMO', 'name' => 'Haven Smart Speaker — Concept', 'category' => 'home-tech', 'price' => 6900, 'image' => 'haven-smart-speaker-concept.png', 'short' => 'A fictional smart speaker concept with woven texture.' ),
	array( 'sku' => 'IS-VISTA-DEMO', 'name' => 'Vista Desktop Monitor — Concept', 'category' => 'computers', 'price' => 28900, 'image' => 'vista-monitor-concept.png', 'short' => 'A fictional slim graphite monitor concept.' ),
	array( 'sku' => 'IS-FRAME-DEMO', 'name' => 'Frame Digital Camera — Concept', 'category' => 'electronics', 'price' => 35900, 'image' => 'frame-camera-concept.png', 'short' => 'A fictional compact camera concept for everyday makers.' ),
	array( 'sku' => 'IS-FORM-DEMO', 'name' => 'Form Wireless Keyboard — Concept', 'category' => 'accessories', 'price' => 5400, 'image' => 'form-keyboard-concept.png', 'short' => 'A fictional graphite wireless keyboard concept.' ),
	array( 'sku' => 'IS-GLOW-DEMO', 'name' => 'Glow Desk Lamp — Concept', 'category' => 'home-tech', 'price' => 7900, 'image' => 'glow-lamp-concept.png', 'short' => 'A fictional desk lamp concept with a warm glow.' ),
);

function interactive_store_seed_image( $filename, $asset_dir ) {
	$found = get_posts( array( 'post_type' => 'attachment', 'posts_per_page' => 1, 'fields' => 'ids', 'meta_key' => '_interactive_store_demo_source', 'meta_value' => $filename ) );
	if ( $found ) {
		return (int) $found[0];
	}
	$source = $asset_dir . '/' . $filename;
	if ( ! is_readable( $source ) ) {
		WP_CLI::warning( 'Missing image: ' . $filename );
		return 0;
	}
	$upload = wp_upload_bits( $filename, null, file_get_contents( $source ) );
	if ( ! empty( $upload['error'] ) ) {
		WP_CLI::warning( $upload['error'] );
		return 0;
	}
	$attachment_id = wp_insert_attachment( array( 'post_mime_type' => 'image/png', 'post_title' => ucwords( str_replace( array( '-', '.png' ), array( ' ', '' ), $filename ) ), 'post_status' => 'inherit' ), $upload['file'] );
	if ( is_wp_error( $attachment_id ) ) {
		WP_CLI::warning( $attachment_id->get_error_message() );
		return 0;
	}
	require_once ABSPATH . 'wp-admin/includes/image.php';
	wp_update_attachment_metadata( $attachment_id, wp_generate_attachment_metadata( $attachment_id, $upload['file'] ) );
	update_post_meta( $attachment_id, '_interactive_store_demo_source', $filename );
	update_post_meta( $attachment_id, '_wp_attachment_image_alt', 'Fictional Interactive Store product concept' );
	return (int) $attachment_id;
}

$ids = array();
foreach ( $catalog as $item ) {
	$term = get_term_by( 'slug', $item['category'], 'product_cat' );
	if ( ! $term ) {
		$result = wp_insert_term( ucwords( str_replace( '-', ' ', $item['category'] ) ), 'product_cat', array( 'slug' => $item['category'] ) );
		$term   = is_wp_error( $result ) ? false : get_term( $result['term_id'], 'product_cat' );
	}
	$existing = wc_get_product_id_by_sku( $item['sku'] );
	if ( $existing ) {
		$ids[ $item['sku'] ] = (int) $existing;
		WP_CLI::log( 'Preserved product ' . $item['sku'] );
		continue;
	}
	$product = new WC_Product_Simple();
	$product->set_name( $item['name'] );
	$product->set_sku( $item['sku'] );
	$product->set_status( 'publish' );
	$product->set_catalog_visibility( 'visible' );
	$product->set_regular_price( (string) $item['price'] );
	$product->set_category_ids( $term ? array( (int) $term->term_id ) : array() );
	$product->set_short_description( $item['short'] . ' Portfolio demonstration; image and price are illustrative.' );
	$product->set_description( $item['short'] . ' This is a fictional portfolio product. There is no physical inventory and no manufacturer specifications are claimed.' );
	$product->set_manage_stock( false );
	$product->set_reviews_allowed( false );
	$image_id = interactive_store_seed_image( $item['image'], $asset_dir );
	if ( $image_id ) {
		$product->set_image_id( $image_id );
	}
	$ids[ $item['sku'] ] = $product->save();
	WP_CLI::log( 'Created product ' . $item['sku'] );
}

$samples = array(
	array( 'key' => 'IS-SEED-1001', 'status' => 'processing', 'days' => 2, 'first' => 'Alex', 'last' => 'Demo', 'city' => 'Santiago', 'items' => array( 'IS-ARC14-DEMO' => 1, 'IS-LINK-DEMO' => 1 ) ),
	array( 'key' => 'IS-SEED-1002', 'status' => 'completed', 'days' => 5, 'first' => 'Sam', 'last' => 'Example', 'city' => 'Santo Domingo', 'items' => array( 'IS-PULSE-DEMO' => 1, 'IS-HAVEN-DEMO' => 1 ) ),
	array( 'key' => 'IS-SEED-1003', 'status' => 'cancelled', 'days' => 9, 'first' => 'Taylor', 'last' => 'Sample', 'city' => 'Santiago', 'items' => array( 'IS-FORM-DEMO' => 1 ) ),
);
foreach ( $samples as $sample ) {
	$found = wc_get_orders( array( 'limit' => 1, 'meta_key' => '_interactive_store_demo_key', 'meta_value' => $sample['key'], 'return' => 'ids' ) );
	if ( $found ) {
		WP_CLI::log( 'Preserved sample order ' . $sample['key'] );
		continue;
	}
	$order = wc_create_order();
	if ( is_wp_error( $order ) ) {
		WP_CLI::warning( $order->get_error_message() );
		continue;
	}
	foreach ( $sample['items'] as $sku => $quantity ) {
		if ( ! empty( $ids[ $sku ] ) ) {
			$order->add_product( wc_get_product( $ids[ $sku ] ), $quantity );
		}
	}
	$order->set_billing_first_name( $sample['first'] );
	$order->set_billing_last_name( $sample['last'] );
	$order->set_billing_city( $sample['city'] );
	$order->set_billing_country( 'DO' );
	$order->set_payment_method_title( 'Demo only — no payment' );
	$order->set_created_via( 'interactive-store-demo-seed' );
	$order->set_date_created( time() - $sample['days'] * DAY_IN_SECONDS );
	$order->update_meta_data( '_interactive_store_demo_key', $sample['key'] );
	$order->calculate_totals( false );
	$order->set_status( $sample['status'] );
	$order->save();
	WP_CLI::log( 'Created sample order ' . $sample['key'] . ' (#' . $order->get_id() . ')' );
}

WP_CLI::success( 'Interactive Store demo data ready.' );

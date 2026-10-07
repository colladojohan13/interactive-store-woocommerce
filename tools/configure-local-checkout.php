<?php
/**
 * LocalWP-only test checkout configuration. Never run on a public store.
 * Run with WP-CLI: wp eval-file tools/configure-local-checkout.php --path=/path/to/wordpress
 */

if ( ! defined( 'WP_CLI' ) || ! WP_CLI || ! class_exists( 'WC_Shipping_Zone' ) ) {
	return;
}

$host = wp_parse_url( home_url(), PHP_URL_HOST );
if ( 'interactive-store.local' !== $host ) {
	WP_CLI::error( 'Refusing to configure checkout outside interactive-store.local.' );
}

$cod = get_option( 'woocommerce_cod_settings', array() );
$cod = is_array( $cod ) ? $cod : array();
$cod['enabled'] = 'yes';
$cod['title'] = 'Demo order — no payment';
$cod['description'] = 'Local portfolio test only. No money will be collected.';
$cod['instructions'] = 'This is a fictional Interactive Store order for demonstration.';
$cod['enable_for_methods'] = array();
$cod['enable_for_virtual'] = 'yes';
update_option( 'woocommerce_cod_settings', $cod );

$zone = false;
foreach ( WC_Shipping_Zones::get_zones() as $zone_data ) {
	if ( 'Interactive Store demo — Dominican Republic' === $zone_data['zone_name'] ) {
		$zone = new WC_Shipping_Zone( $zone_data['zone_id'] );
		break;
	}
}
if ( ! $zone ) {
	$zone = new WC_Shipping_Zone();
	$zone->set_zone_name( 'Interactive Store demo — Dominican Republic' );
	$zone->add_location( 'DO', 'country' );
	$zone->save();
}

$method_id = 0;
foreach ( $zone->get_shipping_methods() as $instance_id => $method ) {
	if ( 'flat_rate' === $method->id ) {
		$method_id = (int) $instance_id;
		break;
	}
}
if ( ! $method_id ) {
	$method_id = $zone->add_shipping_method( 'flat_rate' );
}
if ( ! $method_id ) {
	WP_CLI::error( 'Could not create the demo shipping method.' );
}
update_option( 'woocommerce_flat_rate_' . $method_id . '_settings', array( 'title' => 'Demo delivery (no physical shipment)', 'tax_status' => 'none', 'cost' => '250' ) );

WP_CLI::success( 'Local demo checkout ready: no-payment method and illustrative RD$250 delivery.' );

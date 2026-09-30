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

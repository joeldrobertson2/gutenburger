<?php
/**
 * Gutenburgers.
 *
 * @package joelsGutenBurgers
 */

namespace joelsGutenburgers;

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\block_editor_assets' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\block_assets' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\block_frontend_assets' );

/**
 * JS and CSS for the admin.
 */
function block_editor_assets() {
	wp_enqueue_script(
		'blocks-editor-js',
		get_plugin_url() . '/assets/js/editor.blocks.js',
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		'1.0',
		false
	);

	wp_enqueue_style(
		'blocks-editor-css',
		get_plugin_url() . '/assets/css/blocks.editor.css',
		[],
		'1.0',
		false
	);
}

/**
 * CSS for frontend and admin.
 */
function block_assets() {
	wp_enqueue_style(
		'blocks-css',
		get_plugin_url() . '/assets/css/blocks.style.css',
		null,
		'1.0'
	);
}

/**
 * JS for the frontend only.
 */
function block_frontend_assets() {
	if ( is_admin() ) {
		return;
	}

	wp_enqueue_script(
		'blocks-frontend',
		get_plugin_url() . '/assets/js/frontend.blocks.js',
		[],
		'1.0',
		false
	);
}

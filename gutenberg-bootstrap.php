<?php
/**
 * Gutenburgers.
 *
 * @package     joelsGutenBurgers
 * @author      Joel Robertson
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Gutenburgers
 * Description: Some test blocks for fun and profit
 * Version:     1.0
 * Author:      Joel Robertson
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace joelsGutenburgers;

defined( 'ABSPATH' ) || exit;

/**
 * Get the url for assets.
 */
function get_plugin_url() {
	return plugins_url( null, __FILE__ );
}

require __DIR__ . '/inc/enqueue-scripts.php';

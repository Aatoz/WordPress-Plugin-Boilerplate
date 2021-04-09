<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://4DeepBets.com
 * @since             1.0.0
 * @package           live_odds_updater
 *
 * @wordpress-plugin
 * Plugin Name:       4Deep Live Odds Table
 * Plugin URI:        https://4DeepBets.com/live-odds-updater/
 * Description:       Provides a live table that auto-updates with different lines from bookies.
 * Version:           1.0.0
 * Author:            Aatoz
 * Author URI:        https://4DeepBets.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       live-odds-updater
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'LIVE_ODDS_UPDATER_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-live-odds-updater-activator.php
 */
function activate_live_odds_updater() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-live-odds-updater-activator.php';
	live_odds_updater_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-live-odds-updater-deactivator.php
 */
function deactivate_live_odds_updater() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-live-odds-updater-deactivator.php';
	live_odds_updater_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_live_odds_updater' );
register_deactivation_hook( __FILE__, 'deactivate_live_odds_updater' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-live-odds-updater.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_live_odds_updater() {

	$plugin = new live_odds_updater();
	$plugin->run();

}
run_live_odds_updater();

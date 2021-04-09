<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://4DeepBets.com
 * @since      1.0.0
 *
 * @package    live_odds_updater
 * @subpackage live_odds_updater/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    live_odds_updater
 * @subpackage live_odds_updater/includes
 * @author     Aatoz <Aatoz@4DeepBets.com>
 */
class live_odds_updater_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'live-odds-updater',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}

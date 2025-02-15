<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://4DeepBets.com
 * @since      1.0.0
 *
 * @package    live_odds_updater
 * @subpackage live_odds_updater/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    live_odds_updater
 * @subpackage live_odds_updater/public
 * @author     Aatoz <Aatoz@4DeepBets.com>
 */
class live_odds_updater_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $live_odds_updater    The ID of this plugin.
	 */
	private $live_odds_updater;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $live_odds_updater       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $live_odds_updater, $version ) {

		$this->live_odds_updater = $live_odds_updater;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in live_odds_updater_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The live_odds_updater_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->live_odds_updater, plugin_dir_url( __FILE__ ) . 'css/live-odds-updater-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in live_odds_updater_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The live_odds_updater_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->live_odds_updater, plugin_dir_url( __FILE__ ) . 'js/live-odds-updater-public.js', array( 'jquery' ), $this->version, false );

	}

	public funtion enqueue_oddsUpdater() {
		wp_enqueue_style($this->live_odds_updater, plugin_dir_url(__FILE__) . "css/oddsUpdater.css",
			array(), $this->version, "all");
		wp_enqueue_script($this->live_odds_updater, plugin_dir_url(__FILE__) . "js/oddsUpdater.js",
			array("jquery"), $this->version, false);
	}

}

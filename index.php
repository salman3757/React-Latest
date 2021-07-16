<?php

/*
  Plugin Name: React Block
  Description: React Blocks.
  Version: 1.0
  Author: Salman
  Author URI: https://www.sd.com
*/

class ReactBlock {
    function __construct() {
      add_action('init', array($this, 'adminAssets'));
    }
  
    function adminAssets() {
      wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-components', 'wp-editor'));
      register_block_type('ourplugin/react-block', array(
        'editor_script' => 'ournewblocktype'
      ));
    }
  
  }

$ReactBlock = new ReactBlock();
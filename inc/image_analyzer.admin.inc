<?php
/**
 * @file
 * Contains the form functions for image_analyzer module
 */
 
/**
 * Administration form
 */
function image_analyzer_configuration_form($form, &$form_state) {
  $form['image_analyzer_zoom'] = array(
    '#type' => 'checkbox',
    '#title' => t('Zoom'),
    '#description' => t('Allow to see an area in a zoom window.'),
  );
  return $form;
}

/**
 * Save configuration settings for image_analyzer module.
 */
function image_analyzer_configuration_form_sumbit($form, &$form_state) {
  variable_set('image_analyzer_zoom', $form_state['values']['image_analyzer_zoom']);
  
  drupal_set_message("Configuration saved");
}

<?php
/**
 * @file 
 * This file includes all the forms callbacks functions
 */
 
/*
 * Generate the configuration form
 */
function image_analyzer_config_form($form, &$form_state) {
  $node_types = node_type_get_types();
  $options = array();
  $fields_options = array();
  $map = field_info_field_map();
  // Generate the options for image fields and its content types.
  foreach ($map as $field_name => $info) {
    if ($info['type'] == 'image' and isset($info['bundles']['node'])) {
      $bundles = $info['bundles']['node'];
      foreach ($bundles as $code) {
        $options[$code] = $node_types[$code]->name;
        $fields_options[$code][$field_name] = $field_name;
      }
    }
  }
  // Get selected content type if any.
  $selected_content_type = isset($form_state['values']['content_type']) ? $form_state['values']['content_type'] : variable_get('image_analyzer_content_type', key($options));

  // Select the content type.
  $form['content_type'] = array(
    '#type' => 'select',
    '#title' => t('Content Type'),
    '#options' => $options,
    '#description' => t('Select the content type that contains the image to be analyzed.'),
    '#default_value' => $selected_content_type,
    '#ajax' => array(
      'event' => 'change',
      'callback' => 'populate_field_to_analyze',
      'wrapper' => 'field_to_analyze_replace',
    ),
  );
  // Select the field to analyze (defaults to first image found),
  // filled with ajax.
  $form['field_to_analyze'] = array(
    '#type' => 'select',
    '#title' => t('Field'),
    '#options' => $fields_options[$selected_content_type],
    '#description' => t('Select the image field to be analyzed.'),
    '#default_value' => isset($form_state['values']['field_to_analyze']) ? $form_state['values']['field_to_analyze'] : variable_get('image_analyzer_field', ''),
    // The entire enclosing div created here gets replaced when dropdown_first
    // is changed.
    '#prefix' => '<div id="field_to_analyze_replace">',
    '#suffix' => '</div>',
  );
  /*//Checbox Conversion depends on field
  $form['conversion_per_field_value'] = array(
    '#type' => 'checkbox',
    '#title' => t('Field Dependent'),
    '#description' => t('Depends of a value from field'),
    '#ajax' => array(
      'event' => 'change',
      'callback' => 'populate_field_to_analyze',
      'wrapper' => 'field_to_analyze_replace',
    ),
  );*/
 
  // If checked Select fields
  
  //Submit button
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save settings'),
  );
  return $form;
}

function populate_field_to_analyze($form, $form_state) {
  return $form['field_to_analyze'];
}

/**
 * Save configuration settings for Image Analyzer module.
 */
function image_analyzer_config_form_submit($form, &$form_state) {
  variable_set('image_analyzer_content_type', $form_state['values']['content_type']);
  variable_set('image_analyzer_field', $form_state['values']['field_to_analyze']);
  drupal_set_message(t("The settings have been saved"));
}

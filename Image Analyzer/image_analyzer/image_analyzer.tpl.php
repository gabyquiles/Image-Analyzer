<div id="image_analyzer">
  <div id="canvas_container">
    <canvas id="image_to_analyze">
      <img src="<?php print file_create_url($item['uri']); ?>" /> 
    </canvas>
  </div>
  <div id="buttons">
    <ul>
      <li><a href="zoom">Zoom</a></li>
    </ul>
  </div>
  <div id="analysis_area">
  </div>
</div>
<p>First name: <strong data-bind="text: firstName">todo</strong></p>
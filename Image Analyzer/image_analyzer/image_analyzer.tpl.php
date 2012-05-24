<div id="image_analyzer">
  <a href="<?php print file_create_url($item['uri']); ?>">Download Original Image</a>
  <div id="canvas_container">
    <canvas id="image_to_analyze">
      <img src="<?php print file_create_url($item['uri']); ?>" /> 
    </canvas>
  </div>
  <div id="analyzer_tools" >
    <div id="buttons">
      <ul data-bind="foreach:itemsObservables">
        <li data-bind="css:{ 'selected':isSelected }, click:$parent.select"><button data-bind="text:title"></button></li>
      </ul>
    </div>
    <div data-bind="foreach:itemsObservables">
      <div class="area" data-bind="html: html">
      </div>
    </div>
  </div>
</div>
<div id="image_analyzer">
  <a href="<?php print file_create_url($image['#path']); ?>">Download Original Image</a>
  <div id="canvas_container">
    <canvas id="image_to_analyze">
      <?php print render($image); ?>
    </canvas>
  </div>
  <div id="analyzer_tools" >
    <div id="analyzer_buttons">
      <ul class="analyzer_tools" data-bind="foreach: tools">
        <li><button data-bind="text: button, click: $root.activateTool"></button></li>
      </ul>
    </div>
    <div data-bind="template: {name: activeTool,
        data: chosenToolViewModel,
        afterRender: chosenToolViewModel().activate}">
      </div>
    </div>
  </div>
</div>

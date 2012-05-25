var zoom = new Object();
(function($) {
	$().ready(function() {
zoom.title = "<img src='/"+ Drupal.settings.image_analyzer.path + "/icons/zoom_icon.png' alt='Zoom'/>";
})})(jQuery);
zoom.area = '<div id="zoom_controls"class="ui-widget ui-corner-all" style="width:800px"><div class="slider_left_label">x1</div><div id="zoom_slider"></div><div class="slider_right_label">x10</div></div><canvas id="zoom_area" height="400" width="800"></canvas>';
function zoom_activate() {
	(function($) {
		var source_canvas = $("#image_to_analyze");
		
		var destination_canvas = $("#zoom_area");
		var destination_context = destination_canvas[0].getContext("2d");
		
		$( "#zoom_slider" ).slider({
			min: 1,
			max: 10,
			step: 1,
			animate: true,
			range: "min",
   		change: function(event, ui) {
				zoom_window.factor = ui.value;
				zoom_window.showOnZoom($("#image_to_analyze")[0].getContext("2d"));
			}
		});
		
		source_canvas.toggle(function(){
			zoom_window.enabled = false;
		},
		function() {
			zoom_window.enabled = true;
		})
		
		source_canvas.mousemove(function(evt){
			if(zoom_window.enabled) {
				var destination_canvas = $("#zoom_area");
				var destination_context = destination_canvas[0].getContext("2d");
				
				var source_context = this.getContext("2d");
				//source_context.drawImage(Drupal.settings.img,0,0);
				
				var positions = mousePosition(this, evt);
				zoom_window.x_position = positions.x + $(this).parent().scrollLeft();
				zoom_window.y_position = positions.y + $(this).parent().scrollTop();
				zoom_window.showOnZoom($("#image_to_analyze")[0].getContext("2d"));
			}
			//var factor = 1;
		/*	zoom_window.height = destination_canvas.height()/zoom_window.factor;
			zoom_window.width = destination_canvas.width()/zoom_window.factor;
			
			zoom_window.redraw(source_context);
			
			
			var data = source_context.getImageData(zoom_window.x_position, zoom_window.y_position, zoom_window.width,zoom_window.height);
			//alert(zoom_window.height * factor);
			
			destination_context.drawImage(Drupal.settings.img,
				zoom_window.x_position,
				zoom_window.y_position,
				zoom_window.width,
				zoom_window.height,
				0,
				0,
				zoom_window.width * zoom_window.factor,
				zoom_window.height * zoom_window.factor);*/
		});
		
	})(jQuery);
}
zoom.activate = zoom_activate;

var zoom_window = new Object();
zoom_window.enabled = true;
zoom_window.height = 400;
zoom_window.width = 800;
zoom_window.x_position = 0;
zoom_window.y_position = 0;
zoom_window.factor = 1;
function redrawWindow(context) {
	context.drawImage(Drupal.settings.img,0,0);
	var x = zoom_window.x_position;
	var y = zoom_window.y_position;
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(x, y+this.height);
	context.lineTo(x+this.width, y+this.height);
	context.lineTo(x+this.width, y);
	context.lineTo(x, y);
	context.lineWidth = 5;
  context.strokeStyle = "blue";
  context.stroke();
}
zoom_window.redraw = redrawWindow;

function showOnZoom (source_context) {
	
			var destination_canvas = document.getElementById("zoom_area");
			var destination_context = destination_canvas.getContext("2d");
			
			this.height = destination_canvas.height/this.factor;
			this.width = destination_canvas.width/this.factor;
			
			this.redraw(source_context);
			
			var data = source_context.getImageData(zoom_window.x_position, zoom_window.y_position, zoom_window.width,zoom_window.height);
			destination_context.drawImage(Drupal.settings.img,
				zoom_window.x_position,
				zoom_window.y_position,
				zoom_window.width,
				zoom_window.height,
				0,
				0,
				this.width * zoom_window.factor,
				this.height * zoom_window.factor);
}

zoom_window.showOnZoom = showOnZoom;

function mousePosition(obj, evt) {
	var x_position = evt.pageX - obj.offsetLeft;
	var y_position = evt.pageY - obj.offsetTop;
	return {
		x: x_position,
		y: y_position
	};
}
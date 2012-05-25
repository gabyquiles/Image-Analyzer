
var zoom = new Object();
zoom.title = "Zoom";
zoom.area = '<canvas id="zoom_area" height="400" width="800"></canvas>';
function zoom_activate() {
	(function($) {
		var source_canvas = $("#image_to_analyze");
		
		var destination_canvas = $("#zoom_area");
		var destination_context = destination_canvas[0].getContext("2d");
		destination_context.scale(2,2);
		
		source_canvas.mousemove(function(evt){
			var source_context = this.getContext("2d");
			source_context.drawImage(Drupal.settings.img,0,0);
			
			var positions = mousePosition(this, evt);
			positions.x += $(this).parent().scrollLeft();
			positions.y += $(this).parent().scrollTop();
			zoom_window.redraw(source_context,positions.x,positions.y);
			
			var destination_canvas = $("#zoom_area");
			var destination_context = destination_canvas[0].getContext("2d");
			
			var data = source_context.getImageData(positions.x, positions.y, zoom_window.width,zoom_window.height);
			var factor = 10;
			//alert(zoom_window.height * factor);
			
			destination_context.drawImage(Drupal.settings.img,
				positions.x,
				positions.y,
				zoom_window.width,
				zoom_window.height,
				0,
				0,
				zoom_window.width * factor,
				zoom_window.height * factor);
			
			//destination_context.putImageData(data, 0,0);
			//clear canvas
			//draw canvas 
			//draw selection
		});
		//source_canvas.mouseover(function(){
		//	alert("Adentro");
		//});
		
	})(jQuery);
}
zoom.activate = zoom_activate;

var zoom_window = new Object();
zoom_window.height = 30;
zoom_window.width = 60;
function redrawWindow(context,x,y) {
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

function mousePosition(obj, evt) {
	var x_position = evt.pageX - obj.offsetLeft;
	var y_position = evt.pageY - obj.offsetTop;
	return {
		x: x_position,
		y: y_position
	};
}

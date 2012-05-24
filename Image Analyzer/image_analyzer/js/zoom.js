
var zoom = new Object();
zoom.title = "Zoom";
zoom.area = '<canvas id="zoom_area" height="400"></canvas>';
function zoom_activate() {
	(function($) {
		var source_canvas = $("#image_to_analyze");
		var source_context = source_canvas[0].getContext("2d");
		var destination_canvas = $("#zoom_area");
		var destination_context = destination_canvas[0].getContext("2d");
		
		destination_canvas.width(source_canvas.parent().width());
		var x_position = 100;
		var y_position = 300;
		zoom_window.redraw(source_context,x_position,y_position);
		var data = source_context.getImageData(x_position, y_position, zoom_window.width,zoom_window.height);
		destination_context.putImageData(data, 0, 0);
		destination_context.scale(2,2);
		
		//source_canvas.mouseover(function(){
		//	alert("Adentro");
		//});
		
	})(jQuery);
}
zoom.activate = zoom_activate;

var zoom_window = new Object();
zoom_window.height = 30;
zoom_window.width = 30;
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
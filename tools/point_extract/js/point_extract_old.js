var point_extract = new Object();
(function($) {
	$().ready(function() {
		point_extract.name = "Point Extract";
		point_extract.title = "<img src='/"+ Drupal.settings.image_analyzer.path + "/icons/transect_icon.png' alt='Point Extract'/>";
		point_extract.area = '<div id="point_extract"><div id="table" style="width: 100%; height: 400px;"><table id="point_extract_table"><tr><th>Values</th></tr></div></div>';
	})})(jQuery);
function point_extract_activate() {
	(function($) {
			var source_canvas = $("#image_to_analyze");
			source_canvas.click(function(evt){
					//var destination_canvas = $("#zoom_area");
					//var destination_context = destination_canvas[0].getContext("2d");
					
					var source_context = this.getContext("2d");
					//source_context.drawImage(Drupal.settings.img,0,0);
					
					var positions = mousePosition(this, evt);
					var x = positions.x + $(this).parent().scrollLeft();
					var y = positions.y + $(this).parent().scrollTop();
					var data = new Object();
					data.x = x;
					data.y = y;
										
					var request = $.ajax({
						url: "/api/image/" + Drupal.settings.image_analyzer.img.fid + "/point_extract.json",
						type: 'post',
						dataType: 'json',
						data: {"x":x,"y":y},
						success:  function(data, textStatus, xhr) {
							$('#point_extract_table tr:last').after('<tr><td>' + x + ', ' + y + ': ' + data[0] + '</td></tr>');
						},
						error:  function(data, textStatus, xhr) {
							alert("We had a communication problem and are unable to analyze the image at this moment.");
						}
					});
					
				
			});
	})(jQuery);
}
point_extract.activate = point_extract_activate;
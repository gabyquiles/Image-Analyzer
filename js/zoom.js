(function($) {
   ko.zoom = {
		viewModel: function() {
			var self = this;
			self.name = "zoom";
            self.button = "Zoom";
            self.enabled = false;
            self.factor = 2;
            self.x_position = 0;
            self.y_position = 0;
            self.height = 200;
            self.width = 200;
            // This could be considered the constructor
			self.activate = function() {
                var source_canvas = $("#image_to_analyze");
                var destination_canvas = $("#zoom_area");
                $( "#zoom_slider" ).slider({
                    min: 1,
                    max: 10,
                    step: 1,
                    animate: true,
                    range: "min",
                    change: function(event, ui) {
                        self.factor = ui.value;
                        var context = $("#image_to_analyze")[0].getContext("2d");
                        self.redraw(context, self.enabled);
                    }
                });

                self.enabled = true;
				source_canvas.toggle(function(){
                        var context = $("#image_to_analyze")[0].getContext("2d");
                        self.enabled = true;
                        self.redraw(context, self.enabled);
                    },
                    function() {
                        var context = $("#image_to_analyze")[0].getContext("2d");
                        self.enabled = false;
                        self.redraw(context, self.enabled);
                    });
				
				source_canvas.mousemove(function(evt){
					if(self.enabled) {
                        var context = $("#image_to_analyze")[0].getContext("2d");
						var positions = self.mousePosition(this, evt);

                        self.x_position = positions.x;
                        self.y_position = positions.y;
                        self.redraw(context, self.enabled);
                        self.showOnZoom(context);
					}
				});
			};

            // Draws the area being zoomed
            self.redraw = function(context, enabled) {
                context.drawImage(Drupal.settings.img,0,0);
                var x = self.x_position;
                var y = self.y_position;
                context.beginPath();
                context.moveTo(x,y);
                context.lineTo(x, y+self.height);
                context.lineTo(x+self.width, y+self.height);
                context.lineTo(x+self.width, y);
                context.lineTo(x, y);
                context.lineWidth = 5;
                if(enabled){
                    context.strokeStyle = "green";
                } else {
                    context.strokeStyle = "red";
                }
                context.stroke();
            };

            // Shows the zoomed area
            self.showOnZoom = function(source_context) {
                var destination_canvas = document.getElementById("zoom_area");
                var destination_context = destination_canvas.getContext("2d");

                destination_context.clearRect(0, 0,
                    self.width * self.factor,self.height * self.factor);

                self.height = destination_canvas.height/self.factor;
                self.width = destination_canvas.width/self.factor;
                var w = self.width;
                var h = self.height;
                if(self.width + self.x_position > Drupal.settings.image_analyzer.img.width) {
                    w = Drupal.settings.image_analyzer.img.width - self.x_position;
                }
                if(self.height + self.y_position > Drupal.settings.image_analyzer.img.height) {
                    h = Drupal.settings.image_analyzer.img.height - self.y_position;
                }

                destination_context.drawImage(Drupal.settings.img,
                    self.x_position,
                    self.y_position,
                    w,
                    h,
                    0,
                    0,
                    w * self.factor,
                    h * self.factor);
            };

            // Gets the mouse position relative to the source canvas
            self.mousePosition = function(obj, evt) {
                var x_position = evt.pageX - $(obj).parent().offset().left + $(obj).parent().scrollLeft();
                var y_position = evt.pageY - $(obj).parent().offset().top + $(obj).parent().scrollTop();
                return {
                    x: x_position,
                    y: y_position
                };
            }

		}
	};
	
	var templateEngine = new ko.nativeTemplateEngine();
	templateEngine.addTemplate = function(templateName, templateMarkup) {
		document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "</script>");
	};
	
	templateEngine.addTemplate("zoom", "\
		<div id=\"zoom\"> \
			<div id=\"zoom_controls\" class=\"ui-widget ui-corner-all\" style=\"width:800px\"> \
				<div class=\"slider_left_label\">x1</div> \
				<div id=\"zoom_slider\"></div> \
				<div class=\"slider_right_label\">x10</div> \
			</div> \
			<canvas id=\"zoom_area\" height=\"400\" width=\"800\"></canvas> \
		</div>");
})(jQuery);
(function($) {
    ko.point_extract = {
        viewModel: function() {
            var self = this;
            self.name = "point_extract";
            self.button = "Point Extract";
            self.columns = [
                { headerText: "Lat", rowText: "latitude" },
                { headerText: "Lon", rowText: "longitude" },
                { headerText: "Value", rowText: "value" }
            ];
            self.values=ko.observableArray();
            self.templateName = "point_extract";
            self.activate = function() {
                var source_canvas = $("#image_to_analyze");
                source_canvas.click(function(evt) {
                    var source_context = this.getContext("2d");
                    var offset = $(this).offset();
                    var x = Math.ceil(evt.pageX - offset.left);
                    var y = Math.ceil(evt.pageY - offset.top);

                    var request = $.ajax({
                        url: "/?q=api/image/" + Drupal.settings.image_analyzer.img.fid + "/point_extract.json",
                        type: 'post',
                        dataType: 'json',
                        data: {"x":x,"y":y},
                        beforeSend: function(){
                            $('#point_extract_table tr:last').after('<tr class="loading"><td colspan="3">Loading</td></tr>');
                        },
                        complete: function(){
                            $('.loading').remove();
                        },
                        success:  function(data, textStatus, xhr) {
                            var data = jQuery.parseJSON(data[0]);
                            self.values.push({latitude: data.y, longitude:data.x, value:data.value});
                        },
                        error:  function(data, textStatus, xhr) {
                            alert("We had a communication problem and are unable to analyze the image at this moment.");
                        }
                    });
                });
            }

        }
    }


    var templateEngine = new ko.nativeTemplateEngine();
    templateEngine.addTemplate = function(templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "</script>");
    }

    templateEngine.addTemplate("point_extract", "\
		<div id=\"point_extract\"> \
			<table class=\"point_extract\"> \
				<thead> \
					<tr data-bind=\"foreach: columns\"> \
						<th data-bind=\"text: headerText\"></th> \
					</tr> \
				</thead> \
				<tbody data-bind=\"foreach: values\"> \
					<tr data-bind=\"foreach: $parent.columns\"> \
						<td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td> \
					</tr> \
				</tbody> \
			</table> \
		</div>");

})(jQuery);
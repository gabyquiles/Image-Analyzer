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
                var extract_coords_btn = $("#extract_coords_button");
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
                extract_coords_btn.click(function (evt) {
                    var coords = $("#coords").val().split(/\n|\r/);
                    $.ajax({
                        url: "/?q=api/image/" + Drupal.settings.image_analyzer.img.fid + "/coords_extract.json",
                        type: 'post',
                        dataType: 'json',
                        data: {coords: coords},
                        beforeSend: function(){
                            $('#point_extract_table tr:last').after('<tr class="loading"><td colspan="3">Loading</td></tr>');
                        },
                        complete: function(){
                            $('.loading').remove();
                        },
                        success:  function(data, textStatus, xhr) {
                            console.log(data)
                            var data = jQuery.parseJSON(data[0]);
                            for(i = 0; i < data.length; i++) {
                                self.values.push({latitude: data[i].y, longitude: data[i].x, value: data[i].value});
                            }
                        },
                        error:  function(data, textStatus, xhr) {
                            alert("We had a communication problem and are unable to analyze the image at this moment.");
                        }
                    });
                })
            }

        }
    }


    var templateEngine = new ko.nativeTemplateEngine();
    templateEngine.addTemplate = function(templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "</script>");
    }

    templateEngine.addTemplate("point_extract", "\
    <p>You can click on any point on the image or enter the coordinates below to extract the corresponding values.</p>\
		<div id=\"point_extract\"> \
		    <div id=\"extract_coords\">\
                <label for=\"coords\">Enter decimal coordinates (One coordinate by line in the format of lat,lon):</label>\
                <textarea id=\"coords\" name=\"coords\" class=\"coords_input\"></textarea>\
                <button id=\"extract_coords_button\" type='submit'>Get Data</button>\
            </div>\
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
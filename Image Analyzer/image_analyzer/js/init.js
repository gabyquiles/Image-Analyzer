(function($) {
	$().ready(function() {
		$("#image_to_analyze")[0].height = Drupal.settings.img.height;
		$("#image_to_analyze")[0].width = Drupal.settings.img.width;
		var ctx = $("#image_to_analyze")[0].getContext('2d');
		var img = new Image();
		img.src = Drupal.settings.img.src;
		ctx.drawImage(img,0,0);
	
	
	var site = site || {models: {}}
	site.models.Analyzer = function() {
		var self = this;
		this.itemsObservables = ko.observableArray();
		this.init = function(data) {
			ko.utils.arrayForEach(data, function(item) {
				self.itemsObservables.push(new site.models.AnalyzerTool(item));
			});
		}
		this.select = function(data,e){
			//load area
			//activate tool
			self.setSelected(data);
			e.preventDefault();
		};
		this.setSelected = function(newSelection) {
			ko.utils.arrayForEach(self.itemsObservables(), function(item) {
				item.isSelected(item == newSelection);
				if(item == newSelection) {
					item.action();
				}
			})
		}
	}
	
	site.models.AnalyzerTool = function(el) {
		this.isSelected = ko.observable(false);
		element = eval(el);
		this.html = element.area;
		this.title = element.title;
		this.action = element.activate;
	}
		
	var viewModel = new site.models.Analyzer();
	viewModel.init(Drupal.settings.tools);
	ko.applyBindings(viewModel,$('#analyzer_tools').get(0));

	})
})(jQuery);

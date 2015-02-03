(function($) {

    function ToolsModel(tools_names) {
        var self = this;
        self.tools = ko.observableArray();
        for(i in tools_names) {
            self.tools.push(eval("new ko." + tools_names[i] + ".viewModel()"));
        }
        self.chosenToolViewModel = ko.observable();
        self.activeTool = "";
        //Prepare the tools
        self.activateTool=function(tool) {

            resetImage();
            self.activeTool=tool.name;
            self.chosenToolViewModel(tool);
            //self.chosenToolViewModel().activate();
        };
        //This should be called before setting up the subscribe function
        self.activateTool(self.tools()[0]);
    }

    // Clear reset the image to analyze
    function resetImage() {
        var image = $("#image_to_analyze");
        var image_dom = image[0];
        image_dom.height = Drupal.settings.image_analyzer.img.height;
        image_dom.width = Drupal.settings.image_analyzer.img.width;
        var ctx = image_dom.getContext('2d');
        var img = new Image();
        img.src = Drupal.settings.image_analyzer.img.src;
        Drupal.settings.img = img;
        img.onload = function() {
            ctx.drawImage(Drupal.settings.img,0,0);
        };
        image.unbind('click');
        image.unbind('toggle');
        image.unbind('mousemove');
	image.bind("contextmenu",function(e){
        	alert("Please click on the link on top of the image to download it.")
        	return false;
    	});
    }

    Drupal.behaviors.image_analyzer_behaviour = {
        attach: function(context, settings) {
            var model = new ToolsModel(Drupal.settings.image_analyzer.tools);
            ko.applyBindings(model);
        }
    };

})(jQuery);

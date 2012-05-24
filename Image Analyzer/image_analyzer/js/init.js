(function($) {
	$().ready(function() {
		$("#image_to_analyze")[0].height = Drupal.settings.img.height;
		$("#image_to_analyze")[0].width = Drupal.settings.img.width;
		var ctx = $("#image_to_analyze")[0].getContext('2d');
		var img = new Image();
		img.src = Drupal.settings.img.src;
		ctx.drawImage(img,0,0);
	
	
		
	var ViewModel = function(first, last) {
this.firstName = ko.observable(first);
this.lastName = ko.observable(last);
this.fullName = ko.computed(function() {
// Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
return this.firstName() + " " + this.lastName();
}, this);
};
ko.applyBindings(new ViewModel("Planet", "Earth")); 

	})
})(jQuery);

(function($) {
	$().ready(function() {
		var ctx = $("#image_to_analyze")[0].getContext('2d');
		var img = new Image();
		img.src = Drupal.settings.img_src[0];
		ctx.drawImage(img,0,0);
	})
})(jQuery);
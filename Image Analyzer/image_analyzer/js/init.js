(function($) {
	$().ready(function() {
		$("#image_to_analyze")[0].height = Drupal.settings.img_src_0_height;
		$("#image_to_analyze")[0].width = Drupal.settings.img_src_0_width;
		var ctx = $("#image_to_analyze")[0].getContext('2d');
		var img = new Image();
		img.src = Drupal.settings.img_src_0;
		ctx.drawImage(img,0,0);
	})
})(jQuery);

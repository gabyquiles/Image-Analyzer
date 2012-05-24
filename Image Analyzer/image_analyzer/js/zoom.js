(function($) {
	$().ready(function() {
		$('#zoom').onclick(function() {
			var ctx = $("#image_to_analyze")[0].getContext('2d');
			ctx.scale(2,2);
		});
		
	});
	
})(jQuery);

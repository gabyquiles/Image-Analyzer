var transect = new Object();
(function($) {
	$().ready(function() {
		transect.name = "Transect";
		transect.title = "<img src='/"+ Drupal.settings.image_analyzer.path + "/icons/transect_icon.png' alt='Transect'/>";
		transect.area = '<div id="transect"><div id="visualization" style="width: 100%; height: 400px;"></div></div>';
	})})(jQuery);
function transect_activate() {
	(function($) {
		 google.load('visualization', '1', {packages: ['annotatedtimeline']});
     
		var source_canvas = $("#image_to_analyze");
		source_canvas.click(function(evt){
			aler("wepa");
		});
    //google.setOnLoadCallback(drawVisualization);
	})}
transect.activate = transect_activate;


    function drawVisualization() {
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', 'Sold Pencils');
      data.addColumn('string', 'title1');
      data.addColumn('string', 'text1');
      data.addColumn('number', 'Sold Pens');
      data.addColumn('string', 'title2');
      data.addColumn('string', 'text2');
      data.addRows([
        [new Date(2008, 1 ,1), 30000, null, null, 40645, null, null],
        [new Date(2008, 1 ,2), 14045, null, null, 20374, null, null],
        [new Date(2008, 1 ,3), 55022, null, null, 50766, null, null],
        [new Date(2008, 1 ,4), 75284, null, null, 14334, 'Out of Stock', 'Ran out of stock on pens at 4pm'],
        [new Date(2008, 1 ,5), 41476, 'Bought Pens', 'Bought 200k pens', 66467, null, null],
        [new Date(2008, 1 ,6), 33322, null, null, 39463, null, null]
      ]);
    
      var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
          document.getElementById('visualization'));
      annotatedtimeline.draw(data, {'displayAnnotations': true});
    }
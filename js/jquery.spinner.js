jQuery.fn.spinner = function (args) {
	var items = args.item_list;
	if (items === undefined || items.length == 0) {
		return false;
	}
	
	var container = this;
	var bg_colors = ['#99ff99', '#ccffff'];

	$('#spinner_winner').toggleClass('winner', false);
	$('#proj_link').html('');
	
	winner = Math.floor(Math.random() * (items.length-1));
		
	var show_count = 0;
	var last_shown = 0;
	(function show_spin(interval) {
		setTimeout(function() {
			var showme = 0;
			
			// avoid repeats which could be bothersome for folks with fewer wips
			while (showme == last_shown) {
				showme = Math.floor(Math.random() * (items.length));
			}
			last_shown = showme;
			
			$('#spinner_winner').html('<h2>' + items[showme].name + '</h2>');
			container.css('background-color', bg_colors[show_count%2]);

			if (++show_count < 25) {
				show_spin(100);
			}
			else if (show_count < 35) {
				show_spin(250);
			}
			else if (show_count < 40) {
				show_spin(500);
			}
			else if (show_count < 43) {
				show_spin(750);
			}
			else {
				// done spinning so show the winner
				$('#spinner_winner').toggleClass('winner');
				$('#spinner_winner').html('<h1>' + items[winner].name + '</h1>' + create_project_link(items[winner]));
				$('#proj_link').html(create_project_link(items[winner]));
			}
		}, interval);	
	})();

};

function create_project_link (item) {
	var l_str = '<a href="' + item.url + '">';
	if (item.thumbnail != null) {
		l_str += '<img src="' + item.thumbnail.medium + '" />';
	}
	l_str += '<h4>View Project Page</h4>';
	l_str += '</a>';

	return l_str;
}	
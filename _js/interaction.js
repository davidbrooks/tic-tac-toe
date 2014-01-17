var t = (function($, window, document, undefined) {
	$('document').ready(function(){
		t.init();
	});
	// Here are some standard values
	var history = [];
	var spaces = 3;
	return {
		init: function(){
			// This is an initial set of things to fire when the page loads
			t.clicks();
			t.setup_board();
		},
		clicks: function(){
			$('body').on('click', '.space', function(){
				var this_space = '#' + $(this).attr('id');
				if ($(this).children('img').length) {
					// Probably nothing should happen here since the space is already occupied
					// We could maybe put in messaging here to get fancy
				} else {
					// So this space is legit
					// Figure out which player clicked it
					var active_player = $('#players li.active').data('player');
					// Now, see if it should be an x or an o
					if (active_player == 1) {
						var image = 'x';
					} else {
						image = 'o';
					}
					var img = { "img" : image};
					// Load it into the space
					t.load_template('#_mark_template', this_space, img);
					// Add this move to the history
					history.push(this_space);
					// Change players up
					t.change_players();
				}
				return false;
			});
			$('body').on('click', '#undo', function(){
				// First, see if there's history
				if (history.length) {
					// What was the last move
					var last_move = history[history.length - 1];
					// Undo it
					$(last_move).html('');
					// Remove it from history
					history.pop();
					// Change players again
					t.change_players();
				}
				return false;
			});
		},
		change_players: function(){
			// Swap out the active player
			$('#players li').toggleClass('active');
		},
		append_template: function(partial, target, context){
			// This takes a request for a template, a location, and data, and appends it to the location
			var source = $(partial).html();
			var template = Handlebars.compile(source);
			var html = template(context);
			$(target).append(html);
		},
		load_template: function(partial, target, context){
			// This takes a request for a template, a location, and data, and replaces the existing template with it
			var source = $(partial).html();
			var template = Handlebars.compile(source);
			var html = template(context);
			$(target).html(html);
		},
		setup_board: function(){
			// First, clear the board
			$('.board').html();
			// Now, recreate it with the right number of spaces
			// I'm assuming here that the board should always be a square, not just any rectangle
			// Figure out how wide and tall each space should be
			var dimension = 100 / spaces;
			for (var s = 0; s < spaces * spaces; s++) {
				var css_class = '';
				// See if this is the first square in a line.
				// If it is, assign the class of "clear" to it
				if (s % spaces == 0) { 
					css_class = "clear";
				}
				// Create the context
				var context = { "id": s, "class" : css_class, "dimension" : dimension + '%' };
				// Now, add this square into the board
				t.append_template('#_space_template', '#board', context);
			}
			// Make sure there's a clear div at the end
			$('#board').append('<div class="clear"></div>');
			// Once we're done, find the board width
			var board_width = $('#board').width();
			// Make the board square again
			$('#board').height(board_width);
		}
	};
})(jQuery, this, this.document);